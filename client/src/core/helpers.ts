export const formatDate = (dateInput: Date | string): string => {
    const date = new Date(dateInput);
    
    if (isNaN(date.getTime())) return '';
    
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
}

export const getAssetPath = (path: string) => import.meta.env.VITE_SERVER + (path?.startsWith('/') ? path : ('/' + path));

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const generateKey = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

export const calcFullCost = (sum: number) => (Math.ceil((sum / 2 + (sum / 2 * 1.1)) / 50) * 50)