var OPEN_HOUR = 7;
var OPEN_MINUTE = 0;

var CLOSE_HOUR = 22;
var CLOSE_MINUTE = 0;

var offset = -6;

var dias = {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
};

var cola_opc1 = "CR_Wa_Ventas";
var cola_opc2 = "CR_Wa_Movil";

var msj_asesor_uno = "Bienvenido al WhatsApp de Claro Costa Rica. Ante la emergencia del COVID-19 estamos tratando de atenderte en el menor tiempo posible. $cr $cr ";
    msj_asesor_uno += "Por favor ingresá el número del motivo de tu contacto: $cr $cr ";
    msj_asesor_uno += "1. Contrataciones y Renovaciones $cr ";
    msj_asesor_uno += "2. Servicio al Cliente $cr ";

var mjs_horario = "Muchas gracias por escribirnos, nuestro horario de atención es de 7:00 am a 10:00 pm. $cr Escribenos mañana y con gusto te atenderemos.";

var palabras = {  
  "recarga": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Recarga fácil y rápido visitando nuestro portal: https://paquetes.miclaro.cr/ 😎",
      "mediaURL" : ""
  },
  "Paquete": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Compra el paquete que prefieras ingresando a https://paquetes.miclaro.cr/",
      "mediaURL" : ""
  },
  "pagar": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Para conocer el saldo, fecha de vencimiento y también poder pagar tu factura móvil y Claro Hogar, puedes ingresar al siguiente portal: https://cr.mipagoclaro.com/ 💳🧾",
      "mediaURL" : ""
  },
  "factura": {
    "type": "text",
    "accion" : "continue",
    "queue" : "",
    "mensaje" : "Regístrate en este enlace http://factura.miclaro.cr/ para recibir tu factura electrónica",
    "mediaURL" : ""
  },
  "club": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Si eres Claro 😉 eres parte del club con beneficios y descuentos. $cr ¡Descarga la App! 👇 $cr Android: http://bit.ly/ClaroClub-Android $cr iOS: http://bit.ly/ClaroClubiOS",
      "mediaURL" : ""
  },
  "asesor": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : msj_asesor_uno,
      "mediaURL" : ""
  }
};

var menu_opciones = 
{
  "1": {
    "type": "",
    "accion" : "transfer",
    "queue" : cola_opc1,
    "mensaje" : "",
    "mediaURL" : ""
  },
  "2": {
    "type": "",
    "accion" : "transfer",
    "queue" : cola_opc2,
    "mensaje" : "",
    "mediaURL" : ""
  }
}

var mensaje_df = "¡Hola! $cr Soy tu asistente virtual 🤖 de Claro $cr Te puedo ayudar con las siguientes opciones: $cr $cr "
  mensaje_df +="➡️ Envía *recarga* para hacer una recarga. $cr $cr ";
  mensaje_df +="➡️ Envía *paquete* para comprar un paquete. $cr $cr ";
  mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 $cr $cr ";
  mensaje_df +="➡️ Envía *factura* para conocer tus opciones en consulta de facturas. (Monto y fecha de vencimiento). 📥 $cr $cr ";
  mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 $cr $cr ";
  mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 $cr $cr ";

var msj_default = {
  "type": "text",
  "accion": "continue",
  "mensaje" : mensaje_df
};

var contenedor = {
  "type": "",
  "accion" : "",
  "queue" : "",
  "mensaje" : "",
  "mediaURL" : ""
};

var fecha_actual = "";
var hora_actual = "";

obtener_fecha = function()
{
    var now = new Date();

    var anio = now.getFullYear();
    var mes = now.getMonth() + 1;
    var dia = now.getDate();

    var hora = now.getHours();
    var minutos = now.getMinutes();
    var segundos = now.getSeconds();

    if(mes < 10){ mes = '0' + mes }
    if(dia < 10){ dia = '0' + dia }
    if(hora < 10){ hora = '0' + hora }
    if(minutos < 10){ minutos = '0' + minutos }
    if(segundos < 10){ segundos = '0' + segundos }

    fecha_actual = dia + "-" + mes + "-" + anio;

    hora_actual = hora + ":" + minutos + ":" + segundos;
    exports.fecha_actual = fecha_actual;
    exports.hora_actual = hora_actual;
}

exports.palabras = palabras;

exports.menu_opciones = menu_opciones;

exports.msj_default = msj_default;

exports.obtener_fecha = obtener_fecha;

exports.OPEN_HOUR = OPEN_HOUR;
exports.OPEN_MINUTE = OPEN_MINUTE;

exports.CLOSE_HOUR = CLOSE_HOUR;
exports.CLOSE_MINUTE = CLOSE_MINUTE;
exports.offset = offset;

exports.dias = dias;

exports.mjs_horario = mjs_horario;

exports.contenedor = contenedor;