import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

let PostSchema = new mongoose.Schema(
{
  postId: String,
  title: String,
  date: String,
  author: String,
  markdownContent: String,
  comments: [{
    from: String,
    date: String,
    text: String,
    reply: [{
      from: String,
      to: String,
      date: String,
      text: String
    }]
  }]
});

function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
  ? mongoose.model(modelName) // If true, only retrieve it
  : mongoose.model(modelName, modelSchema) // If false, define it
}

module.exports = () => loadModel('posts', PostSchema);