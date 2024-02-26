import './NavTab.css';

export default function NavTab() {

    return (
        <section className='navtab'>
            <nav className='navtab__navigate'>
                <ul className='navtab__links'>
                    <li><a href='#aboutProject' className="navtab__link">О проекте</a></li>
                    <li><a href='#Techs' className='navtab__link'>Технологии</a></li>
                    <li><a href='#aboutMe' className='navtab__link'>Студент</a></li>
                </ul>
            </nav>
        </section>
    )
}