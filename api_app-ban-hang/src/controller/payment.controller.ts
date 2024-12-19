import { paymentService } from '../service/payment.service';

export const paymentController = {
    createPaymentUrl: async (req: any, res: any, next: any) => {
        try {
            const { amount, bankCode, orderDescription, orderType, language } = req.body;
            const paymentUrl = paymentService.createPaymentUrl(amount, bankCode, orderDescription, orderType, language);
            res.status(200).json({ paymentUrl });
        } catch (error) {
            next(error);
        }
    }
};