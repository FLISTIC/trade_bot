<template>
<div class="page-my-account ">
    <!-- <div class="columns is-multiline"> -->
            <div class="column mt-3 is-12">
                <h2 class="is-size-2 has-text-centered gth">Межбиржевый арбитраж</h2>
                    <ul v-show="!isLoad" class="list-group mt-3 сtr scale list-group-horizontal">
                        <li class="list-group-item cb">Монета</li>
                        <li class="list-group-item cb"> Binance</li>
                        <li class="list-group-item cb">Gate</li>
                        <li class="list-group-item cb">Huobi</li>
                        <li class="list-group-item cb">Okex</li>
                        <li class="list-group-item cb">Kucoin</li>
                        <li class="list-group-item cb">Процент</li>                    
                    </ul>
                    <div class="ctr ltr" >
                    <img style="d-flex align-items-center justify-content-center"
                            v-show="isLoad"
                            src="https://media4.giphy.com/media/Q5Wmfddmzp0VSJeBFF/giphy.gif?cid=ecf05e47eon7pemyuqz5roqtraiz3vjfo3hksmklpis10wmn&rid=giphy.gif"
                            >
                            </div>
            </div > 
            <tablesdata
              v-for="coin_data in data_coin"
              v-bind:key="coin_data.id"
              v-bind:coin_data="coin_data" />
      </div>
<!-- </div> -->
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import { toast } from 'bulma-toast'
import tablesdata from '@/components/tablesdata'
export default {
    
    name: 'arbitragesearch',
    data() {
        return {
            data:["dsdf","sdf","sdfd"],
            query: '',
            coin:'',
            percent: -1,
            trades:'',
            errors: [],
            from: '',
            to: '',
            status_btn: 'Запустить',
            strategy: '',
            data_coin: [],
            isLoad: false,  
            finalizeStatus: "обновить",      
           
        }
    },
    components: {
      tablesdata
    },
    methods:{
        get_contracts() {
      this.finalizeStatus = "обновление..."
      this.$store.commit('setIsLoading', true)
      axios
        .get('/api/v1/getdatalist/')
        .then(response => {
          this.data_coin = response.data
          console.log(this.data_coin)
        })
        .catch(error => {
          console.log(error)
        })
        this.finalizeStatus = "обновить";
        }
    },
    mounted() {
        this.getLatestcontracts()

        document.title = 'My account | ETH'

        
    },
    methods: {
        async getLatestcontracts() {
      this.$store.commit('setIsLoading', true)
      this.isLoad = true;
      await axios
        .get('/api/v1/getdatalist/')
        .then(response => {
          this.data_coin = response.data
          console.log(this.data_coin)

          
        })
        .catch(error => {
          console.log(error)
        })
        this.isLoad = false;
      this.$store.commit('setIsLoading', false)
    }  
    }
}
</script>

<style scoped>
.gth{
    color: rgb(214,214,214);
}
.bbt{
    background-image: linear-gradient(rgb(248, 209, 47) 0%, rgb(240, 185, 11) 100%);
    color:rgb(0, 0, 0);
    border:none;
}
.bbt:hover{
    background-image: linear-gradient(rgb(255, 223, 94) 0%, rgb(240, 185, 11) 100%);
    color:rgb(8, 8, 8);
    border:none;
}
.btn:active{
    background-color: rgb(248, 209, 47);
    color:rgb(214,214,214);
    border:none;
}
.list-group-horizontal{
    margin-left: auto; 
    margin-right: auto;
    width: 70rem;
}
.cb{
    background-color:rgb(39, 39, 39);
    color:rgb(214,214,214);
    width:10rem;
}

.ltr{
    
    margin-left: auto; 
    margin-right: auto;
    width: 20rem;
}
</style>