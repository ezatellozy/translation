<template>
  <div class="translation-component pt-28" @click="categoriesOpen = false">
    <div>
      <div class="container mx-auto flex justify-around text-center">
        <div
          class="w-5/12 sm:w-1/3 md:w-1/4 xl:w-1/6 py-8 cursor-pointer bg-white choice word"
          :class="{
            selected: selected === 'word',
          }"
          @click="
            selected = 'word';
            getSuggestions();
            sentenses = [];
            translationResult = [];
            suggestions = [];
          "
        >
          <div>{{ $t("misc.word") }}</div>
        </div>
        <div
          class="w-5/12 sm:w-1/3 md:w-1/4 xl:w-1/6 py-8 bg-white cursor-pointer choice context"
          :class="{
            selected: selected === 'context',
          }"
          @click="
            selected = 'context';
            sentenses = [];
            getSuggestions();
            translationResult = [];
            suggestions = [];
          "
        >
          <div>{{ $t("misc.context") }}</div>
        </div>
      </div>
      <div class="main-container py-24">
        <div class="container mx-auto px-0 xl:px-32 2xl:px-56">
          <div class="flex flex-wrap justify-between options-container">
            <div
              class="border flex justify-center items-center px-3 rounded-xl w-full md:w-5/12 lg:w-1/3 translate-lang-selected"
              :class="selected === 'context' ? 'mb-0' : 'mb-8 md:mb-0'"
            >
              <p class="text-secondary font-medium text-2xl">
                <span v-if="EnglishToArabic">{{ $t("misc.english") }}</span>
                <span v-if="!EnglishToArabic">{{ $t("misc.arabic") }}</span>
              </p>
              <div
                @click="
                  EnglishToArabic = !EnglishToArabic;
                  getSuggestions();
                "
                class="rounded-full w-12 h-12 bg-primary cursor-pointer flex items-center justify-center mx-12"
              >
                <font-awesome-icon
                  class="text-white text-3xl"
                  :icon="['fas', 'exchange-alt']"
                />
              </div>
              <p class="text-secondary font-medium text-2xl">
                <span v-if="!EnglishToArabic">{{ $t("misc.english") }}</span>
                <span v-if="EnglishToArabic">{{ $t("misc.arabic") }}</span>
              </p>
            </div>
            <div class="w-full md:w-5/12 lg:w-1/3 select-container">
              <div
                class="category-select cursor-pointer border bg-transparent rounded-xl py-2 px-4 w-full text-primary font-medium text-2xl relative flex justify-between items-center"
                @click.stop="categoriesOpen = !categoriesOpen"
              >
                <p>{{ category }}</p>
                <font-awesome-icon
                  :icon="['fas', 'chevron-down']"
                  :class="categoriesOpen ? 'arrow-up' : 'arrow-down'"
                />
                <div
                  class="categories-close w-11/12"
                  :class="{
                    'categories-open': categoriesOpen,
                  }"
                >
                  <ul>
                    <li
                      v-for="category in categories"
                      :key="category.id"
                      @click="categorySelected(category)"
                      class="cursor-pointer"
                    >
                      {{ category.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <input
              type="text"
              v-model="searchInput"
              @keypress.enter="getTranslation()"
              @input="getSuggestions"
              :placeholder="$t('inputs.writeHere')"
              class="search-input border border-primary"
            />
            <div
              v-if="suggestions.length"
              class="suggestions flex flex-col z-20 w-full"
            >
              <ul>
                <li v-for="suggestion in suggestions" :key="suggestion.id">
                  <p
                    v-if="selected === 'word'"
                    class="cursor-pointer text-sm border-b"
                  >
                    <span
                      v-if="EnglishToArabic"
                      @click="getTranslationById(suggestion.english_word.id)"
                      >{{ suggestion.english_word.word }}</span
                    >
                    <span
                      v-else
                      @click="getTranslationById(suggestion.arabic_word.id)"
                      >{{ suggestion.arabic_word.word }}</span
                    >
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
          <div class="flex justify-center w-full mt-20">
            <button
              class="py-4 px-8 rounded-xl text-white font-medium text-3xl"
              style="
                background: linear-gradient(109deg, #5666ee 0%, #0516a7 100%);
              "
              @click="getTranslation"
            >
              {{ $t("buttons.translate") }}
            </button>
          </div>
          <div>
            <div v-if="translationResult.length || sentensesById || sentenses">
              <table class="w-full result-content mt-11">
                <div v-if="translationResult.length">
                  <tr
                    class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                    v-for="result in translationResult"
                    :key="result.id"
                  >
                    <td
                      :class="{ 'cursor-pointer': wordGlobal }"
                      @click="getTranslationById(result.english_word.id)"
                      class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                    >
                      {{ result.english_word.word }}
                    </td>
                    <td
                      @click="getTranslationById(result.arabic_word.id)"
                      :class="{ 'cursor-pointer': wordGlobal }"
                      class="w-full py-4 text-center font-bold text-lg md:text-xl 2xl:text-3xl pb-2 md:w-5/12 md:text-right"
                      style="color: #fbc451"
                    >
                      {{ result.arabic_word.word }}
                    </td>
                  </tr>
                </div>
                <div v-if="sentenses">
                  <tr
                    class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                    v-for="sentense in sentenses"
                    :key="sentense.id"
                  >
                    <td
                      :class="{ 'cursor-pointer': wordGlobal }"
                      @click="getTranslationById(sentense.id)"
                      class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                    >
                      {{ sentense.arabic_sentence }}
                    </td>
                    <td
                      @click="getTranslationById(sentense.id)"
                      :class="{ 'cursor-pointer': wordGlobal }"
                      class="w-full py-4 text-center font-bold text-lg md:text-xl 2xl:text-3xl pb-2 md:w-5/12 md:text-right"
                      style="color: #fbc451"
                    >
                      {{ sentense.english_sentence }}
                    </td>
                  </tr>
                </div>
                <div v-if="sentensesById">
                  <tr
                    class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                  >
                    <td
                      class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                    >
                      {{ sentensesById.arabic_sentence }}
                    </td>
                    <td
                      class="w-full py-4 text-center font-bold text-lg md:text-xl 2xl:text-3xl pb-2 md:w-5/12 md:text-right"
                      style="color: #fbc451"
                    >
                      {{ sentensesById.english_sentence }}
                    </td>
                  </tr>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "word",
      EnglishToArabic: true,
      categoriesOpen: false,
      categories: [],
      category: "",
      categoryId: 0,
      suggestions: [],
      searchInput: "",
      translationResult: [],
      sentenses: [],
      sentensesById: null,
    };
  },
  methods: {
    getCategories() {
      this.axios.get("categories").then((data) => {
        this.categories = data.data.data;
        this.categories.unshift({ id: 0, name: "All Categories" });
        this.category = this.categories[0].name;
      });
    },
    categorySelected(category) {
      this.category = category.name;
      this.categoryId = category.id;
    },
    getResault(dictionary, query, qInput, dataResault, category_id = null) {
      let url;
      query != undefined
        ? (url = `${dictionary}?${query}=${qInput}&per_page=10`)
        : (url = `${dictionary}/${qInput}&per_page=10`);
      if (category_id !== 0) {
        url += `&category=${category_id}`;
      }
      this.axios.get(url).then((data) => {
        query != undefined
          ? (this[dataResault] = data.data.data)
          : (this[dataResault] = data.data.sentence_dictionary);
      });
    },
    getSuggestions() {
      if (this.searchInput == "") {
        this.suggestions = [];
        return;
      }
      this.getResault(
        this.selected == "word" ? "word-dictionaries" : "sentence-dictionaries",
        this.EnglishToArabic ? "english" : "arabic",
        this.searchInput,
        "suggestions",
        this.categoryId
      );
      this.suggestions = [];
    },

    getTranslation() {
      if (this.searchInput == "") {
        this.searchInput = "";
        this.suggestions = "";
        return;
      }
      this.translationResult = [];
      this.sentenses = [];
      this.sentensesById = null;
      this.getResault(
        this.selected == "word" ? "word-dictionaries" : "sentence-dictionaries",
        this.EnglishToArabic ? "english" : "arabic",
        this.searchInput,
        this.selected == "word" ? "translationResult" : "sentenses",
        this.categoryId
      );
      this.searchInput = "";
      this.suggestions = "";
    },
    getTranslationById(word) {
      if (!this.wordGlobal) {
        this.searchInput = "";
        this.suggestions = "";
        return;
      }
      this.translationResult = [];
      this.sentenses = [];
      this.sentensesById = null;
      if (this.selected == "word") {
        this.getResault(
          "word-dictionaries",
          this.EnglishToArabic ? "englishid" : "arabicid",
          word,
          "translationResult",
          this.categoryId
        );
      } else {
        this.getResault(
          "sentence-dictionaries",
          undefined,
          word,
          "sentensesById",
          this.categoryId
        );
      }
      this.searchInput = "";
      this.suggestions = "";
    },
  },
  computed: {
    wordGlobal() {
      if (
        this.translationResult.length > 1 ||
        this.sentenses.length > 1 ||
        this.suggestions.length >= 1
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>
<style lang="scss" scoped>
.result-content {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    top: 50%;
    height: 50%;
    @apply bg-primary;
    @media (max-width: 768px) {
      content: initial;
    }
  }
}
</style>
