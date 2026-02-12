import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import './css/AboutPage.css'

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="AboutPage">
        <h1>О компании</h1>
        <h3>Цифровая инфраструктура для управления коммерческим транспортом</h3>
        <p>
          Наша компания создаёт инфраструктуру, в которой управление коммерческим транспортом становится прозрачным, предсказуемым и экономически
          выгодным. Мы объединяем запасные части, телематику, аналитику и цифровые процессы в единую систему, формируя цифровой двойник каждого
          транспортного средства и автопарка в целом.
        </p>
        <div className="remark">
          <img src="/bang.svg" alt="!" />
          <p>
            Это не просто данные.
            <br />
            Это практичная модель эксплуатации техники, ориентированная на результат.
          </p>
        </div>
        <h2>Что показывает система</h2>
        <div className="features__block">
          <div className="feature_item">
            <img src="/feature-1.png" alt="feature" />
            <p>Узлы, работающие с перегрузкой</p>
          </div>
          <div className="feature_item">
            <img src="/feature-2.png" alt="feature" />
            <p>Момент, когда деталь приближается к износу</p>
          </div>
          <div className="feature_item">
            <img src="/feature-3.png" alt="feature" />
            <p>Точки потери денег в эксплуатации</p>
          </div>
          <div className="feature_item">
            <img src="/feature-4.png" alt="feature" />
            <p>Возможности снижения расходов без риска для техники</p>
          </div>
        </div>
        <div className="question__block">
          <p className="question">Что даёт цифровой двойник?</p>
          <p className="answer">
            Благодаря цифровому двойнику мы фиксируем полную историю эксплуатации каждой запасной части - от момента установки до выработки ресурса.
          </p>
        </div>
        <h2>Это позволяет:</h2>
        <div className="benefits__block">
          <div className="benefits_item">
            <p className="top">Прогнозировать поломки до их появления</p>
            <p className="bottom">1</p>
          </div>
          <div className="benefits_item">
            <p className="top">Закупать только действительно необходимые детали</p>
            <p className="bottom">2</p>
          </div>
          <div className="benefits_item">
            <p className="top">Избегать лишних ремонтов и незапланированных простоев</p>
            <p className="bottom">3</p>
          </div>
          <div className="benefits_item">
            <p className="top">Сравнивать эффективность поставщиков и моделей запчастей</p>
            <p className="bottom">4</p>
          </div>
          <div className="benefits_item">
            <p className="top">Автоматически оптимизировать затраты на содержание транспорта</p>
            <p className="bottom">5</p>
          </div>
        </div>
        <h2>Экономический эффект</h2>
        <div className="economy__block">
          <p className="title">До 40% экономии бюджета на запасных частях</p>
          <p className="sub">
            Экономия достигается как по отдельным транспортным средствам,
            <br />
            так и по автопарку в целом - за счёт точного управления ресурсом техники.
          </p>
        </div>
        <div className="mission__block">
          <div className="txt">
            <p className="txt_title">Наша миссия</p>
            <p className="txt_sub">
              Создать среду, в которой руководитель автопарка видит реальную картину эксплуатации техники, а механики работают быстрее и точнее
              благодаря прозрачным и актуальным данным.
              <br />
              Мы меняем подход от «чинить по факту» к управлению ресурсом техники на основе цифровых моделей.
            </p>
          </div>
          <img src="/mission-1.png" alt="tractor" />
          <img src="/mission-2.png" className='mission-2' alt="фура" />
          <div className="txt">
            <p className="txt_title">Почему это важно?</p>
            <p className="txt_sub">
              В условиях высоких нагрузок, плотных графиков и растущей стоимости обслуживания коммерческого транспорта цифровая модель позволяет
              преобразовать хаос данных в понятные решения:
              <br />
              • меньше тратится на запасные части;
              <br />
              • техника работает стабильнее;
              <br />
              • автопарк живёт дольше;
              <br />• управлять затратами становится проще.
            </p>
          </div>
        </div>
        <div className="btn">Стать клиентом</div>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage
