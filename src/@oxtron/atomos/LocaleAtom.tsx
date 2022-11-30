import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import enUS from 'rsuite/locales/en_US';
import { LOCALES } from '../i18n/Locales';

const { persistAtom } = recoilPersist()
export const LocaleAtom = atom<LocaleInterface>({
    key: "Locale",
    default: {
        localeIntl: LOCALES.ENGLISH,
        localeRSuite: enUS
    },
    effects_UNSTABLE: [persistAtom],
})

export interface LocaleInterface {
    localeIntl:string,
    localeRSuite:any
}