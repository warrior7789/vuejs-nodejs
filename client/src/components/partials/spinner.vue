<template>
    <div class="container">
        <h4> This is spinner</h4>
        <div class="row">
            <div class="col-md-6 vue-winwheel">
                <div class="mobile-container">
                    <div class="wheel-wrapper">
                        <svg v-bind:style="rotate_degree" :class="rotate ? 'do-nudge' : ''" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 115" style="enable-background:new 0 0 80 115;" xml:space="preserve">
                            <g>
                                <path fill="#323253" d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z M40,52.5c-7,0-12.6-5.6-12.6-12.4 S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"></path>
                                <path fill="rgba(0, 0, 0, 0.3)" d="M40,19.2c-11.7,0-21.2,9.3-21.2,20.8S28.3,60.8,40,60.8S61.2,51.5,61.2,40S51.7,19.2,40,19.2z M40,52.5 c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"></path>
                            </g>
                        </svg>
                        <div class="canvas-wrapper">
                            <canvas id="canvas" width="434" height="434">
                                <p style="{color: white}" align="center">Sorry, your browser doesn't support canvas. Please try Google Chrome.</p>
                            </canvas>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">{{ mobile_no }}            	
				


				<vue-tel-input :valid-characters-only="true" @input="onInput"/>
                <div class="button-wrapper">
                    <a class="btn btn-play" href="#" @click.prevent="startSpin()" v-if="!loadingPrize && !wheelSpinning">SPIN!</a>
                </div>
                <div class="custom-modal modal-mask" id="modalSpinwheel" v-if="modalPrize">
                    <div slot="body">
                        <a href="" @click.prevent="hidePrize()" class="modal-dismiss">
                            <i class="icon_close"></i>
                        </a>
                        <h2>
							Yay you got the prize!!
						</h2>
                        <h1> {{prizeName}}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	//import VueWinwheel from "vue-winwheel";
	//import VueInjectJs from 'vue-inject-js';

	
	import * as Winwheel from '../../../node_modules/vue-winwheel/Winwheel'
	import { VueTelInput }  from 'vue-tel-input'
	//import * as Winwheel from './Winwheel'

	export default {
		name: "spinner",
		props:{
			segments:{
				default(){
					return [
						{'fillStyle' : '#ee1c24', 'text' : '300'},
						{'fillStyle' : '#3cb878', 'text' : '450'},
						{'fillStyle' : '#f6989d', 'text' : '600'},
						{'fillStyle' : '#00aef0', 'text' : '750'},
						{'fillStyle' : '#f26522', 'text' : '500'},
						{'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
						{'fillStyle' : '#e70697', 'text' : '3000'},
						{'fillStyle' : '#fff200', 'text' : '600'},
						{'fillStyle' : '#f6989d', 'text' : '700'},
						{'fillStyle' : '#ee1c24', 'text' : '350'},						
						{'fillStyle' : '#f6989d', 'text' : '500'},
						{'fillStyle' : '#f26522', 'text' : '400'},
						{'fillStyle' : '#3cb878', 'text' : '900'},
						{'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
						{'fillStyle' : '#a186be', 'text' : '600'},
						{'fillStyle' : '#fff200', 'text' : '700'},
						{'fillStyle' : '#00aef0', 'text' : '800'},
						{'fillStyle' : '#ffffff', 'text' : 'LOOSE TURN', 'textFontSize' : 12}
					]
				}
			}
		},
		components: {
			VueTelInput			
			//VueInjectJs
		},
		data() {
			return {
				mobile_no:{
					number: '',
					valid: false,
					country: undefined,
				},
				audio : new Audio('/assets/voice/tick.mp3'),
				loadingPrize: false,
				theWheel: null,
				modalPrize: false,
				wheelPower: 1,
				wheelSpinning: false,
				prizeName: 'BUY 1 GET 1',
				WinWheelOptions: {
					textFontSize: 14,
					outterRadius: 410,
					innerRadius: 70,
					lineWidth: 10,
					/*drawMode: 'code', 
					animation: {
						type: 'spinToStop',
						duration: 0.5
					}*/
				},
				rotate_degree: {
					// '-webkit-transform': 'rotate(0deg)',
					// '-moz-transform': 'rotate(0deg)',
					// '-ms-transform': 'rotate(0deg)',
					// '-o-transform': 'rotate(0deg)',
					// 'transform': 'rotate(0deg)'
				},
				rotate : false
			}
		},
		methods: {
			onInput(formattedNumber, { number, valid, country }) {
				/*console.log("formattedNumber")
				console.log(formattedNumber)
				console.log(number)
				console.log(valid)
				console.log(country)*/
				this.mobile_no.number = number.international;
				this.mobile_no.valid = valid;
				this.mobile_no.country = country && country.name;
			},
			showPrize () {
				this.modalPrize = true
			},
			hidePrize () {
				this.modalPrize = false
			},
			startSpin () {
				if (this.wheelSpinning === false) {
					this.theWheel.startAnimation()
					this.wheelSpinning = true
					this.theWheel = new Winwheel.Winwheel({
						...this.WinWheelOptions,
						numSegments: this.segments.length,
						segments: this.segments,
						animation: {
							type: 'spinToStop',
							duration: 10,
							spins:30,
							callbackFinished: this.onFinishSpin,
							callbackSound: this.playSound,
							soundTrigger: 'pin',
						},
						'pins':{
							'number' : this.segments.length
						}
					})

					// example input prize number get from Backend
					// Important thing is to set the stopAngle of the animation before stating the spin.

					var prizeNumber = Math.floor(Math.random() * this.segments.length) // or just get from Backend
					var stopAt = 360 / this.segments.length * prizeNumber - 360 / this.segments.length / 2 // center pin
					// var stopAt = 360 / this.segments.length * prizeNumber - Math.floor(Math.random() * 60) //random location
					//alert(stopAt)
					this.theWheel.animation.stopAngle = stopAt
					this.theWheel.startAnimation()
					this.wheelSpinning = false
				}
			},
			resetWheel () {
				this.rotate =false;
				this.theWheel = new Winwheel.Winwheel({
					...this.WinWheelOptions,
					numSegments: this.segments.length,
					segments: this.segments,					
					'pins' :{
						'number' : this.segments.length// Number of pins. They space evenly around the wheel.
					}
				})

				if (this.wheelSpinning) {
					this.theWheel.stopAnimation(false) // Stop the animation, false as param so does not call callback function.
				}

				this.theWheel.rotationAngle = 0 // Re-set the wheel angle to 0 degrees.
				this.theWheel.draw() // Call draw to render changes to the wheel.
				this.wheelSpinning = false // Reset to false to power buttons and spin can be clicked again.
			},
			initSpin () {

				this.loadingPrize = true
				this.resetWheel()
				this.loadingPrize = false
			},
			onFinishSpin (indicatedSegment) {
				this.prizeName = indicatedSegment.text
				this.showPrize();
				this.rotate =false;
				//console.log(" onFinishSpin" + (360 - this.theWheel.getRotationPosition()));
			},
			playSound(){	
				//console.log("playsoung start -> " + new Date().getTime());
				this.rotate =true;			
				//console.log(360 - this.theWheel.getRotationPosition());
				this.audio.pause();
				this.audio.currentTime = 0;
				
				//this.rotate =false;
				// Play the sound.
				this.audio.play();

				//setTimeout(function(){
                    this.rotate =false;
                    //console.log("false " + new Date().getTime());
                    ////console.log("playsoung start false" + new Date().getTime());
                //}, 1);

               //console.log("playsoung end -> " + new Date().getTime());
				//var total_degree =360;
				//var per_segemnt  = 360/this.segments.length;

			}
		},
		computed: {},
		updated () {},
		mounted (){
			this.initSpin()
			// this.resetWheel()
		},
		created () {}
	};
</script>

<style scoped>
.vue-winwheel {
	text-align: center;
	background-image: url('/static/img/obstacle-run/bg-spinner-mobile.svg');
	background-size: cover;
	background-position: center bottom;
	background-repeat: no-repeat;
}
.vue-winwheel h1 {
	color: #b32656;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 36px;
	line-height: 90px;
	letter-spacing: 4px;
	margin: 0;
}
.vue-winwheel h2 {
	margin: 0;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content {
	width: calc(100vw - 30px);
	padding-top: 52px;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content h2 {
	text-transform: uppercase;
	color: #b32656;
	margin-bottom: 16px;
	margin-top: 0;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 18px;
	letter-spacing: 1.1px;
	margin: 0;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content p {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: black;
	text-align: center;
	line-height: 25px;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content p strong {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content .modal-dismiss {
	top: 12px;
	right: 12px;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content .modal-dismiss i.icon_close {
	font-size: 30px;
	color: #da2a52;
}
.vue-winwheel canvas#canvas {
	position: relative;
}
.vue-winwheel .canvas-wrapper {
	position: relative;
}
.vue-winwheel .canvas-wrapper:after {
	content: '';
	display: block;
	width: 42px;
	background: #c4376f;
	height: 42px;
	position: absolute;
	left: calc(50% - 25px);
	margin: auto;
	border-radius: 100%;
	top: calc(50% - 29px);
	border: 5px solid white;
	box-sizing: content-box;
}
.vue-winwheel .canvas-wrapper:before {
	content: '';
	display: block;
	width: 434px;
	background: #0f0f0f;
	height: 434px;
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 100%;
	top: 0;
}
.vue-winwheel .wheel-wrapper {
	position: relative;
}
/*.vue-winwheel .wheel-wrapper:before {
	content: '';
	width: 62px;
	height: 47px;
	position: absolute;
	top: -28px;
	left: calc(50% - 31px);
	right: 0;
	display: block;
	z-index: 99999;
	background-image: url('./spinner-marker.svg');
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
}*/

.vue-winwheel svg {
	
	width: 62px;
	height: 47px;
	position: absolute;
	top: -28px;
	left: calc(50% - 31px);
	right: 0;
	display: block;
	z-index: 99999;
	
	
}
.vue-winwheel .wheel-wrapper .button-wrapper {
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 231px;
	height: 118px;
}
.vue-winwheel .wheel-wrapper .btn.btn-play {
	padding: 0 58px !important;
	background: #c4376f;
	height: 40px;
	line-height: 40px;
	color: white;
	font-weight: bold;
	text-decoration: none;
	border-radius: 2px;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	letter-spacing: 2px;
}

.do-nudge {
	animation: shake 0.1s;
	/*animation-iteration-count: infinite; */

	
}

.dont-nudge {
	/*-webkit-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	-ms-transform: rotate(0deg);
	-o-transform: rotate(0deg);
	transform: rotate(0deg);*/
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(-3deg); }
  20% { transform: rotate(-6deg); }
  30% { transform: rotate(-9deg); }
  40% { transform: rotate(-12deg); }
  50% { transform: rotate(-15deg); }
  60% { transform: rotate(-18deg); }
  70% { transform: rotate(-21deg); }
  80% { transform: rotate(-24deg); }
  90% { transform: rotate(-27deg); }
  100% { transform: rotate(-30deg); }
}



</style>

