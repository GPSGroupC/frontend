
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import PantallaHorarios from "./PantallaHorarios";
import renderer from 'react-test-renderer';
import { BrowserRouter, Route } from 'react-router-dom'



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<BrowserRouter><PantallaHorarios></PantallaHorarios></BrowserRouter>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})