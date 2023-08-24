const {model, Schema, Types}=require('mongoose')


const DOCUMENT_NAME_FRIEND_SHIP="FriendShip"
const COLLECTION_NAME_FRIEND_SHIP="FriendShips"


const DOCUMENT_NAME_FRIEND_REQUEST="FriendRequest";
const COLLECTION_NAME_FRIEND_REQUEST="FriendRequests";


const friendRequestSchema = Schema({

    senderId: { type: Schema.Types.ObjectId, ref: 'User' , unique:true, require:true, trim:true},
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', require:true,unique: true,trim:true},
    status: {
        type: String,
        enum : ["watched","unWatched"]
    },
    timestamp: { type: Date, default: Date.now },   
    },{
        collection: COLLECTION_NAME_FRIEND_REQUEST,
        timestamps:true
    });

const friendShipSchema = Schema({
    YourId: { type: Schema.Types.ObjectId, ref: 'User' },
    FriendId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ["friend", "follow", "none"],
        default : "none"
    },
    timestamp: { type: Date, default: Date.now },
    },{
        collection: COLLECTION_NAME_FRIEND_SHIP,
        timestamps:true
    });


const FriendShipModel=model(DOCUMENT_NAME_FRIEND_SHIP, friendShipSchema)
const FriendRequestModel=model(DOCUMENT_NAME_FRIEND_REQUEST, friendRequestSchema)

module.exports = {FriendShipModel , FriendRequestModel} ;