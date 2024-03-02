<template>
  <v-app>
    <v-main>
      <div class="flex-container">
        <div class="col menu" :class="{'menu-hide': !menuActive}">
          <Menu @setChart="setChart"/>
        </div>
        <div class="col viewer">
          <chart-viewer v-if="activeChart" :chart="activeChart" @toggleMenu="toggleMenu"/>
        </div>
      </div>

      <v-dialog width="500" v-model="dialogActive">
        <v-card title="Предупреждение">
          <v-card-text>
            Предоставляемая информация носит <b style="color: #E57373">ИСКЛЮЧИТЕЛЬНО ОЗНАКОМИТЕЛЬНЫЙ</b> характер.
          </v-card-text>
          <v-card-text>
            <b>Не использовать для реальных полетов.</b>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeWarning()">Принять</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import Menu from "@/components/Menu";
import { ref, reactive } from 'vue'
import ChartViewer from "@/components/ChartViewer";

let activeChart = ref(null)
let dialogActive = ref(false)
let menuActive = ref(true)

if (localStorage.getItem('warning-shown') !== 'true') {
  dialogActive.value = true
}

function closeWarning() {
  dialogActive.value = false
  localStorage.setItem('warning-shown', 'true')
}
function toggleMenu() {
  menuActive.value = !menuActive.value
}
function setChart(chart) {

  fetch('https://r2.rucharts.app/' + chart['slug'] + '/manifest.json')
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
      // set the response data
      activeChart.value = data;
      toggleMenu();
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
  /*width: 100vw;*/
  height: 100vh;

  overflow: hidden;

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
  min-width: 300px;
  padding: 0;
  height: 100vh;
  border-right: solid 2px #616161;
  z-index: 1;
  background: rgb(18, 18, 18);
  /*background-color: white;*/
}
@media (max-width: 1000px) {
  .menu {
    min-width: 200px;
  }
}
@media (max-width: 750px) {
  .menu {
    position: absolute;
    width: 100vw;
    background-color: black;
    z-index: 100;
  }
  .menu-hide {
    display: none;
  }
}
</style>
