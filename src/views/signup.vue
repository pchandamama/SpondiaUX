  <template id="signup-form">
  <div class="container" >
      <form v-show="!signedUp">
        <div class="form-group" >
          <label for="email">Email</label>
          <input type="text" v-model="email" />
          <span v-if="email.length > 1">{{ email_msg }}</span>
        </div>
        <div class="form-group">
          <label for="psw1">Password <span id="characters">(6 or more characters required)</span></label>
          <input type="password" v-model="password1" />
          <span v-show="msg1">{{ pwd1_msg }}</span>
        </div>
        <div class="form-group">
          <label for="psw2">Repeat Password</label>
          <input type="password" v-model="password2" />
          <span v-show="msg2">{{ pwd2_msg }}</span>
           <span v-show="msg3">{{ http_msg }}</span>
          
        </div>
        <div class="form-group">
          <button :class="{active: disable_btn}" :disabled="disable_btn" @click.prevent="on_signup()">Sign Up</button>
          <a href="#0">terms & conditions</a>
          
        </div>
      </form>
      <span class="signin" v-show="msg4">{{http_msg}}</span>
           <span :class="{success:msg4}" v-show="signedUp">{{http_msg}}<br/>
           <router-link to="/signin" v-show="signedUp">Click here to sign in</router-link>
           </span>
           
      </div>
    </template>
  <script>
 import VueResource from 'vue-resource';
 import Vue from 'vue';
Vue.use(VueResource);
export default {
    name: 'signup',
  // TEMPLATE
  template: '#signup-form',
  
  // DATA
  data() {
    return {
      email: '',
      email_msg: '',
      password1: '',
      pwd1_msg: '',
      password2: '',
      pwd2_msg: '',
      disable_btn: true,
      msg1: true,
      msg2: true,
      msg3:false,
      msg4:false,
      signedUp:false,
      http_msg:'',
      input:{}
    }
  },//data
  watch: {
    email: function(value) {
      this.valid_email(value, 'email_msg');
    },
    password1: function(value) {
      if(this.check_password_length(value, 'pwd1_msg', 6)) {
        this.check_passwords_match();
      }
    },
    password2: function(value) {
      if(this.check_password_length(value, 'pwd2_msg', 6)) {
        this.check_passwords_match();
      }
    }
  },
  
  // METHODS
  methods: {
    
    valid_email(email, msg) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this[msg] = '';
        return true;
      } else {
        this[msg] = 'Keep typing...waiting for a valid email';
        return false;
      } 
    },
    
    check_password_length(value, msg, total) {
      var length = value.length;
      var sum = 0;
      var display;
      
      sum = (total - length);
      
      switch(sum) {
        case 0:
          display = '';
          break;
        case 1:
          display = 'Keep going - just need '+ sum + ' more character.';
          break;
        default:
          display = 'Keep going - just need '+ sum + ' more characters';
      }
      
      if(length >= total) {
        this[msg] = '';
        return true;
      } else {
        this[msg] = display;
        return false;
      }
      
    },
    
    check_passwords_match() {
      if(this.password1.length > 5 && this.password2.length > 5) {
          if(this.password2 != this.password1) {
            this.pwd2_msg = 'Passwords do not match';
            this.disable_btn = true;
            return true;
          } else {
            this.pwd2_msg = '';
            this.disable_btn = false;
            return false;
          }
        }
    },
    
    on_signup() {
       this.input.email=this.email;
       this.input.id=this.email; 
      this.disable_btn = true;
      this.msg=false;
      //this.$emit('change_comp', 'results');
       this.http_msg="Signing up, please wait..."
       this.msg4=true;
      this.postData();
    }, 
    
    show_terms() {
      //this.$emit('change_comp', 'terms');
    },
    postData()
    {
      var body = this.input;
      this.http_msg="Signing you up.Please wait.."
     
      this.$http.post("https://usersmanager.azurewebsites.net/api/user?code=BSQelj1/kkinWA5KSYWsShZo9M6nz1p3q6bSdzj1mDL/TWgONhaTAg==", body, { headers: { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                     this.msg4=true;
                     this.msg3=false;
                     this.signedUp =true;
                     this.email = '';
                    this.password1 = '';
                    this.password2 = '';
                    this.email_msg = '';
                    this.pwd1_msg = '';
                    this.pwd2_msg = '';
                    this.http_msg = '';
                    this.msg1 = false;
                    this.msg2 = false;
                    this.msg3 = false;
                    this.msg4 = false;
                     this.http_msg="Congratulations !!!, You have successfully signed up."


                }, error => {
                     this.msg3=true;
                     this.http_msg="An error occured while saving data."
                     this.disable_btn = false;
      
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
  .success {
    font-size: 1.5em;
    color: green  ;
    font-display: bold;
  }
   span.signin {
    font-size: .9em;
    color: rgb(14, 10, 39)  ;
    text-align: center;
  
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


