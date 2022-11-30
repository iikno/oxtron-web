import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()
export const MenuAtom = atom({
    key: "Menu",
    default: {
        isOpen:true
    },
    effects_UNSTABLE: [persistAtom],
})