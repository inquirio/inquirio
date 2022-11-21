import '../styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/transition.css';
// import '../styles/Settings.module.css';

import {Transition} from '../Components/Transition/transition';

export default function App({ Component, pageProps }) {
const { user } = pageProps;

  return (
    <UserProvider user={ user }>
      <Transition>
        <Component {...pageProps} />
      </Transition>
    </UserProvider>
  );
}
