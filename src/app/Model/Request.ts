import { Status } from "./status.enum";

export class Request {
    id: string;

    moleculeId: string;
    userId: string;
    targetId: string;

    status: Status;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    constructor(
        id = '',
        moleculeId = '',
        userId = '',
        targetId = '',
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
