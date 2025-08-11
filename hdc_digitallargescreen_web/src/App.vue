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
				path: '/dataOverview',
			});
		},

		methods: {}
	};
</script>

<style>
	html,
	body,
	#app {
		height: 100%;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		background-color: #ebebeb;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		overflow: hidden;
	}
</style>
