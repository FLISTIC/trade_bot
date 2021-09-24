<template>
    <div class="page-log-in" style="margin-top: 4rem;margin-bottom:7rem">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title gth">Укажите процент</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <div>
                        <label class="gth">Выберите монету</label>
                        </div>
                        <select v-model="coin" style="width: 30%;height:2rem;border-radius:0.25rem">
                            <option>BTC</option>
                            <option>ETH</option>
                            <option>LTC</option>
                        </select>
                        <span style="color:gray;margin-left:1rem">Выбрано: {{coin}}</span>
                    </div>
                    <div class="field">
                        <div>
                        <label class="gth">Выберите тип торговли</label>
                        </div>
                        <select v-model="type_trades" style="width: 30%;height:2rem;border-radius:0.25rem">
                            <option>Agresive</option>
                            <option>Lonely</option>
                        </select>
                        <span style="color:gray;margin-left:1rem">Выбрано: {{type_trades}}</span>
                    </div>
                    <div class="field">
                        <div>
                        <label class="gth">Выберите способ оплаты</label>
                        </div>
                        <select v-model="card" style="width: 30%;height:2rem;border-radius:0.25rem">
                            <option>tinkoff</option>
                            <option>sberbank</option>
                        </select>
                        <span style="color:gray;margin-left:1rem">Выбрано: {{card}}</span>
                    </div>
                    <div class="field">
                        <label class="gth">Процент от биржи</label>
                        <div id="example-1">
                        <div class="btn-group">
                        <button class="btn btn-light" v-on:click="percent = (percent*10-1)/10">-0.1</button>
                        <input class="form-control" style="margin-left: 0.2rem; margin-right: 0.2rem;border-radius: 0" v-model="percent" placeholder="1">
                        <button class="btn btn-light" v-on:click="percent = (percent*10+1)/10">+0.1</button>
                        </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="gth">Лимиты</label>
                        <div class="control">
                            <input  type="form-control" class="input" v-model="start_price" placeholder="От">
                        </div>
                        <div class="control" style="margin-top:0.5rem">
                            <input  type="form-control" class="input" v-model="finish_price" placeholder="До">
                        </div>
                    </div>
                    <div class="form-check" style="padding-left:0">
                        <input type="checkbox" id="checkbox" v-model="competitor" >
                        <!-- <label for="checkbox">{{ checked }}</label> -->
                        <label class="form-check-label gth" style="padding-left:0.2rem" for="exampleCheck1">Торговля по конкурентам</label>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p  v-bind:key="error">{{ error }}</p>
                    </div>
                    

                    <div class="field">
                        <div class="control">
                            <button v-bind:key="status_btn" class="button bbt" @click="StartBot()">{{status_btn}}</button>
                        </div>
                    </div>

                    <hr>

                    <p class="gth">Или <router-link to="/documentation">кликинтие сюда</router-link> чтобы ознакомиться с документацией!</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { toast } from 'bulma-toast'
export default {
    
    name: 'StartBot',
    data() {
        return {
            query: '',
            coin:'',
            percent: -1,
            type_trades:'',
            errors: [],
            from: '',
            to: '',
            status_btn: 'Запустить',
            type_trades: '',
            card:'',
            competitor: false,
            start_price:'',
            finish_price: '',
           
        }
    },
    mounted() {
        document.title = 'StrartBot'
    },
    methods: {
        async StartBot() {
            toast({
                            message: 'Бот запущен!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
            if(this.trades=="Агрессивный(всегда на первом месте)"){
                this.type_trades = '1';
            }      
            else{
                this.type_trades = '2';
            }      
            const formData = {
                percent: this.percent,
                coin: this.coin,
                start_price:this.start_price,
                finish_price: this.finish_price,
                type_trades: this.type_trades,
                active:true,
                competitor: this.competitor,
                card:this.card,
            }          
            await axios
                .post("/api/v1/data_tradeadd/", formData)
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Что-то пошло не так. Пожалуйста, попробуйте еще раз')
                        
                        console.log(JSON.stringify(error))
                    }
                    
                })
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
</style>