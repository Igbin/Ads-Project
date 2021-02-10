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
           <div class="image-container">
                <img :src="`${ad.image_url}`" @click="goToAd(ad.id)" onerror="this.onerror=null;this.src='https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';">
           </div>
           <div class="ad-container">
                <router-link class="toAd" :to="`/AdItem/${ad.id}`">{{ad.title}}</router-link>
                <p class="price">{{ad.price}} UAH</p>
                <p>Bids: {{ad.bids}}</p>
                <p class="creationDate">Created at {{moment(ad.create_date).format('MMMM Do YYYY')}}</p>
           </div>
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

<style scoped>

.hidden {
    display: none;
}

.wrapper {
    width: 60%;
    margin: 0 auto;
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
    padding-top: 10px;
    border: 2px solid #86b7fe;
    border-radius: 5px;
    z-index: 1;
}

.adItem {
    display: flex;
    margin: 10px auto;
    position: relative;
    background: #fff;
    border-radius: 5px;
    z-index: 0;
}

.ad-container {
    width: 60%;
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

.price {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
}

img {
    width: 216px;
    height: 152px;
    cursor: pointer;
}

</style>