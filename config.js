module.exports = {
  dev: {
    name: 'API-TEST',
    env: "dev",
    port: 8081,
    base_url: "http://localhost:8081",
    version: "1.0.0",
  },
  test: {
    name: 'API-TEST',
    env: "test",
    port: 8082,
    base_url: "http://localhost:8082",
    version: "1.0.0",
  }
};