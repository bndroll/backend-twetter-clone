import { model, Schema, Document } from 'mongoose'

export interface UserModelInterface {
	_id?: string
	email: string
	fullname: string
	username: string
	password: string
	confirmHash: string
	confirmed?: boolean
	location?: string
	about?: string
	website?: string
	tweets?: string[]
}

export type UserModelDocumentInterface = UserModelInterface & Document

const UserSchema = new Schema<UserModelInterface>(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		fullname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		confirmHash: {
			type: String,
			required: true,
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
		location: String,
		about: String,
		website: String,
		tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
	},
	{
		timestamps: true,
	}
)

UserSchema.set('toJSON', {
	transform: function (_, obj) {
		delete obj.password
		delete obj.confirmHash
		return obj
	},
})

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema)
