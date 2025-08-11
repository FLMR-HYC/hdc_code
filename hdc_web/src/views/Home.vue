<template>
	<div class="root">
		<header class="modern-header">
			<div class="header-content">
				<div class="brand-section">
					<div class="logo-container">
						<img class="logo" src="../assets/hdc_demo.png" />
					</div>
					<h1 class="brand-title gradient-text">智能集控中心</h1>
				</div>
				<div class="header-actions">
					<el-button 
						class="location-btn" 
						type="text" 
						@click="SetClick()"
						:icon="'el-icon-location'"
					>
						{{ cityValue }}
					</el-button>
					<div class="user-avatar">
						<i class="el-icon-user-solid"></i>
					</div>
				</div>
			</div>
		</header>
		<div class="content">
			<div class="sidebar">
				<div class="sidebar-container">
					<el-menu 
						class="modern-menu"
						active-text-color="var(--text-white)" 
						text-color="var(--text-secondary)"
						default-active="/home/PLCControl" 
						@open="handleOpen"
						@close="handleClose" 
						:collapse="isCollapse" 
						@select="handleSelect"
					>
						<el-menu-item index="/home/PLCControl" class="menu-item">
							<i class="el-icon-cpu menu-icon"></i>
							<span slot="title">PLC实验台控制</span>
						</el-menu-item>
						<el-menu-item index="/home/PLCControlCabinet" class="menu-item">
							<i class="el-icon-postcard menu-icon"></i>
							<span slot="title">PLC控制柜控制</span>
						</el-menu-item>
						<el-menu-item index="/home/ProductDisplay" class="menu-item">
							<i class="el-icon-goods menu-icon"></i>
							<span slot="title">配料区产品展示</span>
						</el-menu-item>
						<el-menu-item index="/home/ScanningRecord" class="menu-item">
							<i class="el-icon-document-checked menu-icon"></i>
							<span slot="title">库房区扫码记录</span>
						</el-menu-item>
					</el-menu>
				</div>
			</div>
			<div class="main-content">
				<div class="content-wrapper">
					<router-view style="width: 100%;"></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Local from '@/store/localSave.js';
	import {
		Service
	} from '@/api/Service.js';

	export default {
		data() {
			return {
				isCollapse: false,
				cityValue: '',
			};
		},
		onLoad() {},
		created: function() {
			document.title = '集控中心';
		},

		mounted() {
			console.log('Local.getId()=' + Local.getId())
			if (Local.getId() !== null) {
				this.cityValue = Local.getCity() + "  " + Local.getRegion()
			} else {
				this.cityValue = '请设置展区'
			}
		},

		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(index, path) {
				console.log('jojo', index, 'path:', path);
				this.$router.push({
					path: index
				});
			},
			exit() {
				this.$router.push({
					name: 'Home'
				});
			},
			// 配置
			SetClick() {
				console.log('SetClick')
				this.$router.push({
					path: '/setting',
				});
			}
		}
	};
</script>

<style>
	/* 根容器 */
	.root {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		background: var(--background-primary);
		overflow: hidden;
	}

	/* 现代化头部 */
	.modern-header {
		background: var(--primary-gradient);
		box-shadow: var(--shadow-lg);
		height: 70px;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}

	.modern-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
		pointer-events: none;
	}

	.header-content {
		height: 100%;
		padding: 0 var(--spacing-xl);
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 1;
	}

	.brand-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.logo-container {
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.logo {
		width: 32px;
		height: 32px;
		filter: brightness(1.2);
	}

	.brand-title {
		font-size: 28px;
		font-weight: 700;
		color: var(--text-white);
		margin: 0;
		letter-spacing: 1px;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.location-btn {
		background: rgba(255, 255, 255, 0.15) !important;
		border: 1px solid rgba(255, 255, 255, 0.3) !important;
		border-radius: var(--radius-full) !important;
		padding: var(--spacing-sm) var(--spacing-lg) !important;
		color: var(--text-white) !important;
		font-weight: 500 !important;
		backdrop-filter: blur(10px);
		transition: all var(--transition-normal) !important;
	}

	.location-btn:hover {
		background: rgba(255, 255, 255, 0.25) !important;
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-white);
		font-size: 18px;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.user-avatar:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	/* 内容区域 */
	.content {
		display: flex;
		flex: 1;
		overflow: hidden;
		min-height: 0;
	}

	/* 现代化侧边栏 */
	.sidebar {
		width: 280px;
		background: var(--background-card);
		box-shadow: var(--shadow-md);
		position: relative;
		z-index: 10;
	}

	.sidebar-container {
		height: 100%;
		padding: var(--spacing-lg) 0;
	}

	.modern-menu {
		height: 100%;
		border: none !important;
		background: transparent !important;
		padding: 0 var(--spacing-md);
	}

	.menu-item {
		margin: var(--spacing-xs) 0 !important;
		border-radius: var(--radius-md) !important;
		transition: all var(--transition-normal) !important;
		position: relative;
		overflow: hidden;
	}

	.menu-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		height: 100%;
		background: var(--primary-gradient);
		transition: width var(--transition-normal);
		z-index: -1;
	}

	.menu-item:hover::before {
		width: 100%;
	}

	.menu-item:hover {
		color: var(--text-white) !important;
		transform: translateX(8px);
	}

	.menu-icon {
		margin-right: var(--spacing-sm) !important;
		font-size: 18px;
	}

	/* 主内容区域 */
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: var(--background-primary);
	}

	.content-wrapper {
		flex: 1;
		padding: var(--spacing-xl);
		overflow: auto;
		background: var(--background-card);
		margin: var(--spacing-lg);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-md);
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.sidebar {
			width: 200px;
		}
		
		.header-content {
			padding: 0 var(--spacing-lg);
		}
		
		.brand-title {
			font-size: 24px;
		}
		
		.content-wrapper {
			margin: var(--spacing-md);
			padding: var(--spacing-lg);
		}
	}

	@media (max-width: 480px) {
		.sidebar {
			position: absolute;
			left: -280px;
			z-index: 1000;
			transition: left var(--transition-normal);
		}
		
		.sidebar.open {
			left: 0;
		}
		
		.brand-section {
			gap: var(--spacing-sm);
		}
		
		.brand-title {
			font-size: 20px;
		}
	}

	/* 动画效果 */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.content-wrapper {
		animation: fadeInUp 0.6s ease-out;
	}

	/* Element UI 组件覆盖 */
	.el-menu-item span {
		font-weight: 500;
		font-size: 14px;
	}
</style>
