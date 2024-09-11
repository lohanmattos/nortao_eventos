<template>
  <v-app-bar app>
    <!-- Título à esquerda -->
    <v-app-bar-title>
      <router-link to="/" class="no-underline">Nortão Eventos</router-link>
    </v-app-bar-title>

    <!-- Espaço entre o título e o link -->
    <v-spacer></v-spacer>

    <!-- Link "Eventos" à direita -->
    <v-btn text>
      <router-link to="/eventos" class="no-underline">Eventos</router-link>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
// Nenhuma lógica adicional é necessária neste caso
</script>

<style scoped>
/* Remove o sublinhado dos links */
.no-underline {
  text-decoration: none;
}

.no-underline:hover {
  text-decoration: none;
}
</style>