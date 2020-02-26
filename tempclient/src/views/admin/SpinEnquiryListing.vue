<template>
  <div class="container">
    <div class="main">
      <h2 class="heading-style">Spin Enquiry Listing</h2>
      <select v-model="selectResult" @change="onChange($event)">
        <option disabled value="">Please select one</option>
        <option value="All">ALL</option>
        <option value="Yes">WIN</option>
        <option value="No">LOSS</option>
      </select>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" class="form__field" v-model="searchNumber" @keyup="searchNumberData" PlaceHolder ="Search By Number">
      <br><br>
       <table border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
         <th>TELEPHONE</th>
         <th>PRIZE WIN</th>
         <th>WIN STATUS</th>
         <th>DATE</th>
         <th>ACTION</th>
       </tr>
       <tr v-for='values in laravelData.data' :key="values.id">
       <td>{{ values.number }}</td>
       <td>{{ values.prize_win }}</td>
       <td>{{ values.win_status }}</td>
       <td>{{ dateFormatted(values.createdAt) }}</td>
       <td><button class="btn btn-danger" v-on:click="()=>deleteData(values.id)">Delete</button></td>
       </tr>
       </table>
     </div>
     <pagination :data="laravelData" :limit="10" @pagination-change-page="getResults" />
     
  </div>
</template>

<script>
  import SpinEnquiry from '../../services/spin_enquiry';
  import moment from 'moment';
  import LaravelVuePagination from '@/components/VuePagination.vue';
  export default {
    name: 'spinenquiry',
    data() {
      return {
        message: '',
        selectResult: '',
        data: [],
        pageOfItems: [],
        laravelData: {
            data: null
        },
        search:{
            winStatus:'',         
            searchNumber:'',         
            page:1,
            sort_by:''
        },
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    components: {      
      'pagination': LaravelVuePagination
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
        let vm = this;
        setTimeout(function(){
            vm.getResults();
        }, 500);
    },
    methods: {
        onChange: function (event) {
            this.search.winStatus = event.target.value;
            this.getResults();
        },
        searchNumberData: function(event) {
            this.search.searchNumber = event.target.value;
            this.getResults();
        },
        deleteData: function (id) {
          SpinEnquiry.getDeletEnquiry(id).then(
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
          return moment(date).format('DD/MM/YYYY hh:mm');
        },
        getResults (page) {
          if (!page) {
            page = 1;
          }
          this.search.page=page;
          //this.search.winStatus=1;
          let vm = this;
            SpinEnquiry.getAllEnquiry(this.search).then(response => {
                //window.console.log(response.data.result);
                //this.data = response.result;
                // let total  = response.data.total;
                let perpage  = response.data.perpage;
                let last_page = parseInt(response.data.total/perpage) + 1;
                vm.laravelData = {
                    current_page: page,
                    data: response.data.result,
                    from: page,
                    last_page: last_page,
                    next_page_url: page < last_page ? vm.search.page=2 : null,
                    per_page: perpage,
                    prev_page_url: page > 1 ? vm.search.page=1 : null,
                    to: page + 1,
                    total: response.data.total
                };
            }); 
          
          
        },
    }
  };
  </script>
