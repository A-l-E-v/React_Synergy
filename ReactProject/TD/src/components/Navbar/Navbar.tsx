import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.scss';

const CustomNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Navbar expand={false} className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <Navbar.Collapse in={isOpen}>
                <Nav className="ml-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/active-sprint">Активный спринт</Nav.Link>
                    <Nav.Link href="/admin-panel">Панель администратора</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
