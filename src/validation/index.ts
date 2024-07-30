
/**
 * Checks if a given string is a valid price.
 *
 * @param {string} price - The price string to validate.
 * @returns {boolean} - True if the string is a valid price, otherwise false.
 */
function isPrice(price: string): boolean {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    return priceRegex.test(price);
}
/**
 * Checks if a given string is a valid URL.
 *
 * @param {string} url - The URL string to validate.
 * @returns {boolean} - True if the string is a valid URL, otherwise false.
 */
function isValidURL(url:string) {
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlRegex.test(url);
}

/**
 * Validates a product object.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The image URL of the product.
 * @param {string} product.price - The price of the product.
 * @returns {Object} error - An object containing validation error messages.
 * @returns {string} error.title - Error message for the title.
 * @returns {string} error.description - Error message for the description.
 * @returns {string} error.imageURL - Error message for the image URL.
 * @returns {string} error.price - Error message for the price.
 */
export const validationProduct=(prodcut:{title: string,
    description: string,
    imageURL: string,
    price: string})=>{
    const error:{title: string,description: string,imageURL: string,price: string}={title:"",description:"",imageURL:"",price:""};
    const title:string=prodcut.title.trim();
    const description: string=prodcut.description.trim();
    const imageURL: string=prodcut.imageURL.trim();
    const price: string=prodcut.price.trim();
    if(title.length<10|| title.length>90 ){
        error.title="must length title between 10 and 50";
    }
    if(description.length<50|| description.length>900 ){
        error.description="must length title description 50 and 900";
    }
    if(!isPrice(price) ||price.length==0 ){
        error.price="this "+price+"not number";
    }
    if(!isValidURL(imageURL) ||imageURL.length==0){
        error.imageURL="this not Url";
    }
    return error;
    
}