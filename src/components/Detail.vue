<template>
  <div class="grid mt-3 register-card">
    <div class="col-12 sm:col-8 md:col-6 lg:col-6 xl:col-4">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <Card class="border-card-register">
          <template #title>
            <div style="display: flex; justify-content: space-between">
              <div class="green-900">User info & Update</div>
              <i
                id="loader"
                class="pi pi-spin pi-spinner"
                style="font-size: 2rem; display: none"
              ></i>
            </div>
          </template>
          <template #content>
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

            <p>
              Want to change your password?
              <router-link :to="{ path: '/changepass', query: { id: id } }" class="link-color"> 
                Change now!
              </router-link>
            </p>
          </template>

          <template #footer>
            <div class="center p-buttonset mb-3">
              <div>
                <Button
                  icon="pi pi-check"
                  class="p-button-warning btn-update"
                  type="submit"
                  label="Update Account"
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
import { maxLength } from "@vuelidate/validators";
import axios from "axios";
import MD5 from "crypto-js/md5";
// import MD5 from "crypto-js/md5";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  name: "Detail",
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
        this.username = this.admin.username;
        this.email = this.admin.email;
        this.id = this.admin.id
      });
    }
  },
  data() {
    return {
      admin: {},
      customerService: new CustomerService(),
      isHidePassword: true,
      id: '',
      email: "",
      username: "",
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
      username: {
        required,
        maxLength: maxLength(10),
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
      let dataUpdate = {
        id: this.$route.query.id,
        email: this.email,
        username: this.username,
      };
      this.customerService.updateAdmin(dataUpdate).then((data) => {
        this.admin = data;
        this.$toast.add({
          severity: "success",
          summary: "Update info success",
          detail: `Update ${this.admin.username} info success`,
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