
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import ImportarAulas from "./ImportarAulas";
import renderer from 'react-test-renderer';



describe("Snapshot testing", () => {

test('Se renderiza correctamente', () => {

    const rendererComponent = renderer.create(<ImportarAulas></ImportarAulas>).toJSON()
    expect(rendererComponent).toMatchSnapshot()

})
})
