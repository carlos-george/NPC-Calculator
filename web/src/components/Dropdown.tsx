import React, { useState } from 'react';

import '../styles/components/drop-down.css';

interface DropdownProps {
    title: React.ReactNode;
    item: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, item }) => {

    const [dropActive, setDropActive] = useState('');

    function toggleDropMenu() {

        setDropActive(dropActive === '' ? 'active' : '');
    }

    return (
        <>
            <button className={`dropmenu-button`} onClick={toggleDropMenu}>
                {title}
            </button>
            <div className={`dropmenu-items-container ${dropActive}`}>
                {item}
            </div>
        </>
    );
}

export default Dropdown;