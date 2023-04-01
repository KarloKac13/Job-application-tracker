<template>
    <div class="darkMode">
    <slot></slot>
    </div>
</template>

<style>
.darkMode {
    height: 100%;
}
.darkMode input {
    background-color: beige;
    color: #111;
}

.darkMode div .orStyle{
    background-color: rgb(245,245,220,0.69);
    color: #292c35;
    height: 10px;
    width: 75px;
    border-radius: 1px;
}

.darkMode .formItems hr {
    border-color: beige;
}

.darkMode .pageDisplay .succesfulLogin {
    color: beige;
}

</style>