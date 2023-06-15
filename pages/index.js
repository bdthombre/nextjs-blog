import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
        <Head>
          <title>{ siteTitle }</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p> Mr. Goldfish is very talented swimmer. He has beautiful fins and it swims like a pro. His gills allow him to breath even under water!</p>
          <p>(This is a simple website - you'll be building a side like on {' '}
            <a href='https://nextjs.org/learn'> our Next.js tutorial</a>.)</p>
        </section>

        {/* External data */}
        <section className={'${utilsStyles.headingMd} ${utilsStyles.padding1px}'}>
          <h2 className={utilStyles.headingMd}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({id, date, title})=>(
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br/>
                <small className={utilStyles.lighText}>
                  <Date dateString={date}></Date>
                </small>
                
                {/* {title}
                <br/>
                {id}
                <br/>
                {date} */}
              </li>
          ))}
          </ul>
          
        </section>
    </Layout>
  );
}
