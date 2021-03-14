<template>
  <div class="app-navbar py-2 py-md-2 bg-white">
    <div
      class="app-navbar-wrapper d-flex flex-column align-items-center w-100"
    >
      
      <div class="d-flex w-100 px-4 align-items-center justify-content-between">
        
        <div class="align-items-center d-flex">
          <img
            src="https://demo.toclient.com/assets/img/avatars/svg/man-4.svg"
            alt=""
            width="32px"
            height="32px"
          />
          <div class="p-0 mx-1">
            <h5
              class="d-inline-block my-0 p-0"
              style="font-weight: 10px; font-size: 14.4px"
            >
              {{name}}
            </h5>
            <p class="m-0 text-muted p-0" style="font-size: 14.4px">
              {{role}}
            </p>
          </div>
        </div>
        <button class="btn btn-danger" @click="logout">Logout</button>
        <div
          class="navbar-toggler d-block d-md-none"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i @click.prevent class="bi bi-list" />
        </div>
      </div>
      <div
        class="navbar-nav collapse d-md-block mb-2 mt-4 align-self-start w-100"
        id="navbarNav"
      >
        <ul class="list-group stepper-list w-100 px-0">
          <li
          v-for="user in listUser" :key="user.uid"
            @click="getter(user.uid)"
            class="border-1 list-group-item d-flex text-secondary justify-content-between px-2"
            :class="[{'active text-white':user.uid==$store.state.getter}]"
            role="button"
          >
            <div>
              <h4>{{user.user.firstName}}</h4>
            </div>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  methods:{
    logout(){
      this.$store.dispatch("logout")
      this.$router.push("/")
    },
    getter(id){
      this.$store.commit('setGetter',id)
      this.$store.dispatch('getMessages')
    }
  },
  computed : {
    name(){
      if(this.$store.state.customer.firstName){
        return this.$store.state.customer.firstName
      }
      return this.$store.state.agent.firstName
    },
    role(){
      if(this.$store.state.customer.role){
        return this.$store.state.customer.role
      }
      return this.$store.state.agent.role
    },
    listUser(){
      if(this.$store.state.customer.role){
        return this.$store.state.agents
      }
      return this.$store.state.customers
    }
  },
  mounted(){
    this.$store.dispatch("getAllUser");
  }
};
</script>

<style lang="sass">
@import "../../assets/css/bootstrap.sass"

.app-navbar
  width: 279px
  @include media-breakpoint-down(md)
    width: 100%!important
    height: fit-content
  &-wrapper
    top: 2.5rem
    @include media-breakpoint-up(md)
      position: sticky

.stepper-list
  .actives
    background-color: #eaeeff
    span
      color: $primary
      font-size: 14px
      font-weight: 500
  .disabled
    color: $secondary !important

  &-actives
    line-height: 28px
    width: 28px
    height: 28px
    background-color: #cfe8ce
</style>