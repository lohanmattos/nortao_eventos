<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useUserLoginStore } from '@/stores/userLogin';

const userLoginStore = useUserLoginStore();

// Carrega os dados do localStorage e verifica o estado de autenticação ao montar o componente
userLoginStore.loadUserFromLocalStorage();
userLoginStore.checkAuthState();
</script>
