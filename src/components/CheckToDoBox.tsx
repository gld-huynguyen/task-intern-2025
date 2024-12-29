import { Checkbox } from "primereact/checkbox";
import React from "react";

const CheckToDoBox: React.FC<{ isChecked: boolean }> = ({ isChecked }) => {
    const [checked, setChecked] = React.useState<boolean>(isChecked);

    function handleCheck(value?: boolean) {
        if (value) {
            setChecked(value);
        }
    }

    return (
        <Checkbox checked={checked} onChange={(e) => handleCheck(e.checked)} />
    );
};

export default CheckToDoBox;
