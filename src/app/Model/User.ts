import { Role } from "./roles.enum";

export class User {
    id: string;

    username: string;
    email: string;
    password: string;
    salt: string;
    organization: string;
    role: Role;
    subscription: string;
    image: string;
    phone: string;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        id = '',
        username = '',
        email = '',
        password = '',
        salt = '',
        organization = '',
        role = Role.Client,
        subscription = '',
        image = '',
        phone = '',
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
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

}
