<style scoped>
.title {
    height: 100px;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: 'Source Sans Pro', sans-serif;
    color:beige;
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

.noAcc {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
    font-size: 20px;
    font-family: 'Source Sans Pro', sans-serif;
    padding-bottom: 10px;
}

.register {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
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

.loadingSpinner {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>