const Login = reslove => {
    require.ensure(["./components/login"],()=>{
        reslove(require("./components/login"));
    })
}
const Home = reslove => {
    require.ensure(["./components/home"],()=>{
        reslove(require("./components/home"));
    })
}

import store from './store'
export const routes = [
    {path:'/', component : Login,
    beforeEnter(to,from,next){
       if(!store.getters.isAuthenticated){
           next()
         }else{
             next("/home")
         }
   }},
    {path : '/home', component : Home,
     beforeEnter(to,from,next){
        if(store.getters.isAuthenticated){
            next()
          }else{
              next("/")
          }
    }
},
    {path:"*", redirect : "/"},
]