import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeDisplay } from '../CodeDisplay';

describe('CodeDisplay', () => {
  const mockCode = '<script>test code</script>';
  const mockOnCopy = vi.fn();

  it('should render code correctly', () => {
    render(<CodeDisplay code={mockCode} copied={false} onCopy={mockOnCopy} />);
    expect(screen.getByText(mockCode)).toBeInTheDocument();
  });

  it('should show copy button by default', () => {
    render(<CodeDisplay code={mockCode} copied={false} onCopy={mockOnCopy} />);
    expect(screen.getByText('Copy Code')).toBeInTheDocument();
  });

  it('should show copied state when copied is true', () => {
    render(<CodeDisplay code={mockCode} copied={true} onCopy={mockOnCopy} />);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('should call onCopy when copy button is clicked', () => {
    render(<CodeDisplay code={mockCode} copied={false} onCopy={mockOnCopy} />);
    fireEvent.click(screen.getByText('Copy Code'));
    expect(mockOnCopy).toHaveBeenCalled();
  });
});