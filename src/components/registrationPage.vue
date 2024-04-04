<template>
    <div class="main">
          <h1>Sign-UP</h1>
          
          <form @submit="solve" >
              <label for="first">
                    Username:
                </label>
              <input type="text"
                    @keydown.space.prevent
                     id="first"
                     name="first"
                     placeholder="Enter your Username" v-model="username" required>
                     <span id="invalidusername" style="display: none; color: red;">Invalid Username</span>
                    <span id="validusername" style="display: none; color: green;">Valid Username</span>
   

              <label for="second">
                    Email:
                </label>
              <input type="Email"
                     id="second"
                     @keydown.space.prevent
                     name="second"
                     placeholder="Enter your Email" v-model="email" required>
                    <span id="invalidemail" style="display: none; color: red;">Invalid Email</span>
                    <span id="validemail" style="display: none; color: green;">Valid</span>

              <label for="third">
                    Phone Number:
                </label>
              <input type="Number"
                     id="third"
                     name="third"
                     @keydown.space.prevent
                     placeholder="Enter your Phone number" v-model="phone" required>
                     <span id="invalidphone" style="display: none; color: red;">Invalid Phone Number</span>
                    <span id="validphone" style="display: none; color: green;">Valid Phone Number</span>
   
              <label for="password">
                    Password:
                </label>
              <input type="password"
                     id="password"
                     name="password"
                     @keydown.space.prevent
                     placeholder="Enter your Password" v-model="password" required>
                     <span id="invalidpass" style="display: none; color: red;">Invalid Password</span>
                    <span id="validpass" style="display: none; color: green;">Valid Password</span>
   
              <div class="wrap">
                  <button>
                      Submit
                  </button>
              </div>
          </form>
          <p>Not registered? 
            <router-link 
               style="text-decoration: none;" :to="{path : '/'}"  @click="abc">
                Login into your Account
        </router-link>
          </p>
      </div>
  </template>
  
  <script setup>
   
  import axios from 'axios';
  import { useStore } from '../store/store'
  import { ref , onMounted} from 'vue';
  import { watch } from 'vue';

        let username = ref('') 
        let email = ref('') 
        let phone = ref('') 
        let password = ref('') 
        let test = useStore()
 
onMounted(() => {
      test.fetchUsers();
    });
function abc(){
    localStorage.setItem('isRegistered', true)
}
let emailc, passwordc , usernamec ,phonec;
watch([email , username, phone,password] , () => {
        if(email.value){
            if(email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))  {
            document.getElementById('validemail').style.display = "block";
            document.getElementById('invalidemail').style.display = "none";
            emailc = 1
        }else{
            document.getElementById('validemail').style.display = "none";
            document.getElementById('invalidemail').style.display = "block";
            emailc = 0
        }
        }
        if(password.value){
            if(password.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) { 
                document.getElementById('validpass').style.display = "block";
                document.getElementById('invalidpass').style.display = "none";
                passwordc = 1;
            } else {
                document.getElementById('validpass').style.display = "none";
                document.getElementById('invalidpass').style.display = "block";
                passwordc = 0;
            }
        }
        if(username.value !== ""){
                document.getElementById('validusername').style.display = "block";
                document.getElementById('invalidusername').style.display = "none";
                usernamec = 1;
        }else{
            document.getElementById('validusername').style.display = "none";
            document.getElementById('invalidusername').style.display = "block";
            usernamec = 0;
        }
        if(phone.value){
            if(phone.value.length === 10){
                document.getElementById('validphone').style.display = "block";
                document.getElementById('invalidphone').style.display = "none";
                phonec = 1;
            }
            else{
                document.getElementById('validphone').style.display = "none";
                document.getElementById('invalidphone').style.display = "block";
                phonec = 0;
            }
        }
    })


   

async function solve(){
    // console.log(">>>>>>>", test.getUsers);
    let xyz = await test.getUsers
    let same = xyz.filter((x) => { return x.Email === email.value})
    console.log(emailc , passwordc ,usernamec ,phonec);
    if((emailc || passwordc || usernamec || phonec) === 0 ){
        alert("Invalid Details please check Input fields again")
    }
    else{
        if(same.length){
            alert("email already exists")
        }
        else{
            
            axios.post( 'http://localhost:3000/users',
            {
                Username : username.value,
                Email : email.value,
                Phone : phone.value,
                Password: password.value,
                todolist : []
            }
            ).then((response) => {
                console.log(response)
                
            })
            localStorage.setItem('isRegistered', true)
            alert("you have been successfully registered")

        }
    }
}

   
  </script>
  

  <style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
  *{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
  body {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
      line-height: 1.5;
      min-height: 100vh;
      background: #f3f3f3;
      flex-direction: column;
      margin: 0;
  }
  
  .main {
    margin-inline: auto;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      padding: 10px 20px;
      transition: transform 0.2s;
      width: 500px;
      text-align: center;
  }
  
  h1 {
      color: #af544c;
  }
  
  label {
      display: block;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 5px;
      text-align: left;
      color: #555;
      font-weight: bold;
  }
  
  
  input {
      display: block;
      width: 100%;
      margin-bottom: 15px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-radius: 5px;
  }
  
  button {
      padding: 15px;
      border-radius: 10px;
      margin-top: 15px;
      margin-bottom: 15px;
      border: none;
      color: white;
      cursor: pointer;
      background-color: #af6b4c;
      width: 100%;
      font-size: 16px;
  }
  
  .wrap {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  </style>
  