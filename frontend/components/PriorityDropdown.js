import PriorityLabels from "./PriorityLabels";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "@mui/material/Button";
import React from "react";

const PriorityDropdown = ({ priority = "low", handleChange = () => {} }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                    textTransform: 'none'
                }}
            >
                <PriorityLabels priority={priority} />
                <KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <PriorityLabels priority="low" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <PriorityLabels priority="medium" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <PriorityLabels priority="high" />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default PriorityDropdown;