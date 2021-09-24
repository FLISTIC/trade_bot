<template>
    <div class="page-log-in" style="margin-top: 4rem;margin-bottom:7rem">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title gth">Занесите данные</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label class="gth">Вставьте API ключ:</label>
                        <div class="control">
                            <input  type="form-control" class="input" v-model="private_key" placeholder='{"kty":"EC", "alg":"ES256", "crv":"P-256", "x":"EjDTE4kXWR1vOuWkFyZNgm_82ACJUzJVpMSowHFqxP0", "y":"jP3uNx4dhddy4hDJ3EJcQBnbqFB604ACY1TOAzzQ-rw", "d":"0NeSRzoCcB HmHCIhZPvDPCn6vU25aOsfe5Fvk_VEP2E"}'>
                        </div>
                        <label class="gth">Вставьте маил привязанный к аккаунту:</label>
                        <div class="control" style="margin-top:0.5rem">
                            <input  type="form-control" class="input" v-model="mail" placeholder="sample@gmail.com">
                        </div>
                    </div>
                    
                    <div class="notification is-danger" v-if="errors.length">
                        <p  v-bind:key="error">{{ error }}</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button v-bind:key="status_btn" class="button bbt" @click="AddKey()">{{status_btn}}</button>
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
    
    name: 'ConKey',
    data() {
        return {
            query: '',
            private_key:'',
            mail:'',
            coin:'',
            percent: -1,
            trades:'',
            errors: [],
            from: '',
            to: '',
            status_btn: 'Добавить',
            strategy: '',
           
        }
    },
    mounted() {
        document.title = 'StrartBot'
    },
    methods: {
        async AddKey() {
            toast({
                            message: 'Ключ был добавлен!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                 
            const formData = {
                private_key: this.private_key,
                mail: this.mail,
                
            }  
            console.log(formData)        
            await axios
                .post("/api/v1/addkey/", formData)
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
    color:rgb(2, 2, 2);
    border:none;
}
.bbt:hover{
    background-image: linear-gradient(rgb(255, 223, 94) 0%, rgb(240, 185, 11) 100%);
    color:rgb(0, 0, 0);
    border:none;
}
.btn:active{
    background-color: rgb(20, 121, 75);
    color:rgb(214,214,214);
    border:none;
}
</style>