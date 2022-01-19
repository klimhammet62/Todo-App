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
    TOGGLE_MARK_ALL = "TOGGLE_MARK_ALL",
    TASK_REMOVE_ALL = "TASK_REMOVE_ALL",
    MARK_CLEAR = "MARK_CLEAR",
    SET_ACTIVE_WINDOW = "SET_ACTIVE_WINDOW",
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
    [Types.TOGGLE_MARK_ALL]: {
        toggleAllMarks: boolean;
    };
    [Types.MARK_CLEAR]: {
        checked: boolean;
    };
    [Types.TASK_REMOVE_ALL]: {
        checked: boolean;
    };
    [Types.SET_ACTIVE_WINDOW]: {
        activeWindow: number;
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
    items: [{ id: 0, text: "First Render", checked: false }],
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
            return { items: [...state.items, newItem] };
        }
        case Types.DELETE_TASK: {
            const filter: IState[] = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            return { items: [...filter] };
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
        case Types.TOGGLE_MARK_ALL: {
            const toggleAll: IState[] = state.items.map((item) => {
                if (!action.payload) {
                    return { ...item, checked: item.checked === true };
                } else {
                    return { ...item, checked: item.checked === false };
                }
            });
            return { items: [...toggleAll] };
        }
        case Types.TASK_REMOVE_ALL: {
            return { items: [] };
        }
        case Types.SET_ACTIVE_WINDOW: {
            const moveActiveWindow: IState[] = state.items.map((item) => {
                if (action.payload.activeWindow === 0) {
                    return { ...item };
                } else if (action.payload.activeWindow === 1) {
                    return { ...item };
                } else {
                    return { ...item };
                }
            });
            return { items: [...moveActiveWindow] };
        }
        default: {
            return state;
        }
    }
}

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [toggleAllMarks, setToggleAllMarks] = useState(false);
    const [activeWindow, setActiveWindow] = useState(0);

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
            type: Types.TOGGLE_MARK_ALL,
            payload: { toggleAllMarks: true },
        });
        setToggleAllMarks(!toggleAllMarks);
    }
    function handleTaskRemove() {
        dispatch({
            type: Types.TASK_REMOVE_ALL,
            payload: { checked: true },
        });
    }
    function switchActiveWindow() {
        dispatch({
            type: Types.SET_ACTIVE_WINDOW,
            payload: {
                activeWindow: 0,
            },
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
                    <Tab label="Все" onClick={() => switchActiveWindow()} />
                    <Tab
                        label="Активные"
                        onClick={() => switchActiveWindow()}
                    />
                    <Tab
                        label="Завершённые"
                        onClick={() => switchActiveWindow()}
                    />
                </Tabs>
                <Divider />
                <List>
                    {activeWindow === 0 &&
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
                    <Button onClick={handleTaskRemove}>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
};

export default App;
