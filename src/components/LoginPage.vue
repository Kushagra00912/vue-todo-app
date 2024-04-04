<template>
  <div class="main">
        <h1>Login</h1>
        <h3>Enter your login credentials</h3>
        <form @submit.prevent="solve">
            <label for="first">
                  Email:
              </label>
            <input type="text"
                   id="first"
                   name="first"
                   placeholder="Enter your Email" required v-model="email">
 
            <label for="password">
                  Password:
              </label>
            <input type="password"
                   id="password"
                   name="password"
                   placeholder="Enter your Password" required v-model="password">
 
            <div class="wrap">
                <button>
                    Login
                </button>
            </div>
        </form>
        <p>Not registered? 
		<router-link @click="abc"
               style="text-decoration: none;" :to="{path: '/register'}">
                Create an account
        </router-link>
        </p>
    </div>
</template>

<script setup>
import router from '@/router';
// import axios from 'axios';

import { ref, onMounted } from 'vue';
import { useStore } from '../store/store'
	let email = ref('')
	let password = ref('')

	let test = useStore()
 
onMounted(() => {
      test.fetchUsers();
    });

	const abc = () => {
		localStorage.setItem('isRegistered', false)
	}

async function solve(){
	let data = test.getUsers
	let user = data.filter((x) => x.Email === email.value && x.Password === password.value)
	if(user.length){

		localStorage.setItem("current_user", JSON.stringify(user[0]) )
		alert("logged-in")

		// if(JSON.parse(localStorage.getItem("current_user")).todolist.length)
		// {
			localStorage.setItem('isLoggedIn', true)
			router.push('/createtask')
		// }
		// else{
		// 	localStorage.setItem('isLoggedIn', true)
		// 	router.push('/todolist')
		// }
	}
	else{
		alert("User Do Not Exist")
	}
}
		




// onMounted(() =>{
// 	let abc = JSON.parse(localStorage.getItem("current_user"))
// 	console.log("sdhvbasdds",abc);
// 	if(abc !== null){
// 		alert("working")
// 		router.push('/register')
// 	}
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*style.css*/
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
