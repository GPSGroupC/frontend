
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import PantallaCursos from "./PantallaCursos";
import renderer from 'react-test-renderer';



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<PantallaCursos></PantallaCursos>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})