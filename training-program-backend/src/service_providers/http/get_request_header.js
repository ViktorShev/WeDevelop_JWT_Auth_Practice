import { requestNamespace } from '~/src/service_providers/cls_namespaces'

function getRequestHeader (name) {
  const getHeader = requestNamespace.get('getRequestHeader')

  return getHeader(name)
}

export default getRequestHeader
