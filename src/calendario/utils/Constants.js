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
    
    //URL donde se encuentra la API desplegada
    BASE_SERVER_URL : "https://timetableeina-back.herokuapp.com",
    //URL para probar con la API en localhost
    LOCAL_HOST_URL  : "http://localhost:8000",
	
}

export default constants