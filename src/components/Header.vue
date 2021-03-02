<template>
   <div class="header">
        <h2>ADS</h2>
        <button class="btn btn-light createAd" data-bs-toggle="modal" data-bs-target="#modalAd" :disabled="isLoginPage">Create Ad</button>
        <button class="btn registerBut" :class="isLoginPage && 'btn-light' || 'btn-danger'" data-bs-target="#modalRegistration" @click="toggleUser()">
            <span class="registerButtVal" v-if="isLoginPage">Register</span>
            <span class="registerButtVal exitUser" v-else>Exit {{user}}</span>
        </button>

        <div class="modal fade" tabindex="-1" id="modalAd">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create Ad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="itemTitle" class="form-label">Item title:</label>
                            <input type="text" class="form-control" id="itemTitle" placeholder="Item title" v-model="newAd.title">
                        </div>
                        <div class="mb-3">
                            <label for="itemImage" class="form-label">Item image url:</label>
                            <input type="text" class="form-control" id="itemImage" placeholder="Item image url" v-model="newAd.image_url">
                        </div>
                        <div class="mb-3">
                            <label for="itemPrice" class="form-label">Item price:</label>
                            <input type="number" class="form-control" id="itemPrice" placeholder="Item price" v-model="newAd.price">
                        </div>
                        <div class="mb-3">
                            <label for="itemBids" class="form-label">Item bids:</label>
                            <input type="number" class="form-control" id="itemBids" placeholder="Item bids" v-model="newAd.bids">
                        </div>
                        <div class="mb-3">
                            <label for="itemDescr" class="form-label">Item description:</label>
                            <textarea class="form-control" id="itemDescr" rows="3" v-model="newAd.description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sendAd" :disabled="!isAdValid">Add Ad</button>
                    </div>
                </div>
            </div>
      </div>

      <div class="modal fade" tabindex="-1" id="modalRegistration" ref="modalRegistration">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Registration</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="newLogin" class="form-label">Login:</label>
                            <input type="text" class="form-control" id="newLogin" placeholder="Enter login" v-model="newUser.name">
                        </div>
                        <div class="mb-3">
                            <label for="newEmail" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="newEmail" placeholder="Enter email" v-model="newUser.email">
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">Password:</label>
                            <input type="password" class="form-control" id="newPassword" placeholder="Enter password" v-model="newUser.password">
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm password:</label>
                            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm password" v-model="newUser.verify_password">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="register" :disabled="!isUserValid">Register</button>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>



<script>

import { Modal } from 'bootstrap'

export default {
    name: 'HeaderComponent',

    props: {
        ads: Array,
        user: String
    },

    mounted() {
        console.log(this.user)
    },

    data() {
        return {
            newAd: {
                title: '',
                price: '',
                bids: '',
                description: '',
                image_url: ''
            },
            newUser: {
                name: '',
                password: '',
                verify_password: '',
                email: ''
            },
            isLoginPage: this.$parent.$options.name === 'Login'
        }
    },
    methods: {
        sendAd() {
            const data = Object.assign({}, this.newAd);

            fetch('https://jurassic987.pythonanywhere.com/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.ok ? res : Promise.reject(res))
            .then(() => this.$emit('adSended'))
            .catch(res => res.json())
            .catch(data => alert(data.message))
        },

        toggleUser() {
            if (this.isLoginPage) {
                const myModal = new Modal(this.$refs.modalRegistration)
                myModal.toggle();
            } else {
                this.$router.push({path: `/`});
            }
        },

        register() {
            const data = Object.assign({}, this.newUser);

            fetch('http://jurassic987.pythonanywhere.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.ok ? res : Promise.reject(res))
            .then(() => {
                alert(`${this.newUser.name} succesfully registered`);
                this.$router.push({path: '/main'});
            })
            .catch(res => res.json())
            .then(data => alert(data.message));
        }
    },
    computed: {
        isAdValid() {
            return this.newAd.title !== '' && this.newAd.price !== '' && this.newAd.bids !== '' && this.newAd.description !== '';
        },
        
        isUserValid() {
            return this.newUser.name !== '' && this.newUser.email !== '' && this.newUser.password !== '' && this.newUser.password === this.newUser.verify_password;
        }
    }

}
</script>

<style>

.header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70px;
    background-color: #002f34;
    border-radius: 3px;
    padding-left: 50px;
}

.header h2 {
    font-family: fantasy;
    color: aquamarine;
}

.createAd {
    width: 200px;
}

.ads {
    padding: 0;
    list-style-type: none;
}

.registerBut {
    float: left;
}


.mb-3 {
    text-align: initial;
}

</style>