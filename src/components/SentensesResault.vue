<template>
  <div style="background: #fef7f0;" class="h-96 overflow-auto" id="scroll-test">
    <div class="container mx-auto">
      <div v-if="byId == 'true'">
        <div
          class="flex flex-col justify-center py-8 text-secondary font-medium text-2xl"
        >
          <div class="flex flex-wrap justify-between">
            <p class="w-full md:w-5/12">
              {{ sentenses.english_sentence }}
            </p>
            <p class="w-full md:w-5/12 mt-4 md:mt-0 text-right">
              {{ sentenses.arabic_sentence }}
            </p>
          </div>
          <hr
            class="w-8/12 mx-auto mt-12"
            style="background: #f5cb9d; border: none; height: 1px;"
          />
        </div>
      </div>
      <div v-else>
        <div
          v-for="sentense in sentenses"
          :key="sentense.id"
          class="flex flex-col justify-center py-8 text-secondary font-medium text-2xl"
        >
          <div class="flex flex-wrap justify-between">
            <p class="w-full md:w-5/12">
              {{ sentense.english_sentence }}
            </p>
            <p class="w-full md:w-5/12 mt-4 md:mt-0 text-right">
              {{ sentense.arabic_sentence }}
            </p>
          </div>
          <hr
            class="w-8/12 mx-auto mt-12"
            style="background: #f5cb9d; border: none; height: 1px;"
          />
        </div>
      </div>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  props: ['sentenses', 'byId'],

  methods: {
    controllSelectSize(event, type) {
      console.log(event)
      if (type === 'focus') {
        event.target.size = 8
      }
      if (type === 'blur') {
        event.target.size = 1
      }
      if (type === 'change') {
        event.target.size = 1
        event.target.blur()
      }
    },
    isInViewport() {
      const rect = document.querySelector('.box').getBoundingClientRect()
      console.log('fddd')

      if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      ) {
        console.log('show now')
      }
    },
  },
  mounted() {
    let cached = null
    document
      .querySelector('#scroll-test')
      .addEventListener('scroll', (event) => {
        if (!cached) {
          setTimeout(() => {
            this.isInViewport()

            cached = null
          }, 100)
        }
        cached = event
      })
  },
}
</script>

<style></style>
