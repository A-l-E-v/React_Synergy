export interface Task {
    id: string;
    title: string;
    subtitle?: string;
    authorId: string;
    assigneeIds: string[];
    duration: string;
    description: string;
    comments?: string;
    watchersIds?: string[];
}
