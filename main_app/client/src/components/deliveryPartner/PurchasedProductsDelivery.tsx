import DeliveryPartnerLayout from './DeliveryPartnerLayout'
import PurchasedProductsList from '../marketplace/PurchasedProductsList'

const PurchasedProductsDelivery = () => {
  return (
    <DeliveryPartnerLayout>
      <PurchasedProductsList userRole="delivery_partner" />
    </DeliveryPartnerLayout>
  )
}

export default PurchasedProductsDelivery
