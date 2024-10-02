<template>
  <div class="pa-8">
    <p>Olá, bem vindo.</p>
    <h3>{{ store.user.displayName }}</h3>
  </div>
  <div>
    <!-- Cabeçalho com o botão -->
    <div class="d-flex justify-lg-space-between pa-8">
      <h1>Eventos</h1>
      <v-btn class="bg-primary" @click="showDialog = true">Novo Evento</v-btn>
    </div>

    <!-- Tabela de eventos -->
    <div class="d-flex pa-4">
      <v-data-table
        :headers="headers"
        :items="eventos"
        class="elevation-1"
        item-value="id"
      >
        <template v-slot:item.acoes="{ item }">
          <v-btn :to="{ path: 'detalhes-evento/' + item.id }" icon="mdi-pencil" class="ma-1" size="x-small"></v-btn>
          <v-btn
            icon="mdi-delete"
            class="ma-1"
            size="x-small"
            @click="deleteEvent(item)"
          ></v-btn>
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

const eventos = ref([
  {
    id: 6,
    nome: 'Tech Conference 2024',
    data: '25 de outubro de 2024',
    descricao: 'Palestras e workshops sobre as últimas inovações tecnológicas.',
    local: 'São Paulo, SP',
    acoes: 1,
    imagem: 'https://exemplo.com/imagens/tech-conference-2024.jpg',
    convidados: ['Carlos Silva', 'Mariana Souza', 'João Pereira']
  },
  {
    id: 7,
    nome: 'CodeFest',
    data: '10 de novembro de 2024',
    descricao: 'Hackathon para desenvolvedores de software e startups.',
    local: 'Rio de Janeiro, RJ',
    acoes: 1,
    imagem: 'https://exemplo.com/imagens/codefest.jpg',
    convidados: ['Ana Lima', 'Pedro Costa', 'Beatriz Gonçalves']
  },
  {
    id: 8,
    nome: 'AI Summit',
    data: '5 de dezembro de 2024',
    descricao: 'Conferência sobre Inteligência Artificial e aprendizado de máquina.',
    local: 'Belo Horizonte, MG',
    acoes: 1,
    imagem: 'https://exemplo.com/imagens/ai-summit.jpg',
    convidados: ['Rafael Moreira', 'Julia Ferreira', 'Vinicius Oliveira']
  },
  {
    id: 9,
    nome: 'Cloud Computing Expo',
    data: '20 de janeiro de 2025',
    descricao: 'Evento focado em soluções de computação em nuvem e infraestrutura.',
    local: 'Curitiba, PR',
    acoes: 1,
    imagem: 'https://exemplo.com/imagens/cloud-computing-expo.jpg',
    convidados: ['Marcelo Santos', 'Fernanda Almeida', 'Thiago Mendes']
  },
  {
    id: 10,
    nome: 'Blockchain Forum',
    data: '15 de fevereiro de 2025',
    descricao: 'Discussões sobre blockchain e criptomoedas.',
    local: 'Florianópolis, SC',
    acoes: 1,
    imagem: 'https://exemplo.com/imagens/blockchain-forum.jpg',
    convidados: ['Lucas Rocha', 'Carla Martins', 'Gabriel Silva']
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
