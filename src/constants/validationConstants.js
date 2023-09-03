export const characterCheck = /^[a-zA-Z]*$/;
export const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const mobileNoCheck = /^\d{10}$/;
export const amountCheck = /^\d+(\.\d{1,2})?$/;
export const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const characterCheckWithSpace = /^[a-zA-Z ]*$/;