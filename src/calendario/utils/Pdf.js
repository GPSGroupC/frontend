import React, {Component} from 'react';
import jsPDF from 'jspdf';
import eina from '../../images/eina-logo.png'
import html2canvas from 'html2canvas';
import Calendario from "../Calendario";

/**
 * Utilidad de gestion de PDFs
 */
class Pdf {

    /**
     *
     * @param id    identificador de un elemento HTML
     *
     * Transforma un elemento HTML a PDF y lo descarga
     */
     static download(id) {
         this.hideUnwantedElements()
        const input = document.getElementById(id);
        html2canvas(input,{scale:3})
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "pt", "a4");
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'JPEG', 0, 0,width, height);
                pdf.save("calendar.pdf");
            })
        ;
         this.showUnwantedElements()
    }

    /**
     * Esconde los elementos HTML que no se desean incluir en el PDF
     */
    static hideUnwantedElements() {
        // Escondemos lo selectores de semanaAB cuyo className es
        // 'globalWeekSelectorAB-semestre1', 'globalWeekSelectorAB-semestre2' y 'globalWeekSelectorAB-recuperacion'
        var globalWeekSelector = document.querySelectorAll("select[class^='globalWeekSelectorAB-']");
        var descripcionSemanal = document.querySelectorAll("input[class^='descripcionSemanal']");

        if (globalWeekSelector) {
            for(var i = 0; i < globalWeekSelector.length; i++) {
                //Esconder los selectores de semana
                globalWeekSelector[i].style.display = "none"
            }
        }
        if(descripcionSemanal) {
            for(var i = 0; i < descripcionSemanal.length; i++) {
                if (descripcionSemanal[i].value.length == 0) {
                    //Esconder las descripciones semanales vacias
                    descripcionSemanal[i].style.display = "none"
                }
                //Esconder el border de todas las descripciones
                descripcionSemanal[i].style.border = "none"
            }
        }
    }

    /**
     * Devuelve la visibilidad a los elementos no incluidos en el PDF
     */
    static showUnwantedElements() {
        var globalWeekSelector = document.querySelectorAll("select[class^='globalWeekSelectorAB-']");
        var descripcionSemanal = document.querySelectorAll("input[class^='descripcionSemanal']");

        if (globalWeekSelector) {
            for(var i = 0; i < globalWeekSelector.length; i++) {
                globalWeekSelector[i].style.display = "inline"
            }
        }
        if(descripcionSemanal) {
            for(var i = 0; i < descripcionSemanal.length; i++) {
                if (descripcionSemanal[i].value.length == 0) {
                    //Esconder las descripciones semanales vacias
                    descripcionSemanal[i].style.display = "inline"
                }
                //Esconder el border de todas las descripciones
                descripcionSemanal[i].style.border = "2px inset #EBE9ED"
            }
        }
    }
}

export default Pdf