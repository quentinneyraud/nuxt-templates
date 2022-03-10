module.exports = _ => ({
  modules: [
    '~/modules/signature'
  ],
  signature: {
    /**
      Agency name (Default: null)
     */
    name: null,

    /**
     Agency website URL (Default: null)
     */
    website: null,

    /**
     Agency twitter URL (Default: null)
     */
    twitter: null,

    /**
     Agency facebook URL (Default: null)
     */
    facebook: null,

    /**
     Array of team members objects with these properties (Default: [])
        - name: Team member name
        - status: Team member status
        - github: Team member github URL
        - twitter: Team member twitter URL
        - website: Team member website URL
      */
    team: [],

    /**
      Array of libraries objects with these properties (Default: [])
        - name: Library name
        - author: Library author name
        - github: Library github URL
        - website: Library website URL
      */
    libraries: [],

    /**
      Array of fonts objects with these properties (Default: [])
        - name: Font name
        - author: Font author name
        - website: Font website URL
      */
    fonts: [],

    /**
     Array of icons objects with these properties (Default: [])
        - name: Icon name
        - author: Icon author name
        - website: Icon website URL
      */
    icons: [],

    /**
      Force display in dev mode (Default: false)
     */
    force: false
  }
})
