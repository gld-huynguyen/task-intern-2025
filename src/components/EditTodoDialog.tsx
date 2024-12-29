import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { ToDo } from "../models/ToDo";

const EditTodoDialog: React.FC<{
    isOpen: boolean;
    todo?: ToDo;
    onHide: () => void;
    onSave: (newTodo: string) => void;
}> = ({ isOpen, todo, onHide, onSave }) => {
    const [titleChange, setTitleChange] = React.useState(todo?.todo || "");
    const header = todo ? "Edit Todo " + todo.id : "Add Todo";

    return (
        <Dialog
            className="w-[50vw]"
            visible={isOpen}
            onHide={onHide}
            header={header}
        >
            <InputText
                className="w-full"
                value={titleChange}
                onChange={(e) => setTitleChange(e.target.value)}
            />
            <Button
                className="mt-4 ml-auto block"
                label="Save"
                onClick={() => {
                    onSave(titleChange);
                }}
            />
        </Dialog>
    );
};

export default EditTodoDialog;
