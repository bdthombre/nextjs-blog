import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';


export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback:false,
    };
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    };
}



export default function Post({postData}) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingX1}>
        {postData.title}</h1>
        {/* {postData.date}
        <br/> */}
        <div className={utilStyles.lightText}>
        <Date dateString={postData.date}/></div>
        {postData.data}
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </article>
    </Layout>;
}