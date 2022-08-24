import { requestNamespace } from '~/src/service_providers/cls_namespaces'
import canSetHeaders from '../http/can_set_headers'
import setResponseHeader from '../http/set_response_header'

function setAccessToken (accessToken) {
  requestNamespace.set('accessToken', accessToken)

  if (canSetHeaders()) {
    setResponseHeader('Authorization', `Bearer ${accessToken}`)
  }
}

export default setAccessToken
