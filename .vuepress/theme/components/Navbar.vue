<template>
  <header class="navbar">
    <div class="navbar-container theme-container">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

      <a href="https://larammerce.com" class="home-link">
        <!--<img-->
        <!--class="logo"-->
        <!--v-if="$site.themeConfig.logo"-->
        <!--:src="$withBase($site.themeConfig.logo)"-->
        <!--:alt="$siteTitle"-->
        <!--&gt;-->
        <span
          ref="siteName"
          class="site-name"
          v-if="$siteTitle"
          :class="{ 'can-hide': $site.themeConfig.logo }"
        >
          <svg
            height="60"
            style="height: 60px; fill: currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <g class="st0">
              <path
                class="st1"
                d="M3.4,8.5L3.4,8.5c0.8,0,2.7,1.2,6,3.5l0.5,1.6L10.1,33c0,0.2-1.7,1.4-5,3.3l-1,0.2c-0.9,0-1.3-0.6-1.4-1.7
		L2.6,10.4C2.6,9.6,2.9,8.9,3.4,8.5z M12.8,33.1C16,34.7,18,36,19,37v0.6c-0.7,0.7-3,2.1-6.7,4.2H12c-0.6,0-3-1.4-7.3-4.3v-0.1
		c0.3,0,2.8-1.4,7.4-4.2L12.8,33.1z"
              />
              <path
                class="st1"
                d="M23.7,13.8c0.7,0,2.7,1.1,5.9,3.3l0.1,0.5v19c0,1.4-0.8,2.3-2.5,2.9c-1.6,1.2-2.9,1.9-3.7,2.2
		c-0.8,0-1.2-0.8-1.2-2.3V15.9C22.3,14.5,22.8,13.8,23.7,13.8z M39.8,8.5c0.8,0,1.3,0.8,1.4,2.3v5.9L41,16.9
		c-4.3-2.8-6.7-4.2-7.3-4.2h-0.2c-1.3,0.2-1.9,0.9-1.9,1.9V17h-0.3c-4.1-2.7-6.4-4.1-6.9-4.1v-0.1c4.1-2.8,6.4-4.2,6.9-4.2
		c0.2,0,1.6,0.8,4.1,2.5h0.1C35.7,11.1,37.1,10.3,39.8,8.5z M33.5,13.7c0.6,0,2.6,1.2,6,3.5l0.1,0.5v13c0,1.5-0.9,2.5-2.6,3.1
		c-2,1.4-3.2,2-3.7,2c-0.7,0-1.1-0.7-1.1-2v-18C32.2,14.3,32.6,13.7,33.5,13.7z M41.8,9.2H42c4.4,2.6,6.7,4.1,7,4.5
		c0.2,0,0.3,0.6,0.4,1.9V36c0,1.5-0.5,2.4-1.5,2.9c-3,1.8-4.6,2.6-4.9,2.6c-0.5,0-0.9-0.5-1-1.6V10.2L41.8,9.2z"
              />
            </g>
          </svg>
        </span>
      </a>

      <div
        class="links"
        :style="
          linksWrapMaxWidth
            ? {
                'max-width': linksWrapMaxWidth + 'px',
              }
            : {}
        "
      >
        <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
        <SearchBox v-else-if="$site.themeConfig.search !== false" />
        <NavLinks class="can-hide" />
      </div>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data() {
    return {
      linksWrapMaxWidth: null,
    }
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) +
      parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },
  },
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar-container
  display flex
  justify-content space-between

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  //line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
    margin-top 5px
  .links
    padding-top 1rem
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
</style>
