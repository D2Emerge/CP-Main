import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {usePathname} from 'next/navigation';
import {useRouter} from 'next/router';
import Script from 'next/script';

import {Button} from '@src/components/core/Button';
import {LabeledInput} from '@src/components/core/LabeledInput';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface FormData {
  code: string;
}

export default function EntryPage() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
  } = useForm<FormData>();

  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const codeValue = watch('code');

  const handleTurnstileCallback = (token: string) => {
    setTurnstileToken(token);
    setError('');
  };

  const handleTurnstileError = () => {
    setError('CAPTCHA verification failed. Please try again.');
    setTurnstileToken(null);
  };

  const handleTurnstileExpired = () => {
    setError('CAPTCHA expired. Please verify again.');
    setTurnstileToken(null);
  };

  const renderTurnstile = () => {
    if (window.turnstile && turnstileRef.current && !widgetId) {
      const id = window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!,
        callback: handleTurnstileCallback,
        'error-callback': handleTurnstileError,
        'expired-callback': handleTurnstileExpired,
        theme: 'light',
        size: 'normal',
      });
      setWidgetId(id);
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    if (turnstileLoaded) {
      renderTurnstile();
    }
  }, [turnstileLoaded, pathname]);

  const resetTurnstile = () => {
    if (window.turnstile && widgetId) {
      window.turnstile.reset(widgetId);
    }
    setTurnstileToken(null);
  };

  const onSubmit = async (data: FormData) => {
    if (!turnstileToken) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          code: data.code.trim(),
          turnstileToken,
        }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        router.push('/');
      } else {
        const errorMessage =
          responseData.error || 'Verification failed. Please try again.';
        setError(errorMessage);
        resetTurnstile();
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Network error. Please check your connection and try again.');
      resetTurnstile();
    }
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          setTurnstileLoaded(true);
        }}
        onError={() => {
          setError('Failed to load CAPTCHA. Please refresh the page.');
        }}
      />

      <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-dark mb-2">
              Access Required
            </h1>
            <p className="text-txt-secondary">
              Please enter your code to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <LabeledInput
                {...register('code', {
                  required: 'Please enter a code',
                  validate: value =>
                    value.trim().length > 0 || 'Code cannot be empty',
                })}
                label="Code"
                error={errors.code}
                disabled={isSubmitting}
                autoComplete="current-code"
              />

              <div className="flex justify-center">
                <div ref={turnstileRef} />
              </div>
            </div>

            {error && (
              <div className="bg-danger border border-danger text-danger px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={
                  isSubmitting || !turnstileToken || !codeValue?.trim()
                }>
                {isSubmitting ? (
                  <span className="flex items-center">Verifying...</span>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="secondary"
                type="button"
                onClick={resetTurnstile}
                size="sm"
                disabled={isSubmitting}>
                Reset CAPTCHA
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
