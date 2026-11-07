import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme, setTheme, isDark } = useTheme();
  return (
    <div>
      <span data-testid="theme-val">{theme}</span>
      <span data-testid="is-dark">{isDark ? 'yes' : 'no'}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('provides default light theme and sets html attributes', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-val').textContent).toBe('light');
    expect(screen.getByTestId('is-dark').textContent).toBe('no');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles theme between light and dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-val').textContent).toBe('dark');
    expect(screen.getByTestId('is-dark').textContent).toBe('yes');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('ila_theme_mode')).toBe('dark');

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-val').textContent).toBe('light');
    expect(screen.getByTestId('is-dark').textContent).toBe('no');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('ila_theme_mode')).toBe('light');
  });

  it('restores initial theme from localStorage if present', () => {
    localStorage.setItem('ila_theme_mode', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-val').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
