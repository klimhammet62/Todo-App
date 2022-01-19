import React, { useReducer, useState } from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import "./index.css";

interface IState {
    id: number;
    text: string;
    checked: boolean;
}

enum Types {
    ADD_TASK = "ADD_TASK",
    DELETE_TASK = "DELETE_TASK",
    TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX",
    ADD_MARK_ALL = "ADD_MARK_ALL",
    MARK_CLEAR_ALL = "MARK_CLEAR_ALL",
    MARK_CLEAR = "MARK_CLEAR",
}
type ActionTypes = {
    [Types.ADD_TASK]: {
        id: number;
        text: string;
        checked: boolean;
        modal: boolean;
    };
    [Types.DELETE_TASK]: {
        id: number;
    };
    [Types.TOGGLE_CHECKBOX]: {
        id: number;
    };
    [Types.ADD_MARK_ALL]: {
        toggleAllMarks: boolean;
    };
    [Types.MARK_CLEAR]: {
        checked: boolean;
    };
    [Types.MARK_CLEAR_ALL]: {
        checked: boolean;
    };
};

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? { type: Key; inputValue: string | undefined }
        : { type: Key; payload: M[Key] };
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
            const newItem = {
                id: last ? last.id + 1 : 1,
                text: action.payload.text,
                checked: action.payload.checked,
                modal: action.payload.modal,
            };

            return {
                items: [...state.items, newItem],
            };
        }
        case Types.DELETE_TASK: {
            const filter: IState[] = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            return {
                items: [...filter],
            };
        }
        case Types.TOGGLE_CHECKBOX: {
            const toggleAlone: IState[] = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, checked: !item.checked };
                }
                return item;
            });
            return { items: [...toggleAlone] };
        }
        case Types.ADD_MARK_ALL: {
            const toggleAll: IState[] = state.items.map((item) => {
                if (!action.payload) {
                    return { ...item, checked: item.checked === true };
                } else {
                    return { ...item, checked: item.checked === false };
                }
            });
            return { items: [...toggleAll] };
        }
        case Types.MARK_CLEAR_ALL: {
            return [];
        }
        default: {
            return state;
        }
    }
}

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [toggleAllMarks, setToggleAllMarks] = useState(false);
    console.log(state.items[0].checked);

    function addTask(text: string, checked: boolean, modal: boolean) {
        dispatch({
            type: Types.ADD_TASK,
            payload: {
                id: 2,
                text,
                checked,
                modal,
            },
        });
    }
    function toggleCheckbox(id: number) {
        dispatch({
            type: Types.TOGGLE_CHECKBOX,
            payload: {
                id,
            },
        });
    }
    function onYes(id: number) {
        dispatch({
            type: Types.DELETE_TASK,
            payload: {
                id,
            },
        });
    }
    function toggleMark() {
        dispatch({
            type: Types.ADD_MARK_ALL,
            payload: { toggleAllMarks: true || false },
        });
        setToggleAllMarks(!toggleAllMarks);
    }

    function handleMarkClear() {
        dispatch({
            type: Types.MARK_CLEAR_ALL,
            payload: { checked: true },
        });
    }
    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField addTask={addTask} />
                <Divider />
                <Tabs value={0}>
                    <Tab label="Все" />
                    <Tab label="Активные" />
                    <Tab label="Завершённые" />
                </Tabs>
                <Divider />
                <List>
                    {state &&
                        state.items.map((item) => (
                            <Item
                                onYes={onYes}
                                id={item.id}
                                key={item.id}
                                text={item.text}
                                checked={item.checked}
                                toggleCheckbox={() => toggleCheckbox(item.id)}
                            />
                        ))}
                </List>
                <Divider />
                <div className="check-buttons">
                    <Button onClick={() => toggleMark()}>
                        {!toggleAllMarks ? "Отметить всё" : "Снять отметки"}
                    </Button>
                    <Button onClick={handleMarkClear}>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
};

export default App;
