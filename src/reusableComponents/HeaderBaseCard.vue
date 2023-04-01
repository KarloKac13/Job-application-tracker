<!-- :checked="$root.$data.darkModeSwitch" -->

<template>
    <div class="header">
    <div class="darkLigthModeContainer">
    <div class="textSwitch">{{ $root.$data.darkModeSwitch === true ? lightModeText : darkModeText }}</div>
    <input type="checkbox" :checked="$root.$data.darkModeSwitch" class="checkbox" id="checkbox">
  <label for="checkbox" class="label" @click="toggleDark">
    <i class="fas fa-moon"></i>
    <i class='fas fa-sun'></i>
    <div class='ball' />
  </label>
  </div>
    <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lightModeText: "Switch to light mode",
            darkModeText: "Switch to dark mode"
        }
    },
    computed: {
        toggleDark() {
            const checkbox = document.getElementById('checkbox');

            return checkbox.addEventListener('change', () => {
                this.$root.$data.darkModeSwitch = !this.$root.$data.darkModeSwitch;
                document.body.classList.toggle("dark", this.$root.$data.darkModeSwitch);
                console.log(this.$root.$data.darkModeSwitch);
            });
        },
        darkModeClass() {
            return this.$root.$data.darkModeSwitch ? 'dark' : 'light';
        },
    }
}
</script>

<style scoped>
.header{
    height: 100px;
    width: 100%;
    background-color: black;
    display: flex;
    color: beige;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 30px;
}
.darkLigthModeContainer {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.textSwitch {
    font-size: 15px;
    padding-bottom: 10px;
}
</style>
