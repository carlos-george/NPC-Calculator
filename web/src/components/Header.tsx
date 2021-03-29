import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/header.css';

export default function Header() {
    return (
        <div id="header-container">
            <Link to="company-register">
                Company
            </Link>
            <div className="separator"></div>
            <Link to="/">
                Calculator
            </Link>
        </div>
    );
}