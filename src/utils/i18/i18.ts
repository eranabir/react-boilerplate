import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import heTranslation from './he.json';

const resources = {
    en: {
        translation: {}
    },
    he: {
        translation: heTranslation
    }
};
export const i18Init = async (): Promise<void> => {
    await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "he",
        // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });
}

