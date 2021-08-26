import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './error.message';

test('Error component shows default message', () => {
  const component = renderer.create(
    <ErrorMessage />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  // tree.props.onClose();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

test('Error component shows custom message', () => {
  const component = renderer.create(
    <ErrorMessage mssg="custom error" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('Error component with onclose', () => {
  const component = renderer.create(
    <ErrorMessage mssg="custom error" onClose={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})