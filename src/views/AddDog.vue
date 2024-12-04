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
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(135deg, #f0f4f8, #e2e8f0);
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  justify-content: right;
}

h2 {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #1e2a47;
  text-transform: uppercase;
  letter-spacing: 1px;
}

form {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

form:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.mb-3 {
  margin-bottom: 25px;
}

.form-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
}

.form-control {
  padding: 14px;
  font-size: 1rem;
  border: 2px solid #cbd5e0;
  border-radius: 10px;
  width: 100%;
  background-color: #fff;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: #6b46c1;
  outline: none;
  box-shadow: 0 0 10px rgba(107, 70, 193, 0.2);
}

textarea.form-control {
  min-height: 150px;
  resize: vertical;
}

.btn-primary {
  padding: 15px 25px;
  font-size: 1.2rem;
  background-color: purple;
  color: white;
  border-radius: 8px;
  border: none;
  width: 100%;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.btn-primary:hover {
  background-color: #5a39a7;
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(1px);
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  h2 {
    font-size: 1.9rem;
    font-family: Fantasy;
    color: black;
  }

  .form-control {
    font-size: 0.95rem;
  }

  .btn-primary {
    font-size: 1.1rem;
  }
}
</style>
