import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
  <div>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>
        {postData.title}|GoBlog
      </title>
    </Head>
    <nav className="navbar sticky-top navbar-expand-lg">
      <div className="container">
        <Link href="/">
            <a className="navlogo">GoBlog</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto">
            <Link href="/"><a className="nav-link">Home</a></Link>
            <a className="nav-link" href="#">Blogs</a>
            <a className="nav-link" href="#">Post</a>
            <a className="nav-link" href="#">My Account</a>
          </div>
        </div>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <div className="blog">
      <p className="blogtitle">{postData.title}</p>
      <p className="bloginfo">By : <a href="#" className="bloginfo">{postData.author}</a></p>
      <p className="blogdate">{formatDate(postData.date)}</p>
      <div className="blogcontent" dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
    </div>
  </div>
  );
}