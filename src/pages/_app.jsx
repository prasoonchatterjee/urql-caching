import { withUrqlClient } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withUrqlClient((ssrExchange) => ({ 
  url: "https://graphqlzero.almansi.me/api",
  exchanges: [devtoolsExchange,dedupExchange, cacheExchange, ssrExchange, fetchExchange],
}), {ssr:true})(MyApp);