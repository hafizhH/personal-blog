import Link from 'next/link';

export default function MainLayout({ children }) {
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
              <a className="nav-link" href="#">Blogs</a>
              <a className="nav-link" href="#">Write</a>
              <a className="nav-link" href="#">My Account</a>
            </div>
          </div>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
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
                  <li><a href="#">Posts</a></li>
                  <li><a href="#">Write</a></li>
                  <li><a href="#">My Account</a></li>
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