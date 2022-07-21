<template>
  <div class="card">
    <div class="header">
      <h1
        @click="
          () => {
            inLoginForm = true;
            error = false;
          }
        "
      >
        LOGIN
      </h1>
      <h1
        @click="
          () => {
            inLoginForm = false;
            error = false;
          }
        "
      >
        SIGNUP
      </h1>
    </div>
    <form autocomplete="off" v-if="inLoginForm">
      <h3 v-if="error" style="color: red">username or password is wrong</h3>
      <input
        id="userNameInput"
        type="text"
        class="inputField"
        name="username"
        placeholder="username"
        v-model="username"
      />
      <label for="email" class="inputLabel" id="emailLabel">username</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        class="inputField"
        placeholder="Password"
        v-model="password"
      />
      <label for="password" class="inputLabel" id="passwordLabel"
        >password
      </label>
      <button @click.prevent="doLogin">Login</button>
    </form>

    <form autocomplete="off" v-if="!inLoginForm">
      <input
        id="userNameInput"
        type="text"
        class="inputField"
        name="username"
        placeholder="username"
        v-model="username"
      />
      <h3 v-if="error" style="color: red">{{ errorText }}</h3>
      <label for="email" class="inputLabel" id="emailLabel">username</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        class="inputField"
        placeholder="Password"
        v-model="password"
        minlength="8"
        maxlength="16"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      />
      <label for="password" class="inputLabel" id="passwordLabel"
        >password
      </label>
      <button @click.prevent="doSignup">Signup</button>
    </form>
  </div>
</template>

<script>
import { LOGIN_IN, SIGN_UP } from "@/graphql";
import router from "@/router";
export default {
  data() {
    return {
      username: "",
      password: "",
      inLoginForm: true,
      error: false,
      errorText: "",
    };
  },
  methods: {
    async doLogin() {
      localStorage.setItem("token", this.username);
      let data = await this.$apollo.query({
        query: LOGIN_IN,
      });
      try {
        if (
          data.data.users[0].username === this.username &&
          data.data.users[0].password == this.password
        ) {
          this.$store.dispatch("login");
        }
      } catch (err) {
        console.log("Catch Section");
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    },
    doSignup() {
      if (!this.username && !this.password) {
        return alert("Fill all the details before signup");
      }
      try {
        this.$apollo.mutate({
          mutation: SIGN_UP,
          variables: {
            username: this.username,
            password: this.password,
          },
        });
        localStorage.setItem("loginToken", this.username);
        localStorage.setItem("token", this.username);
        router.push("/map");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");
.card {
  font-family: "Montserrat", sans-serif;
  background-color: #023047;
  margin: 10% 20%;
  padding: 10rem 10rem;
  box-shadow: 15px 15px 1rem #023047a8;
  .header {
    display: flex;
    justify-content: space-between;
    h1 {
      margin-top: -5rem;
    }
  }
  form {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
    height: 100%;
    input::invalid {
      &::after {
        content: "Wrong input";
      }
    }
    .inputField {
      height: 2rem;
      margin-block-end: 2rem;
      text-align: left;
      width: 100%;
      border: 0;
      border-bottom: 2px solid #ccc;
      padding: 7px 0;
      outline: 0;
      font-size: 1.3rem;
      color: #fff;
      background: transparent;
      transition: border-color 0.2s;
      grid-column: 1/3;
      &::placeholder {
        color: transparent;
      }
      &:placeholder-shown ~ .inputLabel {
        font-size: 1.3rem;
        cursor: text;
        top: 30px;
      }
      &:placeholder-shown ~ #passwordLabel {
        font-size: 1.3rem;
        cursor: text;
        top: 120px;
      }
      &:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(
          43deg,
          #ffcc70 0%,
          #c850c0 46%,
          #4158d8 100%
        );
        border-image-slice: 5;
      }
    }
    #userNameInput:focus ~ #emailLabel {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #ffcc70;
      font-weight: 700;
    }
    #passwordInput:focus ~ #passwordLabel {
      position: absolute;
      top: 100px;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #ffcc70;
      font-weight: 700;
    }
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }
  .inputLabel {
    position: absolute;
    display: block;
    font-size: 1px;
    transition: 0.2s;
    color: rgb(255, 255, 255);
  }
  button {
    color: #fff;
    background: transparent;
    height: 3rem;
    width: 100%;
    grid-column: 1/3;
    margin-top: 1rem;
  }
  #passwordInput {
    margin-block-start: 0.8rem;
  }
}
</style>
