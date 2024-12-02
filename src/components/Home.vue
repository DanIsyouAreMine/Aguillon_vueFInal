<template>
  <div class="container mt-4">
    <h1>Available Dogs for Adoption</h1>
    <div class="row">
      <div class="col-4" v-for="dog in dogs" :key="dog.id">
        <div class="card">
          <img :src="dog.image" class="card-img-top" alt="dog" />
          <div class="card-body">
            <h5 class="card-title">{{ dog.name }}</h5>
            <p class="card-text">{{ dog.breed }}</p>
            <a :href="'/dog/' + dog.id" class="btn btn-primary">See Details</a>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/add-dog" class="btn btn-success mt-4">Add a New Dog</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default {
  setup() {
    const dogs = ref([])

    const fetchDogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'dogs'))
      querySnapshot.forEach((doc) => {
        dogs.value.push({ id: doc.id, ...doc.data() })
      })
    }

    onMounted(() => {
      fetchDogs()
    })

    return { dogs }
  },
}
</script>
