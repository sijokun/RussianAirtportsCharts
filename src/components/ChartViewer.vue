<template>
  <div class="chart-viewer">
    <div class="chart-viewer-title">
      <h3>{{chart['title']}}</h3>
      <div class="scale-bar">
        <button @click="scale+=0.1">+</button>
        {{parseInt(scale*100)}}%
        <button @click="scale-=0.1">-</button>
      </div>
    </div>
    <div class="viewer">
<!--      {{chart}}-->
      <div v-for="page in chart['pages']" :key="page" class="page">
        <img :src="'https://r2.rucharts.app/' +page" class="page-img"
             :alt="chart['title']"/>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "ChartViewer",
  props: ['chart'],
  setup(props) {
    return reactive({
      chart: props.chart,
      scale: 1
    })
  }
}
</script>

<style scoped>
.chart-viewer {
  /*background-color: blue;*/
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
.chart-viewer-title {
  padding: 20px;
  border-bottom: solid 2px #616161;
  width: 100%;
  z-index: 2;
}
.viewer{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px
}
.page {
  height: 100%;
  /*max-width: 100%;*/
  display: flex;
  justify-content: center;
  /*object-fit: contain;*/
  /*background-color: red;*/

}
.page-img {
  max-width: 100%;
  object-fit: contain;
  /*filter: invert(100%);*/
}
.chart-viewer-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.scale-bar {
  display: none;
  border-radius: 5px;
  border: solid 1px white;
}
.scale-bar button {
  border-radius: 4px;
  padding: 5px 10px;
}
.scale-bar button:hover {
  background-color: #616161;
}
</style>
