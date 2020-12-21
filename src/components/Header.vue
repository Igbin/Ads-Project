<template>
   <div class="header">
        <h2>ADS</h2>
        <button class="btn btn-light createAd" data-bs-toggle="modal" data-bs-target="#modal">Create Ad</button>
        <div class="modal fade" tabindex="-1" id="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create Ad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Item title:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Item title" v-model="newAd.title">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Item price:</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Item price" v-model="newAd.price">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Item bids:</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Item price" v-model="newAd.bids">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Item description:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="newAd.description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sendAd" :disabled="!isValid">Add Ad</button>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        ads: Array
    },
    data() {
        return {
            newAd : {
                title: '',
                price: '',
                bids: '',
                description: ''
            }
        }
    },
    methods: {
        sendAd() {
            const data = {
                title: this.newAd.title,
                price: this.newAd.price,
                bids: this.newAd.bids,
                description: this.newAd.description
            }
            fetch('https://jurassic987.pythonanywhere.com/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(() => {
                this.$emit('adSended', data);
                for (let key in this.newAd) {
                    this.newAd[key] = '';
                }
            })
        }
    },
    computed: {
        isValid() {
            return this.newAd.title !== '' && this.newAd.price !== '' && this.newAd.bids !== '' && this.newAd.description !== '';
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

.mb-3 {
    text-align: initial;
}

</style>