import { Box, Typography, Button, TableHead, TableRow, TableCell, TableContainer, Table, Paper, TableBody } from "@mui/material";
import { useState } from "react";
import ApplicantModal from "./applicant-modal"; // Import ApplicantModal component
import { Applicant } from "../utils/interfaces";

const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

interface ApplicantListProps {
  applicants: Applicant[];
  setApplicants: (applicants: Applicant[]) => void; // Function to update applicant state
  handleViewApplicant: (applicant: Applicant) => void;
}

const handleViewApplicant = (applicant: Applicant) => {
  setSelectedApplicant(applicant);
  setIsModalOpen(true);
};

const ApplicantList: React.FC<ApplicantListProps> = ({ applicants, setApplicants, handleViewApplicant }) => {
  const handleCloseModal = () => {
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };

  const handleApplicantUpdate = () => {
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
        <ApplicantModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          applicant={selectedApplicant}
          onApplicantUpdate={handleApplicantUpdate} // Pass callback for applicant update
        />
      )}
    </>
  );
};

export default ApplicantList;