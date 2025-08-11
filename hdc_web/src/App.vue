<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import Local from '@/store/localSave.js'
	export default {
		data() {
			return {
				token: '',
			};
		},
		onLoad() {},
		created: function() {
			this.$router.push({
				path: '/home/PLCControl',
			});
		},

		methods: {}
	};
</script>

<style>
	@import './styles/modern-theme.css';

	#app {
		font-family: var(--font-primary);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--text-primary);
		height: 100vh;
		width: 100vw;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		background-attachment: fixed;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	/* 全局重置 */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		overflow: hidden;
	}

	/* Element UI 主题定制 */
	.el-menu {
		border-right: none !important;
	}

	.el-menu-item:hover {
		background-color: rgba(102, 126, 234, 0.1) !important;
		color: var(--primary-color) !important;
	}

	.el-menu-item.is-active {
		background: var(--primary-gradient) !important;
		color: var(--text-white) !important;
		border-radius: var(--radius-md);
		margin: var(--spacing-xs);
		width: calc(100% - 16px);
	}

	.el-switch.is-checked .el-switch__core {
		background-color: var(--primary-color) !important;
		border-color: var(--primary-color) !important;
	}

	.el-button--text {
		color: var(--text-white) !important;
		font-weight: 500;
		transition: all var(--transition-fast);
	}

	.el-button--text:hover {
		color: var(--secondary-color) !important;
		background-color: rgba(255, 255, 255, 0.1) !important;
	}
</style>
