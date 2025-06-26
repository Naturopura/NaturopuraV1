import AdminLayout from '../layouts/AdminLayout'
import PurchasedProductsList from '../marketplace/PurchasedProductsList'

const AdminPurchasedProductList = () => {
  return (
    <AdminLayout title='Purchased Products' subtitle='Purchased Products'>
      <PurchasedProductsList userRole="admin" />
    </AdminLayout>
  )
}

export default AdminPurchasedProductList
