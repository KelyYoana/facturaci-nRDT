import express from "express";
import http from "http";
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
const fs = require('fs')

// Importar routers aquí
import IndexRouter from './routes/'
const helmet = require('helmet')

import debug from 'debug'
require('dotenv').config()
debug('vqingenieria-app-api:server')

const app = express();


app.use(helmet())
app.use(cors()) // Para peticiones CORS
/*
Cree una nueva función de middleware morgan logger utilizando el formato y las opciones dados. El argumento de formato puede ser una cadena de un nombre predefinido (vea los nombres a continuación), una cadena de una cadena de formato o una función que producirá una entrada de registro.
La función de formato se llamará con tres argumentos tokens, req y res, donde tokens es un objeto con todos los tokens definidos, req es la solicitud HTTP y res es la respuesta HTTP.
*/
app.use(logger('dev'))
/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas JSON y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza JSON y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta cualquier codificación Unicode del cuerpo y admite la inflación automática de codificaciones gzip y desinflar.
*/
app.use(express.json({ limit: '50mb' }))
/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas útiles codificadas por urlen y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza los cuerpos codificados por urlen y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta solo la codificación UTF-8 del cuerpo y admite el inflado automático de codificaciones gzip y desinflado.
*/
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

/*

Analice el encabezado de la cookie y complete req.cookies con un objeto marcado por los nombres de las cookies. Opcionalmente, puede habilitar el soporte de cookies firmadas pasando una cadena secreta, que asigna req.secret para que pueda ser utilizada por otro middleware.
*/
app.use(cookieParser())
/*
Esta es una función de middleware incorporada en Express. Sirve archivos estáticos y se basa en serve-static.
El argumento raíz especifica el directorio raíz desde el que se sirven los activos estáticos. La función determina el archivo a servir combinando req.url con el directorio raíz proporcionado. Cuando no se encuentra un archivo, en lugar de enviar una respuesta 404, llama a next () para pasar al siguiente middleware, lo que permite el apilamiento y los retrocesos.
*/

var port = normalizePort(process.env.PORT || '3007')
app.set('port', port)


const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

app.get('/hola',(req, res, next )=>{
    return res.status(200).send({message: 'Hola mundo'})
})
app.use('/api/v1', IndexRouter)


const httpServer = server.listen(port)
server.on('error', onError)
server.on('listening', onListening)


/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

 function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      // break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      // break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log(`Server running at port ${port}`)
}

//const httpServer = server.listen(3006);
// console.log("Server on http://localhost:3006");