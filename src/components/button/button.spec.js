import {
  queryByText,
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Button from './button';

describe('Button Component', () => {

  let container;
  const testClasses = 'test-class';
  const testLabel = 'Test Label';
  const testFn = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');

    const testButton = new Button(testClasses, testLabel, testFn);
    testButton.render(container);
  });

  it('should render correctly', () => {
    expect(queryByText(container, testLabel)).toBeTruthy();
  });

  it('should call onClick when clicked', () => {
    const button = queryByText(container, testLabel);

    button.click();

    expect(testFn).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

});
