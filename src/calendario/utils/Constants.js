/**
 * Constantes que usa la aplicación por mantener cierta modularidad y que no sea un caos
 * @module Constants
 */

/**
 * @dmarcob @guillecanovas @jperezunizar
 * Constantes que se usan en la aplicación (estaría bien ir moviendo aqui las constantes que usemos)
 * @public
 */
 const constants = {
	// Número de día de la semana de acuerdo a la clase JavaScript Date
    DIAS_SEMANA_ENUMERADOS : {
        DOMINGO:   0,
        LUNES:     1,
        MARTES:    2,
        MIERCOLES: 3,
        JUEVES:    4,
        VIERNES:   5,
        SABADO:    6,
    },

    //Tipos de fecha mostradas en el calendario
    TIPOS_FECHA : {
        CONVOCATORIA: "convocatoria",
        FESTIVO: "festivo",
        LECTIVO: "lectivo",
        SEMANAAB: "semanaAB",
        HORARIOCAMBIADO: "horarioCambiado"
    },

    //Rango de valores de una fecha de tipo semanaAB
    SEMANAAB_VALORES : {
        A : "a", // Semana A
        B : "b", // Semana B
        C : "c", // Semana sin letra asignada
    },

    //Rango de valores de una fecha de tipo horarioCambiado
    HORARIOCAMBIADO_VALORES: {
        DOMINGO : "D",
        LUNES : "L",
        MARTES : "M",
        MIERCOLES : "X",
        JUEVES : "J",
        VIERNES : "V",
        SABADO : "S",
        UNDEFINED: undefined //Dia no definido
    },

    //Cabeceras del calendario
     MONTHS : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
     DAYS : ['L', 'M', 'X', 'J', 'V', 'S', 'D'],

    //URL donde se encuentra la API desplegada
    BASE_SERVER_URL : "https://timetableeina-back.herokuapp.com",
    //URL para probar con la API en localhost
    LOCAL_HOST_URL  : "http://localhost:8000",
	
}

export default constants