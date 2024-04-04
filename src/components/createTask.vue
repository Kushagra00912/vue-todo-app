<template>
    <button @click="clear" style="width: 100px;">Logout</button>
    <br>
    <router-link style="text-decoration: none; color: white;" :to="{name : 'ToDoList'}"><button style="width: 200px">See your List</button></router-link>
    <div class="main">

        <h3>create new task</h3>
        <form @submit.prevent="add">
            <label for="first">
                  Task:
              </label>
            <input type="text"
                   id="first"
                   name="first"
                   placeholder="Enter your Task" required v-model="task">
 
            <label for="password">
                  Task Description:
              </label>
            <input type="text"
                   id="second"
                   name="second"
                   placeholder="Enter task decription" required v-model="tdesc">
 
            <div class="wrap">
                <button>
                    Add
                </button>
            </div>
        </form>
    </div>

</template>

<script setup>
import router from '@/router';
import { ref , onMounted} from 'vue';
// import axios from 'axios';
import { useStore } from '../store/store'
    let task = ref('')
    let tdesc = ref('')
    let test = useStore()
 
    let current_user_id = (JSON.parse(localStorage.getItem('current_user'))).id
 onMounted(() => {
       test.fetchUser(current_user_id);
     });

function add(){
let current_user = test.getUser

console.log("crrr", current_user);
let current_user_list = current_user.todolist
console.log("current_user_list", current_user_list);
current_user_list.push({
    Task : task.value,
    Taskdescription : tdesc.value,
    Status : "pending"
})

    test.updatedetail({...current_user, todolist : current_user_list })
    alert("task successfuly added")
    router.push('/todolist')
}
function clear(){
    localStorage.setItem("current_user", "")
    alert('logged out')
    localStorage.setItem('isLoggedIn', false)
    router.push('/register')
}
</script>


<style scoped>

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
