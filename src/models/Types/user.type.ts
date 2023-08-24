export interface IUser {
    _id: string,
    name: string,
    email: string,
    status: userStatus,
    createdAt: string,
    updatedAt: string,
}

enum userStatus {
    "active"="active",
    "inactive"="inactive",
}

