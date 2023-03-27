<template>
    <orbit-spinner v-if="!darkModeValue"
    :animation-duration="1200"
    :size="55"
    color="black"
    />
    <orbit-spinner v-else
    :animation-duration="1200"
    :size="55"
    color="beige"
    />
</template>

<script>
import { OrbitSpinner } from 'epic-spinners';
export default {
    inject: ["darkMode"],
    components: { OrbitSpinner },
    computed: {
        darkModeValue() {
            return this.darkMode.darkMode
        }
    }
}
</script>