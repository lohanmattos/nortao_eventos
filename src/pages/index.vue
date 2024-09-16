<template>
  <div>
    <div class="d-block">
      <v-carousel>
        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
      </v-carousel>
    </div>

    <div class="d-flex justify-center pa-2">
      <h1>Eventos</h1>
    </div>


      <div class="d-flex justify-center mb-6 flex-wrap">
      <v-sheet
        v-for="n in 8"
        :key="n"
        class="ma-2 pa-2"
      >
      <v-card
    max-width="300"
  >
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
    </v-img>

    <v-card-text>
      <div>Semana da FACET 2024 - UNEMAT</div>
    </v-card-text>

    <v-card-subtitle class="pt-4">
      <div>
        Quinta-Feira, 19 de setembro
      </div>
      <div>
        Local: UNEMAT - Campus de Sinop
      </div>
      <div>Sinop - MT</div>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="blue" text="Comprar"></v-btn>
    </v-card-actions>
  </v-card>
      </v-sheet>
    </div>


  </div>

</template>

<script setup>
// Aqui você pode adicionar a lógica necessária
</script>

<style scoped></style>
