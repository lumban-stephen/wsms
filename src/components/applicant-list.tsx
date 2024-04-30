import { Box, Typography, Button, TableHead, TableRow, TableCell, TableContainer, Table, Paper, TableBody } from "@mui/material";
import { useState } from "react";
import ApplicantModal from "./applicant-modal";
import { Applicant } from "../utils/interfaces";

interface ApplicantListProps {
  applicants: Applicant[];
  handleViewApplicant: (applicant: Applicant) => void; // Function to handle view applicant action
}

const ApplicantList: React.FC<ApplicantListProps> = ({ applicants }) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {applicants.length > 0 ? (
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.applicant_id}>
                  <TableCell>{applicant.full_name}</TableCell>
                  <TableCell>{applicant.course}</TableCell>
                  <TableCell>{applicant.age}</TableCell>
                  <TableCell>{applicant.gender}</TableCell>
                  <TableCell>{applicant.contact}</TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>{applicant.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ backgroundColor: "#0975bc", color: "white" }}
                      onClick={() => handleViewApplicant(applicant)}
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
                  No Applicants Found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
      {selectedApplicant && (
        <ApplicantModal isOpen={isModalOpen} onClose={handleCloseModal} applicant={selectedApplicant} />
      )}
    </>
  );
};

export default ApplicantList;
