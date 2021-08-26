import React from 'react';
import renderer from 'react-test-renderer';
import PickerLoader from './picker.loader';

test('Loader shows default message', () => {
  const component = renderer.create(
    <PickerLoader />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

test('Loader shows custom message', () => {
  const component = renderer.create(
    <PickerLoader mssg="custom message" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})