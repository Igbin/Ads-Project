<template>
   <div class="wrapper">
      <HeaderComponent :ads='this.ads' @adSended='addAd' />
      <div class="searchWrap">
          <input type="text" 
            class="form-control search" placeholder="type title here" 
            v-model="search" 
            @input="startSearch" 
            @focus="toggleFocus(true)"
            @blur="toggleFocus(false)" 
          > 
          <button class="btn btn-primary btn-search"  @mousedown="filterAds()" :disabled="!searchedAds.length">
              <span class="filterButtVal" v-if="filtersOn">Filter by title</span>
              <span class="filterButtVal resetFilters" v-else>Reset filter</span>
          </button>
          <div class="searchedWrap" :class="{ hidden: searchEmpty || !searchFocused }">
              <ul>
                  <li v-for="(ad, index) in searchedAds" :key="index">
                       <h4 class="toAd" @mousedown="goToAd(ad.id)">{{ ad.title }}</h4>
                  </li>
              </ul>
          </div>
      </div>
      <Loader v-if="loading"/>
      <ul class="ads">
        <li v-for="(ad, index) in ads" :key="index" class="adItem">
           <router-link class="toAd" :to="`/AdItem/${ad.id}`">{{ad.title}}</router-link>
           <p>Price: {{ad.price}}</p>
           <p>Bids: {{ad.bids}}</p>
           <p>Image</p>
        </li>     
      </ul>
   </div>
</template>

<script>
import HeaderComponent from './Header.vue';
import Loader from '@/components/loader';

export default {
    name: 'Main',
    components: {
      HeaderComponent, Loader
    },
    data() {
        return {
            ads: [],
            searchedAds: [],
            initAds: [],
            search: '',
            loading: true,
            searchFocused: false,
            filtersOn: true
        }
    },
    async mounted() {
        const res = await fetch('https://jurassic987.pythonanywhere.com/ads');
        const ads = await res.json();
        this.ads = ads;
        this.initAds = ads;
        this.loading = false;
    },
    methods: {
        addAd(data) {
            this.ads.push(data);
        },
        startSearch() {
            if (this.search.length >= 3) {
                this.searchedAds = this.ads.filter((ad) => ad.title.startsWith(this.search));
            } else {
                this.searchedAds = [];
            }
        },
        toggleFocus(focusState) {
            this.searchFocused = focusState;
        },
        goToAd(id) {
            this.$router.push({path: `/AdItem/${ id }`});
        },
        filterAds() {
            this.filtersOn = !this.filtersOn;
            if (!this.filtersOn) {
                this.ads = this.searchedAds;
            } else {
                this.searchedAds = [];
                this.search = '';
                this.ads = this.initAds;
            }
            
        }
    },
    computed: {
        searchEmpty() {
            return !this.searchedAds.length;
        }
    },
}
</script>

<style>

.hidden {
    display: none;
}

.searchWrap {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
}

.search {
    margin: 10px auto;
}

.btn-search {
    font-size: 10px;
    height: 30%;
    padding: 0;
}
.filterButtVal {
    font-size: 13px;
}

.resetFilters {
    font-size: 13px;
    color: red;
}

.searchedWrap {
    width: 100%;
    background: #fff;
    position: absolute;
    top: 50px;
    border: 1px solid blue;
    border-radius: 5px;

}

.adItem {
    margin: 10px auto;
    background: #fff;
    border-radius: 5px;
}

.toAd {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 26px;
    cursor: pointer;
}

.toAd:hover {
    color: #fff;
    background-color: #002f34;
} 

</style>