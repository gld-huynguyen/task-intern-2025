import { http } from "../lib/axios/http";
// const url = import.meta.env.TODO_URL;

export async function getTodos(limit?: number, skip?: number) {
    const l = limit || 10;
    const s = skip || 0;
    try {
        const response = await http.get(`?limit=${l}&skip=${s}`);
        return response;
    } catch (error) {
        return error;
    }
}

export async function deleteTodo(id: number) {
    try {
        const response = await http.delete(`/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export async function addTodo(todo: {
    todo: string;
    completed: false;
    userId: 1;
}) {
    try {
        const response = await http.post(`/add`, todo);
        return response;
    } catch (error) {
        return error;
    }
}

export async function editTodo(
    id: number,
    todo: {
        todo?: string;
        completed?: boolean;
    }
) {
    try {
        const response = await http.put(`/${id}`, todo);
        return response;
    } catch (error) {
        return error;
    }
}
