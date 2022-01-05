import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface IImports {
    addTask: () => void;
    inputValue: string;
    setInputValue: (inputValue: string) => void;
}
export const AddField: React.FC<IImports> = ({
    addTask,
    inputValue,
    setInputValue,
}) => {
    return (
        <div className="field">
            <Checkbox
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
            <Button onClick={addTask}>
                <AddIcon />
            </Button>
        </div>
    );
};
