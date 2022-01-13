
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import SeleccionHorarioGrados from "./SeleccionHorarioGrados";
import renderer from 'react-test-renderer';



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<SeleccionHorarioGrados></SeleccionHorarioGrados>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})