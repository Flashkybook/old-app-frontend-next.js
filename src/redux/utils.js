
/**
 * 
 * @param {to random} array 
 * @returns random order array
 */
export const shuffledArr = array => array.sort(() => 0.5 - Math.random());

/**
 * 
 * @param {word1} a 
 * @param {word2} b 
 * @returns word with less repetitionss
 */
export function compare_repetitions(a, b) {
    if (a.repetitions < b.repetitions) {
        return -1;
    }
    if (a.repetitions > b.repetitions) {
        return 1;
    }
    return 0;
}

/**
 * 
 * @param {cokiename} name 
 * @returns get cookies in frontend
 */
export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}