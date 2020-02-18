<template>
	<div>
		<div class="head_banner">
			<div class="righttop_img">
				<div class="container">
				<div class="row">
					<div class="col-12 col-md-8 col-lg-6">
						<div class="row">
							<div class="leftside_img">
								<h1>SPIN & WIN UP TO AED 20,000</h1>
								<button class="btn " type="submit">Play Now</button>   
							</div>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-6">
						<div class="row">
						<div class="petrolf_txt">
							<div class="petrol_txt">
								<h1>PETROL F</h1>
							</div>
							<div class="synthetic_txt">
								<span>Synthetic<br>
								Motor Oil</span>
							</div>
						</div>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
		<spinner></spinner>
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 col-md-4 col-lg-4">
					<div class="row">
						<div class=" bg_color">
							<div class="exclusive_bg">
								<img src="/assets/image/exclusive.png" class="img-responsive" alt="Responsive image">
							</div>
							<div class="exclusive_txt">
								<strong>EXCLUSIVE OFFER</strong>
							</div>
							<div class="exclusive_txt1">
								<a href="">Read More...</a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4 col-lg-4">
					<div class="row">
						<div class=" bg_color1">
							<div class="probably_bg">
								<img src="/assets/image/provably.png" class="img-responsive" alt="Responsive image">
							</div>
							<div class="probably_txt">
								<strong>PROVABLY FAIR</strong>
							</div>
							<div class="probably_txt1">
								<a href="">Read More...</a>
							</div>
						</div>
					</div>
				</div>			
				<div class="col-12 col-md-4 col-lg-4">
					<div class="row">
						<div class=" bg_color2">
							<div class="support_bg">
								<img src="/assets/image/support.png" class="img-responsive" alt="Responsive image">
							</div>
							<div class="support_txt">
								<strong>24/7 SUPPORT</strong>
							</div>
							<div class="support_txt1">
								<a href="">Read More...</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="product_bg">
			<div class="product_txt">
				<strong>Our Product</strong>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-6 col-lg-6 mb-4 mb-md-0">
						<div class="">
							<div class="product_img">
								<img src="/assets/image/product.png" class="img-responsive" alt="Responsive image">
							</div>
						</div>
					</div>
					<div class="col-12 col-md-6 col-lg-6">
						<div class="">
							<div class="product_img1">
								<img src="/assets/image/product1.png" class="img-responsive" alt="Responsive image">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>

	import spinner from '@/components/spinner'
	export default {
	name: 'home',
		components: {
			spinner,    
		},
		mounted () {
			//
		}
	}

</script>
