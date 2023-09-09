let {model, Schema} = require('mongoose')
const validator = require('validator');


const DOCUMENT_NAME_CONVERSATION="Conversation"
const COLLECTION_NAME_CONVERSATION="Conversations"


const conversationSchema = Schema({
    name: String,
    type: {
        type: String,
        enum : ["personal","group"]
    },
    order:{
        type:Number,
        default: 1
    },
    statusConversation:{
        type:String,
        enum : ["pending", "accepted"],
        default:"pending"
    },

    isDeleted: {
        type:Boolean,
        enum: [true, false],
        default:false
    },

    members : [
        {
            userId: {
                type: Schema.Types.ObjectId , ref: 'Users',
                require :true
            },
            role: {
                type:String,
                require:"member",
                enum: ["member","leader"],
            }
        },

    ],
    },{
        collection: COLLECTION_NAME_CONVERSATION,
        timestamps:true
    });

module.exports= model(DOCUMENT_NAME_CONVERSATION, conversationSchema)