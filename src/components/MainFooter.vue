<template>
  <footer class="main-footer" style="background: #f9fbfc">
    <div class="container mx-auto py-12 px-12 2xs:px-0">
      <div class="mb-4 xs:mb-8 w-36 xs:w-auto">
        <figure>
          <router-link to="/">
            <img src="@/assets/images/logo-f.png" alt="" />
          </router-link>
        </figure>
      </div>
      <div class="flex flex-wrap justify-between">
        <div
          class="w-1/2 sm:w-1/3 mb-6 xs:mb-0 overflow-hidden hidden 2xs:block"
        >
          <router-link to="/about">
            <p
              class="text-sm xs:text-lg lg:text-xl text-black font-medium"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                line-height: 3rem;
              "
            >
              The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
              ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
              quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox
              nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.
            </p>
          </router-link>
        </div>
        <div class="w-1/3 flex flex-wrap">
          <ul
            class="w-full flex flex-wrap text-primary text-base xs:text-2xl font-medium whitespace-nowrap text-left"
          >
            <li class="w-full lg:w-1/2 px-0 xs:px-6 sm:px-16 py-2">
              <router-link to="/">translate</router-link>
            </li>
            <li class="w-full lg:w-1/2 px-0 xs:px-6 sm:px-16 py-2">
              <router-link to="/about">About</router-link>
            </li>
            <li class="w-full lg:w-1/2 px-0 xs:px-6 sm:px-16 py-2">
              <router-link to="/contact">contact</router-link>
            </li>
            <li class="w-full lg:w-1/2 px-0 xs:px-6 sm:px-16 py-2 flex">
              <!-- <router-link to="/categories">الأقسام</router-link> -->
              <div class="">
                <a href="#" class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl"
                  ><font-awesome-icon :icon="['fab', 'facebook-f']"
                /></a>
              </div>
              <div class="px-6 lg:px-4 xl:px-6 2xl:px-8">
                <a href="#" class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl"
                  ><font-awesome-icon :icon="['fab', 'twitter']"
                /></a>
              </div>
              <div class="">
                <a href="#" class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl"
                  ><font-awesome-icon :icon="['fab', 'instagram']"
                /></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>
