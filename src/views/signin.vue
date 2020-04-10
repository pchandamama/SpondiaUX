  <template id="signup-form">
  <div class="container" >
      <form>
        <div class="form-group" >
          <label for="email">Email</label>
          <input type="text" v-model="email" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" />
        </div>
        
        <div class="form-group">
          <button :class="{active: disable_btn}" :disabled="disable_btn" @click.prevent="on_login()">Login</button>
        </div>
      </form>
        <span v-show="!loginsuccess">{{http_msg}}</span>
            
      </div>
    </template>
  <script>
 import VueResource from 'vue-resource';
 import Vue from 'vue';
 import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter);

export default {
    name: 'signin',
  // TEMPLATE
  template: '#signup-form',
  
  // DATA
  data() {
    return {
      http_msg:'',
      input:{},
      loginsuccess:true,
      email:'',
      disable_btn:false,
      password:''
    }
  },//data
   // METHODS
  methods: {
    
       on_login() {
       this.input.email=this.email;
       this.input.password=this.password;

      this.disable_btn = true;
      //this.$emit('change_comp', 'results');
      this.postData();
    }, 
    postData()
    {
      var body = this.input;
      this.loginsuccess = true;

      
      this.$http.post("https://usersmanager.azurewebsites.net/api/login?code=IAALJEp0d6ECQiPBOlIOVqswISzaNjYI67pAjQjFKumdlZ8TciFCwQ==", body, { headers: { "content-type": "application/json" } }).then(result => {

            this.$router.push('home');
                }, error => {
                    // this.msg3=true;
                     this.http_msg="Login failed!!.Please provide corerct username and password."
                     this.disable_btn = false;
                     this.loginsuccess = false;

      
                });
    }

  }

}//export

</script>

 <style lang="scss">  
  @import url('https://fonts.googleapis.com/css?family=Roboto');

$green-dark: rgb(233, 240, 231);
$green-light: #b0e6c2;
$orange-dark: #870000;
$orange-light: #FFB100;
$red: #FF3400;
$grey: #8F949B;

* {
  box-sizing: border-box;
}

body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to left, $green-dark , $green-light);
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

header {
  margin: 30px 0;
  text-align: center;
  
  h2 {
    text-transform: uppercase;
    margin: 0;
  }
  
  p {
    font-size: 1em;
  }
  
  a {
    text-decoration: none;
    border-bottom: 2px dotted $orange-dark;
    color: inherit;
  }
  
}

.signup {
  width: 700px;
  height: 460px;
  position: relative;
  overflow: hidden;
  box-shadow: 10px 10px 60px rgba(0, 0, 0, .4);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5px;
}
.signup:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  z-index: -1;
  background-color:ivory
}

form {
  width: 50%;
  height: 80%;
  padding: 20px 50px 20px 20px;;
}
form .form-group {
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
  color: $grey;
  font-size: .9em;
  
  label {
    margin: 0 0 16px 0;
  }
  
  span {
    font-size: .8em;
    color: $red;
  }
  span.success {
    font-size: 1.5em;
    color: green  ;
    font-display: bold;
  }
  
  span#characters {
    font-size: .8em;
    color: $grey;
  }
}
.form-group input[type="text"], 
.form-group input[type="password"] {
  border: none;
  outline: none;
  background: transparent;
  padding: 0 0 10px 0;
  font-size: 1em;
  border-bottom: 1px dotted $grey;
}
.form-group input[type="password"] {
  color: $red;
}
form .form-group:last-child {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 0 0;
  
  button {
    border: none;
    background: linear-gradient(to left, $orange-dark , $orange-light);
    padding: 10px 30px;
    border-radius: 20px;
    color: #FFFFFF;
    font-size: .8em;
    font-weight: bold;
    letter-spacing: 1px;
    cursor: pointer;
  }
  button.active {
    opacity: .9;
    cursor: default;
  }
  
  a {
    color: $grey;
    text-decoration: dotted;
    font-size: .8em;
  }
}



.fade-enter-active, .fade-leave-active {
  transition: all .8s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateX(-40px);
}

</style>


