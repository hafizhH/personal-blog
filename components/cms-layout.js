import Cookies from 'js-cookie';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/cms.module.css';
import styles2 from '../styles/cms2.module.css';

export default function CMSLayout({ children, currentPage, setPage }) {
  const [ accountName, setAccountName ] = useState('');

  useEffect(() => {
    const loginCredentials = JSON.parse(Cookies.get('loginCredentials'));
    setAccountName(loginCredentials.authorAcc.name);
  },[]);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CMS</title>
      </Head>

      <div className={styles2.body}>
        <input type="checkbox" id="check" className={`${styles2.check} ${styles.check}`} />
        <div className={styles2.header}>
          <label htmlFor="check">
            <i className={`fa-solid fa-bars ${styles2.sidebar_btn}`}></i>
          </label>
          <div className={styles2.left_area}>
            <h3>Go<span>CMS</span></h3>
          </div>
          <div className={styles2.right_area}>
            <Link href='/'><a className={styles2.return_button}>Return</a></Link>
          </div>
        </div>

        <div className={styles2.mobile_nav}>
          <div className={styles2.nav_bar}>
            <img src="https://i.imgur.com/V4RclNb.png" className={styles2.mobile_pp} alt="Profile Picture" />
            <i className={`fa fa-bars ${styles2.nav_btn}`}></i>
          </div>
          <div className={styles2.mobile_nav_items}>
            <a href="home.html" className={styles2.active_menu}><i className="fa-solid fa-house"></i><span>Home</span></a>
            <a href="profile.html"><i className="fa-solid fa-user"></i><span>Profile</span></a>
            <a href="posts.html"><i className="fa-solid fa-table"></i><span>Manage Posts</span></a>
            <a href="settings.html"><i className="fa-solid fa-sliders-h"></i><span>Settings</span></a>
          </div>
        </div>

        <div className={styles2.sidebar}>
          <div className={styles2.profile_info}>
            <img src="https://i.imgur.com/V4RclNb.png" className={styles2.pp_cms} alt="Profile Picture" />
            <h4>{accountName}</h4>
          </div>
          <a className={currentPage=='Dashboard' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='Dashboard') setPage('Dashboard')} }><i className="fa-solid fa-house"></i><span>Home</span></a>
          <a className={currentPage=='ManageProfile' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='ManageProfile') setPage('ManageProfile')} }><i className="fa-solid fa-user"></i><span>Profile</span></a>
          <a className={currentPage=='PostList' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='PostList') setPage('PostList')} }><i className="fa-solid fa-table"></i><span>Manage Posts</span></a>
          <a className={currentPage=='Settings' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='Settings') setPage('Settings')} }><i className="fa-solid fa-sliders-h"></i><span>Settings</span></a>
        </div>

        {children}
      </div>
    </>
  );

  }

/*
  return (
    <div className={styles.body}>
      <div className={styles.headerContainer}>
        <nav className="navbar sticky-top navbar-expand-lg">
          <div className="container">
            <Link href="/admin/dashboard"><a className="navlogo">GoBlog-CMS</a></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
          </div>
        </nav>
      </div>
      
      <div className={styles.mainContainer}>
        <div className={styles.leftDrawerContainer}>
          <div className={styles.leftDrawer}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerHeaderL}>
                <img className={styles.profileImg} src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"/>
              </div>
              <div className={styles.drawerHeaderR}>
                <div className={`${styles.text2LL}`}>{accountName}</div>
                <a className={`${styles.link} ${styles.text3L}`} onClick={() => setPage('ManageProfile')}>Manage profile</a>
              </div>
            </div>
            <div className={`${currentPage === 'Dashboard' ? styles.drawerMenu + ' ' + styles.drawerMenuSelected : styles.drawerMenu}`}>
              <div className={`${styles.text2L}`} onClick={() => setPage('Dashboard')}>Dashboard</div>
            </div>
            <div className={`${currentPage === 'PostList' ? styles.drawerMenu + ' ' + styles.drawerMenuSelected : styles.drawerMenu}`}>
              <div className={`${styles.text2L}`} onClick={() => setPage('PostList')}>All Posts</div>
            </div>
            <div className={`${currentPage === 'Settings' ? styles.drawerMenu + ' ' + styles.drawerMenuSelected : styles.drawerMenu}`}>
              <div className={`${styles.text2L}`} onClick={() => setPage('Settings')}>Settings</div>
            </div>
          </div>
        </div>
        <div className={styles.mainContentContainer}>
          {children}
        </div>
      </div>
    </div>
  );
}
*/