<template>
  <div class="container mt-4">
    <h1>Available Dogs for Adoption</h1>
    <div v-if="dogs.length">
      <div v-for="dog in dogs" :key="dog.id" class="card mb-3">
        <img :src="dog.image" class="card-img-top" alt="Dog Image" />
        <div class="card-body">
          <h5 class="card-title">{{ dog.name }}</h5>
          <p class="card-text">{{ dog.description }}</p>
          <p><strong>Breed:</strong> {{ dog.breed }} | <strong>Age:</strong> {{ dog.age }} years</p>

          <router-link :to="`/edit/${dog.id}`" class="btn btn-warning">Edit</router-link>

          <button @click="deleteDog(dog.id)" class="btn btn-danger ms-2">Delete</button>
        </div>
      </div>
    </div>
    <p v-else>No dogs available.</p>
    <router-link to="/add" class="btn btn-primary">Add New Dog</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '/firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'HomeView',
  setup() {
    const dogs = ref([])

    const fetchDogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'dogs'))
      dogs.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }

    const deleteDog = async (id) => {
      try {
        const dogDocRef = doc(db, 'dogs', id)
        await deleteDoc(dogDocRef)
        dogs.value = dogs.value.filter((dog) => dog.id !== id)
      } catch (e) {
        console.error('Error deleting dog: ', e)
      }
    }

    onMounted(fetchDogs)

    return { dogs, deleteDog }
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: black;
  font-family: fantasy;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #2d3748;
}

.card-text {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 10px;
}

.card-body p {
  font-size: 30px;
  color: black;
  font-family: 'Times New Roman', Times, serif;
}

.card-body a {
  display: inline-block;
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  background-color: #fbbf24;
  color: white;
  transition: background-color 0.3s ease;
}

.card-body a:hover {
  background-color: #d97706;
}

.btn-primary {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.25rem;
  background-color: purple;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2563eb;
}

p {
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
  margin-top: 20px;
}

.card.mb-3 {
  margin-bottom: 20px;
}

.btn-danger {
  display: inline-block;
  padding: 8px 16px;
  font-size: 12px;
  background-color: #ef4444;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  margin-left: 10px;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.btn-danger:hover {
  background-color: blue;
  transform: scale(1.05);
}

.btn-danger:active {
  background-color: #b91c1c;
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .card {
    margin-bottom: 20px;
  }

  .card-body {
    padding: 10px;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-text {
    font-size: 0.9rem;
  }
}
</style>
