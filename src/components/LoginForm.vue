<template>
  <div class="card">
    <div class="header">
      <h1>LOGIN</h1>
    </div>
    <form autocomplete="off">
      <input
        id="emailInput"
        type="text"
        class="inputField"
        name="email"
        placeholder="Email"
      />
      <label for="email" class="inputLabel" id="emailLabel">Email</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        class="inputField"
        placeholder="Password"
      />
      <label for="password" class="inputLabel" id="passwordLabel"
        >Password
      </label>
      <button @click.prevent="doLogin">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    doLogin() {
      this.$store.dispatch("login");
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
    h1 {
      margin-top: -5rem;
    }
  }
  form {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
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
    #emailInput:focus ~ #emailLabel {
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
