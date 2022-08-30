import models from '~/src/service_providers/sequelize/models'
import { hashPassword, doHashesMatch } from '../utils/eval_credentials'
import jsonwebtoken from 'jsonwebtoken'
import getDecodedAccessToken from '../service_providers/authentication/get_decoded_access_token'

export default {
  Mutation: {
    signup: async (obj, { data }, context, info) => {
      try {
        const user = await models.user.create(data.data)

      return {
        user: user,
        jwt: null,
        authError: null,
      }
    } catch (err) {
      return {
        user: null,
        jwt: null,
        authError: null
      }
    }
    },

    signin: async (obj, { data }, context, info) => {
      const user = await models.user.findOne({ where: { username: data.username } })
      const hashedUserProvidedPassword = hashPassword(data.password, user?.salt)
      if (doHashesMatch(user?.password, hashedUserProvidedPassword)) {
        const jwt = jsonwebtoken.sign({sub: user.id, name: user.lastName}, process.env.SECRET, {expiresIn: '10d'})
        return {
          user,
          jwt,
          authError: null
        }
      }
      return (
        new Error('INVALID_CREDENTIALS')
      )
      // return {
      //   user: null,
      //   jwt: null,
      //   authError: 'INVALID_CREDENTIALS'
      // }
    }
  },

  Query: {
    currentUser: async (obj, args, context, info) => {
      const decodedPayload = await getDecodedAccessToken()
      if (decodedPayload) {
        const user = await models.user.findOne({ where: { id: decodedPayload?.sub } })
        return {
          ...user.get()
        }
      }
      
      return {
        user: null
      }
    }
  }
}
