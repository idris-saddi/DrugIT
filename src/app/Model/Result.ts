export class Result {

    targetId: string;
    moleculeId: string;

    active: boolean;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        targetId = '',
        moleculeId = '',
        active = false,
        created_at = '',
        updated_at = '',
        deleted_at = ''
    ) {
        this.targetId = targetId;
        this.moleculeId = moleculeId;
        this.active = active;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}
