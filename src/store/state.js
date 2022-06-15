const user = JSON.parse(localStorage.getItem('user'));
const stateUser = user
    ? user
    : null
export default {
  isSign: false,
  stateUser
  }