import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }) {  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m <strong>David</strong>. I was born in Beijing in 1977 April the 29th. 
          Graduated from Beijing Information Science and Technology University (origin: Bejing Machinery industry Institue )
           at 1999 July, Major in Industrial Electrical automation. After that, at Bejing Medical Instrument instiute(BMII) 
           I started my career as a program technician. Went through a long time strugle, Now I am a freelancer and amateur 
           OSS(open source software) application user; And commit myself to provide scheme which depends on lowcost Open source
            software/hardware realize; Meanwhile I am also a Maker、 a hobbyist of calligraphy、traditional novel、foreign
             literature(especialy in english literature);and even a history fanatic. You can contact me on{' '}
          <a href="https://www.weibo.com/u/5896726763">Sina Weibo</a>.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

AUTH0_CLIENT_ID=25kSJHV9nDCawIlMsCOCQuiMq8fEzQT8
AUTH0_CLIENT_SECRET=MBmNGsWYnZf0oQZoNotcewZSnofqeP54xNAcDPLjq130dBVHpLrrzKp1OwplIY69
AUTH0_ISSUER=https://dev-33p2hasqr0bb5zvi.us.auth0.com

 
