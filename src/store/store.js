import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    users: [],
    puser : {}
  }),
  actions: {
     async fetchUsers() {

        const response =  await axios.get("http://localhost:3000/users")
        this.users = response.data

    },
    async fetchUser(id){
      const response1 =  await axios.get(`http://localhost:3000/users/${id}`)
      console.log(response1.data);
      this.puser = response1.data
      console.log("lllll", this.puser);
    },
    async updatedetail(user){
      await axios.patch(`http://localhost:3000/users/${user.id}`, user)
      this.fetchUsers()
    },
    filters(val){
      let alltasks = this.getUser.todolist
      console.log("alltasks",alltasks);
      let list;
      if(val === "all"){
        list = alltasks
      }else{
        list = alltasks.filter((x) =>  x.Status === val)
      }
      return list;
    }
  },
  getters: {
    getUsers() {
        console.log("jasbjhas", this.users);
      return this.users;
    },
    getUser() {
        console.log("jaaaaaaaaaaaaasbjhas", this.puser);
      return this.puser;
    },
    
  }
  // setters: {
  //   setUsers(users) {
  //     this.users = users;
  //   },
  // },
});
