
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import ImportarAsignaturas from "./ImportarAsignaturas";
import renderer from 'react-test-renderer';



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<ImportarAsignaturas></ImportarAsignaturas>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})

})
