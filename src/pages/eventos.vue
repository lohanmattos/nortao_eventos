<template>
  <div class="pa-2">
    <p>Olá, bem vindo de volta !!</p>
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
      <v-data-table :headers="headers" :items="eventos" class="elevation-1" item-value="id">
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
            <v-text-field v-model="newGuest" label="Adicionar Convidado" append-icon="mdi-plus"
              @click:append="addGuest"></v-text-field>

            <!-- Lista de convidados adicionados -->
            <!-- Lista de convidados estilizada com botão de excluir à direita -->
            <v-list>
              <v-list-item v-for="(guest, index) in newEvent.convidados" :key="index"
                class="d-flex justify-space-between">
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
const eventos = ref([]);


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

const addNewEvent = async () => {
  try {
    // Exibe um indicador de carregamento (opcional)
    loading.value = true;

    // URL do endpoint para criar o evento
    let url = 'http://localhost:4000/eventos';

    // Faz a requisição POST para criar o evento no backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: newEvent.value.nome,
        data: newEvent.value.data,
        descricao: newEvent.value.descricao,
        local: newEvent.value.local,
        convidados: newEvent.value.convidados
      })
    });

    if (response.ok) {
      const result = await response.json();

      // Adiciona o novo evento à lista local usando o ID gerado pelo backend
      eventos.value.push({
        id: result.id, // Assumindo que o ID do evento é retornado pelo backend
        nome: newEvent.value.nome,
        data: newEvent.value.data,
        descricao: newEvent.value.descricao,
        local: newEvent.value.local,
        acoes: 1,
        convidados: newEvent.value.convidados
      });

      console.log('Evento criado com sucesso no banco de dados.');
    } else {
      console.error(`Erro ao criar o evento: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao criar o evento:', error);
  } finally {
    // Oculta o indicador de carregamento e fecha o diálogo
    loading.value = false;
    closeDialog();
  }
};


const deleteEvent = async (item) => {
  try {
    // Exibe um indicador de carregamento (opcional)
    loading.value = true;

    // Define a URL do endpoint para deletar o evento com o ID correspondente
    let url = `http://localhost:4000/eventos/${item.id}`;

    // Faz a requisição DELETE ao servidor
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Se a remoção for bem-sucedida, remove o evento localmente
      const index = eventos.value.indexOf(item);
      if (index !== -1) {
        eventos.value.splice(index, 1); // Remove o evento da lista local
        console.log(`Evento com ID ${item.id} removido com sucesso.`);
      }
    } else {
      console.error(`Erro ao remover o evento: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao remover o evento:', error);
  } finally {
    // Oculta o indicador de carregamento
    loading.value = false;
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

const loading = ref(false);
const loadItems = async () => {

  loading.value = true;
  let url = 'http://localhost:4000/eventos';

  const response = await fetch(url);
  const result = await response.json();
  eventos.value = result;
  console.log(eventos.value[0].local);

  loading.value = false;

}
// Carregar os dados ao montar o componente

onMounted(() => {
  loadItems();
});

</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>
