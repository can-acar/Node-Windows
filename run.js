const path = require('path');
const {Service, EventLogger} = require("./lib/node-windows");


const log = new EventLogger("WebServer")

const svc = new Service({
  name: "NodeWebServer",
  description: "WEB NODE SERVICE",
  
  installPath: './deamon',// => C:\server\node\deamon => nodewebserver.exe
  script: path.join("D:", "www", "next-project", "server", "index.js"),
  workingDirectory: path.join("D:", "www", "next-project"),
  env: {
    name: 'NODE_ENV',
    value: 'production',
  },
})

log.info("Installing Service")

svc.on('install', function () {
  
  
  svc.start()
  
  log.info("Installed Service")
  console.info("Installed Service")
  console.info("Running!", path.join(__dirname, "server", "index.js"))
})

svc.on('uninstall', function () {
  svc.stop()
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
  console.info("Running!", path.join(__dirname, "server", "index.js"))
});

// Uninstall the service.
//svc.uninstall();

svc.install()
