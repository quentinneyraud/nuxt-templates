<template>
  <div class="Home">
    <!-- Slider -->
    <Slider
      class="slider"
      :items="items"
      @live-slide="onLiveSlide"
      @slide="onSlide"
      @drag-end="onDragEnd"
    >
      <template #default="{ item }">
        <div class="item flex-parent-center">
          <img
            class="item-image"
            :src="item.url"
          >

          <div class="item-heading flex-parent-center">
            <div class="item-title">
              {{ item.title }}
            </div>
            <div class="item-text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </template>
    </Slider>

    <!-- Bullets -->
    <Bullets
      :number="items.length"
      interactive
      :active-index="activeIndex"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0,
      items: [
        {
          title: 'Un premier titre',
          text: 'Un premier texte',
          url: 'https://source.unsplash.com/random'
        },
        {
          title: 'Un deuxième titre',
          text: 'Un deuxième texte',
          url: 'https://source.unsplash.com/random'
        },
        {
          title: 'Un troisième titre',
          text: 'Un troisième texte',
          url: 'https://source.unsplash.com/random'
        }
      ]
    }
  },

  methods: {
    onLiveSlide ({ index }) {
      console.log('live slide on index:', index)
      this.activeIndex = index
    },

    onSlide ({ index }) {
      console.log('end slide on index:', index)
    },

    onDragEnd ({ index }) {
      console.log('drag end:', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  overflow: hidden;
}

.item {
  position: relative;
  @include ratio(16, 9);
}

.item-image {
  @include full-parent;
  object-fit: cover;
}

.item-heading {
  position: relative;
  z-index: 10;
  background-color: #fff;
  padding: 8rem;
  flex-direction: column;
  gap: 2rem;
}

.item-title {
  font-size: 30px;
}

.item-text {
  font-size: 16px;
}
</style>
