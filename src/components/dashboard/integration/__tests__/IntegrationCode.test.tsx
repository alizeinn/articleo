import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntegrationCode } from '../../IntegrationCode';

describe('IntegrationCode', () => {
  it('should render both integration types', () => {
    render(<IntegrationCode />);
    
    expect(screen.getByText('Direct Script')).toBeInTheDocument();
    expect(screen.getByText('GTM')).toBeInTheDocument();
  });

  it('should switch between script and GTM views', () => {
    render(<IntegrationCode />);
    
    // Initially should not show GTM instructions
    expect(screen.queryByText('GTM Setup Instructions')).not.toBeInTheDocument();
    
    // Click GTM button
    fireEvent.click(screen.getByText('GTM'));
    
    // Should now show GTM instructions
    expect(screen.getByText('GTM Setup Instructions')).toBeInTheDocument();
  });

  it('should copy code to clipboard', async () => {
    const clipboardWriteText = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: clipboardWriteText,
      },
    });

    render(<IntegrationCode />);
    
    // Click copy button
    fireEvent.click(screen.getByText('Copy Code'));
    
    // Should have called clipboard API
    expect(clipboardWriteText).toHaveBeenCalled();
    
    // Should show copied state
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });
});