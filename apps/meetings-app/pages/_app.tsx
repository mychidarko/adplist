import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-ts-modal/css/styles.css';

import type { AppProps } from 'next/app';
import GlassX, { PersistedState } from 'glassx';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import NProgress from 'nprogress';
// import { HermesConfig } from '@adplist/utils/dist';
import { Auth0Provider } from '@auth0/auth0-react';

// HermesConfig.baseUrl = process.env.DYTE_API_URL!;

GlassX.store({
  state: {
    meetings: [],
  },
  plugins: [PersistedState],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN!}
      clientId={process.env.AUTH0_CLIENT_ID!}
      redirectUri={
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:3001'
      }
    >
      <Component {...pageProps} />
      <ToastContainer />
    </Auth0Provider>
  );
}

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());

export default MyApp;
