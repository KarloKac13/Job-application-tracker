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
        <Transition name="slide-fade">
        <div v-if="addForm" class="content">
            <div>Fields with * are mandatory to enter</div>
            <div class="content">
                <div>*Company name:</div>
                <input id="company" type="text" placeholder="Enter the company name" @click="inputSelectCompany()">
            </div>
            <div class="content">
                <div>*Position:</div>
                <input id="position" type="text" placeholder="Enter the position you applied for" @click="inputSelectPosition()">
            </div>
            <div class="content">
                <div>*Location:</div>
                <input id="location" type="text" placeholder="Enter the company location" @click="inputSelectLocation()">
            </div>
            <div class="content">
                <div>Date of the admission:</div>
                <input id="date" type="text" placeholder="Enter the date of your admission">
            </div>
            <div class="content">
                <div>Current status:</div>
                <input id="status" type="text" placeholder="Enter current status of your admission">
            </div>
            <div class="content">
                <button @click="add()">Add</button>
            </div>
        </div>
        </Transition>
        <div class="content">
            <button @click="showForms('showForm')">View your job applications</button>
        </div>
        <Transition name="slide-fade">
        <div v-if="showForm" class="content">
            <div v-if="isData">
                <ul v-for="application in storedApplications" :key="application">
                    <li>{{ application.company }}</li>
                    <li>{{ application.position }}</li>
                    <li>{{ application.location }}</li>
                    <li>{{ application.date }}</li>
                    <li>{{ application.status }}</li>
                </ul>
            </div>
        </div>
        </Transition>
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
            applications: [],
            currentUser: "",
            addForm: false,
            showForm: false,
            isAuth: true,
            storedUser: null,
            emptyString: "",
            isData: true,
            storedApplications: [],
        }
    },

    async created() {
        await axios.get("/api/users").then(response => {
            this.users = response.data;
            this.isLoading = false;
            this.storedUser = JSON.parse(localStorage.getItem("user"));
            this.currentUser = this.storedUser.username;
            console.log(this.storedUser);
        }).catch(() => {
            alert("Something went wrong! Don't worry we're working on it!")
        })
        console.log(this.users)
    },
    methods: {
        async showForms(form) {
            this[form] = !this[form];

            await axios.get("/api/users").then((response) => {
                this.applications = response.data;
                console.log(this.applications);
                this.storedApplications = this.applications.filter(user => {
                    return user.user !== this.emptyString && user.user === this.storedUser.username;
                })
            }).catch(() => {
            alert("Something went wrong! Don't worry we're working on it!")
            })
            if (form === "showForm" && this.storedApplications.length === 0) {
            alert("No submitted applications found!");
        }
            console.log(this.storedApplications)
        },
        logout() {
            localStorage.clear();
            this.$router.push("/");
        },
        async add() {
            let company = document.getElementById("company").value.trim();
            let position = document.getElementById("position").value.trim();
            let location = document.getElementById("location").value.trim();
            let date = document.getElementById("date").value.trim();
            let status = document.getElementById("status").value.trim();

            if (company === this.emptyString) {
                document.getElementById("company").style.borderColor = "lightcoral";
                document.getElementById("company").classList = "placeHolderText";
                document.getElementById("company").placeholder = "Please enter a company name!";
            }
            if (position === this.emptyString) {
                document.getElementById("position").style.borderColor = "lightcoral";
                document.getElementById("position").classList = "placeHolderText";
                document.getElementById("position").placeholder = "Please enter the position you applied to!";
            }
            if (location === this.emptyString) {
                document.getElementById("location").style.borderColor = "lightcoral";
                document.getElementById("location").classList = "placeHolderText";
                document.getElementById("location").placeholder = "Please enter company location!";
            }

            await axios.post("/api/users", {
                data: {
                    user: this.storedUser.username,
                    company: company,
                    position: position,
                    location: location,
                    date: date,
                    status: status
                }
            }).then(response => {
                response.data;
            }).catch(() => {
                alert("Something went wrong! Don't worry we're working on it!")
            });
        },
        inputSelectCompany() {
        if (document.getElementById("company").placeholder === "Please enter a company name!") {
                document.getElementById("company").style.borderColor = "lightgray";
                document.getElementById("company").classList = "defaultPlaceholderColor";
            }
        },
        inputSelectPosition() {
        if (document.getElementById("position").placeholder === "Please enter the position you applied to!") {
                document.getElementById("position").style.borderColor = "lightgray";
                document.getElementById("position").classList = "defaultPlaceholderColor";
            }
        },
        inputSelectLocation() {
        if (document.getElementById("location").placeholder === "Please enter company location!") {
                document.getElementById("location").style.borderColor = "lightgray";
                document.getElementById("location").classList = "defaultPlaceholderColor";
            }
        },
    
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
            next("/login");
            alert("Please log in again!")
            }
    },
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: 'Source Sans Pro', sans-serif;
}

button {
    cursor: pointer;
    height: 40px;
    width: 250px;
    font-size: 20px;
    background-color: beige;
    border: 1px solid black;
    border-radius: 10px;
    font-family: 'Source Sans Pro', sans-serif;
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
    padding-bottom: 30px;
}

li {
    list-style: none;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
::placeholder {
    font-family: 'Source Sans Pro', sans-serif;
}
.defaultPlaceholderColor::placeholder {
    color:gray
}

.placeHolderText::placeholder{
    color:lightcoral;
}
</style>