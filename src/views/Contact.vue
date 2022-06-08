<template>
  <section class="">
    <div class="text-center text-primary font-medium text-4xl py-11">
      Contact
    </div>
    <div class="sm:flex container justify-between mx-auto">
      <div class="sm:w-1/2 w-full flex">
        <div
          class="flex w-full flex-wrap justify-center relative contain-form"
          style=""
        >
          <div class="form-container pt-11 w-3/4 relative" style="">
            <validation-observer
              v-slot="{ invalid }"
              @submit.prevent="submit"
              ref="form"
              class="block"
            >
              <div class="form-inputs">
                <validation-provider
                  name="name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="group bg-white p-1 card-shadow rounded-lg">
                    <input
                      class="inputMaterial w-full"
                      type="text"
                      id="contact-name"
                      v-model="name"
                      name="name"
                      required
                      placeholder="Full name  "
                    />

                    <label>Full name </label>
                  </div>

                  <div
                    class="text-red-500 h-6 mb-6"
                    :style="errors.length ? 'visibility: visible;' : ''"
                  >
                    {{ errors[0] }}
                  </div>
                </validation-provider>
                <validation-provider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <div class="group bg-white p-1 card-shadow rounded-lg">
                    <input
                      class="inputMaterial w-full"
                      type="text"
                      id="contact-email"
                      v-model="email"
                      name="email"
                      placeholder="Email"
                      required
                    />

                    <label>Email</label>
                  </div>

                  <div
                    class="text-red-500 h-6 mb-6"
                    :style="errors.length ? 'visibility: visible;' : ''"
                  >
                    {{ errors[0] }}
                  </div>
                </validation-provider>
                <validation-provider
                  name="phone"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="group bg-white p-1 card-shadow rounded-lg">
                    <input
                      class="inputMaterial w-full"
                      type="number"
                      id="contact-phone"
                      v-model="phone"
                      name="phone"
                      placeholder="phone number "
                      required
                    />
                    <label>phone number</label>
                  </div>

                  <div
                    class="text-red-500 h-6 mb-6"
                    :style="errors.length ? 'visibility: visible;' : ''"
                  >
                    {{ errors[0] }}
                  </div>
                </validation-provider>
                <validation-provider
                  name="message"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="group bg-white p-1 card-shadow rounded-lg">
                    <textarea
                      class="inputMaterial resize-none w-full"
                      id="message"
                      rows="5"
                      v-model="message"
                      name="message"
                      placeholder="Message "
                      required
                    />
                    <label>Message</label>
                  </div>

                  <div
                    class="text-red-500 h-6 mb-6"
                    :style="errors.length ? 'visibility: visible;' : ''"
                  >
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
              <button
                @click.prevent="submit()"
                :disabled="invalid"
                class="form-btn px-10 xl:px-14 py-3 xl:py-2"
                :class="invalid ? 'invalid-form-btn' : 'valid-form-btn'"
              >
                Send
              </button>
            </validation-observer>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 flex sm:w-1/2 w-full">
        <div class="bg-primary w-3 h-full rounded-3xl"></div>
        <div
          class="bg-white card-shadow w-full h-2/3 sm:pb-0 pb-11 mt-16 rounded-r-3xl"
        >
          <div class="mx-auto" style="width: fit-content">
            <div class="flex items-center pb-6 pt-11">
              <div
                class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl text-primary mr-2"
              >
                <font-awesome-icon :icon="['far', 'envelope']" />
              </div>

              <p class="font-bold text-lg">
                <a :href="`mailto:${settings.contacts_email}`"
                  >{{ settings.contacts_email }}
                </a>
              </p>
            </div>
            <div class="flex items-center pb-6">
              <div
                class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl text-primary mr-2"
              >
                <!-- <font-awesome-icon :icon="['fas', 'fa-envelope-square']" /> -->
                <font-awesome-icon :icon="['fas', 'phone-alt']" />
              </div>
              <p class="font-bold text-lg">
                <a :href="`tel:${settings.contacts_phone_alt}`">
                  {{ settings.contacts_phone_alt }}
                </a>
              </p>
            </div>
            <div class="flex items-center pb-6">
              <div
                class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl text-primary mr-2"
              >
                <!-- <font-awesome-icon :icon="['fas', 'fa-envelope-square']" /> -->
                <font-awesome-icon :icon="['fas', 'phone-alt']" />
              </div>
              <p class="font-bold text-lg">
                <a :href="`tel:${settings.contacts_phone}`">
                  {{ settings.contacts_phone }}
                </a>
              </p>
            </div>
          </div>
          <div class="flex w-1/2 px-6 mx-auto justify-around my-6">
            <a
              :href="`${settings.contacts_facebook} `"
              target="_blank"
              class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl text-primary"
            >
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </a>
            <a
              :href="`${settings.contacts_twitter} `"
              target="_blank"
              class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl text-primary"
              ><font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a
              :href="`${settings.contacts_instagram} `"
              target="_blank"
              class="text-2xl xs:text-4xl lg:text-2xl xl:text-4xl text-primary"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      settings: [],
      name: "",
      email: "",
      phone: "",
      message: "",
    };
  },
  methods: {
    submit() {
      if (!this.phone.startsWith("+2") || !this.phone.startsWith("002")) {
        this.phone = `+2${this.phone}`;
      }
      this.axios
        .post("contacts", {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
        })
        .then(() => {
          this.$toasted.show(" successfully added..!");

          this.$refs.form.reset();
          // this.name = "";
          // this.email = "";
          // this.phone = "";
          this.message = "";
        });
    },
    fetchSettings() {
      this.axios.get("settings").then(({ data }) => {
        this.settings = data.settings;
        console.log(this.settings);
        console.log(data);
      });
    },
  },
  mounted() {
    this.fetchSettings();
  },
};
</script>
