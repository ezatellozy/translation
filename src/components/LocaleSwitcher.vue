<template>
  <div
    class="cursor-pointer items-center"
    @click="switchLang"
    style="display: flex"
  >
    <img :src="`/images/${lang}.png`" width="20" alt="" class="mx-1" />
    <!-- <span class="w-2"></span> -->

    <span class="text-white font-bold">{{
      $t(`locales.${this.$store.state.locale}`)
    }}</span>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data: () => ({
    lang: "en",
  }),

  mounted() {
    this.lang = this.$i18n.locale === "en" ? "ar" : "en";
  },

  methods: {
    switchLang() {
      Cookies.set("locale", this.lang);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    },
  },
};
</script>
