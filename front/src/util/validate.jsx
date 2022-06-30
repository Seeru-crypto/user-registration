export const validateCustomerData = (userName, agreeToTerms, selectedSectors) => {
    if (!Object.entries((selectedSectors)).length) return false;
    else if (!agreeToTerms || !userName) return false
    return true
}