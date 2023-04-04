export class Result {
    id: number;

    targetId: number;
    moleculeId: number;

    active: boolean;
    confidence: number;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        id = 0,
        targetId = 0,
        moleculeId = 0,
        active = false,
        confidence = 0,
        created_at = '',
        updated_at = '',
        deleted_at = ''
    ) {
        this.id = id;
        this.targetId = targetId;
        this.moleculeId = moleculeId;
        this.active = active;
        this.confidence = confidence;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}
