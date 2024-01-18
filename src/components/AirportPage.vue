<template>
  <div class="airport-con">
    <h3>
      <b>{{airport['code']}}</b>,<br>{{airport['name']}}
      <airport-star :airport="airport['code']" @updateFavorite="$emit('updateFavorite')"/>
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
import AirportStar from "@/components/AirportStar";

export default {
  name: "AirportPage",
  components: {AirportStar},
  props: ['airport'],
  setup(props) {
    return reactive({
      tab: 'charts',
    })
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
