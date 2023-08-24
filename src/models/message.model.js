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
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId:{
        type:String,
        enum: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],

    },
    
    type: {
        type:String,
        enum:["personal", "group"],
        default: "personal",
    },
    peopleWacthed:[
        {
            userId:{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
            },
            emoji: { type: String ,default:null},
            timestamp: { type: Date, default: Date.now }
        }
    ],
    message_type: {
        content: "string",
        type: {type:String ,enum : ["text", "image", "video", "audio", "notify_call"], default:"text"},
        url:{type:String, default:null}
    },
    //  Group
    timestamp: { type: Date, default: Date.now },
},{
    timestamps: true,
    collection: COLECTION_NAME
});

module.exports= model(DOCUMENT_NAME, messageSchema)

