import Head from 'next/head';
import Link from 'next/link';
import { getAllPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = await getAllPostsData();
  return {
    props: { allPostsData }
  }
}

// '/'
export default function Home({ allPostsData }) {
    return (
    <div>
    <Head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>GoBlog</title>
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
              <a className="nav-link" href="#">Home</a>
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

    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
    </nav>
    </div>
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