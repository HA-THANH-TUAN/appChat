const statusCode={
    FORBIDDEN:403,
    CONFLICT:409,
    UNAUTHORIZED: 401
}
const messageStatusCode={
    FORBIDDEN:"Bad request error",
    CONFLICT:"Conflict error",
    UNAUTHORIZED:"Unauthorized"
}

class ErrorResponse extends Error {
    constructor(message,status){
        super(message);
        this.status=status,
        this.metadata=null
    }
}


class ConflictResponse extends ErrorResponse {
    constructor(message = messageStatusCode.CONFLICT , status = statusCode.CONFLICT){
        super(message, status)
    }
}

class Unauthorized extends ErrorResponse {
    constructor(message = messageStatusCode.UNAUTHORIZED , status=statusCode.UNAUTHORIZED){
        super(message, status)
    }
}
class BadResponse extends ErrorResponse {
    constructor(message = messageStatusCode.FORBIDDEN , status=statusCode.FORBIDDEN){
        super(message, status)
    }
}


const handleError = (controller)=>{
    return (req, res, next)=>{
        controller(req,res, next).catch(next)
    }
}

module.exports = {handleError ,ConflictResponse ,Unauthorized, BadResponse}