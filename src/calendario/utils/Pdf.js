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
        var elements = document.querySelectorAll("select[class^='globalWeekSelectorAB-']");
        if (elements) {
            for(var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none"
            }
        }
    }

    /**
     * Devuelve la visibilidad a los elementos no incluidos en el PDF
     */
    static showUnwantedElements() {
        var elements = document.querySelectorAll("select[class^='globalWeekSelectorAB-']");
        if (elements) {
            for(var i = 0; i < elements.length; i++) {
                elements[i].style.display = "block"
            }
        }
    }
}

export default Pdf