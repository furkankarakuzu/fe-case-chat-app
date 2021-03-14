<template>
  <div
    v-if="$store.state.getter"
    class="input-group d-flex justify-self-end mt-auto position-sticky start-0 bottom-0 px-4 py-3 bg-white"
  >
    <span
      class="input-group-text bi bi-envelope ps-3 border-0"
      style="background-color: #f9faff"
      id="basic-addon1"
    ></span>
    <input
      type="text"
      v-model="answer"
      
      class="form-control py-3 border-0"
      style="background-color: #f9faff"
      placeholder="Type Your Answer"
      aria-label="Username"
      aria-describedby="basic-addon1"
      id="msg"
      @keydown.enter="sendAnswer()"
    />
    <span
      class="input-group-text border-0 px-6"
      style="background-color: #f9faff; cursor: pointer"
      @click="sendAnswer()"
    >
      <svg
        id="Capa_1"
        style="background-color: #f9faff"
        enable-background="new 0 0 465.882 465.882"
        height="21"
        viewBox="0 0 465.882 465.882"
        width="21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m465.882 0-465.882 262.059 148.887 55.143 229.643-215.29-174.674 235.65.142.053-.174-.053v128.321l83.495-97.41 105.77 39.175z"
        />
      </svg>
    </span>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      answer: "",
    };
  },
  methods: {
    async sendAnswer() {
      let roomID = this.$store.getters.getRoomID
      let time = this.time()
      let message = this.answer
      await this.$store.dispatch('sendMessage',{message, time , roomID})
      this.$store.dispatch('getMessages')
      this.answer=""
    },
    
    time() {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
  },
};
</script>

<style>
</style>