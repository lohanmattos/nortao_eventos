<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-lg-space-between pa-2">
            <h2>{{ evento.nome }}</h2>
            <v-btn v-if="store.isLoggedIn" class="bg-primary" @click="showDialog = true">Editar</v-btn>
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
                    <v-text-field v-if="store.isLoggedIn"
                      label="Adicionar/Editar Convidado"
                      v-model="novoConvidado"
                      append-icon="mdi-check"
                      @click:append="salvarConvidado"
                    ></v-text-field>
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
</template>


<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { useUserLoginStore } from '@/stores/userLogin'
const store = useUserLoginStore()


const $route = useRoute();

// Variável reativa para controlar o modal
const showDialog = ref(false);

// Variável para armazenar o novo convidado
const novoConvidado = ref('');

// Definindo as colunas (headers) da tabela
const headers = ref([
  { title: '#', key: 'index' },
  { title: 'Nome do Convidado', key: 'nome' },
 // Apenas adiciona a coluna "Ações" se o usuário estiver logado
 ...(store.isLoggedIn ? [{ title: 'Ações', key: 'acoes', sortable: false }] : [])
]);

const eventos = ref([
  // Lista de eventos aqui...

  {
    id: 6,
    nome: 'Tech Conference 2024',
    data: '2024-09-12',
    descricao: 'Palestras e workshops sobre as últimas inovações tecnológicas.',
    local: 'São Paulo, SP',
    acoes: 1,
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',  // Imagem de conferência de tecnologia
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
    acoes: 1,
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',  // Imagem de hackathon
    convidados: [
      { nome: 'Ana Lima' },
      { nome: 'Pedro Costa' },
      { nome: 'Beatriz Gonçalves' }
    ]
  },
  {
    id: 8,
    nome: 'AI Summit',
    data: '2024-09-12',
    descricao: 'Conferência sobre Inteligência Artificial e aprendizado de máquina.',
    local: 'Belo Horizonte, MG',
    acoes: 1,
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',  // Imagem de IA
    convidados: [
      { nome: 'Rafael Moreira' },
      { nome: 'Julia Ferreira' },
      { nome: 'Vinicius Oliveira' }
    ]
  },
  {
    id: 9,
    nome: 'Cloud Computing Expo',
    data: '2024-09-12',
    descricao: 'Evento focado em soluções de computação em nuvem e infraestrutura.',
    local: 'Curitiba, PR',
    acoes: 1,
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',  // Imagem de computação em nuvem
    convidados: [
      { nome: 'Marcelo Santos' },
      { nome: 'Fernanda Almeida' },
      { nome: 'Thiago Mendes' }
    ]
  },
  {
    id: 10,
    nome: 'Blockchain Forum',
    data: '2024-09-12',
    descricao: 'Discussões sobre blockchain e criptomoedas.',
    local: 'Florianópolis, SC',
    acoes: 1,
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',  // Imagem de blockchain
    convidados: [
      { nome: 'Lucas Rocha' },
      { nome: 'Carla Martins' },
      { nome: 'Gabriel Silva' }
    ]
  }
]);

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

// Função para remover o convidado
const removerConvidado = (index) => {
  evento.value.convidados.splice(index, 1);
};

// Função para adicionar o novo convidado
const adicionarConvidado = () => {
  if (novoConvidado.value.trim() !== '') {
    evento.value.convidados.push({ nome: novoConvidado.value });
    novoConvidado.value = ''; // Limpar o campo após adicionar
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 8px;
}
</style>
