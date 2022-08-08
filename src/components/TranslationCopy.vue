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
            selected = 'word'
            getSuggestions()
            sentenses = []
            translationResult = []
            suggestions = []
          "
        >
          <div>{{ $t('misc.word') }}</div>
        </div>
        <div
          class="w-5/12 sm:w-1/3 md:w-1/4 xl:w-1/6 py-8 bg-white cursor-pointer choice context"
          :class="{
            selected: selected === 'context',
          }"
          @click="
            selected = 'context'
            sentenses = []
            getSuggestions()
            translationResult = []
            suggestions = []
          "
        >
          <div>{{ $t('misc.context') }}</div>
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
                <span v-if="EnglishToArabic">{{ $t('misc.english') }}</span>
                <span v-if="!EnglishToArabic">{{ $t('misc.arabic') }}</span>
              </p>
              <div
                @click="
                  convertLang()
                  getSuggestions()
                "
                class="rounded-full w-12 h-12 bg-primary cursor-pointer flex items-center justify-center mx-12"
              >
                <font-awesome-icon
                  class="text-white text-3xl"
                  :icon="['fas', 'exchange-alt']"
                />
              </div>
              <p class="text-secondary font-medium text-2xl">
                <span v-if="!EnglishToArabic">{{ $t('misc.english') }}</span>
                <span v-if="EnglishToArabic">{{ $t('misc.arabic') }}</span>
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
          <search
            v-model="searchInput"
            @getTranslationById="getTranslationById($event)"
            @getTranslation="getTranslation()"
            @getSuggestions="getSuggestions()"
            :suggestions="suggestions"
            :selected="selected"
            :EnglishToArabic="EnglishToArabic"
          />

          <div>
            <div v-if="translationResult.length">
              <table class="w-full result-content mt-11">
                <div v-if="translationResult.length">
                  <div v-if="EnglishToArabic">
                    <tr
                      class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                      v-for="result in translationResult"
                      :key="result.id"
                    >
                      <td
                        :class="{ 'cursor-pointer': wordGlobal }"
                        @click="
                          getTranslationById(result.english_word.id, 'en')
                        "
                        class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                      >
                        {{ result.english_word.word }}
                      </td>
                      <td
                        class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                      >
                        <span
                          v-for="word in result.arabic_words"
                          :key="word.id"
                          class="translation"
                          :class="{ 'cursor-pointer': wordGlobal }"
                          @click="getTranslationById(word.id, 'ar')"
                        >
                          {{ word.word }}
                        </span>
                      </td>
                    </tr>
                  </div>
                  <div v-else>
                    <tr
                      class="flex flex-wrap justify-between border-b border-primary md:border-b-0"
                      v-for="result in translationResult"
                      :key="result.id"
                    >
                      <td
                        :class="{ 'cursor-pointer': wordGlobal }"
                        @click="getTranslationById(result.arabic_word.id, 'ar')"
                        class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                      >
                        {{ result.arabic_word.word }}
                      </td>
                      <td
                        class="w-full mb-2 pb-2 text-center text-primary font-bold text-lg md:text-xl 2xl:text-3xl px-2 md:w-5/12 md:text-left"
                      >
                        <span
                          v-for="word in result.english_words"
                          :key="word.id"
                          class="translationar"
                          :class="{ 'cursor-pointer': wordGlobal }"
                          @click="getTranslationById(word.id, 'en')"
                        >
                          {{ word.word }}
                        </span>
                      </td>
                    </tr>
                  </div>
                </div>
              </table>
            </div>
          </div>
          <sentenses-resault v-if="sentenses.length" :sentenses="sentenses" />
          <sentenses-resault
            v-if="sentensesById"
            :sentenses="sentensesById"
            byId="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from './Search.vue'
import SentensesResault from './SentensesResault.vue'
export default {
  components: { Search, SentensesResault },
  data() {
    return {
      selected: 'word',
      EnglishToArabic: true,
      categoriesOpen: false,
      categories: [],
      category: '',
      categoryId: 0,
      suggestions: [],
      searchInput: '',
      translationResult: [],
      newData: [],
      sentenses: [],
      sentensesById: null,
    }
  },
  methods: {
    convertLang() {
      this.EnglishToArabic = !this.EnglishToArabic
      this.suggestions = []
      this.translationResult = []
      this.newData = []
      this.sentenses = []
    },
    getCategories() {
      this.axios.get('categories').then((data) => {
        this.categories = data.data.data
        this.categories.unshift({ id: 0, name: 'All Categories' })
        this.category = this.categories[0].name
      })
    },
    categorySelected(category) {
      this.category = category.name
      this.categoryId = category.id
    },
    async getResault(
      dictionary,
      query,
      qInput,
      dataResault,
      category_id = null,
    ) {
      let url
      query != undefined
        ? (url = `${dictionary}?${query}=${qInput}&per_page=10`)
        : (url = `${dictionary}/${qInput}&per_page=10`)
      if (category_id !== 0) {
        url += `&category=${category_id}`
      }
      await this.axios.get(url).then((data) => {
        query != undefined
          ? (this[dataResault] = data.data.data)
          : (this[dataResault] = data.data.sentence_dictionary)
      })
      console.log(this.sentensesById)

      if (dataResault == 'suggestions') return

      if (this.EnglishToArabic && this.selected == 'word') {
        this.newData = []
        this.translationResult.map((el) => {
          let obj = {}
          const found = this.newData.find(
            (element) => element.english_word.id === el.english_word.id,
          )
          if (found) {
            found.arabic_words.push(el.arabic_word)
          } else {
            obj['english_word'] = el.english_word
            obj['arabic_words'] = [el.arabic_word]
            this.newData.push(obj)
            this.translationResult = this.newData
          }
        })
      } else if (this.EnglishToArabic == false && this.selected == 'word') {
        this.newData = []
        this.translationResult.map((el) => {
          let obj = {}
          const found = this.newData.find(
            (element) => element.arabic_word.id === el.arabic_word.id,
          )
          if (found) {
            found.english_words.push(el.arabic_word)
          } else {
            obj['english_words'] = [el.english_word]
            obj['arabic_word'] = el.arabic_word
            this.newData.push(obj)
            this.translationResult = this.newData
          }
        })
      }
    },
    getSuggestions() {
      if (this.searchInput == '') {
        this.suggestions = []
        return
      }
      this.getResault(
        this.selected == 'word'
          ? this.EnglishToArabic
            ? 'english-words'
            : 'arabic-words'
          : 'sentence-dictionaries',
        this.selected == 'word'
          ? 'word'
          : this.EnglishToArabic
          ? 'english'
          : 'arabic',
        this.searchInput,
        'suggestions',
        this.categoryId,
      )
      this.suggestions = []
    },

    getTranslation() {
      if (this.searchInput == '') {
        this.suggestions = ''
        return
      }
      this.translationResult = []
      this.sentenses = []
      this.sentensesById = null
      this.getResault(
        this.selected == 'word' ? 'word-dictionaries' : 'sentence-dictionaries',
        this.EnglishToArabic ? 'english' : 'arabic',
        this.searchInput,
        this.selected == 'word' ? 'translationResult' : 'sentenses',
        this.categoryId,
      )
      this.suggestions = ''
    },
    getTranslationById(word, lang) {
      if (!this.wordGlobal) {
        this.suggestions = ''
        return
      }

      this.translationResult = []
      this.sentenses = []
      this.sentensesById = null
      if (this.selected == 'word') {
        if (lang) {
          this.getResault(
            'word-dictionaries',
            lang == 'en' ? 'englishid' : 'arabicid',
            word,
            'translationResult',
            this.categoryId,
          )
        } else {
          this.getResault(
            'word-dictionaries',
            this.EnglishToArabic ? 'englishid' : 'arabicid',
            word,
            'translationResult',
            this.categoryId,
          )
        }
      } else {
        this.getResault(
          'sentence-dictionaries',
          undefined,
          word,
          'sentensesById',
          this.categoryId,
        )
      }
      this.suggestions = ''
    },
  },
  computed: {
    wordGlobal() {
      if (
        this.translationResult.length > 1 ||
        this.sentenses.length > 1 ||
        this.suggestions.length >= 1
      ) {
        return true
      }
      return false
    },
  },
  mounted() {
    this.getCategories()
  },
}
</script>
<style lang="scss" scoped>
.result-content {
  position: relative;
  &::before {
    position: absolute;
    content: '';
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
span.translation {
  margin: 0 5px;
  &:not(:last-child) {
    @apply border-l-4 border-primary;
  }
}
span.translationar {
  margin: 0 5px;
  &:not(:last-child) {
    @apply border-l-0 border-r-2 border-primary;
  }
}
</style>
