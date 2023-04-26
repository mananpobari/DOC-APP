module.exports = {
  resolve: {
    fallback: { timers: require.resolve("timers-browserify")}
  },
  resolve: {
    fallback: { zlib: require.resolve("browserify-zlib")}
  },
  resolve: {
    fallback: { http: require.resolve("stream-http")}
  },
  resolve: {
    fallback: { stream: require.resolve("stream-browserify")}
  },
  resolve: {
    fallback: { path: require.resolve("path-browserify")}
  },
};