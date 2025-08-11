import Vue from 'vue'
import VueRouter from 'vue-router'

//Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。
//解决方案：禁止全局路由错误处理打印，这个也是vue-router开发者给出的解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: "Navigation",
		component: () => import('../views/NavigationPage.vue'),
		meta: {
			title: "系统导航"
		}
	},
	{
		path: '/dataOverview',
		name: "DataOverview",
		component: () => import('../views/DataOverview.vue'),
		meta: {
			title: "数字大屏（原版）"
		}
	},
	{
		path: '/dataOverviewNew',
		name: "DataOverviewNew",
		component: () => import('../views/DataOverviewNew.vue'),
		meta: {
			title: "数字大屏（新版）"
		}
	},
	{
		path: '/setting',
		name: "Setting",
		component: () => import('../views/Setting.vue'),
		meta: {
			title: "配置"
		}
	},
	{
		path: '/settingNew',
		name: "SettingNew",
		component: () => import('../views/SettingNew.vue'),
		meta: {
			title: "新配置界面"
		}
	},
	{
		path: '/componentDemo',
		name: "ComponentDemo",
		component: () => import('../views/ComponentDemo.vue'),
		meta: {
			title: "组件展示"
		}
	},
	// {
	// 	path: '/testWebSocket',
	// 	name: "testWebSocket",
	// 	component: () => import('../views/testWebSocket.vue'),
	// 	meta: {
	// 		title: "testWebSocket"
	// 	}
	// }
]

const router = new VueRouter({
	routes
})

export default router
