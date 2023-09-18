<template>
    <div v-if="!user">
        <v-sheet class="bg-deep-purple pa-12" rounded>
            <v-card class="mx-auto px-6 py-8" max-width="500">
                <h1 class="mb-6 text-center">Login</h1>
                <v-form v-model="form.user.valid" ref="form" lazy-validation @submit.prevent="submit">
                    <v-text-field v-model="form.user.value.email" :rules="form.user.validate.email" label="Email" required
                        outlined></v-text-field>
                    <v-text-field v-model="form.user.value.password"
                        :append-icon="form.user.show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="form.user.validate.password"
                        :type="form.user.show1 ? 'text' : 'password'" label="Password" outlined
                        @click:append="form.user.show1 = !form.user.show1"></v-text-field>
                    <v-btn class="mb-5" block color="success" type="submit" @click="snackbar = true"
                        :loading="loading.isSave">
                        Submit
                    </v-btn>
                    <v-snackbar v-model="snackbar" :timeout="timeout">
                        {{ text }}

                        <template v-slot:actions>
                            <v-btn color="pink" variant="text" @click="snackbar = false">
                                Close
                            </v-btn>
                        </template>
                    </v-snackbar>
                </v-form>
            </v-card>
        </v-sheet>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import UserApi from '../../api/user'
export default Vue.extend({
    name: "Login",
    props: ['user'],
    components: {},
    data() {
        return {      
            snackbar: false,
            text: '',
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
                isSave: false
            },
        };
    },
    mounted() {
        if (this.user) {
            this.$router.push({ name: 'product' })
        }
    },
    watch: {
        user() {
            if (this.user) {
                this.$router.push({ name: 'product' })
            }
        }
    },
    methods: {
        // action
        async submit() {
            let that = this;
            const valid = (that.$refs.form as Vue & { validate: () => boolean }).validate();
            if (valid) {
                that.loading.isSave = true;
                const formData = new FormData();
                formData.append('email', that.form.user.value.email);
                formData.append('password', that.form.user.value.password);

                const login = await UserApi.Login(formData);
                if (login === 'Unauthorized') {
                    that.$emit('showSnackbar', { snackbar: true, text: 'Sai tài khoản hoặc mật khẩu!' });
                    that.loading.isSave = false;
                }
                else {

                    if (!login.error) {
                        localStorage.setItem("token_id", login.data.token_id);
                        that.$emit('showSnackbar', { snackbar: true, text: login.message});

                        that.$router.push({ name: 'product' })
                    } else {
                        that.$emit('showSnackbar', { snackbar: true, text: login.message });
                        that.loading.isSave = false;
                    }
                }
            }
        },
    },
});
</script>

