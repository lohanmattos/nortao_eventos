<template>
  <div>
    <!-- Carrossel de imagens -->
    <div class="d-block">
      <v-carousel>
        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>
        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>
        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
      </v-carousel>
    </div>

    <!-- Título -->
    <div class="d-flex justify-center pa-2">
      <h1>Eventos</h1>
    </div>

    <!-- Cartões de eventos com ícones e avatares -->
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col
          v-for="evento in eventos"
          :key="evento.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-2"
        >
          <v-card max-width="350" class="equal-height-card">
            <!-- Imagem do evento -->
            <v-img
              class="align-end text-white"
              :src="evento.imagem || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
              height="180"
              cover
            ></v-img>

            <!-- Título com altura mínima -->
            <v-card-text>
              <div class="event-title">
                <RouterLink :to="{ path: 'detalhes-evento/' + evento.id }">{{ evento.nome }}</RouterLink>
              </div>

              <!-- Data e Local -->
              <div class="pt-4">
                <strong>Data:</strong> {{ evento.data }} <br />
                <strong>Local:</strong> {{ evento.local }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="blue" :to="'detalhes-evento/' + evento.id" text>Detalhes</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Lista de eventos (exemplo)
const eventos = ref([
  {
    id: 1,
    nome: 'AI & Machine Learning Summit 2024',
    data: '2024-08-15',
    descricao: 'Conferência sobre as últimas inovações em inteligência artificial e aprendizado de máquina.',
    local: 'San Francisco, CA',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  },
  {
    id: 2,
    nome: 'Blockchain Expo 2024',
    data: '2024-09-05',
    descricao: 'Discussão sobre as aplicações de blockchain em diferentes indústrias.',
    local: 'Berlin, Germany',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg'
  },
  {
    id: 3,
    nome: 'Cybersecurity Conference 2024',
    data: '2024-10-12',
    descricao: 'Fórum sobre segurança cibernética e as novas ameaças à segurança digital.',
    local: 'New York, NY',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  },
  {
    id: 4,
    nome: 'Cloud Computing Summit 2024',
    data: '2024-11-20',
    descricao: 'Conferência focada nas inovações e estratégias em computação em nuvem.',
    local: 'Seattle, WA',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  },
  {
    id: 5,
    nome: 'DevOps World 2024',
    data: '2024-12-02',
    descricao: 'Exploração das melhores práticas e ferramentas para DevOps.',
    local: 'Austin, TX',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  },
  {
    id: 6,
    nome: 'Tech Conference 2024',
    data: '2024-09-12',
    descricao: 'Palestras e workshops sobre as últimas inovações tecnológicas.',
    local: 'São Paulo, SP',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg'
  },
  {
    id: 7,
    nome: 'CodeFest',
    data: '2024-09-12',
    descricao: 'Hackathon para desenvolvedores de software e startups.',
    local: 'Rio de Janeiro, RJ',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  },
  {
    id: 8,
    nome: 'AR/VR World 2024',
    data: '2024-07-30',
    descricao: 'Fórum dedicado às inovações em realidade aumentada e realidade virtual.',
    local: 'Los Angeles, CA',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  },
  {
    id: 9,
    nome: 'Robotics & Automation 2024',
    data: '2024-11-18',
    descricao: 'Discussões sobre o futuro da robótica e automação nas indústrias.',
    local: 'Tokyo, Japan',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg'
  },
  {
    id: 10,
    nome: 'Big Data Conference 2024',
    data: '2024-10-25',
    descricao: 'Evento focado em análise de dados em grande escala e suas aplicações.',
    local: 'London, UK',
    imagem: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  }
]);
</script>

<style scoped>
/* Estilos personalizados */
.equal-height-card {
  min-height: 400px; /* Define uma altura mínima consistente para os cartões */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.event-title {
  min-height: 40px; /* Define uma altura mínima para o título, garantindo consistência */
  font-weight: bold;
  overflow: hidden; /* Caso o título seja longo, ele não vai quebrar o layout */
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .equal-height-card {
    min-height: 350px; /* Ajusta a altura mínima para telas menores */
  }
}
</style>