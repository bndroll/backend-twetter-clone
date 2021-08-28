import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'

import './core/db'
import { UserCtrl } from './controllers/UserController'
import { registerValidations } from './validations/register'
import { passport } from './core/passport'
import { TweetCtrl } from './controllers/TweetsController'
import { createTweetValidations } from './validations/createTweet'
import { UploadFileCtrl } from './controllers/UploadFileController'

const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

// -------- Users -------- //
app.get('/users', UserCtrl.index)
app.get(
	'/users/me',
	passport.authenticate('jwt', { session: false }),
	UserCtrl.getUserInfo
)
app.get('/users/:id', UserCtrl.show)

// -------- Tweets -------- //
app.get('/tweets', TweetCtrl.index)
app.get('/tweets/:id', TweetCtrl.show)
app.get('/tweets/user/:id', TweetCtrl.getUserTweets)
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCtrl.delete)
app.patch(
	'/tweets/:id',
	passport.authenticate('jwt'),
	createTweetValidations,
	TweetCtrl.update
)
app.post(
	'/tweets',
	passport.authenticate('jwt'),
	createTweetValidations,
	TweetCtrl.create
)

// -------- Auth -------- //
app.get('/auth/verify', registerValidations, UserCtrl.verify)
app.post('/auth/register', registerValidations, UserCtrl.create)
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin)

// -------- Auth -------- //
app.post('/upload', upload.single('image'), UploadFileCtrl.upload)

app.listen(process.env.PORT, (): void => {
	console.log('server running')
})
