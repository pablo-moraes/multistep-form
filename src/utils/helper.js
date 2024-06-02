
/**
 * Return a formatted price according to text formatting: $ price/mo or $ price/yr.
 * @param {boolean} isMonthly receive a boolean state of billing type
 * @param {*} pricing can be a number or an object
 * @returns 
 */
export function formatted_price(isMonthly, pricing) {

    if (typeof pricing != 'object') {
        return isMonthly ? `$${pricing}/mo` : `$${pricing}/yr`
    }

    return isMonthly ? `$${pricing.price_monthly}/mo` : `$${pricing.price_yearly}/yr`
}