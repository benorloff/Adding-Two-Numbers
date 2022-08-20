import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../mocks/mockFetch';
import HomePage from '../HomePage/HomePage'
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  jest.restoreAllMocks()
});

test('renders the landing page', async () => {
  render(<HomePage />);

  expect(screen.getByRole("heading")).toHaveTextContent(/Adding Two Numbers/);
  expect(await screen.findByRole("first")).toBeInTheDocument();
  expect(await screen.findByRole("second")).toBeInTheDocument();
});

test('should be able to add two numbers', async () => {
  render(<HomePage />);

  // Simulate entering values for the two numbers
  const first = screen.getByRole("first");
  const second = screen.getByRole("second");
  userEvent.type(first, '111');
  userEvent.type(second, '222');
  expect(first).toHaveValue(111);
  expect(second).toHaveValue(222);

  // Initiate the calculation
  const addBtn = screen.getByRole("add");
  userEvent.click(addBtn);

  // Wait for loading to be done
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))

  // Verify the solution is rendered
  expect(await screen.getByTestId("solution")).toBeInTheDocument();
  const solution = screen.getByRole("heading", { name: "solution"});
  expect(solution).toHaveTextContent("Solution: 333");


})

