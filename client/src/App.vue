<template>
  <v-app>
    <div v-if="user">
      <v-system-bar app color="white" height="4" v-if="loading.isLoadingPage">
        <v-progress-linear indeterminate color="primary" style="position: initial !important"></v-progress-linear>
      </v-system-bar>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img alt="Vuetify Logo" class="shrink mr-2" contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

          <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex justify-space-around">
        <span>
          <v-icon aria-hidden="false" size="40" class="mr-1">
            mdi mdi-account-circle
          </v-icon> {{ user.email }}
        </span>
        <v-btn class="ml-9" @click="logOut()">
          ĐĂNG XUẤT <v-icon aria-hidden="false" size="25" class="ml-2">
            mdi mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
      </v-app-bar>
      <v-main>
      <router-view />
    </v-main>
    </div>

    <div v-else>
      <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="500">
          <h1 class="mb-6 text-center">Login</h1>
          <v-form v-model="form.user.valid" ref="form" lazy-validation>
            <v-text-field v-model="form.user.value.email" :rules="form.user.validate.email" label="Email" required
              outlined></v-text-field>
            <v-text-field v-model="form.user.value.password" :append-icon="form.user.show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="form.user.validate.password" :type="form.user.show1 ? 'text' : 'password'" label="Password" outlined
              @click:append="form.user.show1 = !form.user.show1"></v-text-field>
            <v-btn class="mb-5" block color="success" @click="login()" :loading="loading.isSave">
              Submit
            </v-btn>
            <v-snackbar v-model="snackbar.snackbar" :timeout="timeout">
              {{ snackbar.text }}

              <template v-slot:action="{ attrs }">
                <v-btn v-if="snackbar.status == 'error'" color="red" text v-bind="attrs"
                  @click="snackbar.snackbar = false">
                  Close
                </v-btn>

                <v-btn v-else-if="snackbar.status == 'success'" color="green" text v-bind="attrs"
                  @click="snackbar.snackbar = false">
                  Close
                </v-btn>

                <v-btn v-else color="yellow" text v-bind="attrs" @click="snackbar.snackbar = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-form>
        </v-card>
      </v-sheet>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import UserApi from '../src/api/user';
export default Vue.extend({
  name: 'Home',
  data() {
    return {
      user: null,
      snackbar: {
        snackbar: false,
        text: "My timeout is set to 2000.",
        status: "error",
      },
      timeout: 2000,
      form: {
        user: {
          valid: true,
          show1: false,
          value: {
            email: '',
            password: '',
          } as any,
          default: {
            email: '',
            password: '',
          },
          validate: {
            email: [
              (v: any) => !!v || 'E-mail is required.',
              (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
            ],
            password: [
              (v: any) => !!v || 'Password is required.',
              (v: any) =>
                (v && v.length >= 6) || "Password must be more than 6 characters.",
            ]
          },
        }
      },
      loading: {
        isSave: false,
        isLoadingPage: false
      },
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user') as any);

    if (!user) {
      this.$router.push({
        path: "/",
      });
    } else {
      this.user = user;
      this.loading.isLoadingPage = false;
      this.$router.push({
        path: "product",
      });
    }
  },
  methods: {
    // action
    async login() {
      let that = this;
      const valid = (that.$refs.form as Vue & { validate: () => boolean }).validate();
      if (valid) {
        that.loading.isSave = true;

        const { email, password } = that.form.user.value;
        const login = await UserApi.Login(email, password);
        switch (login.status) {
          case 200:
            that.snackbar = {
              snackbar: true,
              text: login.message,
              status: "success",
            };

            window.location.reload();
            break;
          case 400:
            that.snackbar = {
              snackbar: true,
              text: login.message,
              status: "warning",
            };
            break;
          default:
            that.snackbar = {
              snackbar: true,
              text: login.message,
              status: "error",
            };
        }

        that.loading.isSave = false;
      }
    },
    logOut() {
      localStorage.clear();
      window.location.reload();
    },
  },
});
</script>
