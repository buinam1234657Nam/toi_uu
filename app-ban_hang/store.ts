import { create } from 'zustand';
import { IPaymentDetail, IUser } from './types';
import { ICart } from '../api_app-ban-hang/src/model/cart.model';
interface IAppStore {
    user_info: IUser
    cart_info: ICart[]
    access_token: string;
    refresh_token: string;
    listPayment: IPaymentDetail[],
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    setListPayment: (listPayment: IPaymentDetail[]) => void
    setUserInfo: (user: IUser) => void
    setCartInfo: (cart: ICart[]) => void
}
export const appStore = create<IAppStore>((set) => ({
    user_info: {} as IUser,
    cart_info: [] as ICart[],
    access_token: "",
    refresh_token: "",
    listPayment: [] as IPaymentDetail[],
    setAccessToken(token) {
        set({ access_token: token })
    },
    setRefreshToken(token) {
        set({ refresh_token: token })
    },
    setListPayment: (listPayment: IPaymentDetail[]) => set({ listPayment }),
    setUserInfo: (user_info: IUser) => set({ user_info }),
    setCartInfo: (cart_info: ICart[]) => set({ cart_info })
}))
