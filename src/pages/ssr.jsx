import Nav from '../components/Nav';
import { GetUser } from '../queries/user';
import { ssrExchange, dedupExchange, cacheExchange, useQuery } from 'urql';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { executeExchange } from '@urql/exchange-execute';
import data  from '../utils/manual.json';

const schema = data.data.__schema;
function SSR(props) {
  console.log('props', props);
  const [{ data }] = useQuery({ query: GetUser });
  const user = data?.post;
  return (
    <>
      <Nav />
      <p>{user?.title}</p>
      <p>{user?.body}</p>
    </>
  );
}

export async function getServerSideProps(context) {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: 'https://graphqlzero.almansi.me/api',
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        executeExchange({ schema }),
      ],
    },
    false
  );

  await client.query(GetUser, {}).toPromise();
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

export default withUrqlClient((ssr) => ({
  url: 'https://graphqlzero.almansi.me/api',
}))(SSR);
