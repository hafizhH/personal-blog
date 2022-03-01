import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const LoginSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cookie: String,
  createdAt: { type: Date, expires: 60, default: Date.now() }
});

function loadModel(modelName, modelSchema) {
  //delete mongoose.connection.models[modelName];
  return mongoose.models[modelName] // Check if the model exists
  ? mongoose.model(modelName) // If true, only retrieve it
  : mongoose.model(modelName, modelSchema) // If false, define it
}

module.exports = () => loadModel('logins', LoginSchema);