<template>
    <!-- <div class="column is-12"> -->
        <!-- <router-link v-bind:to="contract.get_absolute_url" class="button is-dark mt-4"> -->
        <!-- <div class="box scale ">
            <h3 class="is-size-4 h3">Монета: {{ coin_data.coin }}</h3>
            <p class="is-size-6 ">Binance: {{ coin_data.binance }} </p>
            <p class="is-size-6 ">Gate: {{ coin_data.gate }} </p>
            <p class="is-size-6 ">Okex: {{ coin_data.okex }} </p>
            <p class="is-size-6 ">Huobi: {{ coin_data.huobi }} </p>
            <p class="is-size-6 ">Kucoin: {{ coin_data.kucoin }} </p>
            <p class="is-size-6 ">Процент: {{ coin_data.percent }} </p>
        </div> -->
        <ul class="list-group has-centered mt-2 scale list-group-horizontal">
            <li class="list-group-item cb">{{ coin_data.coin }}</li>
            <li class="list-group-item cb">{{ coin_data.binance }}</li>
            <li class="list-group-item cb">{{ coin_data.gate }}</li>
            <li class="list-group-item cb">{{ coin_data.okex }}</li>
            <li class="list-group-item cb">{{ coin_data.kucoin }}</li>
            <li class="list-group-item cb">{{ coin_data.huobi }}</li>
            <li class="list-group-item cb">{{ coin_data.percent }}</li>
        </ul>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'tablesdata',
    props: {
       coin_data : Object
    }
}
</script>

<style scoped>
.hhr{
    color:rgb(34, 142, 93);
}
.hhr:hover{
    color:rgb(28, 104, 70);
}
.h3{
    font-weight: bold;
    color:rgb(214,214,214);
}
.p{
    color:rgb(214,214,214);
}
.image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }

.scale {
        transition: 0.1s; /* Время эффекта */
        }
.scale:hover {
        transform: scale(1.07); /* Увеличиваем масштаб */
        box-shadow: 0 0 15px rgba(0,0,0,0.5); /* Параметры тени */
}
.cb{
    
    background-color:rgb(39, 39, 39);
    color:rgb(214,214,214);
    width: 10rem;
}

</style>