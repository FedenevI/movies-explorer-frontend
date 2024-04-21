import './Main.css'
import Promo from '../Promo/Promo.jsx';
import NavTab from '../NavTab/NavTab.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import Techs from '../Techs/Techs.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Portfolio from '../Portfolio/Portfolio.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';


export default function Main() {

    return (
        <>
            <Header type="green" setLoggedIn={false} />
            <main className='main'>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>

    );
}