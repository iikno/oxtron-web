import React from 'react';
import { Col, FlexboxGrid, Row } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className='p-3 mt-auto'>
            <FlexboxGrid justify='space-between'>
                <FlexboxGridItem>
                <a href="https://iikno.com" rel='noreferrer' target={"_blank"}>Elaborado por iikno ®</a>
                </FlexboxGridItem>
                <FlexboxGridItem>
                <a href="https://iikno.com" rel='noreferrer' target={"_blank"}>OXTRON ®  {new Date().getFullYear()}</a>
                </FlexboxGridItem>
            </FlexboxGrid>
        </footer>
    );
};

export default Footer;