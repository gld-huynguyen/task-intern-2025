import { Button } from "primereact/button";
import React, { useState } from "react";
import { ToDo } from "../models/ToDo";
import { deleteTodo, editTodo } from "../services/todos";
import { useMutation, useQuery } from "@tanstack/react-query";
import { confirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import EditTodoDialog from "./EditTodoDialog";

const TodosActions: React.FC<{ todo: ToDo }> = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { refetch: refetchDelete } = useQuery({
        queryKey: ["deleteTodo", todo.id],
        queryFn: () => deleteTodo(todo.id),
        enabled: false,
    });

    const editMutation = useMutation({
        mutationFn: (newTodo: string) => {
            return editTodo(todo.id, { todo: newTodo });
        },
    });

    function acceptDelete() {
        refetchDelete();
    }

    function rejectDelete() {
        return;
    }

    function handleDelete() {
        confirmDialog({
            message: "Do you want to delete this todo?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: acceptDelete,
            reject: rejectDelete,
        });
    }

    function handleEdit(newTodo: string) {
        editMutation.mutate(newTodo);
        setIsEditing(false);
    }

    return (
        <div className="flex gap-2">
            <Button
                size="small"
                icon="pi pi-pen-to-square"
                onClick={() => setIsEditing(true)}
            />
            <Button
                size="small"
                icon="pi pi-trash"
                severity="danger"
                onClick={handleDelete}
            />
            <EditTodoDialog
                isOpen={isEditing}
                todo={todo}
                onHide={() => setIsEditing(false)}
                onSave={handleEdit}
            />
        </div>
    );
};

export default TodosActions;
