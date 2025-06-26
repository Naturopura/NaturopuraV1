import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';
import { Button } from '../ui/button';

interface ProductQrCodeProps {
  productId: string;
}

const ProductQrCode: React.FC<ProductQrCodeProps> = ({ productId }) => {
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 text-xs sm:text-sm bg-white hover:bg-gray-50"
        onClick={() => setShowQrCode(!showQrCode)}
        title="Scan QR code to open quotus.co.in"
      >
        {!showQrCode ? (
          <>
            <QrCode className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">QR Code</span>
          </>
        ) : (
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        )}
      </Button>

      {showQrCode && (
        <div className="absolute right-0 bottom-full mb-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="relative">
            <QRCodeSVG
              value={`https://quotus.co.in/product/${productId}`}
              size={120}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
            <p className="text-xs text-center mt-2 text-gray-600">
              Scan to view product
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductQrCode;
