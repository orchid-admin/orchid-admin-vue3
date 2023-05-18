import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from '/@/App.vue';
import router from '/@/router';
import { directive } from '/@/directive/index';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import '/@/theme/index.scss';
import VueGridLayout from 'vue-grid-layout';
import localLangZhCn from 'element-plus/lib/locale/lang/zh-cn';

const app = createApp(App);

directive(app);
other.elSvg(app);

app
	.use(pinia)
	.use(router)
	.use(ElementPlus, {
		locale: localLangZhCn,
	})
	.use(VueGridLayout)
	.mount('#app');
