import { Status } from "./status.enum";

export class Request {
    id: number;

    moleculeId: number;
    userId: number;
    targetId: number;

    status: Status;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        id = 0,
        moleculeId = 0,
        userId = 0,
        targetId = 0,
        status = Status.Pending,
        created_at = '',
        updated_at = '',
        deleted_at = ''
    ) {
        this.id = id;
        this.moleculeId = moleculeId;
        this.userId = userId;
        this.targetId = targetId;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}
