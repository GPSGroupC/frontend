
import React, { useState, Fragment } from "react";
import SeleccionHorarioMasters from "./SeleccionHorarioMasters";
import renderer from 'react-test-renderer';
import { BrowserRouter, Route } from 'react-router-dom'



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<BrowserRouter><SeleccionHorarioMasters></SeleccionHorarioMasters></BrowserRouter>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})