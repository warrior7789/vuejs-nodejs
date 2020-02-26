<template>
  <!-- The Modal -->
  <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">User Information</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
            <form name="form" @submit.prevent="handleEnquiry">
               <div class="form-group">
                   <label for="text">First Name</label>
                   <input type="text" class="form-control" v-validate="'required|max:50'" name="FirstName" autocomplete="off" />
                   <div v-if="submitted && errors.has('FirstName')" class="alert-danger">{{errors.first('FirstName')}}</div>
               </div>
               <div class="form-group">
                   <label for="text">Last Name</label>
                   <input type="text" class="form-control" v-validate="'required|max:50'" name="LastName" autocomplete="off"/>
                   <div v-if="submitted && errors.has('LastName')" class="alert-danger">{{errors.first('LastName')}}</div>
               </div>
               <div class="form-group">
                   <label for="text">Email</label>
                   <input type="text" class="form-control" v-validate="'required|email'" name="Email" autocomplete="off"/>
                   <div v-if="submitted && errors.has('Email')" class="alert-danger">{{errors.first('Email')}}</div>
               </div>
               <div class="form-group">
                   <label for="text">Phone Number</label>
                   <input type="text" class="form-control" v-validate="'required|numeric'" name="PhoneNumber" autocomplete="off"/>
                   <div v-if="submitted && errors.has('PhoneNumber')" class="alert-danger">{{errors.first('PhoneNumber')}}</div>
               </div>
               <div class="form-group">
                   <label for="text">Website</label>
                   <input type="text" class="form-control" name="Website" autocomplete="off"/>
               </div>               
               <div class="form-group">
                   <label for="text">Business / Job Description</label>
                   <input type="text" class="form-control" v-validate="'required|max:50'" name="Description" autocomplete="off"/>
                   <div v-if="submitted && errors.has('Description')" class="alert-danger">{{errors.first('Description')}}</div>
               </div>               
               <div class="form-group">
                   <label for="text">Address</label>
                   <textarea name="Address" class="form-control" rows="3" placeholder="Please enter the Address"></textarea>
               </div>
               <div class="form-group">
                     <button class="btn btn-primary btn-block">ADD</button>
               </div>
            </form>
            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
        </div>
        
        <!-- Modal footer -->
        <!--<div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>-->
        
      </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'
    export default {
            name: 'Modal',
            data() {
                return {
                    submitted: false,
                    successful: false,
                    message: '',
                    form: {
                        FirstName: '',
                        LastName: '',
                        Email: '',
                        PhoneNumber: '',
                        Website: '',
                        Description: '',
                        Address: ''
                    }
                };
            },
            methods: {
                    handleEnquiry(e) {
                        this.message        =   '';
                        this.submitted      =   true;
                        e.preventDefault()
                        let FirstName       =   e.target.elements.FirstName.value;
                        let LastName        =   e.target.elements.LastName.value;
                        let Email           =   e.target.elements.Email.value;
                        let PhoneNumber     =   e.target.elements.PhoneNumber.value;
                        let Website         =   e.target.elements.Website.value;
                        let Description     =   e.target.elements.Description.value;
                        let Address         =   e.target.elements.Address.value;

                        let data = {
                            FirstName: FirstName,
                            LastName: LastName,
                            Email: Email,
                            PhoneNumber: PhoneNumber,
                            Website: Website,
                            Description: Description,
                            Address: Address
                        }

                        this.$validator.validate().then(isValid => {
                          if (isValid) {
                            axios.post('userinformation', data)
                            .then(response => {
                                window.console.log(response)
                                if (response.data.status == 1 ) {
                                    this.FirstName = this.LastName = this.Email = this.PhoneNumber = this.Website = this.Description = this.Address = "";
                                    this.message = "Thank You For Submit Information.";
                                    this.successful = true;
                                    e.target.reset()
                                } else {
                                    this.message = response.data.message;
                                }                   
                            });
                          }
                        });
                    }
            }
        };
</script>

<style scoped>
.modal {
          background-color: rgba(0, 0, 0, 0.7);
      }
</style>

