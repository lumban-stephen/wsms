import { Box, Typography, Button } from "@mui/material";

enum gender {
  Male = "male",
  Female = "female"
}

interface Applicant {
  id: number;
  name: string;
  course: string;
  age: number;
  gender: gender;
  contact: number;
  registrationDate: Date;
  status: string;
}

interface ApplicantListProps {
  applicants: Applicant[];
  handleViewApplicant: (applicant: Applicant) => void;
}

const ApplicantList: React.FC<ApplicantListProps> = ({ applicants, handleViewApplicant }) => {
    function getStatusColor(status: string): import("csstype").Property.Color | undefined {
        throw new Error("Function not implemented.");
    }

  // Destructuring props
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', borderBottom: '1px solid #818181', height: '10%' }}>
        {/* Header row for applicant details */}
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Name</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Course</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Age</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Gender</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Contact</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Registration Date</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Status</Typography>
        <Typography variant='h6' gutterBottom fontWeight='bold' style={{ flex: '1', textAlign: 'center' }}>Action</Typography>
      </Box>
      {applicants.length > 0 ? (
        <Box style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {applicants.map(applicant => (
            <Box key={applicant.id} sx={{ display: 'flex', width: '100%', flexDirection: 'row', borderBottom: '1px solid #818181', padding: '20px', alignItems: 'center' }}>
              {/* Applicant details */}
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.name}</Typography>
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.course}</Typography>
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.age}</Typography>
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.gender}</Typography>
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.contact}</Typography>
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center' }}>{applicant.registrationDate.toLocaleDateString()}</Typography>
              <Typography variant='h5' style={{ flex: '1', textAlign: 'center', color: getStatusColor(applicant.status) }}>{applicant.status}</Typography>
              <Button variant="outlined" style={{ flex: '0.8', textAlign: 'center', backgroundColor:'#0975bc', color:'white' }} onClick={() => handleViewApplicant(applicant)}>View</Button>
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
    </>
  );
};

export default ApplicantList;
