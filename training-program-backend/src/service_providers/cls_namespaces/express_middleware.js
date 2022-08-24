import { requestNamespace, sequelizeNamespace } from './'

function applyRequestNamespace (req, res, next) {
  requestNamespace.run(() => {
    sequelizeNamespace.run(() => {
      next()
    })
  })
}

export default applyRequestNamespace
