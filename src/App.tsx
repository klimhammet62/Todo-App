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
    ADD_MARK_ALL = "ADD_MARK_ALL",
    MARK_CLEAR_ALL = "MARK_CLEAR_ALL",
    MARK_CLEAR = "MARK_CLEAR",
    DELETE_TASK = "DELETE_TASK",
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
    [Types.ADD_MARK_ALL]: {
        checked: boolean;
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
                id: last.id + 1,
                text: action.payload.text,
                checked: action.payload.checked,
                modal: action.payload.modal,
            };
            return {
                items: [...state.items, newItem],
            };
        }
        case Types.DELETE_TASK: {
            state.items.filter((item, index) => item !== undefined);
            return {
                items: [...state.items],
            };
        }
        case Types.ADD_MARK_ALL: {
            state.items.forEach((item) => (item.checked = true));
            return {
                items: [...state.items],
            };
        }
        case Types.MARK_CLEAR_ALL: {
            state.items.forEach((item) => (item.checked = false));
            return {
                items: [...state.items],
            };
        }
        default: {
            return state;
        }
    }
}

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
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
    function deleteTask() {
        dispatch({
            type: Types.DELETE_TASK,
            payload: {
                id: 2
            }
        });
    }
    function handleMark() {
        dispatch({
            type: Types.ADD_MARK_ALL,
            payload: { checked: true },
        });
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
                                deleteTask={deleteTask}
                                id={item.id}
                                key={item.id}
                                text={item.text}
                                checked={item.checked}
                            />
                        ))}
                </List>
                <Divider />
                <div className="check-buttons">
                    <Button onClick={handleMark}>Отметить всё</Button>
                    <Button onClick={handleMarkClear}>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
};

export default App;
