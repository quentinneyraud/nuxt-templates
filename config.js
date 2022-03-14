module.exports = ({ title = 'My app' } = {}) => ({
  modules: [
    '~/modules/audio'
  ],
  // https://github.com/pimlie/nuxt-rfg-icon#setup
  'rfg-icon': {
    rfg: {
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          },
          appName: title
        },
        desktopBrowser: {
          design: 'raw'
        },
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#FFFFFF',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          },
          appName: title
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#FFFFFF',
          manifest: {
            name: title,
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 63.125,
          themeColor: '#FFFFFF'
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      }
    }
  }

})
