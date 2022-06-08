<template>
  <div class="translation-component pt-28">
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
          <div
            class="flex flex-wrap justify-between options-container"
            :class="{
              'context-selected': selected === 'context',
            }"
          >
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
                class="rounded-full w-12 h-12 bg-primary flex items-center justify-center mx-12"
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
                class="category-select border bg-transparent rounded-xl py-2 px-4 w-full text-primary font-medium text-2xl relative flex justify-between items-center"
                @click="categoriesOpen = !categoriesOpen"
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
            <div v-if="translationResult.length">
              <table class="w-full result-content mt-11">
                <div v-if="selected === 'word'">
                  <tr
                    class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                    v-for="result in translationResult"
                    :key="result.id"
                  >
                    <td
                      :class="{ 'cursor-pointer': wordGlobal }"
                      @click="getTranslationById(result.id)"
                      class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                    >
                      {{ result.english_word.word }}
                    </td>
                    <td
                      @click="getTranslationById(result.id)"
                      :class="{ 'cursor-pointer': wordGlobal }"
                      class="w-full py-4 text-center font-bold text-lg md:text-xl 2xl:text-3xl pb-2 md:w-5/12 md:text-right"
                      style="color: #fbc451"
                    >
                      {{ result.arabic_word.word }}
                    </td>
                  </tr>
                </div>
                <div v-else>
                  <tr
                    class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                    v-for="result in sentenses"
                    :key="result.id"
                  >
                    <td
                      :class="{ 'cursor-pointer': wordGlobal }"
                      @click="getTranslationById(result.id)"
                      class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                    >
                      {{ result.arabic_sentence }}
                    </td>
                    <td
                      @click="getTranslationById(result.id)"
                      :class="{ 'cursor-pointer': wordGlobal }"
                      class="w-full py-4 text-center font-bold text-lg md:text-xl 2xl:text-3xl pb-2 md:w-5/12 md:text-right"
                      style="color: #fbc451"
                    >
                      {{ result.english_sentence }}
                    </td>
                  </tr>
                </div>
              </table>
            </div>
          </div>
          <div
            class="flex flex-wrap justify-center mt-16"
            v-if="selected === 'context'"
          >
            <div
              v-if="sentenses.length === 1"
              class="pt-4 text-center text-secondary md:text-right font-bold text-2xl"
            >
              <ul class="flex flex-wrap">
                <li
                  class="w-full md:w-auto text-primary font-bold text-2xl 2xs:text-5xl text-center md:text-left"
                >
                  {{ sentenses[0].arabic_sentence }}
                </li>
                <li
                  class="mx-2 h-16 border-l border-primary hidden md:block"
                ></li>
                <li class="flex justify-center items-center mt-10 md:mt-0">
                  <p>
                    {{ sentenses[0].english_sentence }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div style="background: #fef7f0" class="h-96 overflow-auto">
        <div class="container mx-auto" v-if="sentenses.length">
          <!-- v-if="sentenses.length" -->
          <div
            class="flex flex-col justify-center py-8 text-secondary font-medium text-2xl"
          >
            <div
              v-for="sentense in sentenses"
              :key="sentense.id"
              class="flex flex-wrap justify-between border-b border-primary"
            >
              <p
                class="w-full md:w-5/12"
                :class="{ 'cursor-pointer': wordGlobal }"
                @click="getTranslationById(sentense.id)"
              >
                {{ sentense.arabic_sentence }}
              </p>
              <p
                class="w-full md:w-5/12 mt-4 md:mt-0 text-right"
                :class="{ 'cursor-pointer': wordGlobal }"
                @click="getTranslationById(sentense.id)"
              >
                {{ sentense.english_sentence }}
              </p>
            </div>
          </div>
        </div>
        <div class="box"></div>
      </div>
      <div></div>
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
    getTranslation() {
      if (this.searchInput != "") {
        if (this.categoryId == 0) {
          if (this.EnglishToArabic && this.selected == "word") {
            this.getWord(
              "word-dictionaries",
              "english",
              this.searchInput,
              "translationResult",
              0
            );
          } else if (this.EnglishToArabic && this.selected == "context") {
            this.getSentenses(
              "sentence-dictionaries",
              "english",
              this.searchInput,
              "sentenses",
              0
            );
          } else if (!this.EnglishToArabic && this.selected == "word") {
            this.getWord(
              "word-dictionaries",
              "arabic",
              this.searchInput,
              "translationResult",
              0
            );
          } else if (!this.EnglishToArabic && this.selected == "context") {
            this.getSentenses(
              "sentence-dictionaries",
              "arabic",
              this.searchInput,
              "sentenses",
              0
            );
          }
        } else {
          if (this.EnglishToArabic && this.selected == "word") {
            this.getWord(
              "word-dictionaries",
              "english",
              this.searchInput,
              "translationResult",
              this.categoryId
            );
          } else if (this.EnglishToArabic && this.selected == "context") {
            this.getSentenses(
              "sentence-dictionaries",
              "english",
              this.searchInput,
              "sentenses",
              this.categoryId
            );
          } else if (!this.EnglishToArabic && this.selected == "word") {
            this.getWord(
              "word-dictionaries",
              "arabic",
              this.searchInput,
              "translationResult",
              this.categoryId
            );
          } else if (!this.EnglishToArabic && this.selected == "context") {
            this.getSentenses(
              "sentence-dictionaries",
              "arabic",
              this.searchInput,
              "sentenses",
              this.categoryId
            );
          }
        }
      }
      this.searchInput = "";
      this.suggestions = "";
    },
    getTranslationById(word) {
      if (this.wordGlobal) {
        if (this.EnglishToArabic && this.selected == "word") {
          this.getWord(
            "word-dictionaries",
            "englishid",
            word,
            "translationResult",
            this.categoryId
          );
        } else if (this.EnglishToArabic && this.selected == "context") {
          this.getSentensesById(
            "sentence-dictionaries",

            word,
            "sentenses",
            this.categoryId
          );
          console.log(this.sentenses);
        } else if (!this.EnglishToArabic && this.selected == "word") {
          this.getWord(
            "word-dictionaries",
            "arabicid",
            word,
            "translationResult",
            this.categoryId
          );
        } else if (!this.EnglishToArabic && this.selected == "context") {
          this.getSentensesById(
            "sentence-dictionaries",

            word,
            "sentenses",
            this.categoryId
          );
        }
      }
      console.log(this.sentenses);
      this.searchInput = "";
      this.suggestions = "";
    },
    getSuggestions() {
      if (this.searchInput != "") {
        if (this.EnglishToArabic && this.selected == "word") {
          this.getWord(
            "word-dictionaries",
            "english",
            this.searchInput,
            "suggestions",
            this.categoryId
          );
        } else if (this.EnglishToArabic && this.selected == "context") {
          this.getSentenses(
            "sentence-dictionaries",
            "english",
            this.searchInput,
            "suggestions",
            this.categoryId
          );
        } else if (!this.EnglishToArabic && this.selected == "word") {
          this.getWord(
            "word-dictionaries",
            "arabic",
            this.searchInput,
            "suggestions",
            this.categoryId
          );
        } else if (!this.EnglishToArabic && this.selected == "context") {
          this.getSentenses(
            "sentence-dictionaries",
            "arabic",
            this.searchInput,
            "suggestions",
            this.categoryId
          );
        }
      } else {
        this.suggestions = [];
      }
    },
    categorySelected(category) {
      this.category = category.name;
      this.categoryId = category.id;
    },
    getWord(dictionary, query, qInput, dataResault, category_id = null) {
      let url = `${dictionary}?${query}=${qInput}&per_page=10`;
      if (category_id !== 0) {
        url += `&category=${category_id}`;
      }
      this.axios.get(url).then((data) => {
        this[dataResault] = data.data.data;
        // console.log(this.suggestions);
      });
    },
    getSentenses(dictionary, lang, qInput, dataResault, category_id = null) {
      let url = `${dictionary}?${lang}=${qInput}`;

      if (category_id !== 0) {
        url += `&per_page=10&category=${category_id}`;
      }
      console.log(dictionary, qInput, dataResault, (category_id = null));

      this.axios.get(url).then((data) => {
        this[dataResault] = data.data.data;
      });
    },
  },
  computed: {
    wordGlobal() {
      if (this.translationResult.length > 1 || this.suggestions.length >= 1) {
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
