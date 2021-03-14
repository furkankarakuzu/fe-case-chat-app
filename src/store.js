import Vuex from 'vuex'
import Vue from 'vue'
import { routes } from './routes'

import db from './firestore'


Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        customer: {},
        agent: {},
        customers: {},
        agents: {},
        sender: localStorage.getItem('token'),
        getter: "",
        userToken: localStorage.getItem('token') || '',
        messages: []
    },
    mutations: {
        setCustomer(state, value) {
            state.customer = value
        },
        setGetter(state, value) {
            state.getter = value
        },
        setAgent(state, value) {
            state.agent = value
        },
        setCustomers(state, value) {
            state.customers = value
        },
        setAgents(state, value) {
            state.agents = value
        },
        setUserToken(state, value) {
            state.userToken = value;
        },
        clearToken(state) {
            state.userToken = ""
        },
        clearAll(state) {
            state.customer = {}
            state.agent = {}
            state.agents = {}
            state.sender = ""
            state.getter = ""
            state.customers = {}
            state.messages=[]
        },
        setMessages(state, value) {

            let messages = []

            for (const message in value) {
                messages.push(value[message])
            }
            if (value!=null) {
                messages = [messages[messages.length - 1], ...messages.slice(0, (messages.length - 1))]
            }
            state.messages = messages
        },
    },
    getters: {
        getCustomer(state) {
            return state.customer
        },
        getGetter(state) {
            return state.getter
        },
        getCustomers(state) {
            return state.customers
        },
        getRoomID(state) {
            let sender
            if (state.customer.firstName) {
                sender = state.customer
            } else {
                sender = state.agent
            }
            let roomID = Math.random().toString(16).substr(2, 10)
            let getterID = state.getter
            if (sender.chatRooms) {
                Object.keys(sender.chatRooms).find((getter) => {
                    if (Object.hasOwnProperty.call(sender.chatRooms[getter], getterID)) {
                        roomID = sender.chatRooms[getter][getterID]
                    }
                })
            }
            return roomID
        },
        getAgents(state) {
            return state.agents
        },
        getAgent(state) {
            return state.agent
        },
        isAuthenticated(state) {
            return state.userToken !== ""
        },
        getMessages(state) {
            return state.messages
        }
    },
    actions: {
        logout({ commit }) {
            commit("clearToken")
            commit("clearAll")
            localStorage.removeItem("token")
            routes.push("/")
        },

        initAuth({ commit, dispatch }) {
            let token = localStorage.getItem("token")
            if (token) {
                commit("setUserToken", token)

                const users = db.ref("users/" + token)
                users.on("value", snapshot => {
                    let data = snapshot.val()
                    if (data.role == "Agent") {
                        commit('setAgent', data)
                    } else {
                        commit('setCustomer', data)
                    }
                    dispatch('getAllUser')
                })

                routes.push("/home")
            } else {
                routes.push("/")
            }
        },
        getAllUser({ commit }) {
            const users = db.ref("users")
            users.on("value", snapshot => {
                let allUser = snapshot.val()
                let agentsArr = []
                let customersArr = []
                for (const user in allUser) {
                    if (allUser[user].role == "Agent") {
                        agentsArr.push({ uid: user, user: allUser[user] })
                    } else {
                        customersArr.push({ uid: user, user: allUser[user] })
                    }
                }
                commit('setAgents', agentsArr)
                commit('setCustomers', customersArr)
            })
        },
        async getMessages({ getters, commit }) {

            let roomID = getters.getRoomID
            let messages

            const snapshot = db.ref('chatRooms/' + roomID)
            snapshot.on('value', snap => {
                messages = snap.val()
                commit('setMessages', messages)
            })

        },
        async sendMessage({ state }, { message, time, roomID }) {
            const chatRooms = db.ref('chatRooms/' + roomID)
            await chatRooms.once("value").then(snapshot => {
                let senderID = state.userToken
                let getter = state.getter
                let check = snapshot.exists()
                if (check) {
                    db.ref('chatRooms/' + roomID + '/').push({
                        sendBy: senderID,
                        sendAt: time,
                        message,
                    }).then(() => {
                        //this.$router.replace('home');
                    }).catch(err => {
                        //ekleme hata
                        console.log(err.message)
                    });
                } else {
                    let chatRoomID = db.ref('chatRooms').push(
                        { [Math.random().toString(16).substr(2, 10)]: { sendBy: senderID, sendAt: time, message } }
                    ).key


                    db.ref('users/' + senderID + '/chatRooms').push({ [getter]: chatRoomID })
                    db.ref('users/' + getter + '/chatRooms').push({ [senderID]: chatRoomID })
                }
            })

        },
    }
})

export default store