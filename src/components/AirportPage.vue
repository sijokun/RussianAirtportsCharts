<template>
  <div class="airport-con">
    <h3>
      <b>{{airport['code']}}</b>, {{airport['name']}}
      <button @click="saveAirport">
        <v-icon icon="mdi-star" size="small" color="grey-darken-2"></v-icon>
      </button>
    </h3>

    <div class="charts">
        <div v-for="chart in airport['charts']" :key="chart['title']" class="chart-card" @click="$emit('setChart', chart)">
          {{chart['title']}}
        </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "AirportPage",
  props: ['airport'],
  setup(props) {
    return reactive({
      tab: 'charts'
    })
  },
  methods: {
    saveAirport: function () {
      let favorite_airports = localStorage.getItem('favorite_airports')
      if (favorite_airports == null) {
        favorite_airports = []
      } else {
        favorite_airports = JSON.parse(favorite_airports)
      }
      const record = [this.airport['code'], this.airport['code'] + ', ' + this.airport['name']]
      if (!JSON.stringify(favorite_airports).includes(JSON.stringify(record))) {
        favorite_airports.push(record)
      } else {
        favorite_airports.pop(record)
      }
      localStorage.setItem('favorite_airports',  JSON.stringify(favorite_airports))
    }
  }
}
</script>

<style scoped>
.airport-con {
  max-height: 100%;
  overflow: auto;
  scrollbar-color: #616161 rgba(0,0,0,0);
  scrollbar-width: thin;
}
.chart-card {
  border: solid 1px white;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}
.chart-card:hover {
  background-color: #616161;
}
.charts {
  overflow-y: auto;
  max-height: 100%;
}
</style>
