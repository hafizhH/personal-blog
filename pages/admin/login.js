import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/main-layout';
import Router from 'next/router';
import cookie from 'js-cookie';

// '/'
export default function Login() {
  
  useEffect(() => {
    let loginCredentials = cookie.get('loginCredentials');
    if (loginCredentials) {
      let loginResult;
      axios.post('/api/login', {}, { withCredentials: true })
      .then(response => {
        loginResult = response.data;
        if (loginResult) {
          Router.push('/admin/cms');
        }
      }).catch(e => console.log(e.message));
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    let loginResult = await axios.post('/api/login', { username: username, password: password });
    //console.log("loginResult.data: " + JSON.stringify(loginResult.data));
    if (loginResult.data) {
      //alert('Login success');
      Router.push('/admin/cms');
    } else {
      alert('Login failed, invalid username or password');
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Login | GoBlog</title>
      </Head>

      <MainLayout>
        <div className="container-fluid">
          <div className="row main-content text-center">
            <div className="col-md-4 text-center info">
              <h4 className="logo">Logo</h4>
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div className="container-fluid">
                <div className="row pt-3">
                  <h2><b>WELCOME</b></h2>
                </div>
                <div className="row pt-3 pb-3">
                  <img className="rounded-circle mx-auto d-block w-50 h-50 pt-3" alt="exphoto" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                </div>
                <div className="row">
                  <form control="" className="form-group" onSubmit={(event) => handleSubmit(event)}>
                    <div className="row">
                      <input type="text" name="username" id="username" className="form__input" placeholder="Username" />
                    </div>
                    <div className="row">
                      <input type="password" name="password" id="password" className="form__input" placeholder="Password" />
                    </div>
                    <div className="form-check float-start">
                      <input type="checkbox" className="input" id="remember" />
                      <label className="label" forhtml="remember">Remember Me</label>
                    </div>
                    <button type="submit" className="btn w-100 btn2">Login</button>
                  </form>
                  <p className="pb-4 text-center">Not registered yet? <Link href='/admin/register'><a className="register">Register</a></Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}