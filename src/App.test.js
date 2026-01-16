/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

/**
 * Verify something should render
 */
test('App should render', () => {
  render(<App />);

  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
});

test('Button should render', () => {
  render(<App />);
  
  const button = screen.getByText(/Current theme/);
  expect(button).toBeInTheDocument();
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test('theme button should update button text', () => {
  render(<App />);
  
  const themeButton = screen.getByText('Current theme: light');
  expect(themeButton).toBeInTheDocument();
  
  fireEvent.click(themeButton);
  
  const updatedButton = screen.getByText('Current theme: dark');
  expect(updatedButton).toBeInTheDocument();
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test('theme button should toggle styles', () => {
  render(<App />);
  
  expect(document.body).toHaveStyle('color: #333');
  expect(document.body).toHaveStyle('backgroundColor: #FFF');
  
  const themeButton = screen.getByText('Current theme: light');
  fireEvent.click(themeButton);
  
  expect(document.body).toHaveStyle('color: #FFF');
  expect(document.body).toHaveStyle('backgroundColor: #333');
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test('hidden button should toggle hidden content', () => {
  render(<App />);
  
  const hiddenContent = screen.queryByText('this content is hidden by default');
  expect(hiddenContent).not.toBeInTheDocument();
  
  const toggleButton = screen.getByText('Show hidden content');
  fireEvent.click(toggleButton);
  
  const visibleContent = screen.getByText('this content is hidden by default');
  expect(visibleContent).toBeInTheDocument();
});


/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
