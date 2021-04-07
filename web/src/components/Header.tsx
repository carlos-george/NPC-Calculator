import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import '../styles/components/header.css';

export default function Header() {
    const history = useHistory();
    return (
        <div id="header-container">
            <div className="header-menus">
                <Link to="company-register">
                    Company
                </Link>
                <div className="separator"></div>
                <Link to="nps-calculator">
                    Calculator
                </Link>
            </div>
            <div className="header-user">
                <FiLogOut size={30} onClick={() => {
                    localStorage.clear();
                    history.push('/')
                }} />
            </div>
        </div>
    );
}