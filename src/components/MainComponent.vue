<template>
  <main>
    <div class="myApp">
      <h3 class="header">🌎 Select your country 🌏</h3>
      <div class="data">
        <form @submit.prevent="sendMessage">
          <Loading v-if="this.countries.length === 0"/>
          <div
            v-if="this.countries.length !== 0">
            <select
              class="country-selector"
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
          <h3 class="header">Type the number ☎</h3>
          <div class="selectWrapper">
            <div class="flagPrefixWrapper">
              <img class="flag" :src="seletedCountry.flag" :alt="seletedCountry.alpha3Code"/>
              <input
                class="prefix"
                type="text"
                disabled
                name="prefix"
                id="prefix"
                :value="`+ ${seletedCountry.callingCodes}`"
                size="7"
              />
            </div>
            <input
              class="phone"
              type="tel"
              placeholder="📞"
              name="phoneNumber"
              v-model="phoneNumber"
              id="phoneNumber"
              pattern="\d+"
              required
            />
          </div>
          <button type="submit" id="sendBtn" class="btn">
            Open in Whatsapp
            <img class="btn--image" id="wh_ico" src="./../assets/wh_ico.png" alt="wh_ico"/>
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

input {
  margin: 0;
}

.myApp {
  text-align: center;
  padding: 20vh 2em 0 2em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: 2em 0;
}

.flagPrefixWrapper {
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

.flag {
  width: auto;
  height: 30px;
  border: 1px solid #000;
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
  background-color: #58bd55;
  color: #fff;
  width: 100%;
}

.btn--image {
  width: 8px;
}

.credits {
  position: fixed;
  bottom: 1.5vh;
  right: 5vw;
  display: inline-block;
  text-align: center;
  font-size: 0.8em;

}

@media only screen and (max-width: 1300px) {
  main {
    margin: 0 auto;
    width: 50%;
  }

  .data {
    width: 65%;
  }

  .country-selector {
    display: flex;
    width: 100%;
  }

}

@media only screen and (max-width: 885px) {
  main {
    margin: 0 auto;
    width: 75%;
  }

  .country-selector {
    display: flex;
    width: 100%;
  }
}

@media only screen and (max-width: 550px) {
  main {
    margin: 0 auto;
    width: 90%;
  }

  .data {
    width: 80%;
  }

  .country-selector {
    display: flex;
    width: 100%;
  }
}

@media only screen and (max-width: 400px) {
  main {
    margin: 0 auto;
    width: 90%;
  }

  .data {
    width: 100%;
  }

  .country-selector {
    display: flex;
    width: 100%;
  }

  .selectWrapper {
    display: block;
    width: 100%;
  }

  .flagPrefixWrapper,
  .phone {
    margin: 0.4em auto;
  }

  .prefix {
    width: 100%;
    margin-right: 0;
    margin-left: 0.8em;
  }

  .phone {
    width: 100%;
    margin-left: 0;
  }


  .btn {
    margin-top: 1em;
  }
}
</style>
