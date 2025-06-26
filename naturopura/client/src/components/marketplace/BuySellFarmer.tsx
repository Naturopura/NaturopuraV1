import FarmerLayout from "../layouts/FarmerLayout";
import BuySell from "./BuySell";

const BuySellFarmer = () => {
    return (
        <FarmerLayout title="Buy/Sell Farmer" subtitle="Manage your marketplace transactions">
            <BuySell />
        </FarmerLayout>
    );
};

export default BuySellFarmer;