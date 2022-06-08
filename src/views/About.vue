<template>
  <section class="py-32">
    <div class="sm:flex items-center">
      <div class="lg:w-2/5 md:w-1/2 w-3/4 mb-11">
        <div class="py-11 rounded-about card-shadow bg-white">
          <div class="lg:w-1/2 w-2/3 p-6 mx-auto">
            <img src="@/assets/images/logo.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="lg:w-1/3 md:w-1/2 sm:px-6 w-3/4 sm:mx-auto mx-6">
        <p class="text-3xl text-primary pb-6 font-bold">About</p>
        <p class="text-lg text-secondary">
          {{ settings.about_us_description }}
        </p>
      </div>
    </div>
    <div class="container mx-auto xs:flex flex-wrap text-center mt-32">
      <div
        v-for="feature in features"
        :key="feature.id"
        class="lg:px-6 px-3 md:w-1/3 xs:w-1/2 w-full mt-3"
      >
        <div class="bg-white py-6 rounded-3xl card-shadow">
          <div class="xl:w-1/3 w-1/2 p-6 mx-auto">
            <img :src="feature.main_media.path" alt="" />
          </div>

          <p class="text-primary text-2xl font-bold py-3">
            {{ feature.title }}
          </p>
          <p class="text-xl text-secondary px-3 text-center">
            {{ feature.text }}
          </p>
        </div>
      </div>
      <!-- <div class="lg:px-6 px-3 md:w-1/3 xs:w-1/2 w-full mt-3">
        <div class="bg-white py-6 rounded-3xl card-shadow">
          <div class="xl:w-1/3 w-1/2 p-6 mx-auto">
            <img src="@/assets/images/vision.svg" alt="" />
          </div>
          <p class="text-primary text-2xl font-bold py-3">vision</p>
          <p class="text-xl text-secondary w-2/3 mx-auto">
            {{ settings.vision }}
          </p>
        </div>
      </div>
      <div class="lg:px-6 px-3 md:w-1/3 xs:w-1/2 w-full mt-3">
        <div class="bg-white py-6 rounded-3xl card-shadow">
          <div class="xl:w-1/3 w-1/2 p-6 mx-auto">
            <img src="@/assets/images/value.svg" alt="" />
          </div>
          <p class="text-primary text-2xl font-bold py-3">value</p>
          <p class="text-xl text-secondary w-2/3 mx-auto">
            {{ settings.value }}
          </p>
        </div>
      </div> -->
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      settings: [],
      features: [],
    };
  },
  methods: {
    fetchSettings() {
      this.axios.get("settings").then(({ data }) => {
        this.settings = data.settings;
      });

      this.axios.get("features").then(({ data }) => {
        this.features = data.data;
      });
    },
  },
  mounted() {
    this.fetchSettings();
  },
};
</script>
