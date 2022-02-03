import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/main-layout';
import { getAllPostIds, fetchPostData } from '../../lib/posts';
import { formatDate } from '../../lib/utilities';

export async function getStaticPaths({ params }) {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const postData = await fetchPostData(params.postId);
  if (postData !== null) {
    return {
      props: { postData }
    }
  }
}

// '/posts/[postId]'
export default function Post({ postData }) {
  return (
  <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>
        {postData.title}|GoBlog
      </title>
    </Head>
    
    <MainLayout>
      <div className="blog">
        <p className="blogtitle">{postData.title}</p>
        <p className="bloginfo">By : <a href="#" className="bloginfo">{postData.author}</a></p>
        <p className="blogdate">{formatDate(postData.date)}</p>
        <div className="blogcontent" dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
      </div>
    </MainLayout>
  </>
  );
}