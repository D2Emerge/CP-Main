'use client';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {EyeClosed, EyeOpen} from '@src/assets/icons';
import {GithubLogo} from '@src/assets/icons/GithubLogo';
import {GoogleLogo} from '@src/assets/icons/GoogleLogo';
import {MicrosoftLogo} from '@src/assets/icons/MicrosoftLogo';
import {LabeledInput} from '@src/components/core/LabeledInput';
import {OAuthService} from '@src/generated/services/OAuthService';
import {z} from 'zod';

export interface OAuthParams {
  clientId: string | null;
  redirectUri: string | null;
  responseType: string | null;
  scope: string | null;
  state: string | null;
}

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPageProps {
  onSwitchToSignup?: () => void;
}

export default function LoginPage({onSwitchToSignup}: LoginPageProps) {
  const {clientId, redirectUri, responseType, scope, state} = useOAuthParams();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    formState: {isSubmitting},
    reset,
    register,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (redirectUri && state && clientId) {
        const response = await OAuthService.oauthControllerLogin({
          requestBody: {
            email: data.email,
            username: data.email.split('@')[0],
            password: data.password,
            redirect_uri: redirectUri,
            state: state,
            client_id: clientId,
          },
        });
        window.location.href = response;
      }
      // TODO: handle normal login
      return;
      reset();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    const returnUrl =
      redirectUri?.split('/').slice(0, 3).join('/') ||
      process.env.NEXT_PUBLIC_BASE_URL;

    window.location.href = `${process.env.NEXT_PUBLIC_IDP_URL}/v1/auth/${provider}?returnUrl=${returnUrl}`;
  };

  return (
    <div className="text-center bg-white p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Log In</h1>

      <p className="text-gray-600 mb-8">
        Don&apos;t have an account?{' '}
        <button
          onClick={onSwitchToSignup}
          className="text-orange-500 hover:text-orange-600 font-medium">
          Sign up
        </button>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <LabeledInput
            {...register('email', {
              required: 'Please enter an email address',
              validate: value =>
                value.trim().length > 0 || 'Email address cannot be empty',
            })}
            label="Email address"
            type="email"
            error={errors.email}
            disabled={isSubmitting}
            autoComplete="email"
          />
        </div>

        <div className="relative">
          <LabeledInput
            {...register('password', {
              required: 'Please enter a password',
              validate: value =>
                value.trim().length > 0 || 'Password cannot be empty',
            })}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={errors.password}
            disabled={isSubmitting}
            autoComplete="password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
            {showPassword ? (
              <EyeClosed className="w-5 h-5" />
            ) : (
              <EyeOpen className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-left">
          <button
            type="button"
            className="text-gray-900 hover:text-gray-700 text-sm underline">
            Forget password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <GoogleLogo />
        </button>

        <button
          onClick={() => handleSocialLogin('github')}
          className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <GithubLogo />
        </button>

        <button
          onClick={() => handleSocialLogin('microsoft')}
          className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <MicrosoftLogo />
        </button>
      </div>
    </div>
  );
}

function useOAuthParams(): OAuthParams {
  const [params, setParams] = useState<OAuthParams>({
    clientId: null,
    redirectUri: null,
    responseType: null,
    scope: null,
    state: null,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setParams({
      clientId: urlParams.get('client_id'),
      redirectUri: urlParams.get('redirect_uri'),
      responseType: urlParams.get('response_type'),
      scope: urlParams.get('scope'),
      state: urlParams.get('state'),
    });
  }, []);

  return params;
}
