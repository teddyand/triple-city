import PostMeta from '../../components/PostHead';
import posts from '../../data/posts';
import Link from 'next/link'

export function getServerSideProps({ params }) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  return {
    props: {
      post,
    },
  };
}

function Post({ post }) {
  return (

    <div>
      <PostMeta  {...post} />
      <h1>{post.title}</h1>
      <p>{post.subtitle}</p>
           <Link href='/blog' >
            Back to Blog 
          </Link>
    
    </div>
    
    
  );
}

export default Post;
