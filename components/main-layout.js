import Link from 'next/link';

export default function MainLayout({ children }) {

  function handleSearch(event) {
    const formData = new FormData(event.target);
    if (formData.keywords == '') 
      event.preventDefault();
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg">
        <div className="container">
          <Link href="/"><a className="navlogo">GoBlog</a></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <Link href="/"><a className="nav-link">Home</a></Link>
              <Link href="/posts"><a className="nav-link">Posts</a></Link>
              <Link href="/admin/cms"><a className="nav-link">Write</a></Link>
              <Link href="/admin/login"><a className="nav-link">My Account</a></Link>
            </div>
          </div>
          <form action="/posts/search" className="d-flex" onSubmit={(event) => handleSearch(event)}>
            <input className="form-control me-2" type="search" name="keywords" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline" type="submit">Search</button>
          </form>
        </div>
      </nav>

      {children}

      <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About Us</h6>
                <p className="text-justify">GoBlog is a blogging site developed by GroupTwo in accordance to the OmahTI joint project between the Web Development and Web Design division. 
                It is used to share any information ranging from experiences, traveling information, and any other type of information. Our job is to ease the process of sharing experiences
                between users online.</p>
              </div>

              <div className="col-xs-6 col-md-3">

              </div>

              <div className="col-xs-6 col-md-3">
                <h6>Links</h6>
                <ul className="footer-links">
                  <li><Link href="/"><a>Home</a></Link></li>
                  <li><Link href="/posts"><a>Posts</a></Link></li>
                  <li><Link href="/admin/cms"><a>Write</a></Link></li>
                  <li><Link href="/admin/login"><a>My Account</a></Link></li>
                </ul>
              </div>
            </div>
            <hr></hr>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">&copy; 2022 GoBlog  |  GroupTwo
                </p>
              </div>
            </div>
          </div>
      </footer>
    </>
  );
}