import { parseISO, format} from 'date-fns';

export function formatDate(dateString) {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'LLLL d, yyyy');
}