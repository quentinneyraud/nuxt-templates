module.exports = _ => ({
  modules: ['~/modules/rgpd'],

  rgpd: {
    /**
      Log errors and warnings (Default: true in dev mode)
     */
    debug: undefined,

    /**
      Upgrade version to force re-render of RgpdBanner
     */
    version: '1',

    /**
      User choices cookie name (Default: 'RGPD_COOKIES')
     */
    cookieName: 'RGPD_COOKIES',

    /**
      User choices cookie validity (Default: 90)
     */
    cookieExpiresAfterDays: 90,

    /**
      Force re-render of RgpdBanner (Default: true in dev mode to help components styling)
     */
    deleteCookieOnInit: undefined
  }
})
