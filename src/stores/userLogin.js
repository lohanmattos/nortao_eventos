import { defineStore } from "pinia";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import router from "@/router";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const useUserLoginStore = defineStore('userLogin', {
    state: () => ({
        displayName: '',
        email: '',
        photoURL: '',
        accessToken: ''
    }),
    getters: {
        isLoggedIn() {
            return this.accessToken !== '';
        },
        user() {
            return {
                displayName: this.displayName,
                email: this.email,
                photoURL: this.photoURL,
                accessToken: this.accessToken
            };
        }
    },
    actions: {
        // Carrega o estado do localStorage quando a aplicação é inicializada
        loadUserFromLocalStorage() {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                this.displayName = user.displayName;
                this.email = user.email;
                this.photoURL = user.photoURL;
                this.accessToken = user.accessToken;
            }
        },
        login() {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    this.displayName = user.displayName;
                    this.email = user.email;
                    this.photoURL = user.photoURL;
                    user.getIdToken().then((token) => {
                        this.accessToken = token;

                        // Salva os dados no localStorage
                        localStorage.setItem('user', JSON.stringify({
                            displayName: this.displayName,
                            email: this.email,
                            photoURL: this.photoURL,
                            accessToken: this.accessToken
                        }));

                        // Redireciona para a página de eventos
                        router.push('/eventos');
                    });
                }).catch((error) => {
                    console.log(error);
                });
        },
        logout() {
            // Limpa os dados do estado e do localStorage
            this.displayName = '';
            this.email = '';
            this.photoURL = '';
            this.accessToken = '';
            localStorage.removeItem('user');
            
            signOut(auth);
            router.push('/'); // Redireciona para a página inicial após logout
        },
        checkAuthState() {
            // Ouve mudanças no estado de autenticação do Firebase
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Usuário está logado
                    this.displayName = user.displayName;
                    this.email = user.email;
                    this.photoURL = user.photoURL;

                    user.getIdToken().then((token) => {
                        this.accessToken = token;

                        // Salva no localStorage para persistência
                        localStorage.setItem('user', JSON.stringify({
                            displayName: this.displayName,
                            email: this.email,
                            photoURL: this.photoURL,
                            accessToken: this.accessToken
                        }));
                    });
                } else {
                    // Usuário não está logado, limpar o localStorage
                    this.logout();
                }
            });
        }
    },
});
