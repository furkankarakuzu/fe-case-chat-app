<template>
  <div v-if="loadMessages.length>0">
    <div
    v-for="(message, i) in loadMessages" :key="i"
      class="col-md-12 d-flex align-items-end my-2 pe-2"
      
    >
      <div :class="[{'me sbMe':message.sendBy==$store.state.userToken}, {'other order-1 ms-1 sbOther':message.sendBy!=$store.state.userToken}]" class="box py-2 px-4">
        <div class="row">
          {{message.message}}
        </div>
        <small class="float-end d-block mt-1">{{message.sendAt}}</small>
      </div>
      <img
        class="img"
        :class="[{'order-0':message.sendBy!=$store.state.userToken}]"
        :src="`https://demo.toclient.com/assets/img/avatars/svg/man-${message.sendBy==$store.state.userToken ? '3' : '4'}.svg`"
        alt=""
        width="32px"
        height="32px"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  computed : {
    loadMessages(){
      return this.$store.state.messages
    }
  }
};
</script>

<style scoped>
.box {
  height: auto;
  background: #00bfb6;
  text-align: center;
  color: #fff;
  font-family: "rubik";
  position: relative;
}
.img {
  margin-left: 10px;
}
.other {
  background-color: #2e5bff;
  
}
.me {
  background-color: #656565;
  margin-left: auto;
}
.sbMe {
  color: white;
  position: relative;
  box-shadow: 0px -1px 2px #ccc;
  border-radius: 20px;
  max-width: 385px;
  border-bottom-right-radius: 0px;
}
.sbMe:after {
  content: "";
  position: absolute;
  width: 0;
  right: 0px;
  bottom: -8px;
  height: 0;
  border-top: 8px solid #2e5bff;
  border-left: 8px solid transparent;
}

.sbOther {
  color: white;
  position: relative;
  box-shadow: 0px -1px 2px #ccc;
  border-radius: 20px;
  max-width: 385px;
  border-bottom-left-radius: 0px;
}
.sbOther:after {
  content: "";
  position: absolute;
  width: 0;
  left: 0px;
  bottom: -8px;
  height: 0;
  border-top: 8px solid #2e5bff;
  border-right: 8px solid transparent;
}

.hvr {
  cursor: pointer;
}
.hvr:hover {
  border: 1px solid blue !important;
}
.callImg {
  max-width: 160px;
}
</style>