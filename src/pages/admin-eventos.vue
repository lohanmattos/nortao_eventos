<template>
  <div>
    <!-- Cabeçalho com o botão -->
    <div class="d-flex justify-lg-space-between pa-8 pt-10">
      <h1>Eventos</h1>
      <v-btn class="bg-primary" @click="showDialog = true">Novo Evento</v-btn>
    </div>

    <!-- Tabela de eventos -->
    <div class="d-flex pa-4">
      <v-data-table :items="items"></v-data-table>
    </div>

    <!-- Modal para adicionar novo evento -->
    <v-dialog v-model="showDialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <!-- Este slot é para ativar o modal, que já é feito pelo botão "Novo Evento" -->
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Adicionar Novo Evento</span>
        </v-card-title>
        
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="newEvent.nome" label="Nome do Evento" required></v-text-field>
            <v-text-field v-model="newEvent.data" label="Data" required></v-text-field>
            <v-text-field v-model="newEvent.endereco" label="Endereço" required></v-text-field>
            <v-text-field v-model="newEvent.cidade" label="Cidade" required></v-text-field>
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

const showDialog = ref(false);
const items = ref([
  {
    Nome: 'Quinta Galponeira',  // Nome do evento
    Data: '19 de setembro de 2024',  // Data do evento
    Endereço: 'CTG - Estância da Amizade',  // Local do evento
    Cidade: 'Sinop, MT',  // Cidade onde o evento ocorre
  },
  {
    Nome: 'Baile de Abertura',
    Data: '13 de setembro de 2024',
    Endereço: 'CTG Porteira Aberta',
    Cidade: 'Sorriso, MT',
  },
  {
    Nome: 'Encontro de Peões e Prendas',
    Data: '14 de setembro de 2024',
    Endereço: 'CTG Herança Gaúcha',
    Cidade: 'Lucas do Rio Verde, MT',
  },
  {
    Nome: 'Jantar Fandango',
    Data: '17 de setembro de 2024',
    Endereço: 'CTG Sentinela da Tradição',
    Cidade: 'Nova Mutum, MT',
  },
  {
    Nome: 'Rodeio Crioulo',
    Data: '22 de setembro de 2024',
    Endereço: 'Parque de Rodeios Estância Gaúcha',
    Cidade: 'Sinop, MT',
  },
]);

const newEvent = ref({
  nome: '',
  data: '',
  endereco: '',
  cidade: '',
});

// Função para fechar o modal
const closeDialog = () => {
  showDialog.value = false;
  resetNewEvent();
};

// Função para adicionar um novo evento
const addNewEvent = () => {
  items.value.push({
    Nome: newEvent.value.nome,
    Data: newEvent.value.data,
    Endereço: newEvent.value.endereco,
    Cidade: newEvent.value.cidade,
  });
  closeDialog();
};

// Função para resetar os campos do novo evento
const resetNewEvent = () => {
  newEvent.value.nome = '';
  newEvent.value.data = '';
  newEvent.value.endereco = '';
  newEvent.value.cidade = '';
};
</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>
