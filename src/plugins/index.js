/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import VueEasyLightbox from "vue-easy-lightbox";

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(VueEasyLightbox)
}
