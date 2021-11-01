import React, {Component} from 'react';
import jsPDF from 'jspdf';
import eina from '../images/eina-logo.png'

import html2canvas from 'html2canvas';


export default class TimetableToPdf extends Component {
    constructor(props) {
        super(props);
    }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("calendar.pdf");
            })
        ;
    }

    render() {
        return (<div>
            <div id="divToPrint" className="divToPrint">
                <div className="pdfHeader">
                    <img src={eina} alt="einaLogo" width="400" height="120"/>
                    <p>EINA calendario académico <br/>
                        GRADOS <br/>
                        Curso 2021-2022 <br/>
                        Última modificación 01/08/2021</p>
                </div>
                <div className="pdfBody">
                    <p>calendario</p>
                </div>
            </div>
            <div className="printButton">
                <button onClick={this.printDocument} class="btn btn-info btn-lg">Descargar</button>
            </div>
        </div>);
    }
}