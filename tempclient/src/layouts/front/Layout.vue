<template>
	<div id="app-layout">
		<Header></Header>
		<router-view></router-view>
		<Footer></Footer>
	</div>
</template>
<script>
	// @ is an alias to /src
	import Header from '@/views/front/header.vue'
	import Footer from '@/views/front/Footer.vue'  

	export default {
		name: 'Home',
		components: {      
			Header,
			Footer
		}
	}
</script>
<style scoped>
@import '../../assets/front.css';
@import '../../assets/fontawesome-free/css/all.min.css';
</style>
