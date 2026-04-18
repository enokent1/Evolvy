import './assets//css/main.css'
import { UIComponents } from './components/UI/components.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app/App.vue'
import router from './app/router'

const app = createApp(App)

UIComponents.forEach((component) => {
    app.component(component.name, component)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
