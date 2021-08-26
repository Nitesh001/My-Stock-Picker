import React from 'react';
import renderer from 'react-test-renderer';
import PickerSearch from './picker.search';

test('Search shows placeholder, default input and two buttons', () => {
  const component = renderer.create(
    <PickerSearch placeholder="placeholder" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Search shows custom value entered by user', () => {
  const component = renderer.create(
    <PickerSearch placeholder="placeholder" value="value" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});