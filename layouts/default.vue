<template>
  <div>
    <Nuxt />

    <!-- Rgpd -->
    <RgpdPopup
      :text-contents="{
        title: 'Les informations que nous collectons',
        text: 'Notre site utilise des cookies. Les cookies sont de petits fichiers texte placés sur votre appareil pour stocker des données destinées à être utilisées ultérieurement par les serveurs Web. Ubac utilise des cookies pour mémoriser vos préférences et vos paramètres, vous aider à vous connecter, afficher des publicités personnalisées et analyser les performances de nos sites Web.',
        accept: 'Accepter',
        refuse: 'Refuser',
        save: 'Sauvegarder'
      }"
    />
    <RgpdBanner
      :text-contents="{
        text: 'En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies utilisés pour réaliser des statistiques de visites.',
        acceptAll: 'Tout accepter',
        manage: 'Personnaliser'
      }"
    />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$rgpd.init([{
      id: 'base',
      name: 'Cookies de fonctionnement de site',
      description: 'Nous utilisons les cookies nécessaires pour exécuter les fonctions essentielles du site Web. Sur ce site, nous utilisons des cookies pour mesurer notre audience, entretenir la relation avec vous et vous adresser de temps à autre du contenu qualitif ainsi que de la publicité. Ces cookies sont nécessaires au fonctionnement de notre site Web.',
      required: true
    }, {
      id: 'analytics',
      name: 'Cookies de tracking',
      description: "Permet d'analyser les statistiques de consultation de notre site. Plus de détails",
      required: false,
      defaultValue: true
    }])
  }
}
</script>

<style>

*, *:after, *:before {
  box-sizing: border-box;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
