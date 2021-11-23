import React from "react";
import { render } from "@testing-library/react";

test("los fines de semana se marcan como festivos", () =>{


    //const { getByTestId } = render (<Calendario />);
    //render (<Calendario />);
    //const day = getByTestId("day");

   // const resultadoObtenido = day.getAttribute("name");
   // expect(resultadoObtenido).toBe("festivo");


    const sabados = document.getElementsByName("5");
    const domingos = document.getElementsByName("6");
    for (let i = 0; i < sabados.lenght; i++) {
        expect(sabados[i].className).toBe("festivo");
    }
    for (let i = 0; i < domingos.lenght; i++) {
        expect(domingos[i].className).toBe("festivo");
    }

});


test("formatDate devuelve correctamente el dia", () =>{


    //const { getByTestId } = render (<Calendario />);

    const dias = document.getElementsByClassName("date-day");
    for (let i = 0; i < dias.lenght; i++) {
        expect(parseInt(dias[i].value)).toBeGreaterThanOrEqual(1);
        expect(parseInt(dias[i].value)).toBeLessThanOrEqual(31);
    }


});




    













