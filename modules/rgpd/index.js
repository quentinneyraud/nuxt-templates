import path from 'path'

const MODULE_NAME = 'rgpd'

const DEFAULT_OPTIONS = {
  debug: false,
  cookieName: 'RGPD_COOKIES',
  cookieExpiresAfterDays: 90,
  lang: 'fr',
  defaultLang: 'fr',
  translations: [{
    lang: 'fr',
    detailsTitle: 'Les informations que nous collectons',
    detailsDescription: 'Ici, vous pouvez voir et personnaliser les informations que nous collectons sur vous',
    noticeText: 'En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies utilisés pour réaliser des statistiques de visites.',
    accept: 'Accepter',
    acceptAll: 'Tout accepter',
    refuse: 'Refuser',
    refuseAll: 'Tout refuser',
    save: 'Sauvegarder',
    openDetails: 'Personnaliser'
  }],
  services: []
}

export default function (moduleOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options.rgpd,
    ...moduleOptions,
    MODULE_NAME
  }

  // Component
  this.addPlugin({
    src: path.resolve(__dirname, 'components/index.js'),
    fileName: path.join(MODULE_NAME, 'components/index.js'),
    options,
    ssr: true
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'components/Rgpd.vue'),
    fileName: path.join(MODULE_NAME, 'components/Rgpd.vue'),
    options,
    ssr: true
  })

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}
