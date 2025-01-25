import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the correct year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    const footerText = screen.getByTestId('footer-text').textContent;
    expect(footerText).toContain(currentYear.toString());
  });
});
