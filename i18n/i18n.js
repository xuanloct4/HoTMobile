import I18n from 'react-native-i18n';

import en from './locales/en';
import vi from './locales/vi';

I18n.translations = {
    en,
    vi
};


I18n.fallbacks = true;

export default I18n;
