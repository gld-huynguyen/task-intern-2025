import { Button } from "primereact/button";
import EditTodoDialog from "./EditTodoDialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "../services/todos";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { todoActions } from "../lib/redux-toolkit/todoSlice";

const AddTodos = () => {
    const dispatch = useAppDispatch();
    const [isAdding, setIsAdding] = useState(false);

    const addMutation = useMutation({
        mutationFn: (newTodo: string) => {
            return addTodo({ todo: newTodo, completed: false, userId: 1 });
        },
    });

    function handleAdd(newTodo: string) {
        addMutation.mutate(newTodo);
        const todo = {
            id: 0,
            todo: newTodo,
            completed: false,
            userId: 1,
        };
        dispatch(todoActions.addTodo(todo));
        setIsAdding(false);
    }

    return (
        <div className="mx-auto">
            <Button
                label="Add Todo"
                icon="pi pi-plus"
                onClick={() => setIsAdding(true)}
            />
            <EditTodoDialog
                isOpen={isAdding}
                onHide={() => setIsAdding(false)}
                onSave={handleAdd}
            />
        </div>
    );
};

export default AddTodos;
