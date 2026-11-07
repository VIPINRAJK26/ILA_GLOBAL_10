import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { OverallEligibilityForm } from './OverallEligibilityForm';

describe('OverallEligibilityForm Stepper Component', () => {
  it('renders Step 1 with product cards and target country selection', () => {
    render(<OverallEligibilityForm showHeroHeader={false} />);

    expect(screen.getByText(/1\. Choose the Service or Pathway You Want to Evaluate/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Visa & Consular Services/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Study Abroad & Public University/i })).toBeInTheDocument();
  });

  it('navigates to Step 2 when Continue Step 2 button is clicked', () => {
    render(<OverallEligibilityForm showHeroHeader={false} />);

    const nextBtn = screen.getByRole('button', { name: /Continue Step 2/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/Highest Completed or Ongoing Degree/i)).toBeInTheDocument();
    expect(screen.getByText(/Primary Domain \/ Industry Specialization/i)).toBeInTheDocument();
    expect(screen.getByText(/Verifiable Post-Qualification Work Experience/i)).toBeInTheDocument();
  });

  it('allows navigating backward to Step 1 using Previous Step button', () => {
    render(<OverallEligibilityForm showHeroHeader={false} />);

    // Forward to Step 2
    fireEvent.click(screen.getByRole('button', { name: /Continue Step 2/i }));
    expect(screen.getByText(/Highest Completed or Ongoing Degree/i)).toBeInTheDocument();

    // Backward to Step 1
    const backBtn = screen.getByRole('button', { name: /Previous Step/i });
    fireEvent.click(backBtn);
    expect(screen.getByText(/1\. Choose the Service or Pathway You Want to Evaluate/i)).toBeInTheDocument();
  });
});
