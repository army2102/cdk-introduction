import 'reflect-metadata'

import config from '@/config'
import initContainer from '@/container'
import createServer from '@/server'
import serverless from 'serverless-http'

// Setting up the Typedi Container
initContainer()

const server = createServer()
if (require.main === module) {
  // Setting up the Fastify server
  server.listen(config.port, err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

exports.lambdaHandler = serverless(server as serverless.Application)
