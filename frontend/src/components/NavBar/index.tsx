import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import './navbar.scss';
import { enqueueSnackbar } from 'notistack';

const Navbar = () => {
  const navigate = useNavigate();

  // OnClick handler
  const handleAddNote = () => {
    // Logic to add a new note
    enqueueSnackbar('Redirecting to Create Note Page', { variant: 'info' });
    navigate('/create');
  };

  return (
    <header>
      <div className="nav-container">
        <Typography variant="h5" component="h5" className='nav-title'>
          Todo - ThinkBoard
        </Typography>
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
      </div>
    </header>
  );
};

export default Navbar;
