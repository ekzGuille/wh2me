<template>
  <div id="mainApp" class="app dark">
    <div class="bg_wrapper">
    </div>
    <main class="main">
      <div class="container">
        <h3 class="header">🌎 Select your country 🌏</h3>
        <div class="data">
          <form id="whatsappForm" @submit.prevent="sendMessage">
            <LoadingComponent v-if="this.countries.length === 0"/>
            <div
              v-if="this.countries.length !== 0">
              <select
                class="country-selector"
                v-model="seletedCountry"
                id="country"
              >
                <option value selected disabled>Country name</option>
                <option
                  v-for="country in countries"
                  :key="country.numericCode"
                  :value="country"
                  :style="{ backgroundImageUrl: country.flag}"
                >{{ country.alpha3Code }} - {{ country.name }}
                </option>
              </select>
            </div>
            <h3 class="header">Type the number ☎</h3>
            <div class="prefix-phone-wrapper">
              <div class="flag-prefix-wrapper">
                <img class="flag" :src="seletedCountry.flag" :alt="seletedCountry.alpha3Code"/>
                <input
                  class="input prefix"
                  type="text"
                  disabled
                  name="prefix"
                  id="prefix"
                  :value="`+ ${seletedCountry.callingCodes}`"
                  size="7"
                />
              </div>
              <input
                class="input phone"
                inputmode="tel"
                type="tel"
                placeholder="📞"
                name="phoneNumber"
                v-model="phoneNumber"
                id="phoneNumber"
                pattern="\d+"
                required
              />
            </div>
            <input
              class="input message"
              type="text"
              placeholder="👋"
              name="customMessage"
              v-model="customMessage"
              id="customMessage"
            />
            <button type="submit" id="sendBtn" class="btn">
              Open in Whatsapp
              <svg class="btn--image" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="48px" height="48px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
            </button>
          </form>
        </div>
        <div class="credits">
          <span>
            Made by
            <a
              href="https://github.com/ekzGuille/wh2me"
              target="_blank"
              rel="noopener"
            >@ekzGuille</a>
          </span>
        </div>
        <div class="theme">
          <span @click="toggleTheme(defaultTheme)">
            {{ defaultTheme }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import LoadingComponent from '@/components/LoadingComponent';

const DARK = '🌚';
const LIGHT = '🌞';
const darkClass = 'dark';
let mainApp;

const API_URL = 'https://restcountries.eu/rest/v2/all';
let WHATSAPP_URL = '';
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send?phone=';
const WHATSAPP_WEB_URL = 'https://web.whatsapp.com/send?phone=';
const WHATSAPP_MOBILE_URL = 'whatsapp://send/?phone=';
const SPAIN_FLAG = 'https://restcountries.eu/data/esp.svg';
const SPAIN_PREFIX = '34';

export default {
  name: 'main-component',
  components: { LoadingComponent },
  data: () => ({
    countries: [],
    seletedCountry: {
      name: 'Spain',
      alpha3Code: 'ESP',
      callingCodes: SPAIN_PREFIX,
      flag: SPAIN_FLAG,
      numericCode: '724',
    },
    phoneNumber: '',
    customMessage: '',
    defaultTheme: LIGHT,
  }),
  async mounted() {
    mainApp = document.getElementById('mainApp');
    if (this.isMobile()) {
      WHATSAPP_URL = WHATSAPP_API_URL;
    } else {
      WHATSAPP_URL = WHATSAPP_WEB_URL;
    }
    const { phone } = this.$route.params;
    if (phone) {
      this.$router.replace('reroute').then(() => {
        this.sendMessage({ prefix: SPAIN_PREFIX, phoneNumber: phone });
        this.$router.replace('/');
      });
      return;
    }
    const dataJSON = await fetch(API_URL);
    const data = await dataJSON.json();
    this.countries = data.map((country) => ({
      name: country.name,
      alpha3Code: country.alpha3Code,
      callingCodes: country.callingCodes[0],
      flag: country.flag,
      numericCode: country.numericCode,
    }));
  },
  methods: {
    sendMessage({ prefix, phoneNumber }) {
      const fullWhUrl = `${WHATSAPP_URL}${prefix ?? this.seletedCountry.callingCodes}${phoneNumber ?? this.phoneNumber}${this.customMessage ? `&text=${this.customMessage}` : ''}`;
      window.open(fullWhUrl);
      this.phoneNumber = '';
      this.customMessage = '';
    },
    isMobile() {
      return [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ].some((toMatchItem) => navigator.userAgent.match(toMatchItem));
    },
    toggleTheme(current) {
      if (current === DARK) {
        this.defaultTheme = LIGHT;
      } else {
        this.defaultTheme = DARK;
      }
      mainApp.classList.toggle(darkClass);
    },
  },
};
</script>

<style>

:root {
  --PRIVATE_DARK: #0d1418;
  --PRIVATE_LIGHT: #ECE5DD;
  --PRIVATE_LIGHT_GREEN: #25D366;
  --PRIVATE_DARK_GREEN: #128C7E;
  --PRIVATE_DARK_GREEN2: #075E54;

  --flag-border: var(--PRIVATE_DARK);

  --background_darkmode: var(--PRIVATE_DARK);
  --accent_darkmode: var(--PRIVATE_DARK_GREEN2);
  --text_darkmode: var(--PRIVATE_DARK);
  --text_accent_darkmode: var(--PRIVATE_LIGHT);

  --background_lightmode: var(--PRIVATE_LIGHT);
  --accent_lightmode: var(--PRIVATE_LIGHT_GREEN);
  --text_lightmode: var(--PRIVATE_LIGHT);
  --text_accent_lightmode: var(--PRIVATE_DARK);
}

.app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--background_lightmode);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.bg_wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/wh_bg_dark.png");
  opacity: 0.06;
}

.main {
  position: relative;
  margin: 0 auto;
  width: max(30%, 45rem);
  background-color: rgba(255, 255, 255, 0.4);
}

.input {
  margin: 0;
}

.container {
  text-align: center;
  padding: 20vh 2em 0 2em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  margin-top: 1em;
  font-size: clamp(2.5rem, 4vw, 3rem);
  color: var(--text_accent_lightmode);
}

.prefix-phone-wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 2em 0 0 0;
}

.flag-prefix-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.prefix {
  text-align: right;
  margin-right: 0.5em;
  width: 50%;
}

.phone {
  margin-left: 0.5em;
  width: 50%;
}

.message {
  width: 100%;
  margin: 1em 0;
}

.flag {
  width: auto;
  height: 30px;
  outline: 1px solid var(--flag-border);
}

.data {
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 80%;
}

.country-selector {
  display: flex;
  width: 100%;
  margin-left: 0.25em;
}

.btn {
  background-color: var(--accent_lightmode);
  color: var(--text_accent_lightmode);
  width: 100%;
  border: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover, .btn:focus {
  color: var(--text_lightmode);
}

.btn--image {
  height: 1.5rem;
  width: 1.5rem;
  fill: var(--text_accent_lightmode);
}

.credits {
  position: fixed;
  bottom: 1.5vh;
  right: 5vw;
  display: inline-block;
  text-align: center;
  font-size: 1em;
}

.theme {
  position: fixed;
  bottom: 1.5vh;
  left: 5vw;
  display: inline-block;
  text-align: center;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
}

.dark.app {
  background-color: var(--text_darkmode);
}

.dark .bg_wrapper {
  background-image: url("../assets/wh_bg_light.png");
}

.dark .main {
  background-color: rgba(255, 255, 255, 0.1);
}

.dark .btn {
  background-color: var(--accent_darkmode);
  color: var(--text_accent_darkmode);
}

.dark .btn--image {
  fill: var(--text_accent_darkmode);
}

.dark .header {
  color: var(--text_accent_darkmode);
}

.dark .credits {
  color: var(--text_accent_darkmode);
}
</style>
