import models from '~/src/service_providers/sequelize/models'
import { sequelizeNamespace } from '~/src/service_providers/cls_namespaces'

export default {
  requestDidStart () {
    let transaction
    let transactionResolvePromise

    return {
      async responseForOperation () {
        transaction = await models.sequelize.transaction()
        sequelizeNamespace.set('transaction', transaction)

        return null
      },
      executionDidStart () {
        return (err) => {
          if (err) {
            if (!transactionResolvePromise) {
              transactionResolvePromise = transaction.rollback()
            }
          } else {
            if (!transactionResolvePromise) {
              transactionResolvePromise = transaction.commit()
            }
          }
        }
      },
      didEncounterErrors () {
        if (!transactionResolvePromise) {
          transactionResolvePromise = transaction?.rollback()
        }

        return transactionResolvePromise
      },
      willSendResponse () {
        return transactionResolvePromise
      }
    }
  }
}
