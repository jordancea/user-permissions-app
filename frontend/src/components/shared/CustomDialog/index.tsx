import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDialogStore } from './dialogStore';

const CustomDialog: React.FC = () => {
    const { isOpen, content, title, dialogActions, size, closeDialog } = useDialogStore();

    return (
        <Dialog
            open={isOpen}
            onClose={closeDialog}
            aria-labelledby={title ? 'dialog-title' : undefined}
            maxWidth={size}
            fullWidth
            sx={{
                '& .MuiDialogContent-root': {
                    px: 3,
                    py: 2
                },
                '& .MuiDialogActions-root': {
                    px: 3,
                    py: 2
                }
            }}
        >
            {title && (
                <DialogTitle id="dialog-title" sx={{
                    m: 0,
                    p: 3,
                    pb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {typeof title === 'string' ? (
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                    ) : (
                        title
                    )}
                    <IconButton
                        aria-label="close"
                        onClick={closeDialog}
                        size="small"
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
            )}
            <DialogContent dividers={!!title}>
                {content}
            </DialogContent>
            {dialogActions && (
                <DialogActions>
                    {dialogActions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CustomDialog;