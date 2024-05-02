import React, { useState, useEffect } from 'react';
import { Paper, Container, Typography, Box } from '@mui/material';
import AnnounceBox from '../../components/announce-box';

interface Announcement {
  id: number; // Assuming your announcement table has an ID column
  announcement_title: string;
  message: string; // Renamed from body
}

const WsAnnounce: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:3000/api-announce/dept-announce');
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAnnouncementCreate = async (announcement: { title: string; message: string }) => {
    try {
      // 1. Get the access token from storage (replace with your storage mechanism)
      const token = localStorage.getItem('token'); // Assuming you store access token in localStorage

      if (!token) {
        console.error('No access token found. User is not authenticated.');
        return; // Handle the case where no token is present
      }

      const announcementUrl = `http://localhost:3000/api-announce/dept-announce/`;

      // 3. Create the request body with announcement data and potentially the user's ID
      const announcementData = {
        title: announcement.title,
        message: announcement.message,
      };

      setIsLoading(true);

      const response = await fetch(announcementUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(announcementData),
      });

      setIsLoading(false); // Set loading state back to false after response

      const data = await response.json();

      if (response.ok) {
        // Success
        console.log('Announcement created successfully:', data);
        // Update announcements state (if needed)

        // You can use a state variable or other mechanisms to display/hide loading indicator based on isLoading
      } else {
        console.error('Error creating announcement:', data);
        // Handle errors appropriately
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      setIsLoading(false); // Set loading state back to false in case of errors
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {announcements.length === 0 ? (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" align="center">
            "There are no announcements yet :)"
          </Typography>
        </Box>
      ) : (
        // Render AnnounceBox for each announcement
        announcements.map((announcement, index) => (
          <AnnounceBox key={announcement.id} title={announcement.announcement_title} message={announcement.message} />
        ))
      )}
    </Container>
  );
};

export default WsAnnounce;
