import { Box, Typography, Button, TableHead, TableRow, TableCell, TableContainer, Table, Paper, TableBody } from "@mui/material";
import { useState } from "react";
import ApplicantModal from "./applicant-modal";
import { Applicant, WS } from "../utils/interfaces";

interface WsListProps {
  scholars: WS[];
  setScholars: (scholar: WS[]) => void;
  handleViewScholar: (applicant: WS) => void;
}

const WsList: React.FC<WsListProps> = ({ scholars, setScholars, handleViewScholar }) => {
  const [selectedScholar, setSelectedScholar] = useState<WS | null>(null);
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
              <TableCell>Contact</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: 400, overflowY: 'auto' }}>  {/* Added styles for scrollability */}
            {scholars.length > 0 ? (
              <>
                {scholars.map((scholar) => (
                  <TableRow key={scholar.applicant_id}>
                    <TableCell>{scholar.full_name}</TableCell>
                    <TableCell>{scholar.course}</TableCell>
                    <TableCell>{scholar.contact}</TableCell>
                    <TableCell>{scholar.department_name}</TableCell>
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
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="h5" style={{ textAlign: 'center' }}>
                    No Working Scholar Found!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
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
