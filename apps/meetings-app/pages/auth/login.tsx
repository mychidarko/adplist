import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuth0 } from '@auth0/auth0-react'; 
import { useEffect } from 'react';

const Login: NextPage = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, []);

  return (
    <div>
      <Head>
        <title>Login to next work</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
};

export default Login;
