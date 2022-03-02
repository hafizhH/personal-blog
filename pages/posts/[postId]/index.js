import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../../components/main-layout';
import Comment from '../../../components/comment';
import { getAllPostIds, fetchPostData } from '../../../lib/posts';
import { formatDate } from '../../../lib/utilities';

export async function getStaticPaths({ params }) {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const postData = await fetchPostData(params.postId);
  //console.log(postData);
  if (postData !== null) {
    return {
      props: { postData },
      revalidate: 10
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
        <br></br>
        <br></br>
        <hr></hr>
        <Comment commentsProp={JSON.parse(postData.comments)} postData={postData} />
      </div>
    </MainLayout>
  </>
  );
}