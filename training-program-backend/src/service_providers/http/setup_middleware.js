import { requestNamespace } from '~/src/service_providers/cls_namespaces'

function setupMiddleware (app) {
  app.use((req, res, next) => {
    requestNamespace.set('canSetHeaders', (name) => {
      return !res.headersSent
    })
    requestNamespace.set('setResponseHeader', (name, value) => {
      res.set(name, value)
    })
    requestNamespace.set('getRequestHeader', (name) => {
      return req.get(name)
    })
    next()
  })
}

export default setupMiddleware
