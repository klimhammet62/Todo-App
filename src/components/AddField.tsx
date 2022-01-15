import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState} from "react";

export function AddField({ addTask }: any){
    const [inputValue, setInputValue] = useState<string | undefined>("");
    const [checked, setChecked] = useState<boolean | undefined>(false);
    const onClickAdd = () => {
        addTask(inputValue, checked);
        setInputValue("");
        setChecked(false);
    };
    return (
        <div className="field">
            <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="checkbox"
                checkedIcon={<CheckCircleIcon />}
                icon={<RadioButtonUncheckedIcon />}
            />
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите текст задачи..."
                variant="standard"
                fullWidth
            />
            <Button onClick={onClickAdd}>
                <AddIcon />
            </Button>
        </div>
    );
};
