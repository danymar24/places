import React from 'react';
import Link from 'react-router-dom/Link';

export class NavBar extends React.Component {
    componentDidMount() {
        const elem = document.querySelector('.sidenav');
        const instance = M.Sidenav.init(elem);

        $('.sidenav li').click(() => {
            instance.close();
        })
    }
    
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <ul>
                        <li>
                            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                        </li>
                    </ul>
                    <a href='#' className='brand-logo'>Places</a>
                </div>

                <ul id='slide-out' className='sidenav'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                    <li><Link to='/territories'>Territories</Link></li>
                </ul>
            </nav>
        );
    }
}