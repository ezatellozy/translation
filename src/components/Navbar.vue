<template>
  <nav class="main-navbar bg-primary py-3">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <figure class="w-36 sm:w-44 md:w-56">
        <router-link to="/">
          <img src="@/assets/images/logo-h.png" alt="" />
        </router-link>
      </figure>
      <div class="w-full order-last xs:order-2 xs:w-1/2 mt-3 xs:mt-0">
        <ul class="flex justify-between">
          <li class="text-white font-medium text-lg sm:text-2xl capitalize">
            <router-link to="/">Translate</router-link>
          </li>
          <li class="text-white font-medium text-lg sm:text-2xl capitalize">
            <router-link to="/about">About</router-link>
          </li>
          <li class="text-white font-medium text-lg sm:text-2xl capitalize">
            <router-link to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
      <locale-switcher class="order-3" />
    </div>
  </nav>
</template>

<script>
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default {
  name: "Navbar",

  components: {
    LocaleSwitcher,
  },
};
</script>
