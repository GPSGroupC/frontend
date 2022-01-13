
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import ListarAulas from "./ListarAulas";
import renderer from 'react-test-renderer';



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<ListarAulas></ListarAulas>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})