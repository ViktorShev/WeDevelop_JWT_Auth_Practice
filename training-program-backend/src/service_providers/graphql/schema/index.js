import path from 'path'
import fs from 'fs'
import gql from 'graphql-tag'
import globby from 'globby'

const typeDefs = []
const graphQLFilePaths = globby.sync(['./**/*.graphql'])

graphQLFilePaths
  .forEach((file) => {
    typeDefs.push(
      gql(fs.readFileSync(path.join(process.cwd(), file), 'utf-8'))
    )
  })

export default typeDefs
