import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModelName = 'User';

const User = mongoose.model(userModelName, userSchema);

type UserType = InferSchemaType<typeof userSchema>;

export { User, UserType, userModelName };

