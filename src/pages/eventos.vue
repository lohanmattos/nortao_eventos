<template>
  <div class="pa-2">
    <p>Olá, bem vindo.</p>
    <h3>{{ store.user.displayName }}</h3>
  </div>
  <div>
 <!-- Título e Botão Novo Evento -->
 <v-row class="d-flex align-center justify-space-between pa-2">
    <!-- Coluna para o Título -->
    <v-col cols="auto">
      <h1>Eventos</h1>
    </v-col>

    <!-- Coluna para o Botão -->
    <v-col cols="auto">
      <v-btn class="bg-primary" @click="showDialog = true">Novo Evento</v-btn>
    </v-col>
  </v-row>

    <!-- Tabela de eventos -->
    <div class="d-flex pa-4">
      <v-data-table
        :headers="headers"
        :items="eventos"
        class="elevation-1"
        item-value="id"
      >
        <template v-slot:item.acoes="{ item }">
          <v-btn :to="{ path: 'detalhes-evento/' + item.id }" icon class="ma-1" size="x-small">
            <v-icon color="blue">mdi-pencil</v-icon>

          </v-btn>
          <v-btn icon class="ma-1" size="x-small" @click="deleteEvent(item)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <!-- Modal para adicionar novo evento -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo Evento</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field type="date" v-model="newEvent.data" label="Data"></v-text-field>
            <v-text-field v-model="newEvent.nome" label="Nome do Evento" required></v-text-field>
            <v-text-field v-model="newEvent.descricao" label="Descrição" required></v-text-field>
            <v-text-field v-model="newEvent.local" label="Local" required></v-text-field>

            <!-- Campo para adicionar convidados -->
            <v-text-field
              v-model="newGuest"
              label="Adicionar Convidado"
              append-icon="mdi-plus"
              @click:append="addGuest"
            ></v-text-field>

            <!-- Lista de convidados adicionados -->
            <!-- Lista de convidados estilizada com botão de excluir à direita -->
          <v-list>
            <v-list-item
              v-for="(guest, index) in newEvent.convidados"
              :key="index"
              class="d-flex justify-space-between"
            >
              <v-list-item-content>
                <v-list-item-title>{{ guest }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="removeGuest(index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="addNewEvent">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserLoginStore } from '@/stores/userLogin'
const store = useUserLoginStore()

// Controla o diálogo para adicionar novo evento
const showDialog = ref(false);

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Data', key: 'data' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Local', key: 'local' },
  { title: 'Ações', key: 'acoes' }
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


// Novo evento (vinculado ao formulário)
const newEvent = ref({
  nome: '',
  data: null,
  descricao: '',
  local: '',
  convidados: []
});

const newGuest = ref('');

// Função para fechar o modal e resetar o formulário
const closeDialog = () => {
  showDialog.value = false;
  resetNewEvent();
};

// Função para adicionar um novo evento à lista
const addNewEvent = () => {
  const newId = eventos.value.length + 1; // Gerar um id para o novo evento
  eventos.value.push({
    id: newId,
    nome: newEvent.value.nome,
    data: newEvent.value.data,
    descricao: newEvent.value.descricao,
    local: newEvent.value.local,
    acoes: 1,
    convidados: newEvent.value.convidados
  });
  closeDialog();
};

// Função para deletar um evento
const deleteEvent = (item) => {
  const index = eventos.value.indexOf(item);
  if (index !== -1) {
    eventos.value.splice(index, 1); // Remove o evento da lista
  }
};

// Função para resetar os campos do novo evento
const resetNewEvent = () => {
  newEvent.value.nome = '';
  newEvent.value.data = '';
  newEvent.value.descricao = '';
  newEvent.value.local = '';
  newEvent.value.convidados = [];
};

// Função para adicionar um convidado
const addGuest = () => {
  if (newGuest.value.trim()) {
    newEvent.value.convidados.push(newGuest.value.trim());
    newGuest.value = '';
  }
};

// Função para remover um convidado
const removeGuest = (index) => {
  newEvent.value.convidados.splice(index, 1);
};
</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>
