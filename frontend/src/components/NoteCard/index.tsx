import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { formatDate } from '../../utils/helper';
import { Delete, Edit } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/storeHooks';
import { fetchDeleteNote } from '../../store/thunks/fetchDeleteNote';
import { editMode, setEditId } from '../../store/slices/NoteSlice';
import { useNavigate } from 'react-router';

export function NoteCrad({
  id,
  title,
  content,
  timeStamp,
}: {
  id: string;
  title: string;
  content: string;
  timeStamp: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handle Delete Note
  const handleDelete = () => {
    dispatch(fetchDeleteNote(id));
  };
  // Handle Edit Note
  const handleEdit = () => {
    dispatch(editMode(true));
    dispatch(setEditId(id))
    navigate("/create");
  };

  return (
    <Card
      key={id}
      variant="elevation"
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ flexGrow: 1, marginLeft: 1 }}
        >
          {formatDate(timeStamp)}
        </Typography>
        <ButtonGroup>
          <Button variant="text" startIcon={<Edit />} onClick={() => handleEdit()}/>
          <Button variant="text" startIcon={<Delete />} onClick={() => handleDelete()}/>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
