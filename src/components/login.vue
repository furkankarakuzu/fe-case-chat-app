<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="deep-purple accent-4"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="(i, index) in tabs" :key="index">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginEmail"
                        :rules="loginEmailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="login(loginEmail, loginPassword)"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="registerFirstName"
                        :rules="[rules.required]"
                        label="First Name"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="registerLastName"
                        :rules="[rules.required]"
                        label="Last Name"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerEmail"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      class="d-flex"
                      cols="12"
                    >
                      <v-select
                        v-model="role"
                        :items="items"
                        label="Select a Role"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerPassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="register"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import db from '../firestore'
export default {
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Register", icon: "mdi-account-outline" },
      ],
      valid: true,
      items : ['Customer', 'Agent'],
      role : "Customer",
      firstName: "",
      registerFirstName:"",
      registerLastName:"",
      registerEmail:"",
      registerPassword:"",
      lastName: "",
      email: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginEmail: "",
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () => this.registerPassword === this.verify || "Password must match";
    },
  },
  methods: {
    login(email,password){
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        
        let user = firebase.database().ref('/users/' + res.user.uid)
        user.on('value', (snapshot) => {
          const data = snapshot.val();
          if(data.role=="Agent"){
            this.$store.commit('setAgent', data)
          }else{
            this.$store.commit('setCustomer', data)
          }
          this.$store.dispatch("initAuth");
        })
        
        localStorage.setItem("token", res.user.uid)
        this.$store.commit('setUserToken',res.user.uid);
        this.$router.push('/home')
      })
      .catch(err => {
        alert("Giriş işlemi sırasında bir hata oluştu "+ err.message)
      });
    },
    register() {
        firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
              displayName: this.firstName
          }).then(() => {
              db.ref('users/'+firebase.auth().currentUser.uid).set({
                firstName: this.registerFirstName,
                lastName: this.registerLastName,
                role : this.role,
                email: this.registerEmail
              }).then(() => {
                this.login(this.registerEmail, this.registerPassword)
                //this.$router.replace('home');
              }).catch(err => {
                //ekleme hata
                 alert("Kayıt işlemi sırasında bir hata oluştu "+ err.message)
              });
          }).catch(err => {
              //auth hata
              console.log(err.message)
          });
        }).catch(err => {
          //register hata
          console.log(err.message)
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  }
};
</script>

<style>
</style>