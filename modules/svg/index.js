import path from 'path'

export default function () {
  if (this.nuxt.options.dev) {
    // Add basic layout
    const layout = path.resolve(__dirname, 'layouts', 'basic-layout.vue')
    this.addLayout(layout, 'basic-layout')

    // Add page that list all icons
    const pagePath = path.resolve(__dirname, 'pages', 'icons-list.vue')
    this.extendRoutes(routes => {
      routes.unshift({
        name: 'icons-list',
        path: '/_icons',
        component: pagePath
      })
    })
  }
}
