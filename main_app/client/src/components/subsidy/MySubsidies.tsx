import FarmerLayout from '../layouts/FarmerLayout';
import GovernmentSchemes from './GovtSchemes'; // Adjust the path if needed

const MySubsidies = () => {
  return (
    <FarmerLayout title="Government Schemes" subtitle="Explore the latest government subsidy schemes available for farmers">
      <div className="mb-6">
        <GovernmentSchemes />
      </div>
    </FarmerLayout>
  );
};

export default MySubsidies;
