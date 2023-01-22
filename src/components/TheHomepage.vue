<template>
    <div class="header">
        <div class="title">Job application tracker</div>
        <div class="loginRegister">
            <router-link to="/login">Login</router-link>
            <router-link to="/registration">Register</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Source+Sans+Pro:ital@1&display=swap'); 
.header{
    height: 100px;
    width: 100%;
    background-color: black;
    display: flex;
    color: beige;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 30px;
}

.title{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.loginRegister{
    width:200px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    font-size: 20px;
}

a:link {
    text-decoration: none;
}

a:visited {
    color: beige;
}

a:hover {
    color: wheat;
    text-shadow: 5px 5px 5px beige;
}

</style>