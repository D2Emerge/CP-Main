import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {GithubLogo} from '@src/assets/icons/GithubLogo';
import {GoogleLogo} from '@src/assets/icons/GoogleLogo';
import {MicrosoftLogo} from '@src/assets/icons/MicrosoftLogo';
import {LabeledInput} from '@src/components/core/LabeledInput';
import {Modal} from '@src/components/core/Modal';
import {Eye, EyeOff} from 'lucide-react';
import {z} from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login attempt:', data);

      onClose();
      reset();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md">
      <div className="text-center">
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
            <Controller
              name="email"
              control={control}
              render={({field, fieldState}) => (
                <LabeledInput
                  label="Email address"
                  type="email"
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
          </div>

          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({field, fieldState}) => (
                <LabeledInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
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
    </Modal>
  );
}
