/* eslint-disable no-console */
const options = JSON.parse('<%= JSON.stringify(options) %>')

const IS_DARK_MODE = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
const SVG_COLOR = IS_DARK_MODE ? 'white' : 'black'

const icons = {
  github: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="${SVG_COLOR}" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  `)}`,
  twitter: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 416">
      <path fill="${SVG_COLOR}" d="M512 49.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 12.704 384.416 0 354.464 0c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792C26.592 34.848 21.28 52.832 21.28 72.192c0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 398.88 101.6 416 161.024 416c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568C480.224 88.96 497.728 70.496 512 49.248z" />
    </svg>
  `)}`,
  website: `data:image/svg+xml;base64,${btoa(`
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92">
      <path fill="${SVG_COLOR}" d="M80.36 76.54a45.88 45.88 0 00.07-61 2.462 2.462 0 00-.29-.34 45.93 45.93 0 00-68.27 0 1.993 1.993 0 00-.3.34 45.88 45.88 0 000 60.92c.086.121.183.235.29.34a45.939 45.939 0 0068.28 0c.079-.083.152-.17.22-.26zM4.05 48H22a81 81 0 003 20.59 56.677 56.677 0 00-11.3 4.22A41.76 41.76 0 014.05 48zm9.65-28.81A56.677 56.677 0 0025 23.41 81 81 0 0022 44H4a41.76 41.76 0 019.7-24.81zM88 44H70a81.004 81.004 0 00-3-20.59c3.906-1.001 7.694-2.416 11.3-4.22A41.76 41.76 0 0188 44zM44 22a79.237 79.237 0 01-13.76-1.46C33.54 11.61 38.48 5.43 44 4.22V22zm-15 2.33A83.748 83.748 0 0044 26v18H26a76.272 76.272 0 013-19.67zM44 48v18c-5.039.094-10.06.642-15 1.64A76.269 76.269 0 0126 48h18zm0 22v17.78c-5.52-1.21-10.46-7.39-13.76-16.29A79.235 79.235 0 0144 70zm4 0c4.62.084 9.225.572 13.76 1.46-3.3 8.9-8.24 15.08-13.76 16.29V70zm15-2.36A83.731 83.731 0 0048 66V48h18a76.272 76.272 0 01-3 19.67v-.03zM48 44V26a83.75 83.75 0 0015-1.64A76.272 76.272 0 0166 44H48zm0-22V4.22c5.52 1.21 10.46 7.39 13.76 16.29A79.246 79.246 0 0148 22zm17.76-2.38a39.57 39.57 0 00-8.05-13.95 42 42 0 0117.77 10.45 54.207 54.207 0 01-9.72 3.47v.03zm-39.52 0a54.204 54.204 0 01-9.72-3.47A42 42 0 0134.29 5.67a39.569 39.569 0 00-8.05 13.92v.03zm0 52.82a39.57 39.57 0 008.05 13.92 42 42 0 01-17.77-10.48 54.196 54.196 0 019.72-3.47v.03zm39.52 0a54.191 54.191 0 019.72 3.47 42 42 0 01-17.77 10.42 39.57 39.57 0 008.05-13.92v.03zM67 68.59A81.004 81.004 0 0070 48h18a41.76 41.76 0 01-9.7 24.81A56.677 56.677 0 0067 68.59z"/>
    </svg>
  `)}`,
  facebook: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="${SVG_COLOR}" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256s114.6 256 256 256c1.5 0 3 0 4.5-.1V312.7h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5C433.7 471.4 512 372.9 512 256z" />
    </svg>
  `)}`
}

const jsToCss = style => {
  return Object.entries(style)
    .reduce((acc, [styleRule, styleValue]) => {
      styleRule = styleRule.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      acc += `${styleRule}:${styleValue};`

      return acc
    }, '')
}

const logInfo = ({ name, value, icon }) => {
  if (!name || !value) return

  let text = `%c${name}: %c${value}`
  const styles = []

  if (icons[icon]) {
    text = `%c ${text}`

    styles.push(jsToCss({
      verticalAlign: 'top',
      padding: '5px',
      marginRight: '10px',
      backgroundImage: `url(${icons[icon]})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    }))
  }

  // Name style
  styles.push(jsToCss({
    fontWeight: 'bold'
  }))

  // Value style
  styles.push(jsToCss({
  }))

  console.log(
    text,
    ...styles
  )
}

export const sign = _ => {
  /**
   *
   * Title
   *
   */
  options.name && console.log(`%c${options.name}`, jsToCss({
    fontSize: '22px',
    width: '200px',
    padding: '35px 55px',
    backgroundColor: IS_DARK_MODE ? 'white' : 'dark',
    color: IS_DARK_MODE ? 'dark' : 'white'
  }))

  /**
   *
   * Socials
   *
   */
  options.website && logInfo({
    icon: 'website',
    name: 'Website',
    value: options.website
  })

  options.twitter && logInfo({
    icon: 'twitter',
    name: 'Twitter',
    value: options.twitter
  })

  options.facebook && logInfo({
    icon: 'facebook',
    name: 'Facebook',
    value: options.facebook
  })

  /**
   *
   * Team
   *
   */
  const team = options.team
    ?.map(({ name, status, github, twitter, website } = {}) => {
      if (!name) return null

      return {
        shortText: name + (status ? ` (${status})` : ''),
        name,
        status,
        github,
        twitter,
        website
      }
    })
    ?.filter(v => !!v) || null

  if (team.length > 0) {
    console.group('%cTeam 👩‍💻👨‍💻', 'padding: 10px 0;')

    team
      .forEach(teamMember => {
        if (!teamMember.github && !teamMember.twitter) {
          console.log(`%c${teamMember.shortText}`, jsToCss({
            fontWeight: 'bold'
          }))
          return
        }

        console.groupCollapsed(teamMember.shortText)

        if (teamMember.github) {
          logInfo({
            icon: 'github',
            name: 'Github',
            value: teamMember.github
          })
        }

        if (teamMember.twitter) {
          logInfo({
            icon: 'twitter',
            name: 'Twitter',
            value: teamMember.twitter
          })
        }

        if (teamMember.website) {
          logInfo({
            icon: 'website',
            name: 'Website',
            value: teamMember.website
          })
        }

        console.groupEnd()
      })

    console.groupEnd()
  }

  /**
   *
   * Libraries
   *
   */
  const libraries = options.libraries
    ?.map(({ name, author, github, website } = {}) => {
      if (!name) return null

      return {
        shortText: name + (author ? ` by ${author}` : ''),
        name,
        author,
        github,
        website
      }
    })
    ?.filter(v => !!v) || null

  if (libraries.length > 0) {
    console.group('%cLibraries 🛠️', 'padding: 10px 0;')

    libraries
      .forEach(library => {
        if (!library.author && !library.github && !library.website) {
          console.log(`%c${library.shortText}`, jsToCss({
            fontWeight: 'bold'
          }))
          return
        }

        console.groupCollapsed(library.shortText)

        if (library.github) {
          logInfo({
            icon: 'github',
            name: 'Github',
            value: library.github
          })
        }

        if (library.website) {
          logInfo({
            icon: 'website',
            name: 'Website',
            value: library.website
          })
        }

        console.groupEnd()
      })

    console.groupEnd()
  }

  /**
   *
   * Fonts
   *
   */
  const fonts = options.fonts
    ?.map(({ name, author, website } = {}) => {
      if (!name) return null

      return {
        shortText: name + (author ? ` by ${author}` : ''),
        name,
        author,
        website
      }
    })
    ?.filter(v => !!v) || null

  if (fonts.length > 0) {
    console.group('%cFonts 🔤', 'padding: 10px 0;')

    fonts
      .forEach(font => {
        if (!font.website) {
          console.log(`%c${font.shortText}`, jsToCss({
            fontWeight: 'bold'
          }))
          return
        }

        console.groupCollapsed(font.shortText)

        if (font.website) {
          logInfo({
            icon: 'website',
            name: 'Website',
            value: font.website
          })
        }

        console.groupEnd()
      })

    console.groupEnd()
  }

  /**
   *
   * Icons
   *
   */
  const icons = options.icons
    ?.map(({ name, author, website } = {}) => {
      if (!name) return null

      return {
        shortText: name + (author ? ` by ${author}` : ''),
        name,
        author,
        website
      }
    })
    ?.filter(v => !!v) || null

  if (icons.length > 0) {
    console.group('%cIcons 🖍️', 'padding: 10px 0;')

    icons
      .forEach(icon => {
        if (!icon.website) {
          console.log(`%c${icon.shortText}`, jsToCss({
            fontWeight: 'bold'
          }))
          return
        }

        console.groupCollapsed(icon.shortText)

        if (icon.website) {
          logInfo({
            icon: 'website',
            name: 'Website',
            value: icon.website
          })
        }

        console.groupEnd()
      })

    console.groupEnd()
  }
}

window.onNuxtReady(sign)
