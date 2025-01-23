import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeController from '../ThemeController';
import ThemeProvider from '@/providers/ThemeProvider';

describe('ThemeController with ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should change theme from light to dark and vice versa', () => {
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <ThemeController />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
