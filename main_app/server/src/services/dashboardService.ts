import * as loanDao from '../dao/loanDao';
import * as userDao from '../dao/userDao';
import * as productDao from '../dao/productDao';

export const fetchDashboardStats = async () => {
  const totalFarmers = await userDao.findAllFarmers();

  const [totalLoans, loanStats] = await Promise.all([
    loanDao.countLoansByStatus(''),
    loanDao.findLoansAggregate()
  ]);

  const totalProducts = await productDao.findAllProducts();

  return {
    totalFarmers: totalFarmers.length,
    totalLoans,
    totalLoanAmount: loanStats[0]?.totalAmount || 0,
    totalProducts: totalProducts.length,
    pendingLoans: loanStats[0]?.pending || 0,
    approvedLoans: loanStats[0]?.approved || 0,
    rejectedLoans: loanStats[0]?.rejected || 0
  };
};
