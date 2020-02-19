<template>
    <div class="main-spineer-div">
        <div class="background-opacity">

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="spin-title">Copper Closet Spin TO Win</h3>
                    </div>
                    <div class="col-md-6 vue-winwheel">

                        <div class="mobile-container">
                            <div class="wheel-wrapper">
                                <svg v-bind:style="rotate_degree" :class="rotate ? 'do-nudge' : ''" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 115" style="enable-background:new 0 0 80 115;" xml:space="preserve">
                                    <g>
                                        <path fill="#e74c3c" d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z M40,52.5c-7,0-12.6-5.6-12.6-12.4 S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"></path>
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
                    <div class="col-md-6">
                        <div class="col-md-12 bg-color">                            
                            <div class="mt-5 ">
                                <vue-tel-input :valid-characters-only="true" @input="onInput" placeholder="Enter Phone Number to spin " />
                                
                            </div>
                            <div class="button-wrapper">
                                <h5 v-if="mobile_no_validate">{{ mobile_no_error_text }}</h5>
                                <button class="btn btn-success"  @click.prevent="startSpin()" v-if="!loadingPrize && !wheelSpinning " :disabled='isDisabled'>{{ spin_button_text }}</button>
                            </div>
                            <div class="custom-modal modal-mask" id="modalSpinwheel" v-if="modalPrize">
                                <div slot="body">
                                    <a href="" @click.prevent="hidePrize()" class="modal-dismiss">
                                        <i class="icon_close"></i>
                                    </a>
                                    <h5>Yay you got the prize!!</h5>
                                    <h6 class="price_win_text"> {{prizeName}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //import VueWinwheel from "vue-winwheel";
    //import VueInjectJs from 'vue-inject-js';
    import * as Winwheel from '../../node_modules/vue-winwheel/Winwheel'
    import { VueTelInput }  from 'vue-tel-input'
    import UserService from '../services/user.service'
    import axios from 'axios'
    //import * as Winwheel from './Winwheel'
    export default {
        name: "spinner",
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
                spin_button_text : 'SPIN !',
                mobile_no_error_text : '',
                mobile_no_validate : false,
                message: '',
                user_spin : 0,
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
                rotate : false,
                segments:[
                    {'fillStyle' : '#fff171', 'text' : '10 % off', 'textFontSize' : 16, 'textFillStyle' : '#000000'},
                    {'fillStyle' : '#ff7878', 'text' : 'Better luck\nNext time', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
                    {'fillStyle' : '#7eecec', 'text' : '30 % off', 'textFontSize' : 16, 'textFillStyle' : '#000000'},
                    {'fillStyle' : '#7280fd', 'text' : 'Better luck\nNext time', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
                    {'fillStyle' : '#fff171', 'text' : '50 % off', 'textFontSize' : 16, 'textFillStyle' : '#000000'},
                    {'fillStyle' : '#ff7878', 'text' : 'Better luck\nNext time', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
                    {'fillStyle' : '#7eecec', 'text' : '80 % off', 'textFontSize' : 16, 'textFillStyle' : '#000000'},
                    {'fillStyle' : '#7280fd', 'text' : 'Better luck\nNext time', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'}                  
                    
                ]
                
            }
        },
        methods: {
            onInput(formattedNumber, { number, valid, country }) {
                //window.console.log("formattedNumber")
                //window.console.log(number)
                //console.log(number)
                //console.log(valid)
                //console.log(country)
                this.spin_button_text = 'Spin!' ;
                this.mobile_no_validate = false;
                this.modalPrize = false;
                this.mobile_no.number = number.international;
                this.mobile_no.valid = valid;
                this.mobile_no.country = country && country.name;
                this.mobile_no_error_text ="";
                this.mobile_no_validate = false;

                if(valid){
                    axios.post('checknumber', {
                        number: this.mobile_no.number
                    })
                    .then(response => {
                        //window.console.log(response)
                        if (response.data) {
                            if(response.data.status == 1 ){
                                this.mobile_no_validate = true;
                                this.spin_button_text = 'Spin Now' ;
                            }else{
                                //this.message = response.data.message ;
                                this.mobile_no_error_text =response.data.message;
                                this.mobile_no_validate = true;
                            }
                        }                    
                    });
                }else{
                    this.mobile_no_validate = false;
                }
            },
            showPrize () {
                this.modalPrize = true
            },
            hidePrize () {
                this.modalPrize = false
            },
            startSpin () {
                this.resetWheel()
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
                this.user_spin = this.user_spin + 1;
                
                axios.post('spinresult', {
                    number: this.mobile_no.number,
                    status: 1,
                    prize_win: indicatedSegment.text,
                })
                .then(response => {
                    //window.console.log(response)
                    if (response.data) {
                        if(response.data.status == 1 ){
                            this.mobile_no_validate = true;
                        }else{
                            this.message = response.data.message ;
                        }
                    }                    
                });

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
        computed: {
            isDisabled: function(){
                return !this.mobile_no_validate;
            }

        },
        updated () {},
        mounted (){
            this.initSpin();
                        
            UserService.getAllParts().then(
                response => {                    
                    this.segments = response.data;
                    this.resetWheel()
                    
                }
            );
            // this.resetWheel()
        },
        created () {}
    };
</script>

<style scoped>




</style>

