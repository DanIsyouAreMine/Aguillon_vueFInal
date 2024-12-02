<template>
  <div class="container mt-4">
    <h2>Add New Dog</h2>
    <form @submit.prevent="addDog">
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
      <button type="submit" class="btn btn-primary">Add Dog</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
  name: 'AddDog',
  setup() {
    const dog = ref({
      name: '',
      breed: '',
      age: '',
      image: '',
      description: '',
    })

    const router = useRouter()

    const addDog = async () => {
      try {
        await addDoc(collection(db, 'dogs'), dog.value)
        router.push('/')
      } catch (e) {
        console.error('Error adding dog: ', e)
      }
    }

    return { dog, addDog }
  },
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #2d3748;
}

form {
  background-color: #f9fafb;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mb-3 {
  margin-bottom: 20px;
}

.form-label {
  font-weight: 500;
  color: #4a5568;
}

.form-control {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #3b82f6;
  outline: none;
}

textarea.form-control {
  min-height: 120px;
}

.btn-primary {
  padding: 12px 24px;
  font-size: 1.25rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 5px;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2563eb;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  h2 {
    font-size: 1.8rem;
  }

  .form-control {
    font-size: 0.95rem;
  }

  .btn-primary {
    font-size: 1.1rem;
  }
}
</style>
