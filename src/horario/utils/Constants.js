import {Alert} from "@material-ui/lab";
import React from "react";

/**
 * Constantes que usa la aplicación por mantener cierta modularidad y que no sea un caos
 * @module Constants
 */
 const constants = {
    // Dias de la semana laborales
    DIAS_SEMANA : {
        LUNES:     "Lunes",
        MARTES:    "Martes",
        MIERCOLES: "Miércoles",
        JUEVES:    "Jueves",
        VIERNES:   "Viernes",
    },
    //Cabecera del horario
    DAYS : ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],

    RANGO_HORAS: ["8", "8:30", "9", "9:30", "10", "10:30", "11", "11:30",
        "12", "12:30", "13", "13:30", "14", "14:30", "15:00", "15:30", "16",
        "16:30", "17", "17:30", "18", "18:30","19", "19:30", "20", "20:30",
    ],

    TIPO_CLASE: {
        TEORIA: {NOMBRECORTO: "T", NOMBRELARGO: "Teoría"},
        PROBLEMAS: {NOMBRECORTO: "PRO", NOMBRELARGO: "Problemas"},
        PRACTICAS: {NOMBRECORTO: "PRA", NOMBRELARGO: "Prácticas"}
    },

    DURACION_CLASE : {
        MEDIA_HORA: 30,
        HORA: 60,
        HORA_Y_MEDIA: 90
    },

    MENSAJE_ERROR : {
        CAMPO_OBLIGATORIO: "Algún campo está vacío — ¡Todos son obligatorios!",
        SOLAPAMIENTO: "La asignatura que quieres añadir se solapa con otra existente"
    }

}

export default constants