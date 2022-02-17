import mongoose, { isValidObjectId, Mongoose } from 'mongoose';
mongoose.Promise = global.Promise;

const CommentSchema = new Mongoose.Schema({
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
  
});

function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
  ? mongoose.model(modelName) // If true, only retrieve it
  : mongoose.model(modelName, modelSchema) // If false, define it
}
  
module.exports = () => loadModel('comments', CommentSchema);