import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import HomeBanner from "../../assets/home-banner.png";

const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#4A3E30] rounded-md mb-3 bg-[#EADDC3]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 hover:bg-[#C89F6B] flex justify-between items-center font-semibold text-[#4A3E30] transition-colors duration-200"
      >
        <span>{title}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 py-3 text-[#4A3E30] leading-relaxed bg-[#FFF8E7]">
          {children}
        </div>
      )}
    </div>
  );
};

export const HomePage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-4xl mx-auto text-center py-16">
        <h1
          className="text-5xl font-extrabold mb-4 drop-shadow-md"
          style={{ color: "#4A3E30" }}
        >
          Програмна система оцінювання якості зображень
        </h1>
        <p
          className="text-xl max-w-3xl mx-auto mb-8"
          style={{ color: "#4A3E30", opacity: 0.85 }}
        >
          Вебсистема для завантаження, аналізу та порівняння зображень за
          відомими метриками.
        </p>
        <div className="flex justify-center gap-[16px]">
          <button
            onClick={scrollToContent}
            className="px-6 py-3 rounded-lg shadow-md transition bg-[#C89F6B] hover:bg-[#B3854A]!"
            style={{
              backgroundColor: "#C89F6B",
              color: "white",
              boxShadow: "0 4px 10px rgba(200,159,107,0.6)",
            }}
            aria-label="Перейти до контенту"
          >
            Дізнатись більше
          </button>
          <button
            onClick={() => navigate('evaluation')}
            className="px-6 py-3 rounded-lg shadow-md transition border border-solid border-[#C89F6B] text-[#C89F6B] hover:bg-[#C89F6B]! hover:text-white"
            style={{
              backgroundColor: "transparent",
            }}
            aria-label="Перейти до оцінювання"
          >
            Перейти до оцінювання
          </button>
        </div>
      </header>

      <img
        src={HomeBanner}
        alt="home-banner"
        className="max-w-5xl mx-auto rounded-xl mb-[64px]"
      />

      <main
        ref={contentRef}
        className="max-w-5xl mx-auto rounded-xl shadow-lg p-10 space-y-10"
        style={{ backgroundColor: "#FFF8E7", border: "2px solid #C89F6B" }}
      >
        <section className="space-y-6">
          <h2
            className="text-3xl font-bold border-b-4 pb-2"
            style={{ color: "#4A3E30", borderColor: "#C89F6B" }}
          >
            Що це за система?
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "#4A3E30", opacity: 0.9 }}
          >
            Програмна система оцінювання якості зображень – це вебплатформа, яка
            надає користувачам змогу завантажувати, аналізувати та порівнювати
            зображення за відомими метриками. Вона є технічно обґрунтованим і
            соціально затребуваним проєктом, що відповідає об’єктивній потребі в
            уніфікованих, прозорих, метричних підходах до оцінювання якості
            зображень у сучасних умовах розвитку комп’ютерної графіки, цифрового
            мистецтва, машинного навчання та візуальної аналітики.
          </p>
        </section>

        <section className="space-y-6">
          <h2
            className="text-3xl font-bold border-b-4 pb-2"
            style={{ color: "#4A3E30", borderColor: "#C89F6B" }}
          >
            Для чого вона потрібна
          </h2>
          <AccordionItem title="Контроль якості після обробки">
            Метрики дозволяють виявити втрати при стисненні, фільтрації чи
            передачі зображень.
          </AccordionItem>
          <AccordionItem title="Урахування людського сприйняття">
            Об’єктивні методи не завжди збігаються з тим, як бачить людина, тому
            потрібна суб’єктивна оцінка.
          </AccordionItem>
          <AccordionItem title="Критично важливі сфери">
            У медицині, безпеці та супутникових знімках важлива точна оцінка
            якості.
          </AccordionItem>
          <AccordionItem title="Оптимізація зберігання і передавання">
            Допомагає знайти баланс між якістю та розміром файлу.
          </AccordionItem>
          <AccordionItem title="Оцінка результатів генеративних моделей">
            У сфері AI/ML, зокрема генеративних моделей (GAN, diffusion),
            потрібно кількісно порівнювати якість результатів.
          </AccordionItem>
          <AccordionItem title="Об'єктивна оцінка для дизайнерських студій">
            При створенні логотипів, банерів чи 3D-графіки важлива об’єктивна
            оцінка чіткості, контрасту, спотворень.
          </AccordionItem>
          <AccordionItem title="Навчальні цілі">
            Університети та освітні платформи можуть використовувати такий сайт
            для навчальних цілей.
          </AccordionItem>
          <AccordionItem title="Аналіз ефективності алгоритмів">
            Метричні методи оцінювання зображень є загальноприйнятими в науковій
            та прикладній практиці.
          </AccordionItem>
        </section>

        <section className="space-y-6">
          <h2
            className="text-3xl font-bold border-b-4 pb-2"
            style={{ color: "#4A3E30", borderColor: "#C89F6B" }}
          >
            Для кого вона потрібна
          </h2>
          <AccordionItem title="Фахівці з графічних зображень">
            Понад 30–35 мільйонів людей професійно займаються створенням та
            обробкою графічних зображень.
          </AccordionItem>
          <AccordionItem title="Фахівці суміжних сфер">
            Додатково 20–25 мільйонів працюють у сферах фотографії, медичної
            візуалізації, відеоаналітики, супутникової обробки.
          </AccordionItem>
          <AccordionItem title="Науковці, розробники та студенти">
            Веб-сервіс з порівнянням зображень дозволяє оперативно перевіряти
            якість графічного контенту.
          </AccordionItem>
          <AccordionItem title="Українські спеціалісти">
            В Україні понад 40 000–45 000 спеціалістів задіяні в цих напрямках,
            що створює актуальний запит на метричне оцінювання.
          </AccordionItem>
        </section>
      </main>
    </div>
  );
};
