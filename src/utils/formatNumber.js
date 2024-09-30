export const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export class FormatCurrency {
    static VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}