<template>
  <div
    id="app"
    class="flex flex-col min-h-screen"
    :class="{ 'is-rtl': $i18n.locale === 'ar' }"
  >
    <navbar />
    <!-- <main-header /> -->
    <router-view style="background: #f9fbfc;" />
    <main-footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
// import MainHeader from "@/components/MainHeader";
import MainFooter from '@/components/MainFooter'

export default {
  components: {
    Navbar,
    // MainHeader,
    MainFooter,
  },
}
</script>
