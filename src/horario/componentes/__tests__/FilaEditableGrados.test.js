

import React from 'react';
import renderer from 'react-test-renderer';
import FilaEditable from "../FilaEditable";


describe('FilaEditableGrados test', () => {
  it('FilaEditableGrados should match snapshot', () => {
    const component = renderer.create(<FilaEditable
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
