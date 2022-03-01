import { useState } from "react";
import CMSLayout from "../../components/cms-layout";
import { Dashboard, ManageProfile, PostEditor, PostList, Settings } from "../../components/cms-components";
import styles from '../../styles/cms.module.css';
import cookie from 'js-cookie';
import { useEffect } from "react";
import axios from 'axios';
import Router from 'next/router';

export default function CMS() {
  const [ page, setPage ] = useState('dashboard');

  useEffect(() => {
    let loginCredentials = cookie.get('loginCredentials');
    if (loginCredentials) {
      let loginResult;
      axios.post('http://localhost:3000/api/login', {}, { withCredentials: true })
      .then(response => {
        loginResult = response.data;
        console.log("loginResult:" + loginResult)
        if (!loginResult) {
          Router.push('/admin/login');
        }
      }).catch(e => console.log(e.message));
    } else {
      Router.push('/admin/login');
    }
  }, [page]);

  let pageJSX;
  if (page === 'Dashboard') pageJSX = <Dashboard />;
  else if (page === 'PostList') pageJSX = <PostList setPage={setPage}/>;
  else if (page.split('%%')[0] === 'PostEditor') pageJSX = <PostEditor postId={page.split('%%')[1]}/>;
  else if (page === 'ManageProfile') pageJSX = <ManageProfile />;
  else if (page === 'Settings') pageJSX = <Settings />;

  return (
    <CMSLayout currentPage={page} setPage={setPage}>
      { pageJSX }
    </CMSLayout>
  );
}