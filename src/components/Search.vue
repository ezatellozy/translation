<template>
  <div>
    <div class="relative">
      <input
        type="text"
        @input="$emit('input', $event.target.value), getSuggestions()"
        @keypress.enter="getTranslation()"
        :placeholder="$t('inputs.writeHere')"
        class="search-input border border-primary"
      />
      <div v-if="suggestions" class="suggestions flex flex-col z-20 w-full">
        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion.id">
            <p
              v-if="selected === 'word'"
              class="cursor-pointer text-sm border-b"
            >
              <span @click="getTranslationById(suggestion.id)">{{
                suggestion.word
              }}</span>
            </p>
            <p
              v-else
              class="cursor-pointer text-sm border-b"
              @click="getTranslationById(suggestion.id)"
            >
              <span v-if="EnglishToArabic">
                {{ suggestion.arabic_sentence }}</span
              >
              <span v-else>{{ suggestion.english_sentence }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="flex justify-center w-full mt-20">
        <button
          class="py-4 px-8 rounded-xl text-white font-medium text-3xl"
          style="background: linear-gradient(109deg, #5666ee 0%, #0516a7 100%)"
          @click="getTranslation"
        >
          {{ $t("buttons.translate") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["suggestions", "selected"],
  methods: {
    getTranslationById(id) {
      this.$emit("getTranslationById", id);
    },
    getTranslation() {
      this.$emit("getTranslation");
    },
    getSuggestions() {
      this.$emit("getSuggestions");
    },
  },
};
</script>

<style></style>
