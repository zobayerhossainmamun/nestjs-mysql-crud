import * as moment from 'moment';

/**
 * Format date from Date
 * @param {string} dateNum 
 * @param {boolean} isDue 
 * @returns {string}
 */
export const formatDate = (dateNum: string | number, isDue = false): string => {
    if (isDue) {
        return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
    } else {
        return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
    }
};