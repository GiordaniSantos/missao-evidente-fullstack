<template>
    <GuestLayout title="Cadastrar nova conta">
        <form class="mt-8 space-y-6" @submit.prevent="cadastrar" method="POST">
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                    {{ errorMsg }}
                    <span @click="errorMsg = ''" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]" >
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
            <div>
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
                <div class="mt-2">
                    <input id="name" v-model="user.name" name="name" type="text" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div class="mt-2">
                    <input id="email" v-model="user.email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                </div>
                <div class="mt-2">
                    <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="text-sm">
                <router-link :to="{name: 'login'}" class="font-medium text-indigo-600 hover:text-indigo-500"> Já possui conta?
                </router-link>
                </div>
            </div>
            <div>
                <button type="submit"
                    :disabled="loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        :class="{
                        'cursor-not-allowed': loading,
                        'hover:bg-indigo-500': loading,
                        }">
                            <svg
                            v-if="loading"
                            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                                ></circle>
                                <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                    </span>
                        Cadastrar
                </button>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
    import GuestLayout from "../components/GuestLayout.vue";
    import {ref} from 'vue'
    import {LockClosedIcon} from "@heroicons/vue/24/solid"
    import store from "../store";
    import router from "../router";
    import Swal from 'sweetalert2'

    let loading = ref(false);
    let errorMsg = ref("");

    const user = {
        name: '',
        email: '',
        password: ''
    }

    function cadastrar() {
    loading.value = true;
    store.dispatch('registrar', user)
        .then(() => {
            loading.value = false;
            router.push({name: 'app.dashboard'})
            Swal.fire({icon: 'success', title: 'Conta criada com sucesso!',showConfirmButton: false,timer: 1500})
        })
        .catch(({response}) => {
            loading.value = false;
            errorMsg.value = response.data.message;
            Swal.fire({icon: 'error', title: 'Erro!', text: response.data.message,showConfirmButton: true})
        })
    }
</script>