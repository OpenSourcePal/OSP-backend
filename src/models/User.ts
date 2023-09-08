import { model, Model, Schema, models, ObjectId, Document } from 'mongoose';

export interface IUser extends Document {
	_id: ObjectId;
	username: string;
	email: string;
	lastUsed: Date;
	numberOfUsagePerDay: number;
}

interface IUserDocument extends IUser {}

interface IUserModel extends Model<IUserDocument> {}

const UserSchema: Schema = new Schema<IUserDocument, IUserModel>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	lastUsed: { type: Date, required: true },
	numberOfUsagePerDay: { type: Number, default: 0 },
});

UserSchema.set('toJSON', {
	transform: (document, objectToBeReturned) => {
		objectToBeReturned.id = objectToBeReturned._id.toString();
		delete objectToBeReturned._id;
		delete objectToBeReturned.__v;
	},
});

export const User =
	models.User || model<IUserDocument, IUserModel>('User', UserSchema);
