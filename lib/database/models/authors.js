import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const AuthorSchema = new mongoose.Schema({
  user: String,
  email: String,
  pass: String,
  name: String,
  cookie: String
});

function loadModel(modelName, modelSchema) {
  //delete mongoose.connection.models[modelName];
  return mongoose.models[modelName] // Check if the model exists
  ? mongoose.model(modelName) // If true, only retrieve it
  : mongoose.model(modelName, modelSchema) // If false, define it
}

module.exports = () => loadModel('authors', AuthorSchema);