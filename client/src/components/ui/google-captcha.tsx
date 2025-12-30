import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ENV } from '@/lib/env';

interface GoogleCaptchaProps {
  siteKey?: string;
  theme?: "light" | "dark";
  size?: "compact" | "normal" | "invisible";
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: any) => void;
  error?: string;
  className?: string;
}

export interface GoogleCaptchaRef {
  reset: () => void;
  execute: () => void;
  getValue: () => string | null;
}

const GoogleCaptcha = forwardRef<GoogleCaptchaRef, GoogleCaptchaProps>(({
  siteKey = ENV.RECAPTCHA_SITE_KEY,
  theme = "light",
  size = "normal",
  onVerify,
  onExpire,
  onError,
  error,
  className = ""
}, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Debug: Log the site key being used
  console.log('reCAPTCHA Site Key:', siteKey);
  console.log('Environment Variable:', ENV.RECAPTCHA_SITE_KEY);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    },
    execute: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.execute();
      }
    },
    getValue: () => {
      if (recaptchaRef.current) {
        return recaptchaRef.current.getValue();
      }
      return null;
    }
  }));

  const handleVerify = (token: string | null) => {
    if (onVerify && token) {
      onVerify(token);
    }
  };

  const handleExpire = () => {
    if (onExpire) {
      onExpire();
    }
  };

  const handleError = () => {
    if (onError) {
      onError(new Error('reCAPTCHA error occurred'));
    }
  };

  return (
    <div className={`google-captcha-container ${className}`}>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          التحقق من أنك لست روبوت
        </label>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          theme={theme}
          size={size}
          onChange={handleVerify}
          onExpired={handleExpire}
          onErrored={handleError}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

GoogleCaptcha.displayName = 'GoogleCaptcha';

export default GoogleCaptcha;
