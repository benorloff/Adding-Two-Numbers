import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { add } from '../../../controllers/calculate';

test('sums the numbers', () => {
  const numbers = {first: '111', second: '222'}
  expect(add(numbers)).toBe(333);
});

