import React, { Suspense } from 'react'
import { NetworkErrorBoundary } from 'rest-hooks'

import Routes from './Routes'

const Spinner = () => <div>Loading...</div>

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <NetworkErrorBoundary>
        <Routes />
      </NetworkErrorBoundary>
    </Suspense>
  );
}

export default App;
