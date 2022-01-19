import React, { useState } from "react";
import { IconButton, Checkbox, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Modal } from "./Modal";

interface IProps {
    text: string;
    checked: boolean;
    id: number;
    onYes: (e: any) => void;
    toggleCheckbox: (id: number) => void;
}

export const Item: React.FC<IProps> = ({
    text,
    checked,
    id,
    onYes,
    toggleCheckbox,
}) => {
    const [modal, setModal] = useState(false);

    const addModal = () => {
        setModal(true);
    };
    const onCheckboxClick = () => {
        toggleCheckbox(id);
    };

    return (
        <ListItem>
            <div className="d-flex item">
                <Checkbox
                    checked={checked}
                    onChange={onCheckboxClick}
                    className="checkbox"
                    checkedIcon={<CheckCircleIcon />}
                    icon={<RadioButtonUncheckedIcon />}
                />

                <Typography className="item-text">{text}</Typography>
                <div className="item-buttons d-flex">
                    <IconButton>
                        <EditIcon style={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton>
                        <DeleteOutlineIcon
                            onClick={addModal}
                            style={{ fontSize: 20 }}
                        />
                    </IconButton>
                </div>
                {modal && (
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        onYes={onYes}
                        id={id}
                    />
                )}
            </div>
        </ListItem>
    );
};
