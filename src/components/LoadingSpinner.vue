<template>
    <orbit-spinner 
    :animation-duration="1200"
    :size="55"
    color="black gray red"
    />
</template>

<script>
import { OrbitSpinner } from 'epic-spinners';
export default {
    components: {OrbitSpinner}
}
</script>