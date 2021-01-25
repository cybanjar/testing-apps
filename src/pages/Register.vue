<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <div class="col-md-4">
      <q-form @submit.prevent="register" class="q-gutter-md">
        <q-input
          outlined
          v-model="userEmail"
          label="Username *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          required
        />

        <q-input
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="userPassword"
          label="Password *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your password'
          ]"
          required
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="float-right">
          <q-btn
            outline
            label="Cancel"
            type="reset"
            color="primary"
            flat
            class="q-mr-sm"
          />
          <q-btn label="Register" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent,reactive, toRefs, ref } from "@vue/composition-api";
import api from "../api/users.api";

export default defineComponent({
  setup(props, { root }) {
    const state = reactive({
      userEmail: "",
      userPassword: "",
      isPwd: true,
      loginInfo: {
        loginErrorState: null,
        loginMsg: ""
      },
      showUpdatePassword: false
    });

    async function register() {
      const userLogin = await api.doFetch("register", {
        userName: state.userEmail,
        userPswd: state.userPassword
      });
      console.log(userLogin);      

      if (!userLogin || userLogin == null) {
        state.loginInfo.loginMsg =
          "The email you entered doesn't match any of the accounts.";
      } else {
        const message = userLogin.response.message;
        if (message == 'success') {          
          root.$router.push({
            path: "/"
          });          
        } else {
          state.loginInfo.loginMsg =
            "The email you entered doesn't match any of the accounts.";
        }
      }
    }

    return {
      ...toRefs(state),
      register
    };
  },
});
</script>
