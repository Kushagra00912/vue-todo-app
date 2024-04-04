import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from  "../components/LoginPage.vue";
import register from  "../components/registrationPage.vue";
// import todo from  "../components/ToDoList.vue";
import createtask from  "../components/createTask.vue";
import todolist from '../components/ToDoList.vue';
import error from '../components/errorPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Loginpage',
      component: Login,
      meta: {
        requireAuth : false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: register,
      meta: {
        requireAuth : false
      }
    },
    
    {
      path: '/createtask',
      name: 'CreateTask',
      component: createtask,
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/todolist',
      name: 'ToDoList',
      component: todolist,
      meta: {
        requireAuth : true
      }
    },
    {
      path : '/:pathMatch(.*)*',
      name : 'error',
      component: error,
      meta: {
          requireAuth : false
        },

  }
    
  ]
})



router.beforeEach((to ) => {
    
  let isLoggedIn = localStorage.getItem('isLoggedIn')
  let isRegistered = localStorage.getItem('isRegistered')
  
  if(isLoggedIn == "false" && isRegistered == "true"){
      if(to.name != 'Loginpage'){
          return{name: 'Loginpage'}
      }
  }
  
  if(isLoggedIn == "false" && isRegistered == "false"){
      if(to.name != 'Register'){
          return{name: 'Register'}
      }
  }
  
  if(isLoggedIn == "true" && isRegistered == "true"){
      if(to.name == 'Loginpage' || to.name == 'Register'){
          return{name: 'CreateTask'}
      }
  }
  // if(to.name != 'Loginpage' || to.name != 'Register' || to.name != 'CreateTask' || to.name != 'ToDoList'){
  //    return{name : from.name}
  // }
})
export default router