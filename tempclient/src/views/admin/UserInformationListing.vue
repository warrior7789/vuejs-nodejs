<template>
  <div class="container">
    <div class="main">
      <h2 class="heading-style">User Information Listing</h2>
      <div style="overflow-x:auto;">
      <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
       <tr>
         <th>FirstName</th>
         <th>LastName</th>
         <th>Email</th>
         <th>PhoneNumber</th>
         <th>Website</th>
         <th>Description</th>
         <th>WIN PRIZE</th>
         <th>Address</th>
         <th>Date</th>
         <th>Action</th>
       </tr>
       <tr v-for='values in pageOfItems' :key="values.id">
       <td>{{ values.FirstName }}</td>
       <td>{{ values.LastName }}</td>
       <td>{{ values.Email }}</td>
       <td>{{ values.PhoneNumber }}</td>
       <td>{{ values.Website }}</td>
       <td>{{ values.Description }}</td>
       <td>{{ values.WinPrize }}</td>
       <td>{{ values.Address }}</td>
       <td>{{ dateFormatted(values.createdAt) }}</td>
       <td><button class="btn btn-danger" v-on:click="()=>deleteUserData(values.id)">Delete</button></td>
       </tr>
       </table>
       </div>
     </div>
     <br>
     <jw-pagination :items="data" @changePage="onChangePage"></jw-pagination>
  </div>
</template>

<script>
  import SpinEnquiry from '../../services/spin_enquiry';
  import moment from 'moment';
  
  export default {
    name: 'userinformation',
    data() {
      return {
        message: '',
        data: [],
        pageOfItems: []
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
      SpinEnquiry.getAllUser().then(
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
       onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        },
        deleteUserData: function (id) {
          SpinEnquiry.getdeleteUser(id).then(
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
      },
      dateFormatted(date) {
        return moment(date).format('DD-MM-YYYY HH:MM:SS');
      }
    }
  };
  </script>
