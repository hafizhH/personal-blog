import dbConnect from "./database/dbConnect";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const authors = require('./database/models/authors')();
const logins = require('./database/models/logins')();
const { v4: uuidv4 } = require('uuid');

export async function login(username, password) {
  await dbConnect();
  const authorAcc = await authors.findOne({ user: username }).exec();
  if (authorAcc) {  //Cek apakah akun user ada
    const isPassValid = await validatePassword(password, authorAcc.pass);
    if (isPassValid) {   //Cek apakah pass valid
      const loginKey = await generateLoginKey(authorAcc);
      authorAcc.cookie = loginKey;
      delete authorAcc.pass;
      return { authorAcc };
    } else {    //Jika pass tidak valid
      return null;
    }
  } else {    //Jika akun tidak ada
    return null;
  }
}

export async function autoLogin(loginKey) {
  const authorAcc = await validateLoginKey(loginKey);
  if (authorAcc) {
    delete authorAcc.pass;
    return { authorAcc };
  } else {
    return null;
  }
}

export async function logout(loginKey) {
  await dbConnect();
  const logoutData = await logins.findOneAndRemove({ cookie: loginKey }).exec();
  return (logoutData) ? true : false;
}

export async function addAuthorAccount(email, username, password, name) {
  await dbConnect();
  const accCheck1 = await authors.findOne({ user: username }).exec();
  const accCheck2 = await authors.findOne({ email: 'hafizhhrp123gmail.com' }).exec();
  if (accCheck1 || accCheck2) {
    return false;
  } else {
    const hashedPass = await hash(password);
    authors.create({ email: email, user: username, pass: hashedPass, name: name, cookie: '' }, function (err, author) {
      if (err) console.log(err.message);
    });
    return true;
  }
}

export async function generateLoginKey(authorAcc) {
  await dbConnect();
  let cookie = uuidv4();
  logins.create({ userId: mongoose.Types.ObjectId(authorAcc._id), cookie: cookie, createdAt: Date.now() }, function (err, logins) {
    if (err) console.log(err.message);
  })
  return cookie;
}

export async function validateLoginKey(loginKey) {
  await dbConnect();
  const loginData = await logins.findOne({ cookie: loginKey }).exec();
  let authorAcc;
  if (loginData)
    authorAcc = await authors.findById(mongoose.Types.ObjectId(loginData.userId)).exec();
  return authorAcc;
}

export async function validatePassword(plainPass, hashedPass) {
  const compareResult = await bcrypt.compare(plainPass, hashedPass);
  return compareResult;
}

export async function hash(plainPass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(plainPass, salt);
  return hashedPass;
}