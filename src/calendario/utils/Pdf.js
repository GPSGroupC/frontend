import React, {Component} from 'react';
import jsPDF from 'jspdf';
import eina from '../../images/eina-logo.png'
import html2canvas from 'html2canvas';
import Calendario from "../Calendario";


class Pdf {
     static printDocument(id) {
         
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
    }
}

export default Pdf