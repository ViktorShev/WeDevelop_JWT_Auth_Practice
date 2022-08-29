import models from '~/src/service_providers/sequelize/models'
import { hashPassword, doHashesMatch } from '../utils/eval_credentials'

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
        return {
          user: user,
          jwt: null,
          authError: null
        }
      }

      return {
        user: null,
        jwt: null,
        authError: null
      }
    }
  },

  Query: {
    currentUser: async (obj, args, context, info) => {
      return {
        user: null
      }
    }
  }
}
