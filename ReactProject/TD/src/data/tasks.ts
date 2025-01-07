import { Task } from '../types/Task';

const tasks: Task[] = [
    { id: 'T1', title: 'Задача 1', authorId: 'U1', assigneeIds: ['U2'], duration: '1 неделя', description: 'Описание задачи 1' },
    { id: 'T2', title: 'Задача 2', authorId: 'U2', assigneeIds: ['U1'], duration: '2 недели', description: 'Описание задачи 2' },
];

export default tasks;
