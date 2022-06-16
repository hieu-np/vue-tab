import { reactive } from "vue";

const state = reactive({
  isUserSign: false
})

const methods = {
  setUserSignIn(){
    state.isUserSign = true;
  },

  setUserSignOut(){
    state.isUserSign = false;
  }
}

export default {
  state,
  methods
}