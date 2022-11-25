import React from 'react';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen, fireEvent } from '@testing-library/react';

import App, { Bar, Button, Select } from './App';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Renders learn react link', () => {
  render(<App />);
  const title = screen.getByText(/Progress Bars Demo/i);
  expect(title).toBeInTheDocument();
});

describe('Bar', () => {
  it('Renders', () => {
    expect(render(<Bar width={10} />)).toBeDefined();
  });

  it('No Error Colour', () => {
    render(<Bar data-testid='bar' width={50} />);
    expect(screen.getByTestId('bar')).toHaveStyle('background: #fdcc08');
  });

  it('Error Colour', () => {
    render(<Bar data-testid='bar' width={110} />);
    expect(screen.getByTestId('bar')).toHaveStyle('background: #e3705a');
  });
});

describe('Button', () => {
  it('Renders', () => {
    expect(render(<Button />)).toBeDefined();
  });

  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = Enzyme.shallow(<Button onClick={mockCallBack}>Ok!</Button>);
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe('Select', () => {
  it('Renders', () => {
    expect(render(<Select />)).toBeDefined();
  });

  it('Simulates selection', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    fireEvent.change(getByTestId('select'), { target: { value: 2 } });
    const options = getAllByTestId('select-option') as HTMLOptionElement[];
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  });
});
