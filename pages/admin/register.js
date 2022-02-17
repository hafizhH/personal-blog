import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/main-layout';
import Router from 'next/router';
import cookie from 'js-cookie';

// '/'
export default function Register() {

  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    let registerResult = await axios.post('http://localhost:3000/api/register', { name: name, email: email, username: username, password: password });
    if (registerResult.data.registerResult) {
      alert('Register success, please login to your account');
      Router.push('/admin/login');
    } else {
      alert('Register failed');
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Register | GoBlog</title>
      </Head>

      <MainLayout>
        <div className="container-fluid">
          <div className="row main-content">
            <div className="col-md-4 text-center info">
              <h4 className="logo">Logo</h4>
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div className="container-fluid">
                <div className="row pt-5">
                  <h2><b>Get Started</b></h2>
                  <p>“You can make anything by writing.”<br />― C.S. Lewis</p>
                </div>
                <div className="row pt-0">
                  <form control="" className="form-group" onSubmit={(event) => handleSubmit(event)}>
                    <div className="row">
                      <input type="Full Name" name="name" id="name" className="form__input" placeholder="Full Name" />
                    </div>
                    <div className="row">
                      <input type="email" name="email" id="email" className="form__input" placeholder="E-mail" />
                    </div>
                    <div className="row">
                      <input type="text" name="username" id="username" className="form__input" placeholder="Username" />
                    </div>
                    <div className="row">
                      <input type="password" name="password" id="password" className="form__input" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn w-100 btn2">Register</button>
                  </form>
                  <p className="pb-4 text-center">Already have an account? <Link href='/admin/login'><a className="login">Login</a></Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}