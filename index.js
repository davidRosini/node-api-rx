
const config = require("./config")
const restify = require("restify")
const restifyPlugins = require("restify-plugins")
const schema = require("./schema/models")
const routes = require("./routes")
require('dotenv').config()

const server = restify.createServer({
  name: config.name,
  version: config.version,
})

process.title = config.name

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }))
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser({ mapParams: true }))
server.use(restifyPlugins.fullResponse())

server.listen(config.port, () => {
  const orm = schema
  const repositories = require("./repositories")(orm)
  const modules = require("./modules")(repositories)
  routes.init(server, modules)
  
  console.log(`Server is listening on port ${config.port}`)
})