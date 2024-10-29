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
                    
                    <span>{{ index }}</span>
                  </template>
                  <template v-slot:item.nome="{ item, index }">
                    <span>{{ item.nome }}</span>
                  </template>
                  <template v-slot:item.acoes="{ index, item }" v-if="store.isLoggedIn">
                    <v-btn class="ma-1" size="x-small" icon @click="editarConvidado(index)">
                      <v-icon color="blue">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="ma-1" size="x-small" icon @click="removerConvidado(index, item.id)">
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
            <v-text-field v-model="evento.data"  label="Data"></v-text-field>
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


// Buscando o evento pelo ID da rota
const evento = ref([]);

// Função para fechar o modal
const closeDialog = () => {
  showDialog.value = false;
};

// Função para atualizar o evento
const updateEvent = async () => {
  try {
    // Defina a URL para o endpoint de atualização do evento
    const url = `http://localhost:4000/eventos/${evento.value.id}`;

    // Faz a requisição PUT para atualizar o evento
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: evento.value.nome,
        data: evento.value.data,
        descricao: evento.value.descricao,
        local: evento.value.local,
      }),
    });

    console.log(response);

    // Verifica se a requisição foi bem-sucedida
    if (response.ok) {
      console.log("Evento atualizado com sucesso!");
    } else {
      console.error(`Erro ao atualizar o evento: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao atualizar o evento:', error);
  } finally {
    // Fechar o modal após a atualização
    closeDialog();
  }
};


const salvarConvidado = async () => {
  if (novoConvidado.value.trim() === '') return;

  try {
    if (editandoConvidadoIndex.value === -1) {
      // Adicionar novo convidado
      let url = `http://localhost:4000/convidados/${evento.value.id}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: novoConvidado.value }),
      });

      if (response.ok) {
        const result = await response.json();
        evento.value.convidados.push({ id: result.id, nome: novoConvidado.value });
        console.log('Convidado adicionado com sucesso!');
      } else {
        console.error(`Erro ao adicionar o convidado: ${response.statusText}`);
      }
    } else {
      // Editar convidado existente
      const convidadoId = evento.value.convidados[editandoConvidadoIndex.value].id;
      let url = `http://localhost:4000/convidados/${convidadoId}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: novoConvidado.value }),
      });

      if (response.ok) {
        evento.value.convidados[editandoConvidadoIndex.value].nome = novoConvidado.value;
        console.log('Convidado editado com sucesso!');
      } else {
        console.error(`Erro ao editar o convidado: ${response.statusText}`);
      }
    }

    // Limpar os valores e resetar o estado de edição
    novoConvidado.value = '';
    editandoConvidadoIndex.value = -1;
  } catch (error) {
    console.error('Erro ao salvar o convidado:', error);
  }
};

// Função para iniciar a edição do convidado
const editarConvidado = (index) => {
  novoConvidado.value = evento.value.convidados[index].nome;
  editandoConvidadoIndex.value = index; // Guardar o índice do convidado sendo editado
};


const removerConvidado = async (index, convidadoId) => {
  try {
    // Exibe o estado de carregamento, se necessário
    loading.value = true;

    // URL da API para remover o convidado
    let url = `http://localhost:4000/convidados/${convidadoId}`;

    // Faz a requisição DELETE ao backend
    const response = await fetch(url, {
      method: 'DELETE'
    });

    // Verifica se a requisição foi bem-sucedida
    if (response.ok) {
      // Remove o convidado da lista local após a confirmação do backend
      evento.value.convidados.splice(index, 1);
      console.log(`Convidado com ID ${convidadoId} removido com sucesso.`);
    } else {
      console.error(`Erro ao remover o convidado: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao remover o convidado:', error);
  } finally {
    // Oculta o estado de carregamento
    loading.value = false;
  }
};


const loading = ref(false);
const loadItems = async () => {

  loading.value = true;
  const eventId = $route.params.id;

  let url = `http://localhost:4000/eventos/${eventId}`;

  const response = await fetch(url);
  const result = await response.json();
  evento.value = result;
  
  evento.value.convidados = evento.value.convidados.filter(c => !!c.id)

  loading.value = false;

}
// Carregar os dados ao montar o componente


onMounted(() => {
  loadItems();
});

</script>


<style scoped>
h3 {
  margin-bottom: 8px;
}
</style>
