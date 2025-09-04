import { Box, CircularProgress, Grid } from '@mui/material';
import Navbar from '../components/NavBar';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchGetAllNotes } from '../store/thunks/fetchGetAllNotes';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { NoteCrad } from '../components/NoteCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const noteData = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(fetchGetAllNotes());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Grid container spacing={2} marginTop={2} rowGap={2} rowSpacing={2} columnGap={2} columnSpacing={2} minHeight={'50%'} minWidth={50}>
        {noteData.loading && <Box sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress/>
          </Box>}
        {!noteData.loading &&
          !noteData.error &&
          noteData?.data &&
          noteData.data?.map((note) => (
            <Grid key={note._id}>
              <NoteCrad
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                timeStamp={note.updatedAt ?? note.createdAt}
              />
            </Grid>
          ))}
        {noteData.error && <div>Error : {noteData.error}</div>}
      </Grid>
    </>
  );
}
