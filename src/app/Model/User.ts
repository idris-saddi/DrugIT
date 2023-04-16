import { Role } from "./roles.enum";

export class User {
    id: number;

    username: string;
    email: string;
    password: string;
    salt: string;
    organization: string;
    role: Role;
    subscription: number;
    image: string;
    phone: string;

    facebooklink: string;
    twitterlink: string;
    linkedinlink:string;


    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        id = 0,
        username = '',
        email = '',
        password = '',
        salt = '',
        organization = '',
        role = Role.Client,
        subscription = 0,
        image = '',
        phone = '',
        facebooklink = '',
        twitterlink = '',
        linkedinlink = '',
        created_at = '',
        updated_at = '',
        deleted_at = ''
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.organization = organization;
        this.role = role;
        this.subscription = subscription;
        this.image = image;
        this.phone = phone;
        this.facebooklink = facebooklink;
        this.twitterlink = twitterlink;
        this.linkedinlink = linkedinlink;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

}
