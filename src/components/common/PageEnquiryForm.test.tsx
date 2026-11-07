import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { PageEnquiryForm } from './PageEnquiryForm';

describe('PageEnquiryForm Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders form inputs and contextual badge for visa page', () => {
    render(<PageEnquiryForm pageType="visa" />);

    expect(screen.getByText(/Free Consular Assessment/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Alex Henderson/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/alex\.henderson@example\.com/i)).toBeInTheDocument();
  });

  it('displays validation errors when submitting with empty required fields', () => {
    render(<PageEnquiryForm pageType="visa" />);

    const submitBtn = screen.getByRole('button', { name: /Submit Enquiry & Request Callback/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please provide a valid contact number/i)).toBeInTheDocument();
  });

  it('clears error messages as user types into the field', () => {
    render(<PageEnquiryForm pageType="visa" />);

    const submitBtn = screen.getByRole('button', { name: /Submit Enquiry & Request Callback/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/e\.g\. Alex Henderson/i);
    fireEvent.change(nameInput, { target: { name: 'fullName', value: 'Alex Morgan' } });

    expect(screen.queryByText(/Please enter your full name/i)).not.toBeInTheDocument();
  });
});
