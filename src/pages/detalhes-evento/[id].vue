<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-lg-space-between pa-2">
            <h2>{{ evento.nome }}</h2>
            <v-btn class="bg-primary" @click="showDialog = true">Editar</v-btn>
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
                <v-data-table :headers="headers" :items="evento.convidados" class="elevation-1" item-value="nome">
                  <template v-slot:item.index="{ index }">
                    <span>{{ index + 1 }}</span>
                  </template>
                  <template v-slot:item.acoes="{ index }">
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
            <v-list>
              <v-list-item v-for="(guest, index) in newEvent.convidados" :key="index">
                {{ guest }}
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
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();

// Definindo as colunas (headers) da tabela
const headers = ref([
  { title: '#', key: 'index' },
  { title: 'Nome do Convidado', key: 'nome' },
  { title: 'Ações', key: 'acoes', sortable: false }
]);

const eventos = ref([
  {
    id: 6,
    nome: 'Tech Conference 2024',
    data: '25 de outubro de 2024',
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
    data: '10 de novembro de 2024',
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
    data: '5 de dezembro de 2024',
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
    data: '20 de janeiro de 2025',
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
    data: '15 de fevereiro de 2025',
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
