import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import styles from '../styles/cms.module.css';

export default function CMSLayout({ children, currentPage, setPage }) {
  const [ accountName, setAccountName ] = useState('');

  useEffect(() => {
    const loginCredentials = JSON.parse(Cookies.get('loginCredentials'));
    setAccountName(loginCredentials.name);
  },[]);

  return (
    <div className={styles.body}>
      <div className={styles.headerContainer}>
        <nav className="navbar sticky-top navbar-expand-lg">
          <div className="container">
            <Link href="/admin/dashboard"><a className="navlogo">GoBlog-CMS</a></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/*
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mx-auto">
                <Link href="/"><a className="nav-link">Home</a></Link>
                <a className="nav-link" href="#">Blogs</a>
                <a className="nav-link" href="#">Write</a>
                <a className="nav-link" href="#">My Account</a>
              </div>
            </div>
            */}
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