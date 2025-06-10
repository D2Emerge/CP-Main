import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {LabeledInput} from '@src/components/core/LabeledInput';
import {useMutation} from '@tanstack/react-query';
import {z} from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const loginUserApi = async (data: LoginFormData) => {
  // TODO: value is hardcoded for usage with selfmade proxy, need to be replaced with openapi
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `Login failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

const getInfoApi = async () => {
  const response = await fetch('/api/v1/auth/me', {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `Get info failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

export default function LoginPage() {
  const {handleSubmit, control} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [info, setInfo] = useState<any>(null);

  const {
    mutate: loginUser,
    isPending: loading,
    isError,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: res => {
      console.log('Login successful:', res);
    },
    onError: (err: Error) => {
      console.error('Login error:', err);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    loginUser(data);
  };

  const onGetInfo = () => {
    getInfoApi().then(res => {
      setInfo(res);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Code Project. Login page
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Controller
              name="email"
              control={control}
              render={({field, fieldState}) => (
                <LabeledInput
                  label="Email"
                  type="email"
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              render={({field, fieldState}) => (
                <LabeledInput
                  label="Password"
                  type="password"
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign In
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
          {isSuccess && <p className="text-green-500">Login successful</p>}
          {loading && <p className="text-gray-500">Loading...</p>}
        </form>
        <button
          onClick={() => onGetInfo()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Get info
        </button>
        {info && <p>{JSON.stringify(info)}</p>}
      </div>
    </div>
  );
}
