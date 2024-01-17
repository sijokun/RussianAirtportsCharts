<template>
  <v-app>
    <v-main>
      <div class="flex-container">
        <div class="col menu">
          <Menu @setChart="setChart"/>
        </div>
        <div class="col viewer">
          <chart-viewer v-if="activeChart" :chart="activeChart"/>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import Menu from "@/components/Menu";
import { ref, reactive } from 'vue'
import ChartViewer from "@/components/ChartViewer";

let activeChart = ref(null)

function setChart(chart) {

  fetch('https://pub-3938d6183f92402eb3581942620ebbc7.r2.dev/' + chart['slug'] + '/manifest.json')
    .then(res => {
      // a non-200 response code
      if (!res.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
    .then(data => {
      console.log(data)
      // set the response data
      activeChart.value = data;
    })

    // try {
    //   const response = fetch('https://pub-3938d6183f92402eb3581942620ebbc7.r2.dev/' + chart['slug'] + '/manifest.json')
    //   activeChart.value  = response.json()
    // } catch (error) {
    //   console.error(error)
    // }
  //
  // activeChart.value = chart
}

</script>

<style>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}
.col {
  height: 100vh;
  /*overflow: hidden;*/
}
.viewer {
  width: 100%;
}
.menu {
  width: 20%;
  min-width: 400px;
  padding: 0;
  height: 100vh;
  border-right: solid 2px #616161;
  /*background-color: white;*/
}
</style>
