import React from "react";
import { Button } from "@mui/material";

export const Modal = ({ modal, setModal, onYes, id }: any) => {
    const onClickCancel = () => {
        setModal(false);
    };
    const onClickDelete = (id: number) => {
        onYes(id);
        setModal(false);
    };
    return (
        <div className="modal-window">
            <div className="modal-table">
                <h3 className="modal-h1">Вы точно хотите удалить?</h3>
                <div className="modal-button">
                    <Button
                        size="small"
                        onClick={() => onClickDelete(id)}
                        variant="outlined"
                        color="error"
                    >
                        YES
                    </Button>
                    <Button
                        size="small"
                        onClick={onClickCancel}
                        variant="outlined"
                        color="error"
                    >
                        NO
                    </Button>
                </div>
            </div>
        </div>
    );
};
