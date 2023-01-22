<template>
    <div>
    <div class="title">
        <div>
            {{ `Welcome ${currentUser}` }}
        </div>
        <button class="logout" @click="logout()">Log out</button>
    </div>
    <div class="content">
        <div>
            <button @click="showForms('addForm')">Add a job application</button>
        </div>
        <div v-if="addForm" class="content">
            <div class="content">
                <div>Company name:</div>
                <input id="company" type="text" placeholder="Enter the company name">
            </div>
            <div class="content">
                <div>Position:</div>
                <input id="position" type="text" placeholder="Enter the position you applied for">
            </div>
            <div class="content">
                <div>Location:</div>
                <input id="location" type="text" placeholder="Enter the company location">
            </div>
            <div class="content">
                <div>Date of the admission:</div>
                <input id="date" type="text" placeholder="Enter the date of your admission">
            </div>
            <div class="content">
                <div>{{`Current status: ${inputData}`}}</div>
                <input id="status" type="text" placeholder="Enter current status of your admission">
            </div>
            <div class="content">
                <button>Add</button>
            </div>
        </div>
        <div class="content">
            <button @click="showForms('showForm')">View your job applications</button>
        </div>
        <div v-if="showForm" class="content">
            <ul>
                <li>gfgf</li>
            </ul>
        </div>
    </div>
</div>
    <!-- <orbit-spinner 
    v-if="isLoading"
    :animation-duration="1200"
    :size="55"
    color="black"
    />
    <p v-if="isLoading">Loading...</p>
    <div v-else>{{ users }}</div> -->
</template>

<script>
// import { OrbitSpinner } from 'epic-spinners';
import axios from "axios";
export default {
    // components: {OrbitSpinner},
    data() {
        return {
            isLoading: true,
            users: [],
            currentUser: "",
            addForm: false,
            showForm: false,
            isAuth: true,
            storedUser: null
        }
    },

    async created() {
        await axios.get("/api/users").then(response => {
            this.users = response.data;
            this.isLoading = false;
            this.storedUser = JSON.parse(localStorage.getItem("user"));
            this.currentUser = this.storedUser.username
        }).catch(() => {
            alert("Something went wrong! Don't worry we're working on it!")
        })
        console.log(this.users)
    },

    methods: {
        showForms(form) {
            this[form] = !this[form]
        },
        logout() {
            localStorage.clear();
            this.$router.push("/");
        }
    },
    beforeRouteLeave(to, from, next) {
        next(() => {
            this.logout()
        });
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem("user")) {
                next()
            } else {
                next("/login")
            }
    }

}
</script>

<style scoped>
body {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
}
.title {
    height: 100px;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 30px;
    font-family: 'Source Sans Pro', sans-serif;
    color:beige;
}

.content {
    /* height: 100%;
    width: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
}

button {
    cursor: pointer;
    height: 40px;
    width: 250px;
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

input {
    border-color: lightgray;
    height: 25px;
    width: 300px;
}

.logout{
    height: 30px;
    width: 100px;
}

li {
    list-style: none;
}
</style>