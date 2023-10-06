<template>
  <!-- <div>
    <input type="checkbox" class="checkbox" id="checkbox">
  <label for="checkbox" class="label" @click="toggleDark">
    <i class="fas fa-moon"></i>
    <i class='fas fa-sun'></i>
    <div class='ball' />
  </label>
</div> -->
<dark-mode v-if="darkModeSwitch">
  <router-view>
  </router-view>
</dark-mode>
<light-mode v-else>
  <router-view></router-view>
</light-mode>
</template>

<script>
import DarkMode from './DarkMode.vue';
import LightMode from './LightMode.vue';
export default {
  components: {DarkMode, LightMode},
  data() {
    return {
      darkModeSwitch: false
    }
  },
  provide() {
    return {
      darkMode: this.$data
    };
  }
}
</script>

<style>
html,body {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

#app {
  height: 100%;
}

.dark {
  background-color: #292c35;
  color: beige;
}

#checkbox{
  opacity: 0;
  position: absolute;
  top: -9999px;
  left: -9999px;
}

.checkbox {
  opacity: 0;
}

.label {
  width: 45px;
  height: 20px;
  background-color:#292c35;
  display: flex;
  border-radius:50px;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}

.ball {
  width: 20px;
  height: 20px;
  background-color: white;
  position: absolute;
  border-radius: 50%;
  transition: transform 0.3s linear ease-in-out;
}

.checkbox:checked + .label .ball {
  transform: translateX(25px);
}
</style>