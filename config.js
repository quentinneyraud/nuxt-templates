module.exports = ({ MODE }) => MODE === 'spa'
  ? ({
    ssr: false,

    generate: {
      fallback: true
    }
  })
  : ({})
