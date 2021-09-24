<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Мой аккаунт</h1>
            </div>
            <hr>
        </div>
      <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered" style="color: white">Здесь будет храниться личная информация клиента</h2>
                <span style="color:gray;margin-left:1rem ">Выбрано: {{latestcontracts[0].coin}}</span>

            </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MyAccount',
    
    data() {
    return {
      latestcontracts: [],
      usercontracts:[]
    }
    },
    components: {
      //contractBox
    },
    mounted() {
        this.getLatestcontracts()

        document.title = 'My account | ETH'

        
    },
    methods: {
        async getLatestcontracts() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('/api/v1/userexlist/')
        .then(response => {
          this.latestcontracts = response.data
        })
        .catch(error => {
          console.log(error)
        })
        this.getUsercontracts()
      this.$store.commit('setIsLoading', false)
    },
    }
}
</script>