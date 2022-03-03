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
        <meta charSet="UTF-8" />
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
            <i className={`fa fa-bars ${styles2.nav_btn}`} onClick={() => document.getElementById('mobile-nav-items').classList.toggle(styles2.active)}></i>
          </div>
          <div id="mobile-nav-items" className={`${styles2.mobile_nav_items}`}>
            <a className={currentPage=='Dashboard' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='Dashboard') setPage('Dashboard')} }><i className="fa-solid fa-desktop"></i><span>Dashboard</span></a>
            <a className={currentPage=='ManageProfile' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='ManageProfile') setPage('ManageProfile')} }><i className="fa-solid fa-user"></i><span>Profile</span></a>
            <a className={currentPage=='PostList' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='PostList') setPage('PostList')} }><i className="fa-solid fa-table"></i><span>Manage Posts</span></a>
          </div>
        </div>

        <div className={styles2.sidebar}>
          <div className={styles2.profile_info}>
            <img src="https://i.imgur.com/V4RclNb.png" className={styles2.pp_cms} alt="Profile Picture" /><br></br>
            <h4>{accountName}</h4>
          </div>
          <a className={currentPage=='Dashboard' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='Dashboard') setPage('Dashboard')} }><i className="fa-solid fa-desktop"></i><span>Dashboard</span></a>
          <a className={currentPage=='ManageProfile' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='ManageProfile') setPage('ManageProfile')} }><i className="fa-solid fa-user"></i><span>Profile</span></a>
          <a className={currentPage=='PostList' ? styles2.active_menu : ''} onClick={() => { if (currentPage!='PostList') setPage('PostList')} }><i className="fa-solid fa-table"></i><span>Manage Posts</span></a>
        </div>

        {children}
      </div>
    </>
  );

}