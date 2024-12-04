<template>
  <div class="container mt-4">
    <div v-if="dog">
      <h1>{{ dog.name }}</h1>
      <img :src="dog.image" class="img-fluid" alt="dog" />
      <p><strong>Breed:</strong> {{ dog.breed }}</p>
      <p><strong>Age:</strong> {{ dog.age }} years</p>
      <p><strong>Description:</strong> {{ dog.description }}</p>
    </div>
    <router-link to="/" class="btn btn-secondary">Back to Home</router-link>
  </div>  
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const dog = ref(null)
    const route = useRoute()

    const fetchDog = async () => {
      const docRef = doc(db, 'dogs', route.params.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        dog.value = docSnap.data()
      } else {
        console.log('No such document!')
      }
    }

    onMounted(fetchDog)

    return { dog }
  },
}
</script>
