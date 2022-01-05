import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import "./index.css";
import React, { useReducer, useState, useEffect } from "react";

interface IState {
    id: number;
    text: string;
    checked: boolean;
}
/* interface ISwitch {
    completed: boolean;
} */
type ActionTypes = {
    [Types.ADD_TASK]: {
        id: number;
        text: string;
        checked: boolean;
    };
    [Types.MARK_ALL]: {
        checked: boolean;
    };
    [Types.MARK_CLEAR]: {
        checked: boolean;
    };
};

enum Types {
    ADD_TASK = "ADD_TASK",
    MARK_ALL = "MARK_ALL",
    MARK_CLEAR = "MARK_CLEAR",
}
type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? { type: Key; inputValue: string | undefined }
        : { type: Key; item: M[Key] };
};

type TodoActions = ActionMap<ActionTypes>[keyof ActionMap<ActionTypes>];

type TodoState = {
    items: IState[];
};
const initialState: TodoState = {
    items: [{ id: 0, text: "inputValue", checked: false }],
};

function reducer(state: TodoState, action: TodoActions): TodoState {
    switch (action.type) {
        case Types.ADD_TASK: {
            const last = state.items[state.items.length - 1];
            console.log(action.item.text);

            const newItem = {
                id: last.id + 1,
                text: action.item.text,
                checked: action.item.checked,
            };
            return {
                items: [...state.items, newItem],
            };
        }
        case Types.MARK_ALL: {
            return {
                items: [...state.items],
            };
        }
        default: {
            throw new Error("Action not recognized");
        }
    }
}

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = useState("");
    const [checked, setChecked] = useState(false);

    function addTask() {
        dispatch({
            type: Types.ADD_TASK,
            item: { id: 1, text: inputValue, checked: checked },
        });
    }

    function handleMark() {
        dispatch({
            type: Types.MARK_ALL,
            item: { checked: true },
        });
        state.items.forEach((item) => (item.checked = true));
        setChecked(true);
    }
    useEffect(() => {
        console.log("CHECKED ИЗМЕНЕН");
    }, [checked]);
    function handleClear() {}
    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField
                    addTask={addTask}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <Divider />
                <Tabs value={0}>
                    <Tab label="Все" />
                    <Tab label="Активные" />
                    <Tab label="Завершённые" />
                </Tabs>
                <Divider />
                <List>
                    {inputValue &&
                        state.items.map((item) => (
                            <Item
                                key={item.id}
                                text={item.text}
                                checked={item.checked}
                            />
                        ))}
                </List>
                <Divider />
                <div className="check-buttons">
                    <Button onClick={handleMark}>Отметить всё</Button>
                    <Button onClick={handleClear}>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
};

export default App;
