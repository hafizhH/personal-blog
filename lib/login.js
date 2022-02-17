import dbConnect from "./database/dbConnect";
import bcrypt from 'bcrypt';

const authors = require('./database/models/authors')();
const { v4: uuidv4 } = require('uuid');

export async function login(username, password) {
  await dbConnect();
  const authorAcc = await authors.findOne({ user: username }).exec();
  //console.log(authorAcc);
  if (authorAcc) {  //Cek apakah akun user ada
    const isPassValid = await validatePassword(password, authorAcc.pass);
    //console.log(isPassValid);
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
  const authorAcc = validateLoginKey(loginKey);
  if (authorAcc) {
    delete authorAcc.pass;
    return { authorAcc };
  } else {
    return null;
  }
}

export async function logout() {
  await dbConnect();
  
}

export async function addAuthorAccount(email, username, password, name) {
  await dbConnect();
  const accCheck1 = await authors.findOne({ user: username }).exec();
  const accCheck2 = await authors.findOne({ email: 'hafizhhrp123gmail.com' }).exec();
  //console.log(authors.schema);
  //console.log(username + ' ' + email);
  //console.log(accCheck1);
  //console.log(accCheck2);
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
  await authors.findOneAndUpdate({ user: authorAcc.user }, { cookie: cookie }, { returnOriginal: false }).exec();
  return cookie;
}

export async function validateLoginKey(loginKey) {
  await dbConnect();
  const authorAcc = await authors.findOne({ cookie: loginKey }).exec();
  return authorAcc;
}

export async function validatePassword(plainPass, hashedPass) {
  const compareResult = await bcrypt.compare(plainPass, hashedPass);
  return compareResult;
}

export async function hash(plainPass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(plainPass, salt);
  //console.log(plainPass + '=' + hashedPass);
  return hashedPass;
}