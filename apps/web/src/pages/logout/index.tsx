import {useEffect} from 'react';
import {useRouter} from 'next/router';

import {useMutation} from '@tanstack/react-query';

const logoutUserApi = async () => {
  // TODO: value is hardcoded for usage with selfmade proxy, need to be replaced with openapi
  const response = await fetch('/api/v1/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `Logout failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

export default function LogoutPage() {
  const router = useRouter();

  const {
    mutate: logoutUser,
    isPending: loading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      console.log('Logout successful');

      const previousPage = document.referrer;
      if (previousPage && previousPage !== window.location.href) {
        window.location.href = previousPage;
      } else {
        router.push('/login');
      }
    },
    onError: (err: Error) => {
      console.error('Logout error:', err);
    },
  });

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Logging out...
        </h1>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Processing logout...</p>
          </div>
        )}

        {isError && (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error?.message}</p>
            <button
              onClick={() => logoutUser()}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Try Again
            </button>
          </div>
        )}

        {isSuccess && (
          <div className="text-center">
            <p className="text-green-500 mb-4">
              Logout successful! Redirecting...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
