import { SDK_CONFIG } from './constants';

export async function verifyGTMConnection(siteId: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Step 1: Ensure running in a browser environment
    if (typeof window === 'undefined') {
      return {
        success: false,
        message: 'Verification must be run in a browser environment.',
      };
    }

    // Step 2: Check if GTM's dataLayer is loaded
    if (!window.dataLayer) {
      return {
        success: false,
        message: 'Google Tag Manager is not installed. Please ensure GTM is properly set up on your website.',
      };
    }
    console.info('Step 2: dataLayer is present.');

    // Step 3: Check for Articleo configuration
    if (!window.articuleoConfig) {
      return {
        success: false,
        message: 'Articleo configuration not found. Please ensure the GTM tag is firing correctly.',
      };
    }
    console.info('Step 3: Articleo configuration found.');

    // Step 4: Verify siteId matches
    if (window.articuleoConfig.siteId !== siteId) {
      return {
        success: false,
        message: 'Site ID mismatch. Please check your GTM configuration.',
      };
    }
    console.info('Step 4: Site ID matches.');

    // Step 5: Check for Articleo SDK script
    const sdkScript = document.getElementById('articleo-sdk');
    if (!sdkScript) {
      // Optionally, wait a second before failing (if async loading is expected)
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!document.getElementById('articleo-sdk')) {
        return {
          success: false,
          message: 'Articleo SDK script not found. Please verify your GTM implementation.',
        };
      }
    }
    console.info('Step 5: Articleo SDK script found.');

    // Step 6: Check for GTM container
    const gtmFound = Boolean(window.google_tag_manager);
    if (!gtmFound) {
      return {
        success: false,
        message: 'Google Tag Manager container not found. Please check your GTM installation.',
      };
    }
    console.info('Step 6: GTM container found.');

    // Step 7: Push verification event into the dataLayer
    const verificationId = `verify_${Date.now()}`;
    window.dataLayer.push({
      event: 'articleo_verification',
      verification_id: verificationId,
      articleo_site_id: siteId,
      timestamp: new Date().toISOString(),
    });
    console.info('Step 7: Verification event pushed into dataLayer.');

    // Optional: Send verification result to the backend
    const response = await fetch(`${SDK_CONFIG.API_BASE_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteId,
        status: 'success',
        verificationId,
      }),
    });

    if (!response.ok) {
      console.warn('Failed to log verification event to the backend.');
    }

    // All checks passed
    return {
      success: true,
      message: 'GTM integration verified successfully! Articleo is properly configured.',
    };

  } catch (error) {
    console.error('GTM verification error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred during verification.',
    };
  }
}

// Declare global interfaces for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    google_tag_manager: {
      [key: string]: any;
    };
    articuleoConfig: {
      siteId: string;
      autoInit: boolean;
    };
  }
}
