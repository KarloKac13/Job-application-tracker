<template>
    <div class="lightMode">
    <slot></slot>
    </div>
</template>

<style>
.lightMode {
    height: 100%;
}
.lightMode input {
    background-color: white;
    color: black;
}

.lightMode div .orStyle {
    background-color: beige;
    background-color: rgb(245,245,220,0.69);
    color: #292c35;
    height: 10px;
    width: 75px;
    border-radius: 1px;
}
</style>