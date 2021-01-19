<template>
  <div class="item-wrapper">
    <Loader v-if="loading" />
    <div class="img-wrapper"></div>
    <div class="ad-wrapper">
      <router-link to="/Main">return</router-link>
      <h3 class="title">{{ this.ad.title }}</h3>
      <h3>Price: {{ this.ad.price }}</h3>
      <h3>Description:</h3>
      <p>{{ this.ad.description }}</p>
      <div class="buttons">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button>
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
              <label for="exampleFormControlInput1" class="form-label">Item title:</label>
              <input type="text" class="form-control" placeholder="Item title" v-model="ad.title"/>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Item price:</label>
              <input type="number" class="form-control" placeholder="Item price" v-model="ad.price"/>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Item bids:</label>
              <input type="number" class="form-control" placeholder="Item price" v-model="ad.bids"/>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Item description:</label>
              <textarea class="form-control" rows="3" v-model="ad.description"></textarea>
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
export default {
  components: { Loader },
  data() {
    return {
      ad: {},
      loading: true,
    };
  },
  async mounted() {
    const res = await fetch(
      `https://jurassic987.pythonanywhere.com/ads/${this.$route.params.id}`
    );
    const ad = await res.json();
    this.ad = ad;
    this.loading = false;
  },
  methods: {
    editAd() {
      const data = {
        title: this.ad.title,
        price: this.ad.price,
        bids: this.adbids,
        description: this.ad.description,
      };
      fetch(`https://jurassic987.pythonanywhere.com/ads/${this.$route.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
      });
    },
    deleteAd() {
      fetch(`https://jurassic987.pythonanywhere.com/ads/${this.$route.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).then(()=> {
        this.$router.push({path: '/Main'});
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
  margin: 10% auto;
  padding: 50px;
  width: 70%;
  background: #fff;
  border-radius: 5px;
  text-align: initial;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: center;
}
</style>

