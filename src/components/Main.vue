<template>
   <div class="wrapper">
      <header>
          <h2>ADS</h2>
          <button class="btn btn-light createAd" data-bs-toggle="modal" data-bs-target="#modal">Create Ad</button>
      </header>
      <div class="searchWrap">
          <input type="text" class="form-control search">
          <button class="btn btn-primary btn-search">Search</button>
      </div>
      <ul class="ads">
        <li v-for="(ad) in ads" :key="ad.id" class="adItem">
           <h3>{{ad.title}}</h3>
           <p>{{ad.description}}</p>
           <p>Price: {{ad.price}}</p>
           <p>Bids: {{ad.bids}}</p>
           <p>Image</p>
        </li>     
      </ul>
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
    name: 'Main',
    data() {
        return {
            ads: [],
            loading: true,
            newAd : {
                title: '',
                price: '',
                bids: '',
                description: ''
            }
        }
    },
    async mounted() {
        const res = await fetch('https://jurassic987.pythonanywhere.com/ads');
        const ads = await res.json();
        this.ads = ads;
        this.loading = false;
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
                this.ads.push(data);
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

.wrapper {
    width: 50%;
    margin: 0 auto;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70px;
    background-color: #002f34;
    border-radius: 3px;
}

header h2 {
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

.searchWrap {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.search {
    margin: 10px auto;
}

.btn-search {
    height: 30%;
}

.adItem {
    margin: 10px auto;
    background: #fff;
    border: 1px solid grey;
    border-radius: 5px;
}

.mb-3 {
    text-align: initial;
}



</style>