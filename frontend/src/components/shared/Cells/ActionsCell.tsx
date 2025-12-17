
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionsCellProps<T> {
    row: T;
    handleEditClick: (row: T) => void;
    handleDeleteClick: (row: T) => void;
    canEdit?: boolean;
    canDelete?: boolean;
}

export default function ActionsCell<T>({
    row,
    handleEditClick,
    handleDeleteClick,
    canEdit = true,
    canDelete = true,
}: ActionsCellProps<T>) {
    return (
        <>
            {canEdit && (
                <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditClick(row)} size="small">
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
            {canDelete && (
                <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteClick(row)} color="error" size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}