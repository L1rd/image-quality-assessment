import { useEffect, useState } from "react";

interface ImageMetrics {
  image1: string;
  image2: string;
  mse: number;
  psnr: number;
  ssim: number;
  fsim: number;
  adaptiveMetric: number;
  likert: number;
  mos: number;
  kendall: number;
  hybridMetric: number;
}

const LOCAL_STORAGE_KEY = "imageMetricsData";

export const HistoryPage = () => {
  const [data, setData] = useState<ImageMetrics[] | null>(null);

  useEffect(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (json) {
      try {
        const parsed: ImageMetrics[] = JSON.parse(json);
        setData(parsed);
      } catch {
        setData(null);
      }
    } else {
      setData(null);
    }
  }, []);

  const handleDelete = (index: number) => {
    if (!data) return;
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  if (!data || data.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ color: "#4A3E30" }}
      >
        <p className="text-lg font-medium">
          Дані про метрики не знайдено в локальному сховищі.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ color: "#4A3E30" }}
    >
      <h1
        className="text-4xl font-extrabold mb-10 text-center"
        style={{ color: "#C89F6B" }}
      >
        Таблиця історії обчислень
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead
            style={{ backgroundColor: "#C89F6B", color: "#fff" }}
            className="select-none"
          >
            <tr>
              <th className="text-left py-3 px-5">Перше зображення</th>
              <th className="text-left py-3 px-5">Друге зображення</th>
              <th className="text-right py-3 px-5">MSE</th>
              <th className="text-right py-3 px-5">PSNR</th>
              <th className="text-right py-3 px-5">SSIM</th>
              <th className="text-right py-3 px-5">FSIM</th>
              <th className="text-right py-3 px-5">Адаптивна метрика</th>
              <th className="text-right py-3 px-5">Лайкерт</th>
              <th className="text-right py-3 px-5">MOS</th>
              <th className="text-right py-3 px-5">Кендал</th>
              <th className="text-right py-3 px-5">Гібридна метрика</th>
              <th className="text-center py-3 px-5 sticky right-0 bg-[#C89F6B]">
                Дія
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fff" : "#F7F0D9",
                  color: "#4A3E30",
                }}
                className="transition-colors"
              >
                <td className="py-3 px-5">{row.image1}</td>
                <td className="py-3 px-5">{row.image2}</td>
                <td className="py-3 px-5 text-right">{row.mse.toFixed(4)}</td>
                <td className="py-3 px-5 text-right">{row.psnr.toFixed(4)}</td>
                <td className="py-3 px-5 text-right">{row.ssim.toFixed(4)}</td>
                <td className="py-3 px-5 text-right">{row.fsim.toFixed(4)}</td>
                <td className="py-3 px-5 text-right">
                  {row.adaptiveMetric.toFixed(4)}
                </td>
                <td className="py-3 px-5 text-right">{row.likert.toFixed(2)}</td>
                <td className="py-3 px-5 text-right">{row.mos.toFixed(2)}</td>
                <td className="py-3 px-5 text-right">{row.kendall.toFixed(2)}</td>
                <td className="py-3 px-5 text-right">
                  {row.hybridMetric.toFixed(4)}
                </td>
                <td
                  className="py-3 px-5 text-center sticky right-0"
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F7F0D9" }}
                >
                  <button
                    onClick={() => handleDelete(i)}
                    aria-label={`Видалити запис ${i + 1}`}
                    style={{
                      color: "#C89F6B",
                      fontWeight: "bold",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      fontSize: "1.2rem",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFA500")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#C89F6B")
                    }
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
