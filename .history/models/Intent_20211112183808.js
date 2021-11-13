const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IntentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	tag: {
		type: String
	},
	patterns: {
		type: String
	},
	response: {
		type: String,
		enum: ['TO LEARN', 'LEARNING', 'LEARNED']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
})

module.exports = mongoose.model('intents', IntentSchema)