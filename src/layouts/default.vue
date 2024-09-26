<template>
  <v-app>
    <v-toolbar class="bg-primary">
      <v-toolbar-title>Nortão Eventos</v-toolbar-title>
      <v-spacer></v-spacer> <!-- Adiciona um espaço flexível -->
      <v-btn text to="/" prepend-icon="mdi-home">Eventos</v-btn>

      <div v-if="!store.isLoggedIn">
        <v-btn text to="/login" prepend-icon="mdi-account">Área logada</v-btn>
      </div>

      <div v-if="store.isLoggedIn">
        <v-btn to="/login" @click="store.logout" text prepend-icon="mdi-logout">Sair</v-btn>
      </div>
    </v-toolbar>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
 import { useUserLoginStore } from '@/stores/userLogin'
 const store = useUserLoginStore()


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
