import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { ApiService } from './services/api.service'
import { API_SERVICE_KEY, EVENT_HANDLERS_SERVICE_KEY } from './constants/global-constants'
import { EventHandlersService } from './services/event-handlers.service'


const app = createApp(App)
app.use(createPinia())	
app.use(router)

const apiService = new ApiService();
const eventHandlersService = new EventHandlersService({ apiService });
app.provide(API_SERVICE_KEY, apiService);
app.provide(EVENT_HANDLERS_SERVICE_KEY, eventHandlersService);

app.mount('#app')
