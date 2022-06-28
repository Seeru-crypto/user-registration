export const validateCustomerData = (name, agreeToTerms) => {
    return !(!agreeToTerms || name.length === 0);

}