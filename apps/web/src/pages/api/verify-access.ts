import {NextApiRequest, NextApiResponse} from 'next';

import {SignJWT} from 'jose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({message: 'Method not allowed'});
  }

  const {code, turnstileToken} = req.body;

  if (!code || !turnstileToken) {
    return res.status(400).json({
      error: 'Code and CAPTCHA verification are required',
    });
  }

  try {
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          secret: process.env.CLOUDFLARE_SECRET_KEY!,
          response: turnstileToken,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return res.status(400).json({
        error: 'CAPTCHA verification failed',
      });
    }

    const correctCode = process.env.ACCESS_CODE;
    if (!correctCode || code !== correctCode) {
      return res.status(401).json({
        error: 'Invalid code',
      });
    }

    const secret = new TextEncoder().encode(process.env.CONTROL_JWT_SECRET);
    const token = await new SignJWT({
      authorized: true,
      timestamp: Date.now(),
    })
      .setProtectedHeader({alg: 'HS256'})
      .setIssuedAt()
      .setExpirationTime('48h')
      .sign(secret);

    res.setHeader(
      'Set-Cookie',
      `control_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${48 * 60 * 60}`
    );

    return res.status(200).json({success: true});
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
