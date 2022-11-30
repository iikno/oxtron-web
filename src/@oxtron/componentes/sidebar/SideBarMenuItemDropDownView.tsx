import { Dropdown, IconButton, Button } from "rsuite"
import { LocaleAtom } from '../../atomos/LocaleAtom';
import { LOCALES } from '../../i18n/Locales';
import { enUS } from 'rsuite/esm/locales';
import { esES } from 'rsuite/esm/locales';
import { useSetRecoilState } from 'recoil';
import { HiLanguage } from "react-icons/hi2";

import './SideBarMenuItemView.scss'

const renderIconButton = (props:any, ref:any) => {
    return (
      <IconButton {...props} ref={ref} icon={<HiLanguage />} appearance="subtle" size="lg" block/>
    );
};

export const SideBarMenuItemDropDownView = () => {
    const setLenguaje = useSetRecoilState(LocaleAtom);

    return <Dropdown renderToggle={renderIconButton} placement="topStart" className="SideBarMenuItemView mb-3 mt-auto">
        <Dropdown.Item onClick={() => {
            setLenguaje({
                localeIntl: LOCALES.ENGLISH,
                localeRSuite: enUS
            })
        }}>
            english
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {
            setLenguaje({
                localeIntl: LOCALES.ESPAÑOL,
                localeRSuite: esES
            })
        }}>
            español
        </Dropdown.Item>
    </Dropdown>
}