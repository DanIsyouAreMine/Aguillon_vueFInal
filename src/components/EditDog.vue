<!-- src/components/EditDog.vue -->
<template>
  <div class="container mt-4">
    <h2>Edit Dog Details</h2>
    <form @submit.prevent="updateDog">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" v-model="dog.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="breed" class="form-label">Breed</label>
        <input type="text" id="breed" v-model="dog.breed" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="age" class="form-label">Age</label>
        <input type="number" id="age" v-model="dog.age" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image URL</label>
        <input type="text" id="image" v-model="dog.image" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="dog.description"
          class="form-control"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Update Dog</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const dog = ref({
      name: '',
      breed: '',
      age: '',
      image: '',
      description: '',
    })

    const fetchDog = async () => {
      const docRef = doc(db, 'dogs', route.params.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        dog.value = docSnap.data()
      }
    }

    const updateDog = async () => {
      const docRef = doc(db, 'dogs', route.params.id)
      await updateDoc(docRef, dog.value)
      router.push('/')
    }

    onMounted(fetchDog)

    return { dog, updateDog }
  },
}
</script>
