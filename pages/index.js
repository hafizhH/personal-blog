import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../components/main-layout';
import { getLatestPostsData } from '../lib/posts';

export async function getServerSideProps() {
  const allPostsData = await getLatestPostsData();
  return {
    props: { allPostsData }
  }
}

// '/'
export default function Home({ allPostsData }) {
    return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>GoBlog</title>
      </Head>

      <MainLayout>
        <header className="py-5 mb-0">
          <div className="container header-container">
            <div className="text-center my-5">
                <h1 className="home-title">Welcome to GoBlog</h1>
                <p className="lead mb-0 home-subtitle">See the latest blogs</p>
            </div>
          </div>
        </header>

        <main className="mt-0 pt-5">
          <div className="container">
            <section className="text-center">
              <h4 className="mb-5"><strong>Latest posts</strong></h4>
              <PostList allPostsData={allPostsData}/>
            </section>
          </div>
        </main>

          <br></br>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item"><Link href="/posts"><a className="page-link">Read More</a></Link></li>
            </ul>
        </nav>
        <br></br>
      </MainLayout>
    </>
  );
}


function PostList({ allPostsData }) {
  let postItems = allPostsData.map((postData) => {
    return (
      <div className="col-lg-4 col-md-6 mb-4" key={postData.postId}>
        <div className="card">
          <div className="bg-image hover-overlay ripple crop-img" data-mdb-ripple-color="light">
            <img src={postData.thumbImg} className="img-fluid" alt="thumbnail"/>
            <a href={"/posts/"+postData.postId}>
              <div className="mask"></div>
            </a>
          </div>
          <div className="card-body">
            <h5 className="card-title">{postData.title}</h5>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: postData.processedPreviewContent }} />
            <Link href={"/posts/"+postData.postId}>
              <a className="btn btn-primary card-button">Read</a>
            </Link>
          </div>
        </div>
      </div>
    );
  });
  let postRows = [];
  while (postItems.length > 0) {
    postRows.push(
      <div className="row" key={postRows.length}>
        {(postItems.length > 0) ? postItems.shift():''}
        {(postItems.length > 0) ? postItems.shift():''}
        {(postItems.length > 0) ? postItems.shift():''}
      </div>
    );
  }
  return postRows;
}