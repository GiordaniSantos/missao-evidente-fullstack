<template>
  <div class="mb-2 flex items-center justify-between">
    <h1 class="text-3xl font-semibold">Início</h1>
    <div class="flex items-center">
      <label class="mr-2">Filtrar</label>
      <CustomInput type="select" v-model="chosenMes" @change="onDatePickerChange" :select-options="mesOptions"/>
      <input type="number" v-model="chosenAno" @change="onDatePickerChange" class="block mt-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md" placeholder="Ano">
    </div>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
    <div class="animate-fade-in-down border-l-4 py-7 border-yellow-400 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.3s">
      <template v-if="!loading.visitasCrentesCount">
        <div class=" pl-2">
          <span class="text-yellow-400 font-medium">CRENTES</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ visitasCrentesCount }} visitas</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faCross" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
    <div class="animate-fade-in-down border-l-4 py-7 border-yellow-400 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.1s">
      <template v-if="!loading.visitasIncredulosCount">
        <div class=" pl-2">
          <span class="text-yellow-400 font-medium">NÃO CRENTES</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ visitasIncredulosCount }} visitas</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faHeartBroken" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
    <div class="animate-fade-in-down border-l-4 py-7 border-yellow-400 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.visitasPresidiosCount">
        <div class=" pl-2">
          <span class="text-yellow-400 font-medium">PRESÍDIOS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ visitasPresidiosCount }} visitas</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faUserLock" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
    <div class="animate-fade-in-down border-l-4 py-7 border-yellow-400 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.3s">
      <template v-if="!loading.visitasEnfermosCount">
        <div class=" pl-2">
          <span class="text-yellow-400 font-medium">ENFERMOS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ visitasEnfermosCount }} visitas</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faSyringe" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
    <div class="animate-fade-in-down border-l-4 py-7 border-yellow-400 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.1s">
      <template v-if="!loading.visitasHospitaisCount">
        <div class=" pl-2">
          <span class="text-yellow-400 font-medium">HOSPITAIS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ visitasHospitaisCount }} visitas</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faHospital" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
    <div class="animate-fade-in-down border-l-4 py-7 border-yellow-400 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.visitasEscolasCount">
        <div class=" pl-2">
          <span class="text-yellow-400 font-medium">ESCOLAS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ visitasEscolasCount }} visitas</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faSchool" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4"> 
    <div class="animate-fade-in-down border-l-4 py-7 border-blue-600 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.estudosCount">
        <div class=" pl-2">
          <span class="text-blue-600 font-medium">ESTUDOS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ estudosCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faBook" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div> 
    <div class="animate-fade-in-down border-l-4 py-7 border-blue-600 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.3s">
      <template v-if="!loading.sermoesCount">
        <div class=" pl-2">
          <span class="text-blue-600 font-medium">SERMÕES</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ sermoesCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faUserTie" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div> 
    <div class="animate-fade-in-down border-l-4 py-7 border-blue-600 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.1s">
      <template v-if="!loading.estudosBiblicosCount">
        <div class=" pl-2">
          <span class="text-blue-600 font-medium">ESTUDOS BIBLÍCOS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ estudosBiblicosCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faBible" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div> 
    <div class="animate-fade-in-down border-l-4 py-7 border-blue-600 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.discipuladosCount">
        <div class=" pl-2">
          <span class="text-blue-600 font-medium">DISCIPULADOS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ discipuladosCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faPeopleArrows" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div> 
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
    <div class="animate-fade-in-down border-l-4 py-7 border-red-900 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.batismosInfantisCount">
        <div class=" pl-2">
          <span class="text-red-900 font-medium">BATISMOS INFANTIS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ batismosInfantisCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faChild" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div> 
    <div class="animate-fade-in-down border-l-4 py-7 border-red-900 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.3s">
      <template v-if="!loading.batismosProfissoesCount">
        <div class=" pl-2">
          <span class="text-red-900 font-medium">BATISMOS/PROF. FÉ</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ batismosProfissoesCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faPrayingHands" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
    <div class="animate-fade-in-down border-l-4 py-7 border-red-900 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.1s">
      <template v-if="!loading.bencoesNupciaisCount">
        <div class=" pl-2">
          <span class="text-red-900 font-medium">BENÇÕES NUPCIAIS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ bencoesNupciaisCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faHandHoldingHeart" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
    <div class="animate-fade-in-down border-l-4 py-7 border-red-900 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.santasCeiasCount">
        <div class=" pl-2">
          <span class="text-red-900 font-medium">SANTAS CEIAS</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ santasCeiasCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faWineGlassAlt" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
    <div class="animate-fade-in-down border-l-4 py-7 border-teal-700 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.2s">
      <template v-if="!loading.comungantesCount">
        <div class=" pl-2">
          <span class="text-teal-700 font-medium">COMUNGANTES</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ comungantesCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faUsers" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div> 
    <div class="animate-fade-in-down border-l-4 py-7 border-teal-700 bg-white rounded-md shadow-md p-4 flex justify-between items-center" style="animation-delay: 0.3s">
      <template v-if="!loading.naoComungantesCount">
        <div class=" pl-2">
          <span class="text-teal-700 font-medium">NÃO COMUNGANTES</span>
          <h2 class="text-gray-800 font-bold text-lg">{{ naoComungantesCount }}</h2>
        </div>
        <button class="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon :icon="faUsersSlash" class="h-6 w-6 text-gray-500" />
        </button>
      </template>
      <Spinner v-else text="" class=""/>
    </div>
  </div>
  
    <div class="grid grid-rows-1 md:grid-rows-2 md:grid-flow-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div class="col-span-1 md:col-span-2 row-span-1 lg:row-span-2 bg-white py-6 px-5 rounded-lg shadow">
        <label class="text-lg font-semibold block mb-2">Frequência aos Domingos</label>
        <template v-if="!loading.frequenciaChart">
          <LineChart :width="400" :height="200" :data="frequenciaChart"/>
        </template>
        <Spinner v-else text="" class=""/>
      </div>
      <div class="bg-white py-6 px-5 rounded-lg shadow">
        <label class="text-lg font-semibold block mb-2">Frequência aos Domingos</label>
        <template v-if="!loading.membresias">
          <div v-for="membresia of membresias" :key="membresia.id" class="mb-3 flex">
            <div class="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full mr-2">
              <UsersIcon class="w-5"/>
            </div>
            <div>
              <h3>{{ membresia.nome }}: {{ membresia.quantidade }} pessoas</h3>
              <p>(Registro criado em {{ formatDate(membresia.createdAt) }})</p>
            </div>
          </div>
        </template>
        <Spinner v-else text="" class=""/>
      </div>
      <div class="bg-white py-6 px-5 rounded-lg shadow flex flex-col items-center justify-center">
        <label class="text-lg font-semibold block mb-2">Visitação</label>
        <template v-if="!loading.visitacaoChart">
          <DoughnutChart :width="400" :height="200" :data="visitacaoChart"/>
        </template>
        <Spinner v-else text="" class=""/>
      </div>
    </div>
  
</template>
  
<script setup>
  import {UsersIcon} from '@heroicons/vue/24/outline'
  import DoughnutChart from '../components/core/Charts/Doughnut.vue'
  import LineChart from '../components/core/Charts/Line.vue'
  import axiosClient from "../axios.js";
  import {computed, onMounted, reactive, ref} from "vue";
  import Spinner from "../components/core/Spinner.vue";
  import CustomInput from "../components/core/CustomInput.vue";
  import moment from "moment/dist/moment"
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faHouse, faCalendarDays, faBook, faUserTie, faBookBible, faPeopleArrows,
   faChildReaching, faPrayingHands, faHandHoldingHeart, faWineGlassAlt, faCross, faHeartBroken,
   faUserLock, faSyringe, faHospital, faSchool, faChevronRight, faBible, faChild, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons'
  import pt from "moment/dist/locale/pt-br"
  import {useStore} from "vuex";
  
  const store = useStore();
  const currentUser = computed(() => store.state.user.data);
  const chosenMes = ref(new Date().getMonth() + 1)
  const chosenAno = ref(new Date().getFullYear())

  const mesOptions = [
    {key: '1', text: 'Janeiro'},
    {key: '2', text: 'Fevereiro'},
    {key: '3', text: 'Março'},
    {key: '4', text: 'Abril'},
    {key: '5', text: 'Maio'},
    {key: '6', text: 'Junho'},
    {key: '7', text: 'Julho'},
    {key: '8', text: 'Agosto'},
    {key: '9', text: 'Setembro'},
    {key: '10', text: 'Outubro'},
    {key: '11', text: 'Novembro'},
    {key: '12', text: 'Dezembro'},
  ]

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  }
  
  const loading = ref({
    visitasCrentesCount: true,
    visitasIncredulosCount: true,
    visitasPresidiosCount: true,
    visitasEnfermosCount: true,
    visitasHospitaisCount: true,
    visitasEscolasCount: true,
    estudosCount: true,
    sermoesCount: true,
    estudosBiblicosCount: true,
    discipuladosCount: true,
    batismosInfantisCount: true,
    batismosProfissoesCount: true,
    bencoesNupciaisCount: true,
    santasCeiasCount: true,
    comungantesCount: true,
    naoComungantesCount: true,
    visitacaoChart: true,
    frequenciaChart: true,
    membresias: true
  })
  const visitasCrentesCount = ref(0);
  const visitasIncredulosCount = ref(0);
  const visitasPresidiosCount = ref(0);
  const visitasEnfermosCount = ref(0);
  const visitasHospitaisCount = ref(0);
  const visitasEscolasCount = ref(0);
  const estudosCount = ref(0);
  const sermoesCount = ref(0);
  const estudosBiblicosCount = ref(0);
  const discipuladosCount = ref(0);
  const batismosInfantisCount = ref(0);
  const batismosProfissoesCount = ref(0);
  const bencoesNupciaisCount = ref(0);
  const santasCeiasCount = ref(0);
  const comungantesCount = ref(0);
  const naoComungantesCount = ref(0);
  const visitacaoChart = ref([]);
  const frequenciaChart = ref([]);
  const membresias = ref([]);
  
  function updateDashboard() {
  
    axiosClient.get(`/dashboard`, {params: {userId: currentUser.id, mes: chosenMes.value, ano: chosenAno.value}}).then(({data}) => {
      visitasCrentesCount.value = data.crentes
      loading.value.visitasCrentesCount = false;
      visitasIncredulosCount.value = data.incredulos
      loading.value.visitasIncredulosCount = false;
      visitasPresidiosCount.value = data.presidios
      loading.value.visitasPresidiosCount = false;
      visitasEnfermosCount.value = data.enfermos
      loading.value.visitasEnfermosCount = false;
      visitasHospitaisCount.value = data.hospitais
      loading.value.visitasHospitaisCount = false;
      visitasEscolasCount.value = data.escolas
      loading.value.visitasEscolasCount = false;
      estudosCount.value = data.estudo
      loading.value.estudosCount = false;
      sermoesCount.value = data.sermao
      loading.value.sermoesCount = false;
      estudosBiblicosCount.value = data.estudoBiblico
      loading.value.estudosBiblicosCount = false;
      discipuladosCount.value = data.discipulado
      loading.value.discipuladosCount = false;
      batismosInfantisCount.value = data.batismoInfantil
      loading.value.batismosInfantisCount = false;
      batismosProfissoesCount.value = data.batismoProfissao
      loading.value.batismosProfissoesCount = false;
      bencoesNupciaisCount.value = data.bencaoNupcial
      loading.value.bencoesNupciaisCount = false;
      santasCeiasCount.value = data.santaCeia
      loading.value.santasCeiasCount = false;
      membresias.value = data.membresias
      loading.value.membresias = false;

      const chartData = {
      labels: [],
      datasets: [{
          label: 'Pessoas',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#4e73df', '#f6c23e'],
          data: []
        }]
      }
    
      membresias.value.forEach(m => {
        chartData.labels.push(m.nome);
        chartData.datasets[0].data.push(m.quantidade);
      })
      
      frequenciaChart.value = chartData
      loading.value.frequenciaChart = false;
    })

    axiosClient.get(`/frequencia?tipo=Comungante`, {params: {userId: currentUser.id}})
      .then(({data}) => {
        comungantesCount.value = data.quantidade
        loading.value.comungantesCount = false;
      }
    )

    axiosClient.get(`/frequencia?tipo=N%C3%A3o%20Comungante`, {params: {userId: currentUser.id}})
      .then(({data}) => {
        naoComungantesCount.value = data.quantidade
        loading.value.naoComungantesCount = false;
      }
    )
    
    const chartDataVisitacao = {
      labels: [],
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#4e73df', '#f6c23e'],
          data: []
        }
      ]
    }

    chartDataVisitacao.labels.push('Crentes');
    chartDataVisitacao.datasets[0].data.push(visitasCrentesCount);
    chartDataVisitacao.labels.push('Não Crentes');
    chartDataVisitacao.datasets[0].data.push(visitasIncredulosCount);
    chartDataVisitacao.labels.push('Presídios');
    chartDataVisitacao.datasets[0].data.push(visitasPresidiosCount);
    chartDataVisitacao.labels.push('Enfermos');
    chartDataVisitacao.datasets[0].data.push(visitasEnfermosCount);
    chartDataVisitacao.labels.push('Hospitais');
    chartDataVisitacao.datasets[0].data.push(visitasHospitaisCount);
    chartDataVisitacao.labels.push('Escolas');
    chartDataVisitacao.datasets[0].data.push(visitasEscolasCount);

    visitacaoChart.value = chartDataVisitacao;
    loading.value.visitacaoChart = false;
  }
  
  function onDatePickerChange() {
    updateDashboard()
  }
  
  onMounted(() => updateDashboard())
</script>

<style scoped>

</style>