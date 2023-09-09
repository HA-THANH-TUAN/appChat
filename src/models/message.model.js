const {Schema, Types, model}=require("mongoose")

const DOCUMENT_NAME="Message"
const COLECTION_NAME="Messages"

// const demo= {
//     sender:"2566",
//     receiverId:"retbrbv",
//     type: "personal",
//     peopleWacthed:[
//         {
//             userId:"erfgwfd",
//             emoji:"efcvfbg",
//             timestamp:"date"
//         },
//         {
//             userId:"erfgwfd",
//             timestamp:"date"
//         }
//     ],

//     message_type:{
//         type:"texxt",
//         content:"wdefbgrnh",
//         url:null
//     }


// }

const messageSchema  = Schema({
    
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversations' },
    senderId: { type: Schema.Types.ObjectId, ref: 'Users' },
    peopleWacthed:[
        {
            watchedId:{
               type: Schema.Types.ObjectId,
               ref: 'Users'
            },
            emoji: { type: String ,default:null},
            timestamp: { type: Date, default: Date.now }
        }
    ],
    message: {
        content: "string",
        type: {type:String ,enum : ["text", "notify_call"], default:"text"}
    },
    //  Group
    timestamp: { type: Date, default: Date.now },
},{
    timestamps: true,
    collection: COLECTION_NAME
});
const MessageModel= model(DOCUMENT_NAME, messageSchema)
module.exports= MessageModel

