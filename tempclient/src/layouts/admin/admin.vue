<template>
	<div id="wrapper">
		<sidebar></sidebar>
		<div id="content-wrapper" class="d-flex flex-column">
			<Header></Header>
			<div class="container-fluid">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	// @ is an alias to /src
	import Header from '@/views/admin/header.vue'
	//import Footer from '@/views/admin/Footer.vue'  
	import sidebar from '@/views/admin/sidebar.vue'  
	

	export default {
		name: 'Home',
		components: {      
			Header,
			//Footer,
			sidebar
		}
	}
</script>
<style scoped>
@import '../../assets/admin.css';
@import '../../assets/fontawesome-free/css/all.min.css';
</style>