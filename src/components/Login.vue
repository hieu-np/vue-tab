<template>
  <div class="grid mt-3 login-card">
    <div class="col-12 sm:col-8 md:col-6 lg:col-6 xl:col-4">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <Card class="border-card-sign">
          <template #title>
            <div style="display: flex; justify-content: space-between">
              <div class="primary-900">Login</div>
              <i
                id="loader"
                class="pi pi-spin pi-spinner"
                style="font-size: 2rem; display: none"
              ></i>
            </div>
          </template>
          <template #content>
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

            <div class="mb-3">
              <label for="password" class="label-sign">Password</label>
              <span class="p-input-icon-right mt-2" style="width: 100%">
                <InputText
                  :type="[isHidePassword ? 'password' : 'text']"
                  id="password"
                  v-model="v$.password.$model"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                  style="width: 100%"
                />
                <i
                  :class="[isHidePassword ? 'pi pi-eye' : 'pi pi-eye-slash']"
                  @click="onChangHiden"
                />
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
            <p>
              Do not have an account?
              <router-link to="/register" class="link-color"
                >Sign up now!</router-link
              >
            </p>
          </template>
          <template #footer>
            <div class="center p-buttonset mb-3">
              <Button icon="pi pi-check" type="submit" label="Login" />
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
import { minLength, helpers } from "@vuelidate/validators";
import axios from "axios";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  created() {
    if (localStorage.getItem("user")) {
        this.$router.push('/home')
    }
  },
  emits: ["clicked-something"],
  setup({ emit }) {
    return { v$: useVuelidate() };
  },

  name: "Login",
  data() {
    return {
      isHidePassword: true,
      email: "",
      password: "",
      showMessage: false,
      submitted: false,
      user: [],
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
      },
    };
  },
  methods: {
    onChangHiden() {
      this.isHidePassword = !this.isHidePassword;
    },
    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },

    async handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      loader.style.display = "block";
      const res = await axios.get(`users/?email=${this.email}`);
      // if (res && res?.data) {
      //   this.$toast.add({
      //     severity: "success",
      //     summary: "Register Success",
      //     detail: `Wellcome ${res.data.username}`,
      //     life: 2000,
      //   });
      // }
      this.user = res.data[0];
      if (
        this.user.password === this.password &&
        this.user.email === this.email
      ) {
        localStorage.setItem("user", JSON.stringify(this.user));
        this.$toast.add({
          severity: "success",
          summary: "Sign in Success",
          detail: `Wellcome ${this.user.username}`,
          life: 3000,
        });
        // this.$emit('signIn')
        // this.handleClick()
        this.$emit("clicked-something");
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Sign in failed",
          detail: `Invalid email or password`,
          life: 3000,
        });
        loader.style.display = "none";
        return;
      }
      loader.style.display = "none";
      await sleep(2000);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-card {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.border-card-sign {
  border: solid 1px rgb(24, 52, 98);
  border-top: solid 5px rgb(24, 52, 98);
  border-radius: 15px;
  box-shadow: 10px 10px 30px;
  background-color: rgba(255, 255, 255, 0.5);
}
.label-sign {
  font-weight: 700;
}
.primary-900 {
  color: rgb(24, 52, 98);
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
