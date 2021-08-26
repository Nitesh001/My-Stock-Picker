import React from 'react';
import renderer from 'react-test-renderer';
import PickerCard from './picker.card';

test('Card shows title and value', () => {
  const component = renderer.create(
    <PickerCard title="title" value="value" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});