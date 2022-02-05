import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema({
  postId: String,
  title: String,
  date: String,
  author: String,
  markdownContent: String
});

function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
  ? mongoose.model(modelName) // If true, only retrieve it
  : mongoose.model(modelName, modelSchema) // If false, define it
}

module.exports = () => loadModel('posts', PostSchema);