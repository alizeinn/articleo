import { describe, it, expect } from 'vitest';
import { getScriptCode, getGTMCode } from '../constants';

describe('Integration Constants', () => {
  const testSiteId = 'test-123';

  describe('getScriptCode', () => {
    it('should generate correct script code with site ID', () => {
      const code = getScriptCode(testSiteId);
      expect(code).toContain(`articleo('init', '${testSiteId}')`);
      expect(code).toContain('articleo-sdk');
      expect(code).toContain('https://cdn.articleo.ai/sdk.js');
    });
  });

  describe('getGTMCode', () => {
    it('should generate correct GTM code with site ID', () => {
      const code = getGTMCode(testSiteId);
      expect(code).toContain('window.dataLayer');
      expect(code).toContain(`'articleo_site_id': '${testSiteId}'`);
      expect(code).toContain(`'event': 'articleo_init'`);
    });
  });
});