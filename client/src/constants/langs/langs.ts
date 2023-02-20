import { LANG } from '@/types/language';
import ENGLISH from './english';
import RUSSIAN from './russian';

const LANGUAGES = {
    [LANG.en]: ENGLISH,
    [LANG.ru]: RUSSIAN,
};

export default LANGUAGES;
