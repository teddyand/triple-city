import Head from 'next/head';
import fsPromises from 'fs/promises';
import path from 'path';
import Link from 'next/link'
import PostMeta from '../../components/PostHead';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}


export default function Home(props) {
  const posts = props.posts;
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>   
    
  )
}



