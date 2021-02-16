<template>
  <div class="wrapper">
    <HeaderComponent />
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="login">Login:</label>
        <input id="login" type="text" class="form-control" @input="validate" v-model="name" placeholder="min 5 symbols">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" class="form-control" @input="validate" v-model="password" placeholder="min 8 symbols">
      </div>
      <input type="submit" value="Enter" class="btn btn-primary" :disabled="!isValidLength">
    </form>
  </div>
</template>

<script>
import HeaderComponent from './Header.vue';

export default {
    name: 'Login',
    components: {
       HeaderComponent
    },
    data() {
        return {
            name: '',
            password: '',
            isValidLength: false
        }
    },
    methods: {
        onSubmit() {
          const data = { name: this.name, password: this.password };

            fetch('https://jurassic987.pythonanywhere.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.ok ? res : Promise.reject(res))
            .then(() => {
                alert(`${this.name} succesfully logged in`);
                this.$router.push({path: '/Main'});
            })
            .catch(res => res.json())
            .catch(data => alert(data.message));
        },

        validate() {
            return this.isValidLength = this.name.length >= 5 && this.password.length >= 8;
        }
    }
}
</script>

<style>
.wrapper {
    width: 60%;
    margin: 0 auto;
}

form {
    margin-top: 40px;
}

.form-group {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
}
</style>