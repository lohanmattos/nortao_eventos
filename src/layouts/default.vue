<template>
  <v-app>
    <v-toolbar class="bg-primary">
      <v-toolbar-title>Nortão Eventos</v-toolbar-title>
      <v-spacer></v-spacer> <!-- Adiciona um espaço flexível -->
      <v-btn text to="/" prepend-icon="mdi-home">Eventos</v-btn>
      <v-btn text to="/login" prepend-icon="mdi-account">Área logada</v-btn>
    </v-toolbar>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  // Setup code (se necessário)
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
