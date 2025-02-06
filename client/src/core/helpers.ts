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