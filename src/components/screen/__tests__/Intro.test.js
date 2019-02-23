import 'react-native';
import * as React from 'react';
import { AppProvider } from '../../../providers';
import Intro from '../Intro';
import Button from '../../shared/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { AppContext } from './testHelpers';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  history: {
    push: jest.fn(),
  },
  ...AppContext,
};

const component = (
  <AppProvider>
    <Intro {...props} />
  </AppProvider>
);

const context = AppContext;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

// test for the container page in dom
describe('[Intro] screen rendering test', () => {
  let json;

  it('should render outer component and snapshot matches', () => {
    json = renderer.create(component, { context }).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Intro] screen rendering test', () => {
  let json;

  it('should render outer component and snapshot matches', () => {
    json = renderer.create(component, { context }).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Intro] Interaction', () => {
  let rendered: TestRenderer.ReactTestRenderer;
  let root: TestRenderer.ReactTestRenderer.root;
  let instance;
  let testingLib;

  it('should simulate [onLogin] click', () => {
    rendered = renderer.create(component, { context });
    root = rendered.root;
    testingLib = render(component, { context });

    jest.useFakeTimers();
    const buttons = root.findAllByType(Button);
    fireEvent(testingLib.getByTestId('btn1'), 'click');

    expect(setTimeout).toHaveBeenCalledTimes(1)
    // expect(context.dispatch).toHaveBeenCalledWith({ type: 'reset-user' });
    // expect(context.dispatch).toHaveBeenCalledWith({ type: 'set-user' }, expect.any(Object));
    
    jest.runAllTimers();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(buttons[0].props.isLoading).toEqual(false); // TODO: test with useState
  });

  it('should simulate [navigate] click', () => {
    rendered = renderer.create(component, { context });
    root = rendered.root;

    const buttons = root.findAllByType(Button);
    buttons[1].props.onClick();
    expect(props.navigation.navigate).toBeCalledWith('Temp');
  });
});
