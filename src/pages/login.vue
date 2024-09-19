<template>
  <div class="d-flex justify-center pa-2">
    <h2>Acesso Restrito</h2>
  </div>
  <v-sheet class="mx-auto pa-2" width="400">
    <v-form fast-fail @submit.prevent="login">
      <v-text-field
        prepend-inner-icon="mdi-account"
        v-model="cpf"
        :rules="rulesCpf"
        label="Digite o CPF"
      ></v-text-field>

      <v-text-field
        prepend-inner-icon="mdi-lock"
        v-model="senha"
        :rules="rulesSenha"
        label="Digite sua Senha"
        type="password"
      ></v-text-field>

      <v-btn class="mt-2" type="submit"  to='/eventos' block>Entrar</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      cpf: '',
      senha: '',
      // Definindo regras de validação (caso tenha)
      rulesCpf: [(v) => !!v || 'CPF é obrigatório'],
      rulesSenha: [(v) => !!v || 'Senha é obrigatória'],
      // Definindo um usuário e senha fictícios
      userSimulado: {
        cpf: '12345678900',
        senha: 'admin123'
      }
    };
  },
  methods: {
    login() {
      // Verifica se o CPF e a senha correspondem ao usuário simulado
      if (this.cpf === this.userSimulado.cpf && this.senha === this.userSimulado.senha) {
        // Redireciona para a página de administrador
        this.$router.push({ name: 'admin-eventos' });
      } else {
        // Exibe um alerta informando que as credenciais estão incorretas
        alert('Usuário ou senha incorretos. Tente novamente.');
      }
    }
  }
};
</script>

<style>

</style>