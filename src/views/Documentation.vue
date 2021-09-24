<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Documentation</h1>

                <p style="color:rgb(177, 177, 177)">Here will be the documentation for the bot</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Documentation',
    mounted() {
        document.title = 'Documentation'
    },
}
</script>


<style>
.title{
    color:rgb(177, 177, 177);
}
</style>