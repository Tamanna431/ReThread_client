'use client';

import { useEffect } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleGoogleResponse = async (response: any) => {
    try {
      const result = await authAPI.googleAuth(response.credential);
      
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      
      window.dispatchEvent(new Event('storage'));
      router.push('/explore');
      setTimeout(() => {
        window.location.href = '/explore';
      }, 100);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signin_with',
        }
      );
    }
  }, []);

  return <div id="googleButtonDiv" className="w-full"></div>;
}