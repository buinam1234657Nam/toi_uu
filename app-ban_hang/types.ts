
export interface IUser {
    _id: string;
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    avatar: string;
    status: number;
    phone: string;
    address: string;
}
export interface IUpdateAccount {
    _id: string;
    email: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    avatar?: string | null;
    phone?: string;
    address?: string;
    newPassWord?: string;
}
export interface IProduct {
    _id: string,
    name: string;
    real_price: number;
    sale_price?: number;
    code: string;
    quantity_imported: number;
    quantity_sales: number;
    describe: string;
    type: number;
    material: string;
    origin: string;
    size: number[];
    color: string[];
    preview: {
        image: string;
        color: string;
        bgColor: string;
        _id: string;
    }[];
    cs1: {
        cs1_quantity_imported: number;
        cs1_quantity_sales: number;
    };
    cs2: {
        cs2_quantity_imported: number;
        cs2_quantity_sales: number;
    };
    cs3: {
        cs3_quantity_imported: number;
        cs3_quantity_sales: number;
    };
    createdAt: string;
    updatedAt: string;
}
export interface IUser {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    avatar: string;
    status: number;
    phone: string;
    address: string;
}
export interface IPaymentDetail {
    product_id: string;
    quantity: number;
    _id: string;
    detail: {
        preview: {
            image: string;
            color: string;
            bgColor: string;
        };
        size: number;
        real_price: number;
        sale_price: number;
        quantity_import: number;
        quantity_sale: number;
        name: string;
    };
}
