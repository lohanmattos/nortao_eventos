<template>
  <div class="d-flex justify-center pa-2">
    <h2>Acesso Restrito</h2>
  </div>
  <v-sheet class="mx-auto pa-2" width="400">
    <v-form fast-fail>
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Digite o CPF"
      ></v-text-field>

      <v-text-field
        prepend-inner-icon="mdi-lock"
        label="Digite sua Senha"
        type="password"
      ></v-text-field>
      <v-btn class="mt-2" color="primary" @click="store.login" block>Login com Google</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { useUserLoginStore } from '@/stores/userLogin'
const store = useUserLoginStore()
</script>

<style>

</style>