<template>
  <div class="container">
    <div class="main">
      <h2 class="heading-style">Add the Parts</h2>
       <form name="form" @submit.prevent="handleRegister">
       <div class="form-group">
           <label for="text">Fill Style</label>
           {{ fillstyle }}
            <Chrome :value="fillstyle" @input="updatefillstylecolor"></Chrome>
           <!-- <input type="text" class="form-control" v-validate="'required|max:50'" name="fillstyle" autocomplete="off" />
           <div v-if="submitted && errors.has('fillstyle')" class="alert-danger">{{errors.first('fillstyle')}}</div> -->
       </div>
       <div class="form-group">
           <label for="text">Text</label>
           <input type="text" class="form-control" v-validate="'required|max:50'" name="text" autocomplete="off"/>
           <div v-if="submitted && errors.has('text')" class="alert-danger">{{errors.first('text')}}</div>
       </div>
       <div class="form-group">
           <label for="text">Font Size</label>
           <!--<input type="text" class="form-control" v-validate="'required|numeric'" name="fontsize" autocomplete="off"/>-->
           <input type="text" class="form-control" v-validate="'required'" name="fontsize" autocomplete="off" @input="fontsizeInput"/>
           <div v-if="submitted && errors.has('fontsize')" class="alert-danger">{{errors.first('fontsize')}}</div>
       </div>
       <div class="form-group">
           <label for="text">Text Fill Style</label>
           {{ textFillStyle }}
            <Chrome :value="textFillStyle" @input="updatetextFillStylecolor"></Chrome>
       </div>
       <div class="form-group">
           <label for="text">Position</label>
           <!--<input type="text" class="form-control" v-validate="'required|numeric'" name="position" autocomplete="off"/>-->
           <input type="text" class="form-control" v-validate="'required'" name="position" autocomplete="off" @input="positionInput"/>
           <div v-if="submitted && errors.has('position')" class="alert-danger">{{errors.first('position')}}</div>
       </div>
       <label for="text">Is Win</label>
       <div class="form-group">
           <select v-model="isWin">
              <option disabled value="">Please select one</option>
              <option>Yes</option>
              <option>No</option>
            </select>
       </div>       
       <label for="text">Gap</label>
       <div class="form-group">
           <select v-model="gap">
              <option disabled value="">Please select one</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
       </div>
       <div class="form-group">
             <button class="btn btn-primary btn-block">ADD</button>
       </div>
       </form>
       <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
     </div>
  </div>
</template>

<script>
  import User from '../../models/user';
  import { Chrome } from 'vue-color'
  export default {
    name: 'add-new-parts',
    components: {     
      Chrome
    },
    data() {
      return {
        fillstyle: '#194d33',
        textFillStyle: '#05944D',
        user: new User('', '', '', '',''),
        submitted: false,
        successful: false,
        message: '',
        text: '',
        fontsize: '',
        position: '',
        gap: '',
        isWin: 'No'
      };
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    },
    methods: {
      updatefillstylecolor(data){
        this.fillstyle = data.hex
      },
      updatetextFillStylecolor(data){
        this.textFillStyle = data.hex
      },
      fontsizeInput(e){
        e.target.value = e.target.value.replace(/[^0-9]+/g, '');
      },      
      positionInput(e){
        e.target.value = e.target.value.replace(/[^0-9]+/g, '');
      },
      handleRegister(e) {
        this.message = '';
        this.submitted = true;
        e.preventDefault()
        let fillstyle = this.fillstyle;
        let text = e.target.elements.text.value;
        let fontsize = e.target.elements.fontsize.value;
        let textFillStyle = this.textFillStyle;
        let position = e.target.elements.position.value;
  
        let data = {
          fillstyle: fillstyle,
          text: text,
          fontsize: fontsize,
          textFillStyle: textFillStyle,
          position: position,
          isWin: this.isWin,
          gap: this.gap
        }
  
        this.$validator.validate().then(isValid => {
          if (isValid) {
            this.$store.dispatch('auth/addParts', data).then(
              data => {
                this.message = data;
                this.successful = true;
                this.$router.push('/admin/parts');
              },
              error => {
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                this.successful = false;
              }
            );
          }
        });
      }
    }
  };
  </script>
