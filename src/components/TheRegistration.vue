<template>
<div class="pageDisplay">
    <div class="header">
        <div class="title">Registration form</div> 
        <div class="homepage">
            <button class="homepageBtnStyle" @click="homepage()">Back to homepage</button>
        </div>
    </div>
    <div v-if="isRegistered" class="succesfulLogin">User successfully registered!</div>
    <div v-if="isRegistered" class="succesfulLogin">Log in to see your applications!</div>
    <div class="content">
        <div class="form">
            <div class="formItems">
                <div class="padding">
                    <div>Choose your username:</div>
                </div>
                <div>
                    <input id="username" type="text" placeholder="Must be at least 3 characters long" @click="inputSelectName()">
                </div>
            </div>
            <div class="formItems">
                <div class="padding2">
                    <div>Enter your e-mail:</div>
                </div>
                <div>
                    <input id="email" type="email" @click="inputSelectEmail()">
                </div>
            </div>
            <div class="formItems">
                <div class="padding3">
                    <div>Choose your password:</div>
                </div>
                <div>
                    <input id="password" type="password" placeholder="Must be at least 5 characters long" @keydown.space.prevent @click="inputSelectPassword()">
                </div>
            </div>
            <div class="formItems">
                <div class="padding">
                    <div>Confirm your password:</div>
                </div>
                <div>
                    <input id="confirmPw" type="password" @keydown.space.prevent @click="inputSelectConfirmPw()">
                </div>
            </div>
            <div class="formItems">
                <button @click="register()">Register!</button>
            </div>
            <div class="formItems">
                <hr>
                <div class="orStyle">or</div>
                <hr>
            </div>
            <div class="formItems">
                <button @click="login()">Login!</button>
            </div>
        </div>
    </div>
        <div class="footer">
            <router-link to="/">Back to homepage!</router-link>
        </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            resetData: "",
            isRegistered: false
        }
    },
    methods: {
        async register() {
            let username = document.getElementById("username").value.trim().toLowerCase();
            let email = document.getElementById("email").value.trim().toLowerCase();
            let password = document.getElementById("password").value.trim();
            let confirmPw = document.getElementById("confirmPw").value.trim();
            let passwordLength = document.getElementById("password").innerHTML = password;
            let usernameLength = document.getElementById("username").innerHTML = username;

            if (username === this.resetData || usernameLength.length < 3) {
                document.getElementById("username").style.borderColor = "lightcoral";
                document.getElementById("username").classList = "placeHolderText";
                document.getElementById("username").placeholder = "Please enter a valid username!";
                console.log("Please enter a valid username!/Username must be at least 3 char long!")
            } if (email === this.resetData || !email.includes("@")) {
                document.getElementById("email").style.borderColor = "lightcoral";
                document.getElementById("email").classList = "placeHolderText";
                document.getElementById("email").placeholder = "Please enter a valid email!";
                console.log("Please enter a valid e-mail!")
            } if (passwordLength.length < 5 || password === this.resetData) {
                document.getElementById("password").style.borderColor = "lightcoral";
                document.getElementById("password").classList = "placeHolderText";
                document.getElementById("password").placeholder = "Please enter a valid password!";
                console.log("Please enter a valid password!/Password must be at least 5 char long!")
            } if (confirmPw !== password || confirmPw === this.resetData) {
                document.getElementById("confirmPw").style.borderColor = "lightcoral";
                document.getElementById("confirmPw").classList = "placeHolderText";
                document.getElementById("confirmPw").placeholder = "Please confirm the password!";
                console.log("Password doesn't match!")
            } if (usernameLength.length >= 3 && username !== this.resetData &&
                email !== this.resetData && email.includes("@") && 
                passwordLength.length >= 5 && password !== this.resetData &&
                confirmPw === password) {
                    console.log({
                name: username,
                nameLength: usernameLength.length,
                email: email,
                password: password,
                passwordLength: passwordLength.length,
                confirmPw: confirmPw
                    })
            document.getElementById("username").value = this.resetData;
            document.getElementById("email").value = this.resetData;
            document.getElementById("password").value = this.resetData;
            document.getElementById("confirmPw").value = this.resetData;
            // this.$router.push("/login");
            // this.$router.push("/userLoggedIn");
            }
            await axios.post("/api/users", {
                data: {
                    username: username,
                    email: email,
                    password: password
                }
            }).then(response => {
                response.data
            }).then(this.isRegistered = true).catch(() => {
                alert("Something went wrong! Don't worry we're working on it!")
            });
        },
        inputSelectName() {
            if (document.getElementById("username").placeholder === "Please enter a valid username!") {
                document.getElementById("username").style.borderColor = "lightgray";
                document.getElementById("username").classList = "defaultPlaceholderColor";
                document.getElementById("username").placeholder = "Must be at least 3 characters long";
            }
        },
        inputSelectEmail() {
            if (document.getElementById("email").placeholder === "Please enter a valid email!") {
                document.getElementById("email").style.borderColor = "lightgray";
                document.getElementById("email").classList = "defaultPlaceholderColor";
                document.getElementById("email").placeholder = this.resetData;
            }
        },
        inputSelectPassword() {
            if (document.getElementById("password").placeholder === "Please enter a valid password!") {
                document.getElementById("password").style.borderColor = "lightgray";
                document.getElementById("password").classList = "defaultPlaceholderColor";
                document.getElementById("password").placeholder = "Must be at least 5 characters long";
            }
        },
        inputSelectConfirmPw() {
            if (document.getElementById("confirmPw").placeholder === "Please confirm the password!") {
                document.getElementById("confirmPw").style.borderColor = "lightgray";
                document.getElementById("confirmPw").classList = "defaultPlaceholderColor";
                document.getElementById("confirmPw").placeholder = this.resetData;
            }
        },
        login() {
            this.$router.push("/login")
        },
        homepage() {
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
.pageDisplay {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

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

.content{
    height: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-family: 'Source Sans Pro', sans-serif;
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

.padding3{
    padding-left: 25px; 
    padding-right: 25px;
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

.defaultPlaceholderColor::placeholder {
    color:gray
}

.placeHolderText::placeholder{
    color:lightcoral;
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

hr {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    flex-wrap: wrap;
    width: 40%;
    color: black;
}
.orStyle {
    background-color: beige;
    display: flex;
    justify-content: center;
    align-items:center;
    width:50px;
    box-shadow: 0px 0px 20px 10px beige;
    font-size: 20px;
    font-weight: bold;
}

.footer{
    display: flex;
    justify-content: center;
}

a:link {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    font-size: 30px;
    font-family: 'Source Sans Pro', sans-serif;
    padding-bottom: 25px;
}

a:visited {
    color: black;
}

a:hover {
    color: black;
    text-shadow: 5px 5px 5px black;
}
.succesfulLogin{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: 'Source Sans Pro', sans-serif;
    color:black;
}
.homepage{
display: flex;
flex-wrap: wrap;
align-items: center;
font-size: 20px;
padding-right: 10px;
}

.homepageBtnStyle {
width: 190px;
}
</style>