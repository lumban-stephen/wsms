import { Box, Typography, Button } from "@mui/material";
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

  function getStatusColor(status: string): import("csstype").Property.Color | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', borderBottom: '1px solid #818181', height: '10%' }}>
        {/* Header row for applicant details */}
        {/* ... */}
      </Box>
      {applicants.length > 0 ? (
        <Box style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {applicants.map(applicant => (
            <Box key={applicant.id} sx={{ display: 'flex', width: '100%', flexDirection: 'row', borderBottom: '1px solid #818181', padding: '20px', alignItems: 'center' }}>
              {/* Applicant details */}
              {/* ... */}
              <Button variant="outlined" style={{ flex: '0.8', textAlign: 'center', backgroundColor: '#0975bc', color: 'white' }} onClick={() => handleViewApplicant(applicant)}>
                View
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Box style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' style={{ textAlign: 'center' }}>
            No Applicants Found!
          </Typography>
        </Box>
      )}
      {selectedApplicant && (
        <ApplicantModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          applicant={selectedApplicant}
        />
      )}
    </>
  );
};

export default ApplicantList;