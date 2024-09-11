<template>
  <navbar />
  <div class="container">
    <!-- Cabeçalho com título e botão de adicionar evento -->
    <div class="header">
      <h2>Eventos</h2>
      <v-btn color="primary" @click="dialog = true" class="ml-auto">Adicionar Evento</v-btn>
    </div>

    <!-- Lista de Eventos Cadastrados -->
    <v-data-table
      :headers="headers"
      :items="eventos"
      class="elevation-1"
      @click:row="abrirDetalhesEvento"
    >
      <template v-slot:item.data="{ item }">
        {{ formatarData(item.data) }}
      </template>
    </v-data-table>

    <!-- Modal para o formulário de adicionar novo evento -->
    <v-dialog v-model="dialog" max-width="500px">
      <EventoForm @adicionarEvento="adicionarEvento" @closeDialog="dialog = false" />
    </v-dialog>

    <!-- Modal para detalhes do evento -->
    <v-dialog v-model="detalhesDialog" max-width="800px">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span class="headline">Detalhes do Evento: {{ eventoSelecionado.nome }}</span>
          <v-btn color="primary" @click="abrirModalAdicionarConvidado">Adicionar Convidado</v-btn>
        </v-card-title>
        <v-card-text>
          <p><strong>Descrição:</strong> {{ eventoSelecionado.descricao }}</p>
          <p><strong>Data:</strong> {{ formatarData(eventoSelecionado.data) }}</p>
          <p><strong>Local:</strong> {{ eventoSelecionado.local }}</p>
          <h3>Lista de Convidados</h3>
          <v-data-table
            :headers="convidadoHeaders"
            :items="eventoSelecionado.convidados"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="detalhesDialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para adicionar convidados -->
    <v-dialog v-model="adicionarConvidadoDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Convidado</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="novoConvidado.nome" label="Nome do Convidado" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="adicionarConvidado">Salvar</v-btn>
          <v-btn color="secondary" @click="adicionarConvidadoDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EventoForm from '@/components/EventoForm.vue'

const dialog = ref(false)
const detalhesDialog = ref(false)
const adicionarConvidadoDialog = ref(false)
const eventoSelecionado = ref({ convidados: [] })
const novoConvidado = ref({ nome: '' })

const headers = [
  { text: 'Nome do Evento', value: 'nome' },
  { text: 'Descrição', value: 'descricao' },
  { text: 'Data', value: 'data' },
  { text: 'Local', value: 'local' },
]

const convidadoHeaders = [
  { text: 'Nome do Convidado', value: 'nome' },
]

const eventos = ref([
  {
    id: 1,
    nome: 'Festa de Aniversário',
    descricao: 'Evento top',
    data: '2024-09-20',
    local: 'Salão A',
    convidados: [{ nome: 'João Silva' }, { nome: 'Maria Souza' }]
  },
  {
    id: 2,
    nome: 'Casamento',
    descricao: 'Evento elegante',
    data: '2024-10-10',
    local: 'Salão B',
    convidados: [{ nome: 'Carlos Almeida' }]
  }
])

// Adiciona um novo evento com a lista de convidados vazia
const adicionarEvento = (novoEvento) => {
  const novoId = eventos.value.length + 1
  eventos.value.push({
    id: novoId,
    ...novoEvento,
    convidados: [] // Certifica-se de que a lista de convidados começa vazia
  })

  dialog.value = false
}

// Formata a data para exibição
const formatarData = (data) => {
  return new Date(data).toLocaleDateString()
}

// Abre o modal de detalhes de um evento e carrega o evento selecionado
const abrirDetalhesEvento = (evento) => {
  eventoSelecionado.value = JSON.parse(JSON.stringify(evento)) // Clona o evento selecionado para evitar mutações diretas
  detalhesDialog.value = true
}

// Abre o modal para adicionar um convidado
const abrirModalAdicionarConvidado = () => {
  adicionarConvidadoDialog.value = true
}

// Adiciona o convidado ao evento selecionado
const adicionarConvidado = () => {
  if (novoConvidado.value.nome) {
    // Adiciona o convidado ao evento atualmente selecionado
    eventoSelecionado.value.convidados.push({ nome: novoConvidado.value.nome })
    
    // Atualiza o evento na lista de eventos
    const eventoIndex = eventos.value.findIndex(e => e.id === eventoSelecionado.value.id)
    if (eventoIndex !== -1) {
      eventos.value[eventoIndex].convidados = [...eventoSelecionado.value.convidados]
    }
    
    novoConvidado.value.nome = '' // Limpa o campo do nome
    adicionarConvidadoDialog.value = false // Fecha o modal de adicionar convidado
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1, h2 {
  font-size: 2em;
}

.v-btn {
  margin-left: auto;
}
</style>
