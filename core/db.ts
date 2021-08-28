import mongoose from 'mongoose'

// mongoose.Promise = Promise

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/twitter', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('db connected')
	})
	.catch(err => {
		console.log('error: ', err)
	})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

export { db, mongoose }
