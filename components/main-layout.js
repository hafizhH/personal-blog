import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';

export default function MainLayout({ children }) {
  const [ isMenuActive, setIsMenuActive ] = useState(false);

  function handleSearch(event) {
    const formData = new FormData(event.target);
    if (formData.keywords == '') 
      event.preventDefault();
  }

  return (
    <>
        <div className='headernav'>
            <a href="#" className="logo">GoBlog</a>
            <div className={"menu-toggle " + ((isMenuActive) ? "active" : "")} onClick={() => setIsMenuActive(!isMenuActive)}></div>
            <nav className={(isMenuActive) ? "active" : ""}>
                <ul>
                    <Link href="/"><li><a>Home</a></li></Link>
                    <Link href="/posts"><li><a>Posts</a></li></Link>
                    <Link href="/admin/cms"><li><a>Write</a></li></Link>
                    <Link href="/admin/login"><li><a>My Account</a></li></Link>
                    <li>
                      <form action="/posts/search" onSubmit={(event) => handleSearch(event)}>
                        <input type="search" name="keywords" placeholder="Search" aria-label="Search"></input>
                        <button type="submit">Search</button>
                      </form>
                    </li>
                </ul>
            </nav>
            <div className="clearfix"></div>
            {/*
            <Script type="text/javascript">
              $(document).ready(function(){
                  $('.menu-toggle').click(function(){
                      $('.menu-toggle').toggleClass('active')
                      $('nav').toggleClass('active')
                  })
              })
            </Script>*/}
        </div>



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