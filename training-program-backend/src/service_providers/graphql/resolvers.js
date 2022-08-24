import path from 'path'
import globby from 'globby'

const resolvers = []
const resolverPaths = globby.sync(['./**/*.resolver.js'])

resolverPaths
  .forEach((file) => {
    resolvers.push(
      require(path.join(process.cwd(), file)).default
    )
  })

export default resolvers
