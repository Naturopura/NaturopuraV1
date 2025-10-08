"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server').default || require('../server'); // Adjust import for CommonJS
describe('Payment Service API', () => {
    it('should process a crypto purchase successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const purchaseData = {
            productId: 'test-product-1',
            amount: '0.1',
            txHash: '0x1234567890abcdef',
            paymentMethod: 'crypto',
            address: '123 Test Street',
            pincode: 12345,
            shippingAddress: {
                name: 'John Doe',
                phone: '1234567890',
                street: '123 Test Street',
                city: 'Test City',
                state: 'Test State',
                pincode: '12345',
            },
        };
        const res = yield request(app)
            .post('/api/payment/purchase')
            .send(purchaseData)
            .set('Authorization', 'Bearer test-token'); // Adjust auth as needed
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'Purchase processed successfully');
        expect(res.body.data).to.have.property('productId', purchaseData.productId);
    }));
    it('should fail when product is not available', () => __awaiter(void 0, void 0, void 0, function* () {
        const purchaseData = {
            productId: 'unavailable-product',
            amount: '0.1',
            txHash: '0xabcdef1234567890',
            paymentMethod: 'crypto',
            address: '123 Test Street',
            pincode: 12345,
            shippingAddress: {
                name: 'John Doe',
                phone: '1234567890',
                street: '123 Test Street',
                city: 'Test City',
                state: 'Test State',
                pincode: '12345',
            },
        };
        const res = yield request(app)
            .post('/api/payment/purchase')
            .send(purchaseData)
            .set('Authorization', 'Bearer test-token'); // Adjust auth as needed
        expect(res.status).to.not.equal(200);
        expect(res.body).to.have.property('success', false);
    }));
});
