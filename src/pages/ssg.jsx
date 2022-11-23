import Nav from '../components/Nav';
import { GetUser } from '../queries/user';
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from 'urql';
import { initUrqlClient, withUrqlClient } from 'next-urql';

function SSG(props) {
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

export async function getStaticProps(context) {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: 'https://graphqlzero.almansi.me/api',
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  await client.query(GetUser, {}).toPromise();
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}

export default withUrqlClient((ssr) => ({
  url: 'https://graphqlzero.almansi.me/api',
}))(SSG);
