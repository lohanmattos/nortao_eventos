<template>
  <v-container v-if="evento">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-lg-space-between pa-2">
            <!-- Título e Botão Novo Evento -->
            <v-row class="d-flex align-center justify-space-between pa-2">
              <!-- Coluna para o Título -->
              <v-col cols="auto">
                <h2>{{ evento.nome }}</h2>
              </v-col>

              <!-- Coluna para o Botão -->
              <v-col cols="auto">
                <v-btn v-if="store.isLoggedIn" class="bg-primary" @click="showDialog = true">Editar</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            <span>{{ evento.data }}</span>
          </v-card-subtitle>
          <v-card-text>

            <v-row>
              <!-- Descrição do evento -->
              <v-col cols="12" md="8">
                <h3>Descrição</h3>
                <p>{{ evento.descricao }}</p>
              </v-col>
              <!-- Local do evento -->
              <v-col cols="12" md="4">
                <h3>Local</h3>
                <p>{{ evento.local }}</p>
              </v-col>
            </v-row>

            <!-- Tabela de Convidados -->
            <v-row>
              <v-col cols="12">
                <h3>Convidados</h3>
                <!-- Campo para adicionar ou editar convidado -->
                <v-row>
                  <v-col>
                    <v-text-field v-if="store.isLoggedIn" label="Adicionar/Editar Convidado" v-model="novoConvidado"
                      append-icon="mdi-check" @click:append="salvarConvidado"></v-text-field>
                  </v-col>
                </v-row>
                <v-data-table :headers="headers" :items="evento.convidados" class="elevation-1" item-value="nome">
                  <template v-slot:item.index="{ index }">
                    <span>{{ index + 1 }}</span>
                  </template>
                  <template v-slot:item.nome="{ item, index }">
                    <span>{{ item.nome }}</span>
                  </template>
                  <template v-slot:item.acoes="{ index }" v-if="store.isLoggedIn">
                    <v-btn class="ma-1" size="x-small" icon @click="editarConvidado(index)">
                      <v-icon color="blue">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="ma-1" size="x-small" icon @click="removerConvidado(index)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>

          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="$router.push('/eventos')">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal para editar o evento -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Evento</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field type="date" v-model="evento.data" label="Data"></v-text-field>
            <v-text-field v-model="evento.nome" label="Nome do Evento" required></v-text-field>
            <v-text-field v-model="evento.descricao" label="Descrição" required></v-text-field>
            <v-text-field v-model="evento.local" label="Local" required></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="updateEvent">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <!-- Renderizar mensagem caso o evento não seja encontrado -->
  <div v-else>
    <h2>Evento não encontrado</h2>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserLoginStore } from '@/stores/userLogin';

const store = useUserLoginStore();
const $route = useRoute();

// Variável reativa para controlar o modal
const showDialog = ref(false);

// Variável para armazenar o novo convidado ou o nome do convidado sendo editado
const novoConvidado = ref('');

// Variável para controlar se estamos editando um convidado (armazena o índice ou -1)
const editandoConvidadoIndex = ref(-1);

// Definindo as colunas (headers) da tabela
const headers = ref([
  { title: '#', key: 'index' },
  { title: 'Nome do Convidado', key: 'nome' },
  ...(store.isLoggedIn ? [{ title: 'Ações', key: 'acoes', sortable: false }] : [])
]);

// Lista de eventos (exemplo)
const eventos = ref([
  {
    id: 1,
    nome: 'AI & Machine Learning Summit 2024',
    data: '2024-08-15',
    descricao: 'Conferência sobre as últimas inovações em inteligência artificial e aprendizado de máquina.',
    local: 'San Francisco, CA',
    convidados: [
      { nome: 'John Doe' },
      { nome: 'Alice Johnson' },
      { nome: 'Mark Spencer' }
    ]
  },
  {
    id: 2,
    nome: 'Blockchain Expo 2024',
    data: '2024-09-05',
    descricao: 'Discussão sobre as aplicações de blockchain em diferentes indústrias.',
    local: 'Berlin, Germany',
    convidados: [
      { nome: 'Satoshi Nakamoto' },
      { nome: 'Vitalik Buterin' },
      { nome: 'Charlie Lee' }
    ]
  },
  {
    id: 3,
    nome: 'Cybersecurity Conference 2024',
    data: '2024-10-12',
    descricao: 'Fórum sobre segurança cibernética e as novas ameaças à segurança digital.',
    local: 'New York, NY',
    convidados: [
      { nome: 'Kevin Mitnick' },
      { nome: 'Eva Chen' },
      { nome: 'Ladar Levison' }
    ]
  },
  {
    id: 4,
    nome: 'Cloud Computing Summit 2024',
    data: '2024-11-20',
    descricao: 'Conferência focada nas inovações e estratégias em computação em nuvem.',
    local: 'Seattle, WA',
    convidados: [
      { nome: 'Andy Jassy' },
      { nome: 'Diane Greene' },
      { nome: 'Satya Nadella' }
    ]
  },
  {
    id: 5,
    nome: 'DevOps World 2024',
    data: '2024-12-02',
    descricao: 'Exploração das melhores práticas e ferramentas para DevOps.',
    local: 'Austin, TX',
    convidados: [
      { nome: 'Gene Kim' },
      { nome: 'Nicole Forsgren' },
      { nome: 'Jez Humble' }
    ]
  },
  {
    id: 6,
    nome: 'Tech Conference 2024',
    data: '2024-09-12',
    descricao: 'Palestras e workshops sobre as últimas inovações tecnológicas.',
    local: 'São Paulo, SP',
    convidados: [
      { nome: 'Carlos Silva' },
      { nome: 'Mariana Souza' },
      { nome: 'João Pereira' }
    ]
  },
  {
    id: 7,
    nome: 'CodeFest',
    data: '2024-09-12',
    descricao: 'Hackathon para desenvolvedores de software e startups.',
    local: 'Rio de Janeiro, RJ',
    convidados: [
      { nome: 'Ana Lima' },
      { nome: 'Pedro Costa' },
      { nome: 'Beatriz Gonçalves' }
    ]
  },
  {
    id: 8,
    nome: 'AR/VR World 2024',
    data: '2024-07-30',
    descricao: 'Fórum dedicado às inovações em realidade aumentada e realidade virtual.',
    local: 'Los Angeles, CA',
    convidados: [
      { nome: 'Tim Sweeney' },
      { nome: 'Palmer Luckey' },
      { nome: 'Brenda Romero' }
    ]
  },
  {
    id: 9,
    nome: 'Robotics & Automation 2024',
    data: '2024-11-18',
    descricao: 'Discussões sobre o futuro da robótica e automação nas indústrias.',
    local: 'Tokyo, Japan',
    convidados: [
      { nome: 'Masayoshi Son' },
      { nome: 'Marc Raibert' },
      { nome: 'Cynthia Breazeal' }
    ]
  },
  {
    id: 10,
    nome: 'Big Data Conference 2024',
    data: '2024-10-25',
    descricao: 'Evento focado em análise de dados em grande escala e suas aplicações.',
    local: 'London, UK',
    convidados: [
      { nome: 'Jeffrey Ullman' },
      { nome: 'Andrew Ng' },
      { nome: 'Hilary Mason' }
    ]
  }
]);

// Buscando o evento pelo ID da rota
const evento = ref(eventos.value.find((evento) => evento.id == $route.params.id));

// Função para fechar o modal
const closeDialog = () => {
  showDialog.value = false;
};

// Função para atualizar o evento
const updateEvent = () => {
  // Lógica de atualização do evento
  closeDialog();
};

// Função para adicionar ou editar o convidado
const salvarConvidado = () => {
  if (novoConvidado.value.trim() === '') return;

  if (editandoConvidadoIndex.value === -1) {
    // Adicionar novo convidado
    evento.value.convidados.push({ nome: novoConvidado.value });
  } else {
    // Editar convidado existente
    evento.value.convidados[editandoConvidadoIndex.value].nome = novoConvidado.value;
    editandoConvidadoIndex.value = -1; // Resetar o índice de edição
  }

  novoConvidado.value = ''; // Limpar o campo após adicionar ou editar
};

// Função para iniciar a edição do convidado
const editarConvidado = (index) => {
  novoConvidado.value = evento.value.convidados[index].nome;
  editandoConvidadoIndex.value = index; // Guardar o índice do convidado sendo editado
};

// Função para remover o convidado
const removerConvidado = (index) => {
  evento.value.convidados.splice(index, 1);
};
</script>


<style scoped>
h3 {
  margin-bottom: 8px;
}
</style>
