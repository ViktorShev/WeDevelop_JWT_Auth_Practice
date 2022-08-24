import { requestNamespace } from '~/src/service_providers/cls_namespaces'

function canSetHeaders (name) {
  const canSetHeaders_ = requestNamespace.get('canSetHeaders')

  return canSetHeaders_()
}

export default canSetHeaders
