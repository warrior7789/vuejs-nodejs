<template>
  <div class="container">
    <div class="main">
      <h2>Spinner Parts Listing</h2>
        <table border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
         <th>FILLSTYLE</th>
         <th>TEXT</th>
         <th>FONTSIZE</th>
         <th>TEXTFILLSTYLE</th>
         <th>POSITION</th>
         <th>ACTION</th>
       </tr>
       <tr v-for='values in data' :key="values.id">
       <td>{{ values.fillStyle }}</td>
       <td>{{ values.text }}</td>
       <td>{{ values.fontsize }}</td>
       <td>{{ values.textFillStyle }}</td>
       <td>{{ values.position }}</td>
       <td>
        
        <router-link :to="'/admin/parts/edit/'+values.id">EDIT</router-link> || <button class="btn btn-danger" v-on:click="()=>deletePost(values.id)">Delete</button></td>
       </tr>
       </table>
     </div>
  </div>
</template>

<script>
  import UserService from '../../services/user.service';
  
  export default {
    name: 'Parts',
    data() {
      return {
        message: '',
        data: ''
      }
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
      UserService.getAllParts().then(
        response => {
          this.data = response.data;
        },
        error => {
          this.data =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
      
    },
    methods: {
      deletePost: function (id) {
        UserService.getDeletParts(id).then(
        response => {
          this.message = response.data;
          this.data = this.data.filter((e)=>e.id !== id )
        },
        error => {
          this.message =
            (error.response && error.response.message) ||
            error.message ||
            error.toString();
        }
      );
      }
    }
  };
  </script>
