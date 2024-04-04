<template>
	<h1>this is new committ</h1>
	
	<div>
		<button style="width: 100px;" @click="clear">Logout</button>
	</div>
	<router-link style="text-decoration: none; color: white;" :to="{ name: 'CreateTask' }"><button style="width: 200px;">Create a new task</button></router-link>
	<br>

	<div style="display: flex; justify-content: space-between">
	<div>
		filter :<select id="filter" v-model="filval" >
			<option value="all">All</option>
			<option value="pending">pending</option>
			<option value="Inprogress">In progress</option>
			<option value="completed">Completed</option>
		</select>
		<table v-if="paginatedItems?.length" class="table">
		<thead>
			<tr style="border: 1px solid black">
				<th>Task</th>
				<th>Task Description</th>
				<th>Status</th>

			</tr>
		</thead>
		<tbody>
			<tr v-for="l in paginatedItems" :key="l">
				<td>{{ l.Task }}</td>
				<td>{{ l.Taskdescription }}</td>
				<td>{{ l.Status }} </td>
				<td style="border: none"><button style="padding:5px; width: 100px;" @click="edit(l)">Edit</button></td>
				<td style="border: none"><button style="padding:5px; width: 100px;" @click=deletetask(l)>Delete</button>
				</td>
			</tr>
		</tbody>
	</table>
	<h1 v-else>There are No records</h1>
	<div style="display: flex; gap: 30px;">
	<button v-if="currentPage > 1" style="width: 100px;" @click="prevPage" :disabled="currentPage === 1">Previous</button>
	<p v-if="paginatedItems?.length"  style="margin-top: 30px;">{{ currentPage }}</p>
    <button v-if="currentPage < totalPages" style="width: 100px;" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
	</div>
	</div>



	<form id="form" style="display: none; width: 500px; margin-right: 200px" @submit.prevent="savee">
		<label for="first">Task:</label>
		<input type="text" id="first" name="first" placeholder="Enter your Task" required v-model="task">

		<label for="password">Task Description:</label>
		<input type="text" id="second" name="second" placeholder="Enter task decription" required v-model="tdesc">



		<select id="third" v-model="status">
			<option value="pending">pending</option>
			<option value="Inprogress">In progress</option>
			<option value="completed">Completed</option>
		</select>



		<div class="wrap">
			<button>
				Save
			</button>
		</div>
	</form>
</div>

</template>
<script setup>
// import axios from 'axios';
import { ref, watch } from 'vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import router from '@/router';
import { useStore } from '../store/store'

let test = useStore()

let current_user_id = (JSON.parse(localStorage.getItem('current_user'))).id
console.log("current use rid",current_user_id);

// let list = ref()
onMounted( async () => {
	await test.fetchUser(current_user_id);
	items.value = test.filters(filval.value);
	solve()
});

let current_user
let current_user_list = ref()
function solve() {
	current_user = test.getUser
	current_user_list.value = current_user.todolist
	console.log("current_user_list", current_user_list.value);
}

function deletetask(obj) {
	let indxx = current_user_list.value.findIndex((x) => {
		return (JSON.stringify(x) === JSON.stringify(obj))
	})
	
	current_user_list.value.splice(indxx, 1);
	test.updatedetail({...current_user, todolist : current_user_list.value })
	filval.value = 'all';
}

function clear() {
	localStorage.setItem("current_user", "")
	localStorage.setItem('isLoggedIn', false)
	alert("you have been logged out")
	router.push('/register')
}
let indxxx
function edit(ob) {

	document.getElementById('form').style.display = "block";
	document.getElementById('first').value = ob.Task;
	document.getElementById('second').value = ob.Taskdescription;
	document.getElementById('third').value = ob.Status;
	indxxx = current_user_list.value.findIndex((x) => {
		return (JSON.stringify(x) === JSON.stringify(ob))
	})

}
function savee(){
 
	let current_user1 = test.getUser 
	let current_user_list1 = current_user.todolist 
	current_user_list1[indxxx] = {Task : document.getElementById('first').value,
								Taskdescription: document.getElementById('second').value,
								Status: document.getElementById('third').value}
	test.updatedetail({...current_user1, todolist : current_user_list1 })
	document.getElementById('form').style.display = "none";
	filval.value = 'all';
}


const itemsPerPage = 5;
const currentPage = ref(1);
const filval = ref('all');

watch(filval, (newVal,) => {
  console.log('Filter changed:', newVal);
  items.value = test.filters(newVal);
  currentPage.value = 1; 
});

const items = ref([]);

const totalPages = computed(() => Math.ceil(items.value?.length / itemsPerPage));
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log("items.value", items.value);
  return items.value?.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Example usage
filval.value = 'all'; // Change filter value to trigger watch








// let filval = ref('all')
// watch(filval, () => {
// 	console.log(filval.value);
// 	const curr_user_list  =  test.filters(filval.value);
// 	// const curr_user_list = curr_user
// 	console.log("list before assignment", list.value);

// 	console.log("curr_user_list", curr_user_list);
// 	list.value = curr_user_list
// 	console.log("list", list.value);
	
// })

// console.log("list before entering the pagination" ,list.value);
// const items = ref(list.value) 

//     const itemsPerPage = 5;
//     const currentPage = ref(1);
//     const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));
//     const paginatedItems = computed(() => {
//       const startIndex = (currentPage.value - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       return items.value.slice(startIndex, endIndex);
//     });

//     const nextPage = () => {
//       if (currentPage.value < totalPages.value) {
//         currentPage.value++;
//       }
//     };

//     const prevPage = () => {
//       if (currentPage.value > 1) {
//         currentPage.value--;
//       }
//     };


</script>

<style scoped>
/*style.css*/
* {
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

td,
th {
	text-align: center;
	width: 200px;
	border: 1px solid black;
}

th {
	font-size: 20px;
}
</style>
