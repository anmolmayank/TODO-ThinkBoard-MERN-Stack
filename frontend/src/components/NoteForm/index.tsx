import { ArrowBack, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  FormGroup,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/storeHooks';
import { fetchPostNote } from '../../store/thunks/fetchPostNote';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useEffect } from 'react';
import { editMode, setEditId } from '../../store/slices/NoteSlice';
import { fetchDeleteNote } from '../../store/thunks/fetchDeleteNote';
import { fetchUpdateNote } from '../../store/thunks/fetchUpdateNote';

export function NoteForm({
  isEditMode,
  editId,
}: {
  isEditMode: boolean;
  editId: string;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notes = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    // If isEditMode is true, the form should be pre-filled with the note data
    if (isEditMode && editId !== '') {
      // Get the node data based on editId from the store
      const noteToEdit =
        notes.data?.find((note) => note._id === editId) ?? null;
      if (noteToEdit) {
        (
          document.getElementById('outlined-controlled') as HTMLInputElement
        ).value = noteToEdit.title;
        (
          document.getElementById(
            'outlined-multiline-static'
          ) as HTMLInputElement
        ).value = noteToEdit.content;
      }
    }
  }, [isEditMode, editId, notes.data]);

  // Back button should navigate to previous page
  const handleBack = () => {
    dispatch(editMode(false));
    dispatch(setEditId(''));
    navigate('/');
  };
  // Delete button should delete the note and navigate to previous page
  const handleDelete = () => {
    if (isEditMode && editId !== '') {
      // Delete the note
      dispatch(fetchDeleteNote(editId));
    }
    navigate('/');
  };

  // and the submit button should say "Save Changes" instead of "Submit"
  const handleSubmit = () => {
    const requestPayload = {
      title: (
        document.getElementById('outlined-controlled') as HTMLInputElement
      ).value,
      content: (
        document.getElementById('outlined-multiline-static') as HTMLInputElement
      ).value,
    };
    if (isEditMode && editId !== '') {
      // Save changes to the note
      const updatedPayload = {
        ...requestPayload,
        id: editId,
      };
      dispatch(fetchUpdateNote(updatedPayload));
      dispatch(editMode(false));
      dispatch(setEditId(''));
      navigate('/HomePage');
    } else {
      // Create a new note
      dispatch(fetchPostNote(requestPayload));
      if (notes.loading === false && notes.error === null) {
        navigate('/HomePage');
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          margin: '24px auto',
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          color="info"
          onClick={() => handleBack()}
        >
          {' '}
          Back
        </Button>
        <Button
          variant="text"
          endIcon={<Delete />}
          color="error"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </Box>
      <Card sx={{ width: '80%', margin: '24px auto', padding: '16px' }}>
        <FormGroup sx={{ padding: '16px', gap: '16px' }}>
          <TextField
            required
            id="outlined-controlled"
            label="Title"
            placeholder="Enter Title"
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Content"
            multiline
            rows={4}
            placeholder="Enter Notes"
          />
        </FormGroup>
        <CardActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
          <Button variant="contained" onClick={() => handleSubmit()}>
            {isEditMode ? 'Save Changes' : 'Submit'}
            {notes.loading && '...'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
