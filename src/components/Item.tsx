import React, { useEffect } from "react";
import { IconButton, Checkbox, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface IProps {
    text: string;
    checked: boolean;
}

export const Item: React.FC<IProps> = ({ text, checked }) => {
    useEffect(() => {}, [checked]);
    return (
        <ListItem>
            <div className="d-flex item">
                {!!checked ? (
                    <Checkbox
                        checked={(checked = true)}
                        className="checkbox"
                        checkedIcon={<CheckCircleIcon />}
                        icon={<RadioButtonUncheckedIcon />}
                    />
                ) : (
                    <Checkbox
                        checked={(checked = false)}
                        className="checkbox"
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />
                )}
                <Typography className="item-text">{text}</Typography>
                <div className="item-buttons d-flex">
                    <IconButton>
                        <EditIcon style={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton>
                        <DeleteOutlineIcon style={{ fontSize: 20 }} />
                    </IconButton>
                </div>
            </div>
        </ListItem>
    );
};
