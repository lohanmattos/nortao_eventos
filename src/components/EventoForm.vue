<template>
    <v-card>
      <v-card-title>
        <span class="headline">Adicionar Novo Evento</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="adicionarEvento">
          <v-text-field v-model="novoEvento.nome" label="Nome" required></v-text-field>
          <v-text-field v-model="novoEvento.descricao" label="Descricao"></v-text-field>
          <v-text-field v-model="novoEvento.data" label="Data" type="date" required></v-text-field>
          <v-text-field v-model="novoEvento.local" label="Local" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="closeDialog">Cancelar</v-btn>
        <v-btn color="primary" @click="adicionarEvento">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue'
  
  const novoEvento = ref({
    nome: '',
    descricao: '',
    data: '',
    local: '',
  })
  
  // Emite eventos para o componente pai
  const emit = defineEmits(['adicionarEvento', 'closeDialog'])
  
  const adicionarEvento = () => {
    emit('adicionarEvento', { ...novoEvento.value })
    novoEvento.value.nome = ''
    novoEvento.value.descricao = ''
    novoEvento.value.data = ''
    novoEvento.value.local = ''
  }
  
  const closeDialog = () => {
    emit('closeDialog')
  }
  </script>
  