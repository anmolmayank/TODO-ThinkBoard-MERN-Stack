import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import './navbar.scss';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch } from '../../hooks/storeHooks';
import { fetchLogout } from '../../store/thunks/fetchAuthOps';
import { setLogout } from '../../store/slices/AuthSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // OnClick handler
  const handleAddNote = () => {
    // Logic to add a new note
    enqueueSnackbar('Redirecting to Create Note Page', { variant: 'info' });
    navigate('/create');
  };

  // Logout
const handleLogout = () => {
  dispatch(fetchLogout()).unwrap();
  dispatch(setLogout())
  navigate("/login");
}
  return (
    <header>
      <div className="nav-container">
        <Typography variant="h5" component="h5" className="nav-title">
          Todo - ThinkBoard
        </Typography>
        <Box gap={1} display={'flex'}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => handleAddNote()}
            className="nav-butoon"
            color="info"
            size="medium"
          >
            {' '}
            Add New Note
          </Button>
          <Button type="button" variant="contained" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Box>
      </div>
    </header>
  );
};

export default Navbar;
