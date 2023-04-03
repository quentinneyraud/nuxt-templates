export default function () {
  this.nuxt.hook('generate:done', context => {
    // Add '/preview' if Prismic preview is used
    const routesToExclude = [...(this.nuxt.options?.generate?.exclude || [])]

    // Filter generated routes
    const routes = Array.from(context.generatedRoutes)
      .filter(route => !routesToExclude.includes(route))
    this.nuxt.options.sitemap.routes = routes

    // Re-exclude from static pages
    this.nuxt.options.sitemap.exclude = routesToExclude
  })
}
