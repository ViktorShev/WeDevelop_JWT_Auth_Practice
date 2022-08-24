import { requestNamespace } from '~/src/service_providers/cls_namespaces'

function setResponseHeader (name, value) {
  const setHeader = requestNamespace.get('setResponseHeader')

  setHeader(name, value)
}

export default setResponseHeader
