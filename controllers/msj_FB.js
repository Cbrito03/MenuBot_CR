var colas = {
  "ventas" : {
      "timeout" : 900000, // 15 min
      "acd" : "CR_FB_MSS_Ventas"
  },
  "pagar_asesor" : {
      "timeout" : 300000, // 5 min - 180000, // 3 min
      "acd" : "CR_FB_MSS_SAC"
  },
  "factura_asesor" : {
      "timeout" : 300000, // 5 min - 180000, // 3 min
      "acd" : "CR_FB_MSS_SAC"
  }
};

var mensaje_df = "¡Hola! \n Soy tu asistente virtual 🤖 de Claro \n Te puedo ayudar con las siguientes opciones: \n \n "
    mensaje_df +="➡️ Envía *Ventas* si deseas contratar o renovar tu servicio 😎. \n \n ";
    mensaje_df +="➡️ Envía *Recarga* para hacer una recarga. \n \n ";
    mensaje_df +="➡️ Envía *Paquete* para comprar un paquete. \n \n ";
    mensaje_df +="➡️ Envía *Pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 \n \n ";
    mensaje_df +="➡️ Envía *Factura* para conocer tus opciones en consulta de facturas. (Monto y fecha de vencimiento) 📥 \n \n ";
    mensaje_df +="➡️ Envía *Club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 \n \n ";
  //mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 \n \n ";

var mjs_horario = "Muchas gracias por escribirnos, nuestro horario de atención es de 7:00 am a 10:00 pm. \n Escríbenos mañana y con gusto te atenderemos.";

var msj_pagar = "Para conocer el saldo, fecha de vencimiento y también poder pagar tu factura móvil y residencial, ";
    msj_pagar += "puedes ingresar al siguiente portal: https://cr.mipagoclaro.com/ 💳🧾 \n \n ";
    msj_pagar += "Si tienes consultas sobre algún detalle específico en tu factura, envía *asesor* 👩💻👨💻 ";

var msj_factura = "Regístrate en este enlace http://factura.miclaro.cr/ para recibir tu factura electrónica \n \n ";
    msj_factura += "Si tienes consultas sobre algún detalle específico en tu factura, envía *asesor* 👩💻👨💻 ";

var msj_club = "Si eres Claro 😉 eres parte del club con beneficios y descuentos. \n "; 
    msj_club += "¡Descarga la App! 👇 \n";
    msj_club += "Android: http://bit.ly/ClaroClub-Android \n";
    msj_club += "iOS: http://bit.ly/ClaroClubiOS ";

var msj_espera = "¡Hola! Gracias por escribirnos a Claro Costa Rica, en un momento uno de nuestros ejecutivos te atenderá 😀";

var msj_default = 
{
  "action" : {
    "type" : "continue",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  mensaje_df,
      "mediaURL" : ""
    }
  ]
};

var palabras = {
  "ventas": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["ventas"].acd,
      "timeoutInactivity" : colas["ventas"].timeout
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }
    ]
  },
  "recarga": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Recarga fácil y rápido visitando nuestro portal: https://paquetes.miclaro.cr/ 😎",
        "mediaURL" : ""
      }
    ]
  },
  "paquete": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Compra el paquete que prefieras ingresando a https://paquetes.miclaro.cr/",
        "mediaURL" : ""
      }
    ]
  },
  "pagar": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_pagar,
        "mediaURL" : ""
      }
    ]
  },
  "factura": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_factura,
        "mediaURL" : ""
      }
    ]
  },
  "club": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_club,
        "mediaURL" : ""
      }
    ]
  }
};

var contenedor = {
  "action" : {
    "type" : "",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "",
      "text" :  "",
      "mediaURL" : ""
    }
  ]
};

var msj_pagar_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas["pagar_asesor"].acd,
    "timeoutInactivity" : colas["pagar_asesor"].timeout
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  msj_espera,
      "mediaURL" : ""
    }
  ]
};

var msj_factura_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas["factura_asesor"].acd,
    "timeoutInactivity" : colas["factura_asesor"].timeout
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  msj_espera,
      "mediaURL" : ""
    }
  ]
};

var msj_fuera_horario = {
  "action" : {
    "type" : "continue", // transfer
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  mjs_horario,
      "mediaURL" : ""
    }
  ]
}

exports.msj_default = msj_default;

exports.palabras = palabras;

exports.contenedor = contenedor;

exports.msj_factura_asesor = msj_factura_asesor;

exports.msj_pagar_asesor = msj_pagar_asesor;

exports.msj_fuera_horario = msj_fuera_horario;

exports.colas = colas;