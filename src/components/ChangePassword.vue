<template>
  <div class="grid mt-3 register-card">
    <div class="col-12 sm:col-8 md:col-6 lg:col-6 xl:col-4">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <Card class="border-card-register">
          <template #title>
            <div style="display: flex; justify-content: space-between">
              <div class="green-900">Change Password</div>
              <i
                id="loader"
                class="pi pi-spin pi-spinner"
                style="font-size: 2rem; display: none"
              ></i>
            </div>
          </template>
          <template #content>
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="label-sign">Password</label>
              <span class="p-input-icon-right mt-2">
                <Password
                  id="password"
                  v-model="v$.password.$model"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                  toggleMask
                >
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer="sp">
                    {{ sp.level }}
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 8 characters</li>
                      <li>At least one symbol</li>
                    </ul>
                  </template>
                </Password>
              </span>
              <span v-if="v$.password.$error && submitted">
                <span
                  id="password-error"
                  v-for="(error, index) of v$.password.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="
                  (v$.password.$invalid && submitted) ||
                  v$.password.$pending.$response
                "
                class="p-error"
                >{{
                  v$.password.required.$message.replace("Value", "Password")
                }}</small
              >
            </div>

            <!-- Confirm Password -->
            <div class="mb-3">
              <label for="repassword" class="label-sign"
                >Confirm Password</label
              >
              <span class="p-input-icon-right mt-2" style="width: 100%">
                <InputText
                  :type="[isHidePassword ? 'password' : 'text']"
                  id="repassword"
                  v-model="v$.repassword.$model"
                  :class="{ 'p-invalid': v$.repassword.$invalid && submitted }"
                  style="width: 100%"
                />
                <i
                  :class="[isHidePassword ? 'pi pi-eye' : 'pi pi-eye-slash']"
                  @click="onChangHiden"
                />
              </span>
              <span v-if="v$.repassword.$error && submitted">
                <span
                  id="password-error"
                  v-for="(error, index) of v$.repassword.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="
                  (v$.repassword.$invalid && submitted) ||
                  v$.repassword.$pending.$response
                "
                class="p-error"
                >{{
                  v$.repassword.required.$message.replace("Value", "Password")
                }}</small
              >
            </div>
          </template>

          <template #footer>
            <div class="center p-buttonset mb-3">
              <div>
                <Button
                  icon="pi pi-check"
                  class="p-button-warning btn-update"
                  type="submit"
                  label="Update Password"
                />
              </div>
              <router-link to="/adminlist">
                <Button
                  icon="pi pi-times"
                  label="Cancel"
                  class="p-button-secondary btn-update"
                />
              </router-link>
            </div>
          </template>
        </Card>
      </form>
    </div>
  </div>
  <Toast />
</template>

<script>
import CustomerService from "./../userService";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { maxLength, minLength, helpers, sameAs } from "@vuelidate/validators";
import axios from "axios";
import MD5 from "crypto-js/md5";
// import MD5 from "crypto-js/md5";
const RegisterVali = (value) =>
  value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*?[#?!@$%^&*-])");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  name: 'ChangePassword',
  created(){
    if (!localStorage.getItem("user")) {
      this.$router.push("/login");
    }
  },
  emits: ["clicked-something"],
  setup({ emit }) {
    return { v$: useVuelidate() };
  },
  created() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/login");
    } else {
      this.customerService.getAdmin(this.$route.query.id).then((data) => {
        this.admin = data;
        this.oldpassword = this.admin.password;
      });
    }
  },
  data() {
    return {
      admin: {},
      customerService: new CustomerService(),
      isHidePassword: true,
      email: "",
      password: "",
      username: "",
      repassword: "",
      oldpassword: '',
      showMessage: false,
      submitted: false,
    };
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(8),
        RegisterVali: helpers.withMessage(
          " ***Tip: have one symbol, numeric, uppercase, lowercase?",
          RegisterVali
        ),
      },
      repassword: {
        required,
        sameAsPassword: helpers.withMessage(
          " Confirm Password not match Password",
          sameAs(this.password)
        ),
      },
    };
  },
  methods: {
    async handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      loader.style.display = "block";

      let dataUpdatePass = {
        password: MD5(this.password).toString(),
        id: this.$route.query.id,
      }
      this.customerService.updatePassword(dataUpdatePass).then(() => {
        this.$toast.add({
          severity: "success",
          summary: "Update Password success",
          detail: `Update password info success`,
          life: 2000,
        });
      });

      // const res = await axios.post("users", {
      //   username: this.username,
      //   email: this.email,
      //   password: passwordHash,
      //   // password: this.password,
      // });
      // this.$toast.add({
      //   severity: "success",
      //   summary: "Register Success",
      //   detail: `Wellcome ${res.data.username}`,
      //   life: 2000,
      // });

      loader.style.display = "none";
      this.submitted = false;
      await sleep(2000);
      this.$router.push("/adminlist");
    },
  },
}
</script>

<style scoped>
.register-card {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.border-card-register {
  border: solid 1px #036476;
  border-top: solid 5px #036476;
  border-radius: 15px;
  box-shadow: 10px 10px 30px;
  background-color: rgba(255, 255, 255, 0.5);
}
.label-sign {
  font-weight: 700;
}
.green-900 {
  color: #036476;
}
.center {
  display: flex;
  justify-content: center;
}
.link-color {
  color: #036476;
  text-decoration: none;
  font-weight: 700;
}
.btn-update {
  font-weight: bold;
  color: #ffffff;
}
</style>