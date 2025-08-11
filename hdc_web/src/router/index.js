import Vue from 'vue'
import VueRouter from 'vue-router'

//Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。
//解决方案：禁止全局路由错误处理打印，这个也是vue-router开发者给出的解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
	// {
	// 	path: '/',
	// 	redirect: '/home/productDisplay'
	// },
	{
		path: '/home',
		name: 'Home',
		component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue'),
		meta: {
			title: "首页"
		},
		children: [{
				path: 'plcControl',
				name: "PLCControl",
				component: () => import('../views/PLCControl.vue'),
				meta: {
					title: "PLC实验台控制"
				}
			},{
				path: 'plcControlCabinet',
				name: "PLCControlCabinet",
				component: () => import('../views/PLCControlCabinet.vue'),
				meta: {
					title: "PLC控制柜控制"
				}
			},{
				path: 'productDisplay',
				name: "ProductDisplay",
				component: () => import('../views/ProductDisplay.vue'),
				meta: {
					title: "配料区产品展示"
				}
			},
			{
				path: 'scanningRecord',
				name: "ScanningRecord",
				component: () => import('../views/ScanningRecord.vue'),
				meta: {
					title: "库房区扫码记录"
				}
			},
			{
				path: 'printReportPreview',
				name: "PrintReportPreview",
				component: () => import('../views/PrintReportPreview.vue'),
				meta: {
					title: "打印报表预览"
				}
			}
		],
	},
	{
			path: '/setting',
			name: "Setting",
			component: () => import('../views/Setting.vue'),
			meta: {
				title: "配置"
			}
		},
]


const router = new VueRouter({
	routes
})

export default router
