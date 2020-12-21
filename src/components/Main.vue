<template>
   <div class="wrapper">
      <Header :ads='this.ads' @adSended='addAd' />
      <div class="searchWrap">
          <input type="text" class="form-control search">
          <button class="btn btn-primary btn-search">Search</button>
      </div>
      <Loader v-if="loading"/>
      <ul class="ads">
        <li v-for="(ad) in ads" :key="ad.id" class="adItem">
           <router-link class="toAd" :to="`/AdItem/${ad.id}`">{{ad.title}}</router-link>
           <p>Price: {{ad.price}}</p>
           <p>Bids: {{ad.bids}}</p>
           <p>Image</p>
        </li>     
      </ul>
   </div>
</template>

<script>
import Header from './Header.vue';
import Loader from '@/components/loader';

export default {
    name: 'Main',
    components: {
      Header, Loader
    },
    data() {
        return {
            ads: [],
            loading: true
        }
    },
    async mounted() {
        const res = await fetch('https://jurassic987.pythonanywhere.com/ads');
        const ads = await res.json();
        this.ads = ads;
        this.loading = false;
    },
    methods: {
        addAd(data) {
            this.ads.push(data);
        }
    },
}
</script>

<style>

.wrapper {
    width: 50%;
    margin: 0 auto;
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
    border-radius: 5px;
}

.adItem .toAd {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 26px;
}

.adItem .toAd:hover {
    color: #fff;
    background-color: #002f34;
} 

</style>