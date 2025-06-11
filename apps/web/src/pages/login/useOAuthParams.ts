'use client';

import {useEffect, useState} from 'react';

export interface OAuthParams {
  clientId: string | null;
  redirectUri: string | null;
  responseType: string | null;
  scope: string | null;
  state: string | null;
}

export function useOAuthParams(): OAuthParams {
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
