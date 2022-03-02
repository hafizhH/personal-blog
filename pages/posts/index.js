import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../components/main-layout';
import { getAllPostsData } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = await getAllPostsData();
  return {
    props: { allPostsData }
  }
}

// '/'
export default function Posts({ allPostsData }) {
    return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>GoBlog</title>
      </Head>

      <MainLayout>
        <main className="mt-0 pt-5">
          <div className="container">
            <section className="text-center">
            <h4 className="post_title">Showing all recent posts</h4>
              <div className="post_title_mini">
                feel free to comment.
              </div>
              <br/><br/>
              <PostList allPostsData={allPostsData}/>
            </section>
          </div>
        </main>


          <div className='previous_button_div'>
            <button type='button' className='previous_button'><i className="fa-solid fa-angle-left"></i></button>
          </div>
          
          <div className='next_button_div'>
            <button type='button' className='next_button'><i className="fa-solid fa-angle-right"></i></button>
          </div>

          <br></br>
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