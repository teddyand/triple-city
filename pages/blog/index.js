import Link from 'next/link'
 
function Posts() {
  return (
    <ul>
      <li>
        <Link href={{
          pathname: '/blog/[date]/[slug]',
          query: {
            date: '2020-01-01',
            slug: 'happy-new-year',
            foo: 'bar'
          }
        }}>Read post</Link>
      </li>
      <li>
        <Link href="/blog/2021-03-05/match-update">Read post</Link>
      </li>
      <li>
        <Link href="/blog/2023-04-29/i-love-nextjs">Read Post</Link>
      </li>
    </ul>
  )
}
 
export default Posts;          