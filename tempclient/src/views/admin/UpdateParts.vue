<template>
  <div class="container">
    <div class="main">
      <h2 class="heading-style">Update the Parts</h2>
      <router-link to="/admin/parts" class="collapse-item">BACK</router-link>
       <form name="form" @submit.prevent="handleUpdate">
       <div class="form-group">
          <label for="text">Fill Style</label>
          {{ formdata.fillStyle }}
          <Chrome v-model="formdata.fillStyle" @input="updatefillstylecolor"></Chrome>
       </div>
       <div class="form-group">
           <label for="text">Text</label>
           <input type="text" class="form-control" v-validate="'required|max:50'" name="text" autocomplete="off" v-model="formdata.text"/>
           <div v-if="submitted && errors.has('text')" class="alert-danger">{{errors.first('text')}}</div>
       </div>
       <div class="form-group">
           <label for="text">Font Size</label>
           <input type="text" class="form-control" v-validate="'required|numeric'" name="fontsize" autocomplete="off" v-model="formdata.fontsize"/>
           <div v-if="submitted && errors.has('fontsize')" class="alert-danger">{{errors.first('fontsize')}}</div>
       </div>
       <div class="form-group">
           <label for="text">Text Fill Style</label>
           {{ formdata.textFillStyle }}
            <Chrome v-model="formdata.textFillStyle" @input="updatetextFillStylecolor"></Chrome>
       </div>
       <div class="form-group">
           <label for="text">Position</label>
           <input type="text" class="form-control" v-validate="'required|numeric'" name="position" autocomplete="off" v-model="formdata.position"/>
           <div v-if="submitted && errors.has('position')" class="alert-danger">{{errors.first('position')}}</div>
       </div> 
       <label for="text">Is Win</label>
       <div class="form-group">
           <select v-model="formdata.isWin">
              <option disabled value="">Please select one</option>
              <option>Yes</option>
              <option>No</option>
            </select>
       </div>        
       <label for="text">Gap</label>
       <div class="form-group">
           <select v-model="formdata.gap">
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
             <button class="btn btn-primary btn-block">UPDATE</button>
       </div>
       </form>
       <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
     </div>
  </div>
</template>

<script>
  import User from '../../models/user';
  import UserService from '../../services/user.service';
  import { Chrome } from 'vue-color'
  
  export default {
    name: 'updateparts',
    data() {
      return {
        fillStyle: '#194d33',
        textFillStyle: '#05944D',
        user: new User('', '', '', '',''),
        submitted: false,
        successful: false,
        message: '',
        text: '',
        fontsize: '',
        position: '',
        isWin: '',
        formdata: {
          id : "",
          fillStyle : "",
          text : "",
          fontsize : "",
          textFillStyle : "",
          position : "",
          isWin: "",
          gap: ""
        },
        error : {

        }
      };
    },
    components: {     
      Chrome
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
      UserService.getParticularParts(this.$route.params.id).then(
        response => {
          this.formdata.id = response.data.id;
          this.formdata.fillStyle = response.data.fillStyle;
          this.formdata.text = response.data.text;
          this.formdata.fontsize = response.data.fontsize;
          this.formdata.textFillStyle = response.data.textFillStyle;
          this.formdata.position = response.data.position;
          this.formdata.isWin = response.data.isWin;
          this.formdata.gap = response.data.gap;
        },
        error => {
          this.error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    methods: {
      updatefillstylecolor(data){
        this.formdata.fillStyle = data.hex
      },
      updatetextFillStylecolor(data){
        this.formdata.textFillStyle = data.hex
      },
      handleUpdate(e) {
        this.message = '';
        this.submitted = true;
        e.preventDefault() 
        this.$validator.validate().then(isValid => {
          if (isValid) {
            this.$store.dispatch('auth/updateparts', this.formdata).then(
              data => {
                this.message = data.message;
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
