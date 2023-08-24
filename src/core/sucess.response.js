const STATUS_CODE={
    OKE:200,
    CREATED:201
}
const messageSucess={
    CREATED:"create",
    OK: "success"
}

class SucessResponse {
    constructor(mesage, status, metadata= null) {
        this.mesage=mesage;
        this.status=status;
        this.metadata=metadata;
    }
    send(res){
        console.log("statusstatusstatus")
        res.status(this.status).json({
            message: this.mesage,
            status: this.status,
            metadata:this.metadata
        })

    }
}

class OK extends SucessResponse{
    constructor(mesage=messageSucess.OK, metadata= null) {
        console.log(">>>>>")
        super(mesage,STATUS_CODE.OKE, metadata)
    }
}

class Created extends SucessResponse{
    constructor(mesage=messageSucess.CREATED, metadata= null) {
        super(mesage,STATUS_CODE.CREATED, metadata)
    }
}

module.exports={
    OK,
    Created,
}