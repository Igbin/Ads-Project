<template>
  <div class="item-wrapper">
    <HeaderComponent :user='this.user' />

    <Loader v-if="loading" />

    <div class="item">
      <div class="img-wrapper"></div>
      <div class="ad-wrapper">
        <a class="btn btn-primary" @click="() => this.$router.go(-1)">return</a>
        <img :src="`${ad.image_url}`" onerror="this.src='https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';">
        <h3 class="title">{{ this.ad.title }}</h3>
        <h3>Price: {{ this.ad.price }} UAH</h3>
        <h3>Description:</h3>
        <p>{{ this.ad.description }}</p>
        <p class="creationDate">Created at {{moment(ad.create_date).format('MMMM Do YYYY, h:mm:ss a')}}</p>
        <div class="buttons">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
          <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="edit-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Ad</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="itemTitle" class="form-label">Item title:</label>
              <input type="text" id="itemTitle" class="form-control" placeholder="Item title" v-model="ad.title"/>
            </div>
            <div class="mb-3">
              <label for="itemImage" class="form-label">Item image:</label>
              <input type="text" id="itemImage" class="form-control" placeholder="Item image url" v-model="ad.image_url"/>
            </div>
            <div class="mb-3">
              <label for="itemPrice" class="form-label">Item price:</label>
              <input type="number" id="itemPrice" class="form-control" placeholder="Item price" v-model="ad.price"/>
            </div>
            <div class="mb-3">
              <label for="itemBids" class="form-label">Item bids:</label>
              <input type="number" id="itemBids" class="form-control" placeholder="Item price" v-model="ad.bids"/>
            </div>
            <div class="mb-3">
              <label for="itemDesc" class="form-label">Item description:</label>
              <textarea class="form-control" id="itemDesc" rows="3" v-model="ad.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editAd" :disabled="!isValid">Edit Ad</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="delete-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you sure you want to delete this ad?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAd">Delete Ad</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/loader";
import HeaderComponent from './Header.vue';

export default {
  components: { Loader, HeaderComponent },
  props: ['user', 'id'],

  data() {
    return {
      ad: {},
      loading: true,
    };
  },

  beforeRouteEnter (to, from, next) {
    from.fullPath !== '/' ? next() : alert('loggin at first') || next({path: '/'});
  },

  async mounted() {
    const res = await fetch(
      // `https://jurassic987.pythonanywhere.com/ads/${this.$route.params.id}`
      `https://jurassic987.pythonanywhere.com/ads/${this.id}`
    );
    const ad = await res.json();
    this.ad = ad;
    this.loading = false;

    console.log(this.id, this.user)
  },

  methods: {
    editAd() {
      const data = {
        title: this.ad.title,
        price: this.ad.price,
        bids: this.adbids,
        description: this.ad.description,
        image_url: this.ad.image_url,
      };

      fetch(`https://jurassic987.pythonanywhere.com/ads/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
      });
    },
    
    deleteAd() {
      fetch(`https://jurassic987.pythonanywhere.com/ads/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).then(()=> {
        this.$router.push({path: '/main'});
      });
    }
  },
  computed: {
    isValid() {
      return (
        this.ad.title !== "" &&
        this.ad.price !== "" &&
        this.ad.bids !== "" &&
        this.ad.description !== ""
      );
    },
  },
};
</script>

<style scoped>
.item-wrapper {
  margin: 0 auto;
  width: 70%;
  min-width: 663px;
  background: #fff;
  border-radius: 5px;
  text-align: initial;
}

.item {
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: center;
}

img {
  width: 500px;
  display: block;
  margin: 10px auto;
}
</style>

