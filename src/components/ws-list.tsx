import { Box, Typography, Button, TableHead, TableRow, TableCell, TableContainer, Table, Paper, TableBody } from "@mui/material";
import { useState } from "react";
import ApplicantModal from "./applicant-modal";
import { Applicant } from "../utils/interfaces";

interface WsListProps {
  scholars: Applicant[];
  setScholars: (scholar: Applicant[]) => void;
  handleViewScholar: (applicant: Applicant) => void;
}

const WsList: React.FC<WsListProps> = ({ scholars, setScholars, handleViewScholar }) => {
  const [selectedScholar, setSelectedScholar] = useState<Applicant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setSelectedScholar(null);
    setIsModalOpen(false);
  };

  const handleApplicantUpdate = () => {
    // Implement applicant update logic here
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {scholars.length > 0 ? (
            <TableBody>
              {scholars.map((scholar) => (
                <TableRow key={scholar.applicant_id}>
                  <TableCell>{scholar.full_name}</TableCell>
                  <TableCell>{scholar.course}</TableCell>
                  <TableCell>{scholar.dept}</TableCell>
                  <TableCell>{scholar.contact}</TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>{scholar.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ backgroundColor: "#0975bc", color: "white" }}
                      onClick={() => handleViewScholar(scholar)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  No Working Scholar Found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
      {selectedScholar && (
        <ApplicantModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          applicant={selectedScholar}
          onApplicantUpdate={handleApplicantUpdate}
        />
      )}
    </>
  );
};

export default WsList;