<template>
  <div class="home" >
    <section >
        <div class="title">
            <p class="title1 mb-2">
                 p2p trading bot
            </p>
        </div>
    </section>

      <div class="columns is-multiline">
    </div>
  </div>
</template>

<script>
import axios from 'axios'



export default {
  name: 'Home',
  data() {
    return {
      latestcontracts: []
    }
  },
  components: {
    //contractBox
  },
  mounted() {
    this.getLatestcontracts()

    document.title = 'Home'
  },
  methods: {
    async getLatestcontracts() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('/api/v1/latest-contracts/')
        .then(response => {
          this.latestcontracts = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style scoped>
.title{
  margin-top:3rem;
 text-align:center;
}

</style>