<template>
  <div class="menu-con">
    <div class="title">
      <div class="title-close">
        <h2>RuCharts.app</h2>
        <button v-if="airport" @click="closeAirport">
          <v-icon icon="mdi-close" size="large" color=""></v-icon>
        </button>
      </div>
<!--      <hr/>-->
    </div>
    <div class="search-airport-con" v-if="!airport">
      <v-text-field
        v-model="searchTerm"
        label="Введите название аэропорта"
        class="search-field"
      ></v-text-field>
        <div v-for="s in searchResults" :key="s[0]" class="airport-card" @click.self="selectAirport(s[0])">{{s[1]}}
          <airport-star :airport="s[0]" @updateFavorite="updateFavorite" class="star"/>
        </div>
    </div>
    <div v-else  class="search-airport-con" >
      <airport-page :airport="airport" @setChart="setChart" @updateFavorite="updateFavorite"/>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, watch} from 'vue'
import AirportPage from "@/components/AirportPage";
import AirportStar from "@/components/AirportStar";

export default {
  name: "Menu",
  components: {AirportStar, AirportPage},
  setup() {
    const state = reactive({
      data: {},
      searchTerm: '',
      airport: '',
      searchResults: [],
      airports: {}
    })


    onMounted(async () => {
      try {
        const response = await fetch('https://r2.rucharts.app/names.json')
        state.data = await response.json()

        if (state.searchTerm === '') {

          let favorite_airports = localStorage.getItem('favorite_airports')
          if (favorite_airports != null) {
            state.searchResults = []
            for (const code of JSON.parse(favorite_airports)) {
              state.searchResults.push([code, state.data[code], true])
            }
          }
        }

      } catch (error) {
        console.error(error)
      }
    })

    onMounted(async () => {
      try {
        const response = await fetch('https://r2.rucharts.app/airports.json')
        state.airports = await response.json()
      } catch (error) {
        console.error(error)
      }
    })


    watch(() => [state.searchTerm], () => {
      if (state.searchTerm) {
        state.searchResults = Object.entries(state.data).filter(([key, value]) =>
          value.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      } else {
        state.searchResults = []
        let favorite_airports = localStorage.getItem('favorite_airports')
        if (favorite_airports != null) {
          for (const code of JSON.parse(favorite_airports)) {
              state.searchResults.push([code, state.data[code], true])
          }
        }
      }
    })

    return state
  },
  methods: {
    closeAirport: function () {
      this.airport = ''
    },
    selectAirport: function(code) {
      this.airport = this.airports[code];
    },
    updateFavorite: function ( ) {
      if (this.searchTerm === '') {
        let favorite_airports = localStorage.getItem('favorite_airports')
        if (favorite_airports != null) {
          this.searchResults = []
          for (const code of JSON.parse(favorite_airports)) {
            this.searchResults.push([code, this.data[code], true])
            console.log(this.data, code)
          }
        }
      }
    },
    setChart: function (chart) {
      this.$emit('setChart', chart)
    }
  }
}

</script>

<style scoped>
.menu-con {
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px
}
.title {
  display: flex;
  flex-direction: column;
  gap: 10px
}
.search-field {
  margin-bottom: -20px;
}
.search-airport-con {
  height: 100%;
  overflow-y: auto;
  scrollbar-color: #616161 rgba(0,0,0,0);
  scrollbar-width: thin;
}
.airport-card {
  border: solid 1px white;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}
.airport-card:hover {
  background-color: #616161;
}
.title-close {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.star {
  z-index: 2;
}
</style>
