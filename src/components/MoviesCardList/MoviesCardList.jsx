import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { useEffect, useState } from 'react';

export default function MoviesCardList() {
    let arrayCard = [];
    let MovieCard = <MoviesCard />;

    for (let i = 0; i < 20; i++) {
        arrayCard.push(MovieCard);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [shownImages, setShownImages] = useState(12);

    const handleShowImage = () => {
        if (window.innerWidth >= 1023) {
            setShownImages(shownImages + 3);
        } else if (window.innerWidth >= 767) {
            setShownImages(shownImages + 2);
        } else if (window.innerWidth >= 320) {
            setShownImages(shownImages + 1);
        }
    }

    const handleResize = () => {
        if (window.innerWidth >= 1023) {
            setShownImages(12);
        } else if (window.innerWidth >= 767) {
            setShownImages(8);
        } else {
            setShownImages(5);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);

    useEffect(() => {
        if (shownImages >= arrayCard.length && (window.innerWidth >= 1023)) {
            const elementsList = document.querySelector(".elements__list");
            elementsList.style.paddingBottom = "270px";
        }
    }, [shownImages, arrayCard.length]);


    return (
        <section className="elements">
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <ul className="elements__list" >
                        {arrayCard.slice(0, shownImages).map((card, index) =>
                            <li className='element' key={index}>{card}</li>
                        )}
                    </ul>
                    {shownImages < arrayCard.length && (
                        <button type="button" onClick={handleShowImage} className='elements__more'>Ещё</button>
                    )}
                </>
            )}
        </section>
    )
}