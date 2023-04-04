export class Target {
    id: number;
    
    name: string;
    description: string;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        id = 0,
        name = '',
        description = '',
        created_at = '',
        updated_at = '',
        deleted_at = ''
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

}