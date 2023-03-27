<template>
  <div>
    <input type="checkbox" class="checkbox" id="checkbox">
  <label for="checkbox" class="label" @click="toggleDark, darkModeToggleBoolean()">
    <i class="fas fa-moon"></i>
    <i class='fas fa-sun'></i>
    <div class='ball' />
  </label>
</div>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    }
  },
  computed: {
    toggleDark() {
      const checkbox = document.getElementById('checkbox');

     return checkbox.addEventListener('change', () => {
       document.body.classList.toggle('dark');
       console.log(document.body.classList, this.darkMode)
      });
    },
  },
  methods: {
    darkModeToggleBoolean() {
      this.darkMode = !this.darkMode
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
html,body{
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
}

.checkbox {
  opacity: 0;
}

#checkbox{
  display: none;
}

.label {
  width: 45px;
  height: 20px;
  background-color:#111;
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
  transition: transform 0.2s linear;
}

/*  target the elemenent after the label*/
.checkbox:checked + .label .ball{
  transform: translateX(24px);
}

.fa-moon {
  color: pink;
}

.fa-sun {
  color: yellow;
}

body.dark {
  background-color: #292c35;
}
</style>