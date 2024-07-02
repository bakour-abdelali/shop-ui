/**
 * Truncates a string if it exceeds the specified maximum length, appending " ...." to indicate the truncation.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} [maxLen=50] - The maximum length of the text before truncation. Defaults to 50.
 * @returns {string} - The truncated text with " ...." appended if the length exceeds maxLen, otherwise the original text.
 */
export function textDoc(text:string,maxLin :number=50){
    if(text.length>=maxLin){
        return `${text.slice(0,maxLin)} ....`;
    }else{
        return text;
    }
}