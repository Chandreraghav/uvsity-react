import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { ACCOUNT_SETTINGS, SESSION } from '../../../../constants'
import { THEME_MODES, getMode } from '../../../../theme/ThemeProvider';

function SessionMenu({ onClose, isOpen, anchor }) {
    const bg = getMode() === THEME_MODES.DARK?'#111':'#fff'
    const handleClose = () => {
        onClose(null, true);
      };
    const handleMenuAction = (actionCode) => {
        if (!actionCode) {
            return;
        }

    };
    return (
        <Menu
            anchorEl={anchor}
            open={isOpen}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        color: "darkgrey",
                        background: bg,
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: bg,
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                            fontSize: "14",
                            color: "dargrey",
                        },
                    }
                }
            }}

            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            {SESSION.MENU.map((data) => (
                <MenuItem
                    className={' dark:hover:bg-gray-400 dark:hover:text-gray-800'}
                    onClick={(e) => handleMenuAction(data.code)}
                    sx={{ fontSize: "12px", color: "gray" }}
                    key={data.id}
                >
                    <ListItemIcon sx={{ fontSize: "12px", color: "gray" }}>
                        {data.icon}
                    </ListItemIcon>
                    {data.title}
                </MenuItem>
            ))}
        </Menu>
    )
}

export default SessionMenu