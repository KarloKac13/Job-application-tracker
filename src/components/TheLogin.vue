<template>
<div>
    <div class="title">Log in</div>
    <div class="form">
        <div class="formItems">
            <div class="padding">
                <div>Username/email:</div>
            </div>
            <div>
                <input id="username" type="text" placeholder="Enter your username or email" @click="inputSelectName()">
            </div>
        </div>
        <div class="formItems">
            <div class="padding2">
                <div>Password:</div>
            </div>
            <div>
                <input id="password" type="password" placeholder="Enter your password" @keydown.space.prevent @click="inputSelectName()">
            </div>
        </div>
        <div class="formItems">
            <button @click="login()">Login!</button>
        </div>
        <div class="formItems">
            <div class="register">
                <div class="noAcc">Don't have an account?</div>
                <button @click="register()">Register!</button>
            </div>
        </div>
    </div>
</div>
    <div v-if="isLoading" class="loadingSpinner">
        <loading-spinner ></loading-spinner>
    </div>
    <div v-else>{{ users }}</div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';
import axios from "axios";
export default {
    components: {LoadingSpinner},
    data() {
        return {
            isLoading: false,
            resetData: "",
            users: [],
            currentUser: ""
        }
    },
    methods: {
        async login() {
            let userName = document.getElementById("username").value;
            let userPassword = document.getElementById("password").value;
            this.isLoading = true;

            await axios.get("/api/users").then((response) => {
                this.users = response.data;
                this.isLoading = false;
                console.log(this.users)
                console.log(this.users[0].username);
                let foundUser = this.users.find(user => {
                   return user.username !== this.resetData &&
                    (user.username === userName || user.email === userName) &&
                    (userPassword !== this.resetData && userPassword === user.password)
                });
                if (foundUser) {
                    console.log(foundUser);
                    localStorage.setItem("user",JSON.stringify(foundUser));
                    this.$router.push("/userloggedin");
                } else {
                    console.log("Incorrect username/email or password!")
                }
            }).catch(() => {
                alert("Something went wrong! Don't worry we're working on it!");
            });
        },
        inputSelectName() {
            if (document.getElementById("username").placeholder === "Please enter a valid username!") {
                document.getElementById("username").style.borderColor = "lightgray";
                document.getElementById("username").classList = "defaultPlaceholderColor";
                document.getElementById("username").placeholder = "Must be at least 3 characters long";
            }
        },
        inputSelectPassword() {
            if (document.getElementById("password").placeholder === "Please enter a valid password!") {
                document.getElementById("password").style.borderColor = "lightgray";
                document.getElementById("password").classList = "defaultPlaceholderColor";
                document.getElementById("password").placeholder = "Must be at least 5 characters long";
            }
        },
        register() {
            this.$router.push("/registration")
        }
    }
}
</script>

<style scoped>
.title {
    height: 100px;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: 'Source Sans Pro', sans-serif;
    color:beige;
}

.form {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

input {
    border-color: lightgray;
    height: 25px;
    width: 300px;
}

.formItems{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
}

.padding{
    padding-left: 20px; 
    padding-right: 20px;
}

.padding2 {
    padding-left: 50px; 
    padding-right: 30px;
}

.noAcc {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
    font-size: 20px;
    font-family: 'Source Sans Pro', sans-serif;
    padding-bottom: 10px;
}

.register {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}

button {
    cursor: pointer;
    height: 30px;
    width: 120px;
    font-size: 20px;
    background-color: beige;
    border: 1px solid black;
    border-radius: 10px;
}

button:hover {
    border: 1px solid beige;
    color: beige;
    background-color: rgb(44, 44, 44);
    box-shadow: 3px 3px 3px gray;
}

.loadingSpinner {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>