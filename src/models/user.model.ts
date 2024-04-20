import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const userModelName = 'User';

const UserModel = mongoose.model(userModelName, userSchema);

type UserType = InferSchemaType<typeof userSchema>;

export { UserModel, UserType, userModelName };

