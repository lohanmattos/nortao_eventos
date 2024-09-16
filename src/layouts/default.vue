<template>
  <v-app>
    <v-toolbar class="bg-primary">
          <v-toolbar-title>Nortão Eventos</v-toolbar-title>
      <v-toolbar-actions class="mr-2">
          <v-btn text to='/' prepend-icon="mdi-home">Eventos</v-btn>
          <v-btn text to='/login' prepend-icon="mdi-account">Área logada</v-btn>
      </v-toolbar-actions>
      </v-toolbar>
    <v-main>
      <router-view />
    </v-main>
    <template>
</template>
    <AppFooter />
  </v-app>
</template>

<script setup>
  //
</script>

<style>
/* Remove o sublinhado dos links */
.no-underline {
  text-decoration: none;
}

.no-underline:hover {
  text-decoration: none;
}

body{
  }
</style>