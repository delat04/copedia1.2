<template>
<div class="box">
<div class="banner_high">
  <img src="/logo.png" alt="">
  <div class="language">
    <div class="flag">
      <img src="/public/images/fr_flag.png" alt="">
    </div>
  </div>
</div>
</div>


<h1>Se connecter</h1>

<div class="in">
  <label for="name">Adresse Mail</label>
  <div>
    <input type="text" v-model="username" placeholder="E-mail" />
    <img v-if="username.length >= 4" src="/images/ok.png" alt="">
  </div>
  <div class="button_action">
    <button v-on:click="username = '@gmail.com'">@gmail.com</button>
    <button v-on:click="username = '@yahoo.com'">@yahoo.com</button>
    <button v-on:click="username = '@outlook.com'">@outlook.com</button>
    <button v-on:click="username = '@aol.com'">@aol.com</button>
  </div>
</div>

<div class="in">
  <label for="name">Mot de passe</label>
  <div>
    <input v-model="password" type="password" placeholder="8 caractere minimum" required />
    <img v-if="password.length >= 8" src="/images/ok.png" alt="">
  </div>
</div>

<div class="password_bar">
  <div :class="{'bar': true, 'green': password.length > 1}"></div>
  <div :class="{'bar': true, 'green': password.length > 3}"></div>
  <div :class="{'bar': true, 'green': password.length > 5}"></div>
  <div :class="{'bar': true, 'green': password.length > 7}"></div>
</div>

<div class="check_bar">
  <div>
    <input type="checkbox" name="remember_me" id="remember_me" v-model="rememberMe">
    <label for="remember_me">Se souvenir de moi</label>
  </div>
  <a href="#">Mot de passe oublié ?</a>
</div>

<button class="log" @click="login">Se connecter</button>

<span>Pas encore de compte ? <router-link to="/signup">S'inscrire</router-link></span>

</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  //const router = useRouter()
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3001/login', {
          username: this.username,
          password: this.password
        });

        if (response.status === 200) {
          // Authentication successful, navigate to app page
          this.$router.push('/main'); // Change '/app' to your app's main route
        }
      } catch (error) {
        // Authentication failed, handle error
        console.error("Invalid username or password", error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
body {
  margin: 0;
  padding: 0;
  background-color: #EBECF0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110vh;
  font-family: 'Lato', sans-serif;
}

.box {
  background-color: #fff;
  display: flex;
  border-radius: 1em;
  width: 30vw;
  flex-direction: column;
  padding: 2em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  .message {
    background-color: #EBECF0;
    border-radius: 0.5em;
    padding: 1em;
  }
  .red {
    background-color: #e45656a4;
    color: #fff;
    visibility: visible;
  }
  .green {
    background-color: rgba(109, 209, 109, 0.664);
    color: #fff;
    visibility: visible;
  }
  .visibility {
    visibility: hidden;
  }
  .banner_high {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em 0;
    img {
      width: 3em;
    }
    h1 {
      margin: 0.6em;
      font-weight: 600;
    }
    .language {
      display: flex;
      border-radius: 0.5em;
      background-color: #F9FAFC;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 0px;
      .flag {
        cursor: pointer;
        margin: 0.3em;
        border-radius: 0.3em;
        padding: 0.3em 0.6em;
        display: flex;
        img {
          width: 2em;
        }
      }
    }
  }
  .log {
    background-color: #000;
    padding: 1.4em;
    color: #fff;
    border-radius: 0.7em;
    border: 1px solid #000;
    transition: 250ms;
    cursor: pointer;
    &:hover {
      border: 1px solid #000;
      background-color: transparent;
      color: #000;
    }
  }
  .in {
    display: flex;
    flex-direction: column;
    margin: 0.8em 0;
    div {
      display: flex;
      align-items: center;
      width: 100%;
    }
    label {
      margin: 0.2em;
    }
    img {
      width: 2em;
      margin: 0 0.5em;
    }
    v-text-field {
      display: flex;
      width: 100%;
    }
    input {
      width: 100%;
      padding: 1em;
      display: flex;
      border: 1px solid #EBECF0;
      border-radius: 0.7em;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 0px;
      background-size: 50px;
    }
    .button_action {
      display: flex;
      flex-direction: row;
      margin: 0.5em 0;
      button {
        border: 0;
        padding: 0.4em 0.8em;
        margin: 0.2em;
        background-color: #fff;
        border: 1px solid #EBECF0;
        cursor: pointer;
        transition: 250ms;
        &:hover {
          background-color: rgb(232, 232, 232);
        }
        border-radius: 5em;
      }
    }
  }
  .check_bar {
    margin: 1em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    a {
      color: #000;
    }
    div {
      input[type=checkbox] {
        margin: 0 1em;
      }
    }
  }
  span {
    text-align: center;
    margin: 1em 0;
    color: #677083;
    a {
      color: #000;
    }
  }
  .password_bar {
    display: flex;
    width: 100%;
    .bar {
      width: 25%;
      height: 6px;
      background-color: #EBECF0;
      border-radius: 1em;
      margin: 6px;
    }
    .green {
      background-color: rgb(109, 209, 109);
    }
  }
}

.gold-mid {
  background-color: #666666;
}

.gray-lighter {
  background-color: #c2c2c2;
}

.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 32px;
  height: 18px;
  border-radius: 9999px;
}

.toggle-wrapper:focus {
  outline: 0;
}

.toggle-background {
  display: inline-block;
  border-radius: 9999px;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color .4s ease;
}

.toggle-indicator {
  position: absolute;
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform .4s ease;
}

.active {
  background-color: #FFF;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 0px;
}

</style>
