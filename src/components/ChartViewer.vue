<template>
  <div class="chart-viewer">
    <div class="chart-viewer-title">
      <h3>{{chart['title']}}</h3>
      <div class="scale-bar">
        <button @click="scale+=0.1">+</button>
        {{parseInt(scale*100)}}%
        <button @click="scale-=0.1">-</button>
      </div>
      <button class="download-btn" @click="downloadPDF">
        <v-icon icon="mdi-download" size="small"></v-icon> PDF
      </button>
    </div>
    <div class="viewer">
      <div v-for="(page, index)  in pages" :key="page" class="page">
        <img :src="page" class="page-img"
             :alt="chart['title']"
              :class="[invert ? 'invert' : '']" @click="showLightbox(index)"/>
      </div>
      <vue-easy-lightbox :visible="lightbox" :imgs="pages" :index="lightbox_page" @hide="lightbox = false"></vue-easy-lightbox>
    </div>
  </div>
</template>

<script>
import {reactive, watch} from "vue";
import axios from 'axios';
import { saveAs } from 'file-saver';


export default {
  name: "ChartViewer",
  props: ['chart'],
  setup(props) {
    const state = reactive({
      invert: false,
      pages: [],
      lightbox: false,
      lightbox_page: 1,
      scale: 1
    })
    props.chart['pages'].forEach(page => {
      state.pages.push('https://r2.rucharts.app/'+page)
    })
    if (localStorage.getItem('invert') === 'true') {
      state.invert = true
    }
    watch(() => [props.chart], () => {
      state.pages = []
      props.chart['pages'].forEach(page => {
        state.pages.push('https://r2.rucharts.app/'+page)
      })
    })

    return state
  },
  methods: {
    showLightbox: function (index) {
      // alert(index)
      this.lightbox_page = index
      this.lightbox = true
    },
    downloadPDF: function () {
      axios.get('https://r2.rucharts.app/' + this.chart['pdf'], { responseType: 'blob' }).then((response) => {
        const blob = new Blob([response.data], { type: response.type });
        saveAs(blob, `${this.chart['airport']}, ${this.chart['title']}.pdf`);
      }).catch(err => console.error(err));
    }
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
  overflow-y: auto;
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
}
.invert {
  filter: invert(100%);
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
.download-btn {
  padding: 5px 10px;
  border-radius: 5px;
  border: solid 1px white;
}
.download-btn:hover {
  background-color: #616161;
}
</style>
