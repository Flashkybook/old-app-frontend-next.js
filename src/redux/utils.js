
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