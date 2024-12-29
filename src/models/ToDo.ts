type ToDo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

type ToDoResponse = {
    todos: ToDo[];
    total: number;
    skip: number;
    limit: number;
};

export type { ToDo, ToDoResponse };
