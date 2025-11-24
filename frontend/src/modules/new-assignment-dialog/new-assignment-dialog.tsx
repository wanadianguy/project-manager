import { useState } from 'react';
import type { NewAssignmentDialogProps } from './new-assignment-dialog.types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';

export const NewAssgnmentDialog = (props: NewAssignmentDialogProps) => {
    const [taskId, setTaskId] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:3001/assignments', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taskId: taskId,
                userId: props.userId,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.error(error);
                return;
            });

        setTaskId('');
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Phase</DialogTitle>
            <DialogContent>
                <Select labelId="task-id" id="task" label="Task" onChange={(e) => setTaskId(e.target.value as string)}>
                    {props.tasks.map((task) => (
                        <MenuItem value={task.id}>{task.title}</MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
