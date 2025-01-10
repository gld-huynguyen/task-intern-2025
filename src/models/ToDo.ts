type ToDoResponse = {
    todos: ToDo[];
    total: number;
    skip: number;
    limit: number;
};

interface ToDo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export type { ToDo, ToDoResponse };
