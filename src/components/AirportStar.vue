<template>
  <button @click="toggleFavorite">
    <v-icon icon="mdi-star" size="small" class="start-icon" :class="[favorite ? 'active-start-icon' : '']"></v-icon>
  </button>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "AirportStar",
  props: ['airport'],
  setup(props) {
    const state = reactive({
      favorite: false,
      airport: props.airport
    })

    let favorite_airports = localStorage.getItem('favorite_airports')
    if (favorite_airports !== null && favorite_airports.includes(props.airport)) {
      state.favorite = true
    }
    return state
  },
  methods: {
    toggleFavorite: function () {
      this.favorite = !this.favorite
      const airport = this.airport

      let favorite_airports = localStorage.getItem('favorite_airports')

      if (favorite_airports == null) {
        favorite_airports = []
      } else {
        favorite_airports = JSON.parse(favorite_airports)
      }

      if (!favorite_airports.includes(airport)) {
        favorite_airports.push(airport)
      } else {
        favorite_airports = favorite_airports.filter(function(item) {
          return item !== airport
        })
      }
      localStorage.setItem('favorite_airports',  JSON.stringify(favorite_airports))
      this.$emit('updateFavorite')
    }
  }
}
</script>

<style scoped>
.start-icon {
  color: #616161;
}
.start-icon:hover {
  color: #757575;
}
.active-start-icon {
  color: #FDD835;
}
.active-start-icon:hover {
  color: #FFF176;
}
</style>
