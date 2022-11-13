import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus
import ElementUI from "element-plus";
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);
app.use(ElementUI);
app.mount('#app')