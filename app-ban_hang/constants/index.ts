export const apiOrigin = "http://192.168.235.53:3000/api";
// export const apiOrigin = "https://d12a-2401-d800-f31-1802-4df8-42d5-782b-9a93.ngrok-free.app/api";
export interface AnyElement {
    [key: string]: any
}

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
};