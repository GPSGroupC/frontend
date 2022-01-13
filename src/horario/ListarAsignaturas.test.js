
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import ListarAsignaturas from "./ListarAsignaturas";
import renderer from 'react-test-renderer';



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<ListarAsignaturas></ListarAsignaturas>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})