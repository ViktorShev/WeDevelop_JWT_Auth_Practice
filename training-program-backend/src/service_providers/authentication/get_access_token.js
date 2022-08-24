import { requestNamespace } from '~/src/service_providers/cls_namespaces'

function getAccessToken () {
  const accessToken = requestNamespace.get('accessToken')

  return accessToken
}

export default getAccessToken
