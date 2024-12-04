<template>
  <div class="container mt-4">
    <h1 class="text-center">Available Dogs for Adoption</h1>
    <div class="row d-flex justify-content-center">
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
    <router-link to="/add-dog" class="btn btn-success d-block mx-auto mt-4"
      >Add a New Dog</router-link
    >
  </div>
</template>
