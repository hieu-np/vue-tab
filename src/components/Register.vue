<template>
  <div class="grid mt-3 register-card">
    <div class="col-12 sm:col-8 md:col-6 lg:col-6 xl:col-4">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <Card class="border-card-register">
          <template #title>
            <div style="display: flex; justify-content: space-between">
              <div class="green-900">Register Account</div>
              <i
                id="loader"
                class="pi pi-spin pi-spinner"
                style="font-size: 2rem; display: none"
              ></i>
            </div>
          </template>
          <template #content>
            <!-- Username -->
            <div class="mb-2">
              <label for="username" class="label-sign">User Name</label>
              <span class="p-input-icon-right mt-2" style="width: 100%">
                <InputText
                  type="text"
                  id="username"
                  v-model="v$.username.$model"
                  :class="{ 'p-invalid': v$.username.$invalid && submitted }"
                  style="width: 100%"
                />
                <i class="pi pi-user" />
              </span>
              <span v-if="v$.username.$error && submitted">
                <span
                  id="email-error"
                  v-for="(error, index) of v$.username.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="
                  (v$.username.$invalid && submitted) ||
                  v$.username.$pending.$response
                "
                class="p-error"
                >{{
                  v$.username.required.$message.replace("Value", "Username")
                }}</small
              >
            </div>

            <!-- Email -->
            <div class="mb-2">
              <label for="email" class="label-sign">Email</label>
              <span class="p-input-icon-right mt-2" style="width: 100%">
                <InputText
                  type="text"
                  id="email"
                  v-model="v$.email.$model"
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                  style="width: 100%"
                />
                <i class="pi pi-at" />
              </span>
              <span v-if="v$.email.$error && submitted">
                <span
                  id="email-error"
                  v-for="(error, index) of v$.email.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="
                  (v$.email.$invalid && submitted) ||
                  v$.email.$pending.$response
                "
                class="p-error"
                >{{
                  v$.email.required.$message.replace("Value", "Email")
                }}</small
              >
            </div>

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

            <p>
              Have an account?
              <router-link to="/login" class="link-color"
                >Sign in now!</router-link
              >
            </p>
          </template>

          <template #footer>
            <div class="center p-buttonset mb-3">
              <Button
                icon="pi pi-check"
                class="p-button-success"
                type="submit"
                label="Register Account"
                :disabled="submitted"
              />
              <Button
                icon="pi pi-refresh"
                label="Reset Form"
                class="p-button-secondary"
                type="reset"
              />
            </div>
          </template>
        </Card>
      </form>
    </div>
  </div>
  <Toast />
</template>

<script>
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { maxLength, minLength, helpers, sameAs } from "@vuelidate/validators";
import axios from "axios";
const RegisterVali = (value) =>
  value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*?[#?!@$%^&*-])");
// const contains = (param) =>
//   helpers.withParams(
//     { type: 'contains', value: param },
//     (value) => !helpers.req(value) || value.match(param)
//   )
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Register",
  data() {
    return {
      isHidePassword: true,
      email: "",
      password: "",
      username: "",
      repassword: "",
      showMessage: false,
      submitted: false,
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        RegisterVali: helpers.withMessage(
          " ***Tip: have one symbol, numeric, uppercase, lowercase?",
          RegisterVali
        ),
      },
      username: {
        required,
        maxLength: maxLength(10),
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
    onChangHiden() {
      this.isHidePassword = !this.isHidePassword;
    },
    // toggleDialog() {
    //   this.showMessage = !this.showMessage;

    //   if (!this.showMessage) {
    //     this.resetForm();
    //   }
    // },
    async handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        this.submitted = false;
        return;
      }
      loader.style.display = "block";

      const getEmail = await axios.get(`users/?email=${this.email}`);

      if (getEmail.data.length != 0) {
        this.$toast.add({
          severity: "error",
          summary: "Register Failed",
          detail: `This account already exists, please use another email`,
          life: 5000,
        });
        this.submitted = false;
        loader.style.display = "none";
        return
      } else {
        const res = await axios.post("users", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$toast.add({
          severity: "success",
          summary: "Register Success",
          detail: `Wellcome ${res.data.username}`,
          life: 2000,
        });
        loader.style.display = "none";
        this.submitted = false;
        await sleep(2000);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.register-card {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.border-card-register {
  border: solid 1px #188a42;
  border-top: solid 5px #188a42;
  border-radius: 15px;
  box-shadow: 10px 10px 30px;
  background-color: rgba(255, 255, 255, 0.5);
}
.label-sign {
  font-weight: 700;
}
.green-900 {
  color: #188a42;
}
.center {
  display: flex;
  justify-content: center;
}
.link-color {
  color: #188a42;
  text-decoration: none;
  font-weight: 700;
}
</style>