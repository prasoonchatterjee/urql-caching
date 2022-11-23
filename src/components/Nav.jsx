import Link from 'next/link';

export default function Nav() {
  return (
    <>
      <nav>
        <ul>
          <li><Link href='/ssg'>static</Link></li>
          <li><Link href='/ssr'>server</Link></li>
        </ul>
      </nav>
    </>
  );
}
