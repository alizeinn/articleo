import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { GTMVerification } from '../GTMVerification';

describe('GTMVerification', () => {
  beforeEach(() => {
    // Mock window.dataLayer
    window.dataLayer = [];
  });

  it('should render verification button', () => {
    render(<GTMVerification />);
    expect(screen.getByText('Verify GTM Setup')).toBeInTheDocument();
  });

  it('should show success message when GTM is properly configured', async () => {
    render(<GTMVerification />);
    
    fireEvent.click(screen.getByText('Verify GTM Setup'));
    
    // Wait for verification process
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });
    
    expect(screen.getByText('GTM integration verified successfully!')).toBeInTheDocument();
  });

  it('should show error when GTM is not installed', async () => {
    // Remove dataLayer
    delete window.dataLayer;
    
    render(<GTMVerification />);
    
    fireEvent.click(screen.getByText('Verify GTM Setup'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });
    
    expect(screen.getByText('Google Tag Manager is not installed')).toBeInTheDocument();
  });
});