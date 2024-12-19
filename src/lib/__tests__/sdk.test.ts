import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifySdkAvailability } from '../sdk';

describe('SDK Verification', () => {
  beforeEach(() => {
    // Reset fetch mock
    vi.restoreAllMocks();
  });

  it('should return available true when SDK is accessible', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });

    const result = await verifySdkAvailability();
    expect(result.available).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return available false when SDK returns error status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });

    const result = await verifySdkAvailability();
    expect(result.available).toBe(false);
    expect(result.error).toContain('404');
  });

  it('should handle network errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await verifySdkAvailability();
    expect(result.available).toBe(false);
    expect(result.error).toBe('Failed to connect to SDK endpoint');
  });
});