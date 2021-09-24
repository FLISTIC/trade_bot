<template>
  <div class="main" >
    <nav class="navbar is-dark" style="background-color:rgb(39, 39, 39);">
      <div class="navbar-brand " style="margin-left:5rem">
        <router-link to="/" class="navbar-item" style="text-decoration: none;"><strong >trading_bot</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input bgn" placeholder="Поиск" name="query">
                </div>

                <div class="control">
                  <button class="button is-success out">
                      <span class="icon">
                      <i class="fas fa-search"></i>
                      </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/arbitragesearch" class=" nb">Арбитраж</router-link>
                <router-link to="/conkey" class=" nb">Синхронизация с биржей</router-link>
                <router-link to="/botstart" class=" nb">Запустить бота</router-link>
                <router-link to="/my-account" class=" nb">Личный кабинет</router-link>
                <button @click="logout()" class=" out">Выйти</button>
              </template>
              
              
              <template v-else>
                <router-link to="/log-in" class="button is-dark">Войти</router-link>
                <router-link to="/about" class="button is-dark">О нас</router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="Ymain">
      <router-view/>
    </section>

     <!-- <footer class="footer" style="background-color: rgb(39, 39, 39);">
      <p class="has-text-centered" style="color: gray">Alexey Ivchenko (c) 2021</p>
    </footer>  -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  computed: {
      cartTotalLength() {
          let totalLength = 0

          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }

          return totalLength
      }
  },
  methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            console.log("9999999999999999999999999999999")
            console.log(localStorage.getItem("userid"))
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getMyOrders() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
#app{
  height: 100%;
    min-height: 100%;
}
html,body,template {
    height: 100%;
    min-height: 100%;
}
.out{
  border: none;
  border-radius: 7%;
  background-image: linear-gradient(rgb(248, 209, 47) 0%, rgb(240, 185, 11) 100%);
}
.out:hover{
  border: none;
  background-image: linear-gradient(rgb(255, 223, 94) 0%, rgb(240, 185, 11) 100%);
}
.nb{
  padding-right:1rem;
  background-color:rgb(39, 39, 39);
  border: none;
  text-decoration: none;
  color: rgb(177, 177, 177)
}
.bgn{
  //background: rgb(248, 209, 47);
}
.nb:hover{
  color : rgb(248, 209, 47);
}
.nb:active{
  border: white;
  outline: none ;
  color : rgb(248, 209, 47);
}
.nb:focus{
  outline: none ;
}
.main {
    min-height: 100%;
    background: rgb(31,31,31);
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
}

</style>
