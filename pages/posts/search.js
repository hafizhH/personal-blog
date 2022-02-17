import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../components/main-layout';
import { searchPost } from '../../lib/posts';

export async function getServerSideProps({ query }) {
  const searchResultsData = await searchPost(query.keywords);
  return {
    props: { searchResultsData, query }
  }
}

// '/'
export default function Search({ searchResultsData, query }) {
    return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>GoBlog</title>
      </Head>

      <MainLayout>
        <div className="search">
            <p className="searchtext">
              Results for &quot;{query.keywords}&quot;
              <p className="subsearch">{searchResultsData.length} results</p>
            </p>
            <br></br>
            <PostList searchResultsData={searchResultsData}/>
            <br></br>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
            </ul>
         </nav>
        </div>
        <br></br><br></br>
      </MainLayout>
    </>
  );
}


function PostList({ searchResultsData }) {
  let postItems = searchResultsData.map((postData) => {
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