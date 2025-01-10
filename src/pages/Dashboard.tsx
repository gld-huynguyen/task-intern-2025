import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTodos } from "../services/todos";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import TodosActions from "../components/TodosActions";
import AddTodos from "../components/AddTodos";
import { ToDo } from "../models/ToDo";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import CheckToDoBox from "../components/CheckToDoBox";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { todoActions } from "../lib/redux-toolkit/todoSlice";

const Dashboard = () => {
    const todoSlice = useAppSelector((state) => state.todo);
    const dispatch = useAppDispatch();
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);

    const {
        isLoading,
        data,
        refetch: refetchTodos,
        isSuccess,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: () => getTodos(limit, skip),
        enabled: true,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        refetchTodos();
    }, [limit, skip, refetchTodos]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(todoActions.setTodo(data.data.todos));
        }
    }, [isSuccess, data, dispatch]);

    function onPageChange(event: {
        first: number;
        rows: number;
        page: number;
    }) {
        setLimit(event.rows);
        setSkip(event.rows * event.page);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[80%] p-6 flex flex-col mx-auto gap-8">
            <h1 className="mt-4 text-6xl font-bold text-center">ToDo List</h1>
            <AddTodos />
            <ConfirmDialog />
            <div className="flex-1 flex-grow-0">
                <DataTable value={todoSlice} size="small">
                    <Column field={"id"} header="ID"></Column>
                    <Column field="todo" header="Title"></Column>
                    <Column
                        field="completed"
                        header="Completed"
                        body={(rowData: ToDo) => (
                            <CheckToDoBox isChecked={rowData.completed} />
                        )}
                    ></Column>
                    <Column
                        field=""
                        header={"Actions"}
                        body={(rowData: ToDo) => (
                            <TodosActions todo={rowData} />
                        )}
                    ></Column>
                </DataTable>
                <Paginator
                    first={skip}
                    rows={limit}
                    totalRecords={data?.data.total}
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default Dashboard;
