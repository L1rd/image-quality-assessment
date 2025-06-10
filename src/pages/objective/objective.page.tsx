const metrics = [
  {
    title: "MSE (Mean Squared Error)",
    description: `MSE — це середньоквадратична помилка, яка обчислює середнє значення квадратів різниць між пікселями оригінального та обробленого зображення. Чим менше значення MSE, тим менше відхилення і, відповідно, краща якість. Це базова, але чутлива до зсувів метрика.`
  },
  {
    title: "PSNR (Peak Signal-to-Noise Ratio)",
    description: `PSNR — піксельне відношення сигнал/шум — вимірює якість зображення шляхом порівняння максимальної можливої інтенсивності пікселя з шумом (виміряним через MSE). Вища величина PSNR вказує на менше спотворення і кращу якість. Часто використовується в кодеках зображень і відео.`
  },
  {
    title: "SSIM (Structural Similarity Index)",
    description: `SSIM — індекс структурної подібності — оцінює схожість між двома зображеннями з урахуванням яскравості, контрасту та структури. Значення SSIM знаходиться в діапазоні від 0 до 1, де 1 означає ідеальну схожість. Ця метрика краще корелює з людським сприйняттям, ніж MSE чи PSNR.`
  },
  {
    title: "FSIM (Feature Similarity Index)",
    description: `FSIM — індекс подібності ознак — враховує фази та амплітуди важливих візуальних ознак на зображенні. Він відображає ступінь збереження важливих візуальних деталей. FSIM вважається ще більш точним для імітації людського візуального сприйняття.`
  }
];

export const ObjectivePage = () => {
  return (
    <div className="min-h-screen text-[#4A3E30]">
      <div
        className="py-16 px-8 text-center bg-[#C89F6B] text-white"
        style={{ boxShadow: "0 4px 8px rgba(200,159,107,0.5)" }}
      >
        <h1 className="text-4xl font-extrabold mb-4">Об’єктивні метрики оцінювання зображення</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Об’єктивні метрики автоматично оцінюють якість зображення за математичними критеріями, не залучаючи людське сприйняття. Вони є швидкими і повторюваними, що робить їх зручними для автоматизованих систем.
        </p>
      </div>

      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#4A3E30]">
          Використані метрики
        </h2>
        <div className="space-y-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "white",
                border: `2px solid #C89F6B`,
                color: "#4A3E30",
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-[#C89F6B]">
                {metric.title}
              </h3>
              <p>{metric.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
