<template>
  <div class="d-flex justify-center pa-2">
    <h2>Acesso Restrito</h2>
  </div>
  <v-sheet class="mx-auto pa-2" width="400">
    <v-form fast-fail @submit.prevent="handleLogin">
      <!-- Campo de E-mail -->
      <v-text-field
        v-model="email"
        prepend-inner-icon="mdi-account"
        label="Digite o E-mail"
        required
      ></v-text-field>

      <!-- Campo de Senha -->
      <v-text-field
        v-model="password"
        prepend-inner-icon="mdi-lock"
        label="Digite sua Senha"
        type="password"
        required
      ></v-text-field>

      <!-- Botão de Login com E-mail e Senha -->
      <v-btn class="mt-2" color="primary" @click="handleLogin" block>
        Login
      </v-btn>

      <!-- Botão de Login com Google -->
      <v-btn class="mt-2" color="secondary" @click="store.loginWithGoogle" block>
        Login com Google
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useUserLoginStore } from '@/stores/userLogin';

// Armazena os valores de e-mail e senha
const email = ref('');
const password = ref('');

// Acesso ao store de autenticação
const store = useUserLoginStore();

// Função para lidar com o login via e-mail e senha
const handleLogin = () => {
  if (email.value && password.value) {
    store.loginWithEmailAndPassword(email.value, password.value);
  } else {
    alert('Por favor, insira o e-mail e a senha.');
  }
};
</script>

<style scoped>
/* Estilos podem ser adicionados conforme necessário */
</style>
