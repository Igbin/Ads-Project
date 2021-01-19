<template>
  <div class="wrapper">
    <HeaderComponent />
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="login">Login:</label>
        <input id="login" type="text" class="form-control" @input="validate" v-model="login" placeholder="min 5 symbols">
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
            login: '',
            password: '',
            isValidLength: false
        }
    },
    methods: {
        onSubmit() {
           const data = {
             login: this.login,
             password: this.password
           };
           
           let promise = new Promise((resolve) => {
            setTimeout(() => {
            resolve(data);
            }, 1000);
           });

           promise.then(result => {
             alert("Fulfilled: " + result.login); 
              this.$router.push({path: '/Main'});
            },
            error => {
             alert("Rejected: " + error.login); 
           });


        },
        validate() {
            return this.isValidLength = this.login.length >= 5 && this.password.length >= 8;
        }
    }

}
</script>

<style>
.wrapper {
    width: 50%;
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