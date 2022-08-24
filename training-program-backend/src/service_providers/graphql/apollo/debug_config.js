let debugConfig = {
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  tracing: true
}

if (process.env.ENVIRONMENT === 'production') {
  debugConfig = {
    introspection: false,
    playground: false,
    tracing: false
  }
}

export default debugConfig
