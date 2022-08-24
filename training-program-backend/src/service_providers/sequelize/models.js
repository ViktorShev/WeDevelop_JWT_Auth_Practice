import path from 'path'
import Sequelize from 'sequelize'
import globby from 'globby'

import buildSequelizeConfig from './config'
import { sequelizeNamespace } from '~/src/service_providers/cls_namespaces'

Sequelize.useCLS(sequelizeNamespace)
const sequelize = new Sequelize(buildSequelizeConfig())
const sequelizeModels = {}
const modelPaths = globby.sync(['./**/*.model.js'])

// Load all models
modelPaths
  .forEach((file) => {
    const model = require(path.join(process.cwd(), file)).default(sequelize, Sequelize.DataTypes)
    sequelizeModels[model.name] = model
  })

Object.keys(sequelizeModels)
  .forEach((modelName) => {
    if ('associate' in sequelizeModels[modelName]) {
      sequelizeModels[modelName].associate(sequelizeModels)
    }

    if ('addScopes' in sequelizeModels[modelName]) {
      sequelizeModels[modelName].addScopes(sequelizeModels)
    }
  })

sequelizeModels.sequelize = sequelize
module.exports = sequelizeModels
