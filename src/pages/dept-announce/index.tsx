import { Paper, Container, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import AnnounceBox from '../../components/announce-box';
import DeptAnnounceBoxInput from '../../components/announcebox-input';
import CreatePostModal from '../../components/create-post-modal'; // Import the CreatePostModal component

const DeptAnnounce: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<{ title: string; body: string }[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAnnouncementCreate = (announcement: { title: string; body: string }) => {
    // Add the created announcement to the list of announcements
    setAnnouncements(prevAnnouncements => [...prevAnnouncements, announcement]);
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DeptAnnounceBoxInput onAnnouncementCreate={handleAnnouncementCreate} /> {/* Pass handleAnnouncementCreate to DeptAnnounceBoxInput */}
      <CreatePostModal open={isModalOpen} onClose={handleCloseModal} onAnnouncementCreate={handleAnnouncementCreate} /> {/* Pass modal props */}
      {/* Conditional rendering to display message when there are no announcements */}
      {announcements.length === 0 ? (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" align="center">
            There are no announcements yet :)
          </Typography>
        </Box>
      ) : (
        // Render AnnounceBox for each announcement
        announcements.map((announcement, index) => (
          <AnnounceBox key={index} title={announcement.title} body={announcement.body} />
        ))
      )}
    </Container>
  );
};

export default DeptAnnounce;
