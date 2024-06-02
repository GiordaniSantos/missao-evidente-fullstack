<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Minha Conta</h1>
    </div>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
        <form class="space-y-6" method="POST" @submit.prevent="update">
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                {{ errorMsg }}
                <span
                @click="errorMsg = ''"
                class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
                </span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-44 h-44 rounded-full bg-gray-300 mb-4">
                    <img class="rounded-circle" width="100%" style="width: 100%" src="https://missaoevidente.com.br/img/undraw_profile.svg">
                </div>
                <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
                        <div class="mt-2">
                            <input id="name" v-model="user.name" name="name" type="text" autocomplete="name" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div class="mt-2">
                            <input id="email" v-model="user.email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
                <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                        <div class="mt-2">
                            <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p class="text-sm text-gray-500 mb-4">
                            Deixe em branco para manter a atual.
                        </p>
                    </div>
                    <div>
                        <label for="confirm-password" class="block text-sm font-medium leading-6 text-gray-900">Confirmar Senha</label>
                        <div class="mt-2">
                            <input id="confirm-password" v-model="user.passwordRepeat" name="passwordRepeat" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            
                <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Atualizar
                </button>
            </div>
        </form>
        <button @click="excluir" class="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Deletar Conta
        </button>
    </div>
</template>
      
<script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../store";
    import router from "../router";
    import Swal from 'sweetalert2'
    
    let errorMsg = ref("");

    const user = ref({
        id: store.state.user.data.id,
        name: '',
        email: '',
        password: '',
        passwordRepeat: ''
    })

    function getCurrentUser() {
      store.dispatch('getCurrentUser', store.state.user.data.id)
        .then(({data}) => {
          user.value = data.data
        })
    }
    
    function update() {
        Swal.fire({
            title: "Você tem certeza que quer atualizar sua conta?",
            text: "Lembre-se de colocar um email ativo para que caso você precise recuperar sua senha, possa utiliza-lo.",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Atualizar",
        }).then((result) => {
            if (result.isConfirmed) {
                store.dispatch('updateUser', user.value)
                    .then(() => {   
                        user.value.password = ''
                        user.value.passwordRepeat = ''
                        Swal.fire({icon: 'success', title: 'Conta Atualizada com Sucesso!',showConfirmButton: false,timer: 1500})
                    })
                    .catch(({response}) => {
                        errorMsg.value = response.data.message;
                    })
            }
        });
    }

    function excluir() {
        Swal.fire({
            title: "Você tem certeza que deseja exluir sua conta?",
            text: "Todos os registros relacionados à sua conta serão excluidos!",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Excluir",
            confirmButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                store.dispatch('deleteUser', store.state.user.data.id)
                    .then(() => { 
                        Swal.fire({icon: 'success', title: 'Conta Deletada com Sucesso!',showConfirmButton: false,timer: 1500})
                        router.push({name: 'login'}) 
                    })
            }
        });
    }

    onMounted(() => getCurrentUser())
</script>
      