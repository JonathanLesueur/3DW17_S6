export interface Recipe {
    _id?: string,
    group?: number,
    name: string,
    difficulty?: number,
    duration?: number,
    serving: number,
    deletedAt?: number,
    createdAt?: string,
    updatedAt?: string,
    type: string,
    url?: string,
    details?: {
        ingredients?: Array<Object>,
        instructions?: Array<Object>
    }
}