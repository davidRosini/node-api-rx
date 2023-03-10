
const config = require("./config")
const restify = require("restify")
const restifyPlugins = require("restify-plugins")
const schema = require("./schema/models")
const routes = require("./routes")

require('dotenv').config()

const envConfig = config[process.env.NODE_ENV]

const server = restify.createServer({
  name: envConfig.name,
  version: envConfig.version,
})

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }))
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser({ mapParams: true }))
server.use(restifyPlugins.fullResponse())

server.listen(envConfig.port, () => {
  const orm = schema
  const repositories = require("./repositories")(orm)
  const modules = require("./modules")(repositories)
  routes.init(server, modules)
  
  console.log(`Server is listening on port ${envConfig.port}`)
})

module.exports = server