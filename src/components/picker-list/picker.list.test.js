import React from 'react';
import renderer from 'react-test-renderer';
import PickerList from './picker.list';

test('List shows items with values', () => {
  const component = renderer.create(
    <PickerList list={[{key:'k1',value:'v1'},{key:'k2',value:'v2'}]} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('List shows onclick function', () => {
  const component = renderer.create(
    <PickerList list={[{key:'k1',value:'v1'},{key:'k2',value:'v2'}]} onClick={(k)=>{}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});