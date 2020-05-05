var express = require('express')
var http = require('http')
var app = express()
var request = require('request')
var async = require('async')
var bodyParser = require('body-parser');
var localStorage = require('localStorage')
let fs = require('fs');
var util = require('util');
var config = require('./config.js');
var horario = require('./controllers/validar_horario.js');
var port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('img'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var palabras = config.palabras;
var msj_dafault = config.msj_default;
var menu_opciones = config.menu_opciones;
var mjs_horario = config.mjs_horario;
var contenedor = config.contenedor;

app.post('/message', (req, res) => {
  config.obtener_fecha();
  console.log("[Brito] :: [message] :: [Peticion POST] :: [FECHA-HORA] : "+config.fecha_actual+" "+config.hora_actual); 

  var horarios = horario.validarHorario(config.OPEN_HOUR, config.OPEN_MINUTE, config.CLOSE_HOUR, config.CLOSE_MINUTE);

  console.log(horarios);  

  var result, resultado;
  var bandera = false , estatus = 200;
  var msj_buscar = "", msj_buscar_opcion = "";

  var apiVersion = req.body.apiVersion;
  var conversationID = req.body.conversationId;
  var authToken = req.body.authToken;
  var channel = req.body.channel;
  var user = req.body.user;
  var context = req.body.context;
  var cadena = req.body.message;
  
  if(apiVersion !== '' && typeof apiVersion !== "undefined") 
  {
    if(authToken !== '' && typeof authToken !== "undefined") 
    {
      if(channel !== '' && typeof channel !== "undefined") 
      {
        if(user !== '' && typeof user !== "undefined") 
        {
          if(context !== '' && typeof context !== "undefined") 
          {
            if(cadena !== '' && typeof cadena !== "undefined") 
            {
              cadena = cadena.text.toLowerCase(); // minusculas
              cadena = cadena.trim();
              msj_buscar_opcion = cadena;
              cadena = cadena.replace(/,/g,"").replace(/;/g,"").replace(/:/g,"").replace(/\./g,""); // borramos ,;.:
              cadena = cadena.split(" "); // lo convertimo en array mediante los espacios

              for(var i = 0; i < cadena.length; i++)
              {
                for(var atr in palabras)
                {
                  if(cadena[i] === "configuración"){ cadena[i] = 'configuracion'}

                  if(atr.toLowerCase() === cadena[i])
                  {
                    msj_buscar = cadena[i];

                    result = palabras[atr];                    

                    bandera = true;

                    localStorage.removeItem("msj_"+conversationID);

                    break;
                  }
                }      
                if(bandera){ break; }
              }

              console.log("[Brito] :: [message] :: [msj_buscar_opcion] :: " + msj_buscar_opcion);

              if(localStorage.getItem("msj_"+conversationID) == null) // No existe
              {
                console.log('[Brito] :: [message] :: [Crea Storage] :: ' + localStorage.getItem("msj_"+conversationID));

                if(msj_buscar == "asesor")
                {
                  localStorage.setItem("msj_"+conversationID, msj_buscar);
                }
              }
              else // Existe localStorage
              {
                console.log('[Brito] :: [message] :: [Borra Storage] :: ' + localStorage.getItem("msj_"+conversationID));

                var y = parseInt(msj_buscar_opcion);            

                if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "asesor")
                {
                  localStorage.removeItem("msj_"+conversationID);

                  if(horarios)
                  {
                    console.log("[Brito] :: [Cumple horario habil] :: [horarios] :: " + horarios); 
                    result = menu_opciones[msj_buscar_opcion];                                              
                  }
                  else
                  {
                    console.log("[Brito] :: [No cumple horario habil] :: [horarios] :: " + horarios);                    
                    contenedor.type = palabras["asesor"].type;
                    contenedor.accion = "end";
                    contenedor.queue = "";
                    contenedor.mensaje = mjs_horario;
                    result = contenedor;
                  }
                  bandera = true;
                }
                else if (!isNaN(y) && localStorage.getItem("msj_"+conversationID) == "asesor")
                {
                  console.log("[Brito] :: [No es el número correcto] :: [Número de opción] :: " + y);
                  result = palabras['asesor'];
                  bandera = true;
                }
              }               

              if(!bandera){ result = msj_dafault; localStorage.removeItem("msj_"+conversationID); }

              estatus = 200;

              resultado = {
                "context":{
                  "agent":false,
                  "callback":false,
                  "video":false
                },
                "action":{
                  "type": result.accion,
                  "queue": result.queue
                },
                "messages":[{
                  "type": result.type,
                  "text": result.mensaje,
                  "mediaURL": result.mediaURL
                }],
                "additionalInfo": {
                  "key":"RUT",
                  "RUT":"1-9"
                }
              };

              if(result.mensaje === ""){resultado.messages = [];}
            }
            else
            {
              estatus = 400;
              resultado = {
                "estado": "El valor de mensaje es requerido"
              }
            } 
          }
          else
          {
            estatus = 400;
            resultado = {
              "estado": "El valor de contexto es requerido"
            }
          } 
        }
        else
        {
          estatus = 400;
          resultado = {
            "estado": "El valor de user es requerido"
          }
        }        
      }
      else
      {
        estatus = 400;
        resultado = {
          "estado": "El valor de channel es requerido"
        }
      } 
    }
    else
    {
      estatus = 400;
      resultado = {
        "estado": "El valor de authToken es requerido"
      }
    }
  }
  else
  {
    estatus = 400;
    resultado = {
      "estado": "El valor de apiVersion es requerido"
    }
  }

  res.status(estatus).json(resultado);
})

app.post('/terminate', (req, res) => {
  var result, resultado;
  var bandera = false , estatus = 200;

  var conversationID = req.body.conversationId;
  var RRSS = req.body.RRSS;
  var canal = req.body.channel;
  var contexto = req.body.context;

  if(RRSS !== '' && typeof RRSS !== "undefined") 
  {
    if(canal !== '' && typeof canal !== "undefined") 
    {
      if(contexto !== '' && typeof contexto !== "undefined") 
      {
        estatus = 200;
        resultado = {
          "estado": "OK"
        }
      }
      else
      {
        estatus = 400;
        resultado = {
          "estado": "El valor de contexto es requerido"
        }
      }
    }
    else
    {
      estatus = 400;
      resultado = {
        "estado": "El valor de canal es requerido"
      }
    } 
  }
  else
  {
    estatus = 400;
    resultado = {
      "estado": "El valor de RRSS es requerido"
    }
  } 

  res.status(estatus).json(resultado);
})

app.get('/:img', function(req, res){
    res.sendFile( `img/${img}` );
}); 

app.get('/', (req, res) => {
  const now = new Date();

  var horarios = horario.validarHorario(config.OPEN_HOUR, config.OPEN_MINUTE, config.CLOSE_HOUR, config.CLOSE_MINUTE);

  console.log("[Brito] :: [Raiz] :: [Respuesta de Horario] :: " + horarios);

  // create Date object for current location
  var d = new Date();
  var offset = config.offset;
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*offset));

  var respuesta = "Bienvenido al menú Bot de Costa Rica, las opciones disponibles son: <br> /message<br> /terminate <br> ";
  respuesta += "Hora del servidor: " + now + " <br> ";
  respuesta += "Hora inicio: " + config.OPEN_HOUR + " - Hora Fin: " + config.CLOSE_HOUR + " <br> ";
  respuesta += "Respuesta del Horario: " + horarios + " <br> ";
  respuesta += "Hora Convertida  " + nd +" <br>";
  respuesta += "Versión: 2.0.0 <br>";
  res.status(200).send(respuesta);
})

http.createServer(app).listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});
