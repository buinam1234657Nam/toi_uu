import { create } from 'zustand';
import { IPaymentDetail, IUser } from './types';
import { ICart } from '../api_app-ban-hang/src/model/cart.model';
interface IAppStore {
    user_info: IUser
    cart_info: ICart[]
    listPayment: IPaymentDetail[],
    setListPayment: (listPayment: IPaymentDetail[]) => void
    setUserInfo: (user: IUser) => void
    setCartInfo: (cart: ICart[]) => void
}
export const appStore = create<IAppStore>((set) => ({
    user_info: {} as IUser,
    cart_info: [] as ICart[],
    listPayment: [] as IPaymentDetail[],
    setListPayment: (listPayment: IPaymentDetail[]) => set({ listPayment }),
    setUserInfo: (user_info: IUser) => set({ user_info }),
    setCartInfo: (cart_info: ICart[]) => set({ cart_info })
}))
