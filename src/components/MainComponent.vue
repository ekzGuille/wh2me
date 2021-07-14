<template>
  <main>
    <div id="myApp">
      <h3 class="header">🌎 Select your country 🌏</h3>
      <div id="data" class="row">
        <form @submit.prevent="sendMessage">
          <Loading v-if="this.countries.length === 0"/>
          <div
            v-if="this.countries.length !== 0"
            class="selectWrapper row">
            <span>
              <img :src="seletedCountry.flag" :alt="seletedCountry.alpha3Code"/>
            </span>
            <select
              name="country"
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
          <h3 class="header">Write the number 📲</h3>
          <div class="selectWrapper row">
            <input
              type="text"
              disabled
              name="prefix"
              id="prefix"
              :value="`+ ${seletedCountry.callingCodes}`"
              size="7"
            />
            <input
              type="tel"
              name="phoneNumber"
              v-model="phoneNumber"
              id="phoneNumber"
              pattern="\d+"
              required
            />
          </div>
          <button type="submit" id="sendBtn">
            Open in Whatsapp
            <img id="wh_ico" src="./../assets/wh_ico.png" alt="wh_ico"/>
          </button>
        </form>
      </div>
      <div id="creditos">
        <span>
          Made by
          <a
            href="https://github.com/ekzGuille/wh2me"
            target="_blank"
            rel="noopener"
          >@ekzGuille</a>
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import Loading from '@/components/LoadingComponent';

const API_URL = 'https://restcountries.eu/rest/v2/all';
let WHATSAPP_URL = '';
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send?phone=';
const WHATSAPP_WEB_URL = 'https://web.whatsapp.com/send?phone=';
const WHATSAPP_MOBILE_URL = 'whatsapp://send/?phone=';
const SPAIN_FLAG = 'https://restcountries.eu/data/esp.svg';
const SPAIN_PREFIX = '34';

export default {
  name: 'main-component',
  components: { Loading },
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
  }),
  async mounted() {
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
      const fullWhUrl = `${WHATSAPP_URL}${prefix ?? this.seletedCountry.callingCodes}${phoneNumber ?? this.phoneNumber}`;
      window.open(fullWhUrl);
      this.phoneNumber = '';
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
      ].some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    },
  },
};
</script>

<style>
html {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("./../assets/wh_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

main {
  margin: 0 auto;
  width: 35%;
  background-color: rgba(255, 255, 255, 0.4);
}

#myApp {
  text-align: center;
  padding: 20vh 2em 0 2em;
  height: 100vh;
}

.header {
  margin-top: 1em;
}

.selectWrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.selectWrapper #prefix {
  text-align: right;
  margin-right: 0.5em;
  width: 100%;
}

.selectWrapper #phoneNumber {
  margin-left: 0.5em;
  width: 100%;
}

span > img {
  width: auto;
  height: 30px;
  margin-right: 0.25em;
  margin-top: 0.25em;
  border: 1px solid #000;
}

div#data {
  margin-top: 4em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

div#data select {
  display: flex;
  width: 100%;
  margin-left: 0.25em;
}

#sendBtn {
  background-color: #58bd55;
  color: #fff;
  width: 100%;
}

#sendBtn img {
  width: 8px;
}

#creditos {
  position: fixed;
  bottom: 1.5vh;
  right: 5vw;
  display: inline-block;
  text-align: center;
}

#creditos span {
  font-size: 0.8em;
}

@media only screen and (max-width: 1100px) {
  main {
    margin: 0 auto;
    width: 50%;
  }

  div#data select {
    display: flex;
    width: 100%;
  }
}

@media only screen and (max-width: 768px) {
  main {
    margin: 0 auto;
    width: 85%;
  }

  div#data select {
    display: flex;
    width: 100%;
  }
}
</style>
