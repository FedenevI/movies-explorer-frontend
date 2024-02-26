import './AboutProject.css';

export default function AboutProject() {
    return (
        <section id='aboutProject' className='project'>
            <h2 className='project__title'>О проекте</h2>
            <div className="project__container">
                <h3 className="project__subtitle project__subtitle-first">Дипломный проект включал 5 этапов</h3>
                <h3 className="project__subtitle project__subtitle-second">На выполнение диплома ушло 5 недель</h3>
                <p className="project__description project__description-first">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="project__description project__description-second">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="project__time">
                <p className="project__progress project__progress_type_backend" >1 неделя</p>
                <p className="project__progress">4 недели</p>
                <span className="project__text">Back-end</span>
                <span className="project__text">Front-end</span>
            </div>
        </section>
    )
}