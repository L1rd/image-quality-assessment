// import React, { useMemo, useState } from "react";

// const METRICS = {
//   objective: [
//     {
//       key: "psnr",
//       name: "PSNR",
//       description: "Пікова відношення сигнал/шум",
//       purpose: "Оцінка якості шляхом порівняння пікселів",
//       formula: "PSNR = 10 * log10(MAX^2 / MSE)",
//     },
//     {
//       key: "ssim",
//       name: "SSIM",
//       description: "Індекс структурної подібності",
//       purpose: "Оцінка структурної подібності зображень",
//       formula:
//         "SSIM(x, y) = ((2μxμy + C1)(2σxy + C2)) / ((μx^2 + μy^2 + C1)(σx^2 + σy^2 + C2))",
//     },
//     {
//       key: "fssim",
//       name: "FSSIM",
//       description: "Зважений SSIM з градієнтною подібністю",
//       purpose: "Оцінка якості з урахуванням градієнтів",
//       formula: "FSSIM = α * SSIM + (1 - α) * GradientSimilarity",
//     },
//     {
//       key: "mse",
//       name: "MSE",
//       description: "Середньоквадратична помилка",
//       purpose: "Вимірювання середньої різниці між пікселями",
//       formula: "MSE = (1/N) * ∑(I1 - I2)^2",
//     },
//   ],
//   subjective: [
//     {
//       key: "kendall",
//       name: "Метрика Кендала",
//       description: "Коефіцієнт кореляції рангів",
//       purpose: "Визначення відповідності порядку вподобань",
//       formula:
//         "τ = (кількість узгоджених пар - кількість неузгоджених пар) / загальна кількість пар",
//     },
//     {
//       key: "likert",
//       name: "Метрика Лайкерта",
//       description: "Середнє значення оцінок за шкалою",
//       purpose: "Суб’єктивна оцінка користувачів",
//       formula: "Середнє арифметичне оцінок за шкалою 1–5 або 1–7",
//     },
//     {
//       key: "mos",
//       name: "MOS (Mean Opinion Score)",
//       description: "Середня оцінка якості зображення",
//       purpose: "Оцінка користувачами сприйняття якості",
//       formula: "MOS = (∑ оцінок) / кількість оцінок",
//     },
//   ],
//   hybrid: {
//     key: "hybrid",
//     name: "Гібридний метод",
//     description: "Поєднання об'єктивних і суб'єктивних оцінок",
//     purpose: "Отримання більш повної оцінки якості зображення",
//     formula:
//       "Hybrid = w₁ × ObjectiveMetric + w₂ × SubjectiveMetric (w₁ + w₂ = 1)",
//   },
//   adaptive: {
//     key: "adaptive",
//     name: "Адаптивний метод (AEMC)",
//     description: "Комбінована оцінка з адаптивним вибором ваг",
//     purpose:
//       "Враховує тип спотворення для зваженого комбінування PSNR, SSIM і FSIM",
//     formula: "AEMC = w₁ × PSNR + w₂ × SSIM + w₃ × FSIM",
//   },
// };

// export const EvaluationPage = () => {
//   const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

//   const toggleMetric = (key: string) => {
//     setSelectedMetrics((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
//     );
//   };

//   const renderMetric = (metric: any) => {
//     const isSelected = selectedMetrics.includes(metric.key);
//     return (
//       <div
//         key={metric.key}
//         className={`rounded-xl p-4 w-full max-w-md cursor-pointer relative transition-all shadow-sm border ${
//           isSelected
//             ? "bg-[#FFA50022] border-[#FFA500]"
//             : "bg-[#EADDC3] border-[#C89F6B]"
//         }`}
//         onClick={() => toggleMetric(metric.key)}
//       >
//         {isSelected && (
//           <p className="absolute top-2 right-2 text-[#FFA500] font-medium">
//             Обрано
//           </p>
//         )}
//         <h3 className="text-lg font-semibold text-[#4A3E30]">{metric.name}</h3>
//         <p className="text-sm text-[#4A3E30] mb-1">{metric.description}</p>
//         <p className="text-sm italic text-[#4A3E30]/80">
//           Призначення: {metric.purpose}
//         </p>
//         {isSelected && (
//           <div className="mt-3 p-3 rounded bg-white border border-[#C89F6B] text-sm text-[#4A3E30]">
//             <strong>Формула:</strong>
//             <pre className="whitespace-pre-wrap mt-1">{metric.formula}</pre>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const { objective, subjective } = useMemo(() => {
//     const selectedObjective = METRICS.objective.filter((m) =>
//       selectedMetrics.includes(m.key)
//     );
//     const selectedSubjective = METRICS.subjective.filter((m) =>
//       selectedMetrics.includes(m.key)
//     );

//     return {
//       objective: selectedObjective,
//       subjective: selectedSubjective,
//     };
//   }, [selectedMetrics]);

//   const hybridAvailable = objective.length >= 1 && subjective.length >= 1;
//   const adaptiveAvailable = objective.length > 1;

//   return (
//     <div className="min-h-screen max-w-6xl mx-auto p-6 flex flex-col gap-8">
//       <div className="flex flex-col md:flex-row gap-8 justify-between">
//         <section className="flex-1">
//           <h2 className="text-2xl font-bold text-[#4A3E30] mb-4">
//             Об'єктивні метрики
//           </h2>
//           <div className="flex flex-wrap gap-4">
//             {METRICS.objective.map(renderMetric)}
//           </div>
//         </section>
//         <section className="flex-1">
//           <h2 className="text-2xl font-bold text-[#4A3E30] mb-4">
//             Суб'єктивні метрики
//           </h2>
//           <div className="flex flex-wrap gap-4">
//             {METRICS.subjective.map(renderMetric)}
//           </div>
//         </section>
//       </div>

//       <section>
//         <h3 className="text-xl font-bold text-[#4A3E30] mb-4">
//           Доступні методи обрахунку
//         </h3>
//         <div className="flex flex-wrap gap-4">
//           {hybridAvailable &&
//             renderMetric(METRICS.hybrid)}
//           {adaptiveAvailable &&
//             renderMetric(METRICS.adaptive)}
//           {!hybridAvailable && !adaptiveAvailable && (
//             <div className="text-gray-500 italic">
//               Для використання гібридного або адаптивного методу виберіть
//               відповідні метрики.
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

import katex from "katex";
import React, { useState, useEffect } from "react";
import { ImageInfoCard } from "../../components";

interface ImageInfo {
  name: string;
  size: number;
  type: string;
  contrast: number;
  brightness: number;
  megapixels: number;
  quality: string;
  noise: string;
  clarity: string;
  data?: Uint8ClampedArray;
  width?: number;
  height?: number;
}

// const getQualityColor = (
//   value: number,
//   type: "contrast" | "brightness" | "mp" | "size" | "noise" | "clarity"
// ) => {
//   switch (type) {
//     case "contrast":
//       return value > 40
//         ? "text-green-600"
//         : value > 20
//         ? "text-yellow-500"
//         : "text-red-500";
//     case "brightness":
//       return value > 180 || value < 60 ? "text-red-500" : "text-green-600";
//     case "mp":
//       return value > 8
//         ? "text-green-600"
//         : value > 3
//         ? "text-yellow-500"
//         : "text-red-500";
//     case "size":
//       return value > 8000
//         ? "text-red-500"
//         : value > 1000
//         ? "text-yellow-500"
//         : "text-green-600";
//     case "noise":
//       return value > 30
//         ? "text-red-500"
//         : value > 10
//         ? "text-yellow-500"
//         : "text-green-600";
//     case "clarity":
//       return value > 100
//         ? "text-green-600"
//         : value > 50
//         ? "text-yellow-500"
//         : "text-red-500";
//     default:
//       return "";
//   }
// };

const getImageInfo = (file: File): Promise<ImageInfo> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;

      let totalLuminance = 0;
      const luminanceValues: number[] = [];

      for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        luminanceValues.push(luminance);
        totalLuminance += luminance;
      }

      const avgLuminance = totalLuminance / luminanceValues.length;
      const contrast =
        luminanceValues.reduce(
          (sum, l) => sum + Math.abs(l - avgLuminance),
          0
        ) / luminanceValues.length;

      const luminanceStd = Math.sqrt(
        luminanceValues.reduce((sum, l) => sum + (l - avgLuminance) ** 2, 0) /
          luminanceValues.length
      );

      const noise =
        luminanceStd > 60
          ? "Високий"
          : luminanceStd > 30
          ? "Середній"
          : "Низький";

      const megapixels = (img.width * img.height) / 1_000_000;
      const qualityScore = file.size / megapixels;
      const qualityRating =
        qualityScore < 100
          ? "Низька"
          : qualityScore < 300
          ? "Середня"
          : "Висока";

      const clarityScore = contrast * megapixels;
      const clarity =
        clarityScore > 300
          ? "Висока"
          : clarityScore > 150
          ? "Середня"
          : "Низька";

      resolve({
        name: file.name,
        size: Math.round(file.size / 1024),
        type: file.type,
        contrast: Math.round(contrast),
        brightness: Math.round(avgLuminance),
        megapixels: Math.round(megapixels * 10) / 10,
        quality: qualityRating,
        noise,
        clarity,
        data,
        width: img.width,
        height: img.height,
      });
    };

    reader.readAsDataURL(file);
  });
};

// const getParameterExplanation = (
//   value: number,
//   type: "contrast" | "brightness" | "mp" | "size"
// ) => {
//   switch (type) {
//     case "contrast":
//       return value > 40
//         ? "Високий контраст (детальне зображення, хороша різкість)"
//         : value > 20
//         ? "Середній контраст (зображення може бути трохи тьмяним)"
//         : "Низький контраст (може бути розмите або слабо виражене)";
//     case "brightness":
//       return value > 180 || value < 60
//         ? "Яскравість занадто висока або низька (може бути засвітлене або темне)"
//         : "Оптимальна яскравість (добре збалансоване зображення)";
//     case "mp":
//       return value > 8
//         ? "Більше 8 МП (висока деталізація, DSLR або сучасні смартфони)"
//         : value > 3
//         ? "3–8 МП (стандартна якість для мобільних пристроїв)"
//         : "Менше 3 МП (може бути занадто низька роздільна здатність)";
//     case "size":
//       return value > 8000
//         ? "Файл > 8 МБ (може бути надмірно великий або з високим шумом)"
//         : value > 1000
//         ? "1–8 МБ (типово для середньої якості JPEG/PNG)"
//         : "Менше 1 МБ (може бути стиснений або низької якості)";
//     default:
//       return "";
//   }
// };

// const ImageInfoCard: React.FC<{ info: ImageInfo }> = ({ info }) => (
//   <div className="w-full bg-gray-100 rounded-lg p-4 mt-2 text-sm text-gray-800">
//     <h3 className="font-semibold mb-2">Інформація про зображення</h3>
//     <p>
//       <strong>Назва:</strong> {info.name}
//     </p>

//     <p>
//       <strong>Розмір:</strong>
//       <span className={`ml-1 ${getQualityColor(info.size, "size")}`}>
//         {info.size} КБ
//       </span>
//       <br />
//       <em className="text-gray-500">
//         {getParameterExplanation(info.size, "size")}
//       </em>
//     </p>

//     <p>
//       <strong>Тип:</strong> {info.type}
//     </p>

//     <p>
//       <strong>Роздільна здатність:</strong>
//       <span className={`ml-1 ${getQualityColor(info.megapixels, "mp")}`}>
//         {info.megapixels} МП
//       </span>
//       <br />
//       <em className="text-gray-500">
//         {getParameterExplanation(info.megapixels, "mp")}
//       </em>
//     </p>

//     <p>
//       <strong>Яскравість:</strong>
//       <span
//         className={`ml-1 ${getQualityColor(info.brightness, "brightness")}`}
//       >
//         {info.brightness}
//       </span>
//       <br />
//       <em className="text-gray-500">
//         {getParameterExplanation(info.brightness, "brightness")}
//       </em>
//     </p>

//     <p>
//       <strong>Контраст:</strong>
//       <span className={`ml-1 ${getQualityColor(info.contrast, "contrast")}`}>
//         {info.contrast}
//       </span>
//       <br />
//       <em className="text-gray-500">
//         {getParameterExplanation(info.contrast, "contrast")}
//       </em>
//     </p>

//     <p>
//       <strong>Оцінка якості:</strong>
//       <span
//         className={`ml-1 font-medium ${
//           info.quality === "Висока"
//             ? "text-green-600"
//             : info.quality === "Середня"
//             ? "text-yellow-500"
//             : "text-red-500"
//         }`}
//       >
//         {info.quality}
//       </span>
//       <br />
//       <em className="text-gray-500">
//         Базується на співвідношенні розміру до мегапікселів (КБ/МП): Вища
//         щільність = вища якість
//       </em>
//     </p>
//   </div>
// );

const calculateMSE = (
  img1: ImageInfo | null,
  img2: ImageInfo | null
): number | null => {
  if (
    !img1 ||
    !img2 ||
    !img1.data ||
    !img2.data ||
    img1.width !== img2.width ||
    img1.height !== img2.height
  ) {
    return null;
  }

  let sumSquaredDifferences = 0;
  const totalPixels = img1.data.length / 4;

  for (let i = 0; i < img1.data.length; i++) {
    const diff = img1.data[i] - img2.data[i];
    sumSquaredDifferences += diff * diff;
  }

  return sumSquaredDifferences / totalPixels;
};

const calculatePSNR = (
  mse: number | null,
  maxPixelValue: number = 255
): number | null => {
  if (mse === null || mse === 0) {
    return null;
  }
  return 10 * Math.log10(maxPixelValue ** 2 / mse);
};

const calculateSSIM = (
  img1: ImageInfo | null,
  img2: ImageInfo | null
): number | null => {
  if (
    !img1 ||
    !img2 ||
    !img1.data ||
    !img2.data ||
    img1.width !== img2.width ||
    img1.height !== img2.height
  )
    return null;

  const luminance = (r: number, g: number, b: number) =>
    0.2126 * r + 0.7152 * g + 0.0722 * b;
  const pixels = img1.width! * img1.height!;
  const l1: number[] = [];
  const l2: number[] = [];

  for (let i = 0; i < img1.data.length; i += 4) {
    l1.push(luminance(img1.data[i], img1.data[i + 1], img1.data[i + 2]));
    l2.push(luminance(img2.data[i], img2.data[i + 1], img2.data[i + 2]));
  }

  const μ1 = l1.reduce((a, b) => a + b, 0) / pixels;
  const μ2 = l2.reduce((a, b) => a + b, 0) / pixels;

  const σ1Sq = l1.reduce((sum, val) => sum + (val - μ1) ** 2, 0) / pixels;
  const σ2Sq = l2.reduce((sum, val) => sum + (val - μ2) ** 2, 0) / pixels;
  const σ12 =
    l1.reduce((sum, _, i) => sum + (l1[i] - μ1) * (l2[i] - μ2), 0) / pixels;

  const c1 = (0.01 * 255) ** 2;
  const c2 = (0.03 * 255) ** 2;

  const numerator = (2 * μ1 * μ2 + c1) * (2 * σ12 + c2);
  const denominator = (μ1 ** 2 + μ2 ** 2 + c1) * (σ1Sq + σ2Sq + c2);

  return numerator / denominator;
};

const calculateFSSIM = (
  img1: ImageInfo | null,
  img2: ImageInfo | null
): number | null => {
  if (
    !img1 ||
    !img2 ||
    !img1.data ||
    !img2.data ||
    img1.width !== img2.width ||
    img1.height !== img2.height
  )
    return null;

  const width = img1.width;
  const height = img1.height;

  // Функція для отримання градієнтів зображення (напрямок X)
  const computeGradient = (
    data: Uint8ClampedArray,
    width: number,
    height: number
  ) => {
    const gradients: number[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const currentLum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        const rightX = x + 1 < width ? x + 1 : x;
        const rightIndex = (y * width + rightX) * 4;

        const rr = data[rightIndex];
        const gr = data[rightIndex + 1];
        const br = data[rightIndex + 2];
        const rightLum = 0.2126 * rr + 0.7152 * gr + 0.0722 * br;

        const gradient = Math.abs(currentLum - rightLum);
        gradients.push(gradient);
      }
    }
    return gradients;
  };

  const grad1 = computeGradient(img1.data, width || 0, height || 0);
  const grad2 = computeGradient(img2.data, width || 0, height || 0);

  // Градієнтна схожість
  let gradSimilarity = 0;
  for (let i = 0; i < grad1.length; i++) {
    const g1 = grad1[i];
    const g2 = grad2[i];
    gradSimilarity += (2 * g1 * g2 + 0.01) / (g1 * g1 + g2 * g2 + 0.01);
  }
  gradSimilarity /= grad1.length;

  // SSIM як компонент яскравості
  const ssim = calculateSSIM(img1, img2);
  if (ssim === null) return null;

  // Обчислюємо FSSIM як середнє або зважене середнє
  const alpha = 0.5; // можна змінити
  const fssim = alpha * ssim + (1 - alpha) * gradSimilarity;

  return Math.round(fssim * 1000) / 1000;
};

const analyzeDistortion = (img1: ImageInfo | null, img2: ImageInfo | null) => {
  if (!img1 || !img2 || !img1.data || !img2.data) return null;

  const pixelDiffs: number[] = [];
  for (let i = 0; i < img1.data.length; i += 4) {
    const diff =
      Math.abs(img1.data[i] - img2.data[i]) + // R
      Math.abs(img1.data[i + 1] - img2.data[i + 1]) + // G
      Math.abs(img1.data[i + 2] - img2.data[i + 2]); // B
    pixelDiffs.push(diff / 3);
  }

  const avgDiff =
    pixelDiffs.reduce((sum, val) => sum + val, 0) / pixelDiffs.length;

  const highFreqArtifacts =
    pixelDiffs.filter((v) => v > 50).length / pixelDiffs.length;
  const blockArtifacts = pixelDiffs.filter(
    (_, i) => i % 64 === 0 && pixelDiffs[i] > 30
  ).length;

  return {
    blurLevel: avgDiff < 10 ? 1 : avgDiff < 20 ? 0.5 : 0.1,
    edgeLoss: highFreqArtifacts > 0.1 ? 0.8 : 0.3,
    blocking: blockArtifacts > 20 ? 0.8 : 0.2,
  };
};

const calculateAEMC = (
  img1: ImageInfo | null,
  img2: ImageInfo | null,
  psnr: number | null,
  ssim: number | null,
  fssim: number | null
) => {
  const distortion = analyzeDistortion(img1, img2);
  if (!distortion || psnr === null || ssim === null || fssim === null)
    return null;

  const { blurLevel, edgeLoss, blocking } = distortion;

  // Ваги можуть бути нормалізовані на 1
  const totalWeight = blurLevel + edgeLoss + blocking;
  const wPSNR = blurLevel / totalWeight;
  const wSSIM = edgeLoss / totalWeight;
  const wFSSIM = blocking / totalWeight;

  const combinedScore =
    wPSNR * (psnr / 100) + // нормалізуємо PSNR до діапазону [0,1]
    wSSIM * ssim +
    wFSSIM * fssim;

  return {
    result: Math.round(combinedScore * 1000) / 1000,
    wPSNR,
    wSSIM,
    wFSSIM,
  };
};

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
];

export const EvaluationPage: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([null, null]);
  const [imageInfos, setImageInfos] = useState<(ImageInfo | null)[]>([
    null,
    null,
  ]);
  const [mse, setMse] = useState<number | null>(null);
  const [psnr, setPsnr] = useState<number | null>(null);
  const [ssim, setSsim] = useState<number | null>(null);
  const [fssim, setFssim] = useState<number | null>(null);
  const [aemc, setAemc] = useState<number | null>(null);
  const [weights, setWeights] = useState<{
    wPSNR: number;
    wSSIM: number;
    wFSSIM: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculate = async () => {
      if (
        imageInfos[0] &&
        imageInfos[1] &&
        imageInfos[0].data &&
        imageInfos[1].data &&
        imageInfos[0].width === imageInfos[1].width &&
        imageInfos[0].height === imageInfos[1].height
      ) {
        setIsCalculating(true);
        setMse(null);
        setPsnr(null);
        setSsim(null);
        setFssim(null);

        const calculatedMse = calculateMSE(imageInfos[0], imageInfos[1]);
        const calculatedPsnr = calculatePSNR(calculatedMse);
        const calculatedSsim = calculateSSIM(imageInfos[0], imageInfos[1]);
        const calculatedFssim = calculateFSSIM(imageInfos[0], imageInfos[1]);
        const aemcVal = calculateAEMC(
          imageInfos[0],
          imageInfos[1],
          calculatedPsnr,
          calculatedSsim,
          calculatedFssim
        );

        setMse(calculatedMse);
        setPsnr(calculatedPsnr);
        setSsim(calculatedSsim);
        setFssim(calculatedFssim);
        setAemc(aemcVal?.result || 0);
        setWeights({
          wPSNR: aemcVal?.wPSNR || 0,
          wSSIM: aemcVal?.wSSIM || 0,
          wFSSIM: aemcVal?.wFSSIM || 0,
        });

        const newMetric = {
          image1: imageInfos[0].name || "",
          image2: imageInfos[1].name || "",
          mse: calculatedMse || 0,
          psnr: calculatedPsnr || 0,
          ssim: calculatedSsim || 0,
          fsim: calculatedFssim || 0,
          adaptiveMetric: aemcVal?.result || 0,
          likert: 0,
          mos: 0,
          kendall: 0,
          hybridMetric: 0,
        };

        const storedMetrics = localStorage.getItem("imageMetricsData");

        localStorage.setItem(
          "imageMetricsData",
          JSON.stringify([...JSON.parse(storedMetrics || "[]"), newMetric])
        );

        setIsCalculating(false);
      }
    };

    calculate();
  }, [imageInfos]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const info = await getImageInfo(file);

      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        setError(`Непідтримуваний тип файлу: ${file.type}`);
        return;
      }
      setError(null);
      const newImages = [...images];
      const newInfos = [...imageInfos];
      newImages[index] = url;
      newInfos[index] = info;

      setImages(newImages);
      setImageInfos(newInfos);
    }
  };

  const renderKatex = (expression: string) => {
    try {
      return katex.renderToString(expression, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
      return expression;
    }
  };

  const ACCENT_COLOR = "#C89F6B"; // теплий коричневий
  const TEXT_COLOR = "#4A3E30"; // темно-коричневий текст
  return (
    <div className="min-h-screen p-8" style={{ color: TEXT_COLOR }}>
      <div className="max-w-5xl mx-auto">
        {error && (
          <div
            className="mt-4 p-2 rounded mb-5"
            style={{
              backgroundColor: "#f9d6b1",
              color: "#7a4a00",
              border: "1px solid #ffa500",
            }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4"
              style={{
                backgroundColor: "#fff9f0",
                border: `2px solid ${ACCENT_COLOR}`,
              }}
            >
              <label
                className="w-full text-center"
                style={{ color: TEXT_COLOR }}
              >
                <span className="block text-sm font-medium mb-2">
                  Завантажити зображення {i + 1}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, i)}
                  className="block w-full text-sm"
                  style={{
                    color: TEXT_COLOR,
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "#f0e6d2",
                    padding: "8px 12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                />
              </label>

              {images[i] && (
                <img
                  src={images[i] as string}
                  alt={`Зображення ${i + 1}`}
                  className="w-full max-h-64 object-contain rounded-xl border shadow"
                  style={{ borderColor: ACCENT_COLOR }}
                />
              )}

              {imageInfos[i] && <ImageInfoCard info={imageInfos[i]!} />}
            </div>
          ))}
        </div>
        {isCalculating && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-gray-800 text-center">
            <svg
              className="animate-spin h-10 w-10 mx-auto text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-2">Обчислення MSE та PSNR...</p>
          </div>
        )}
        {!isCalculating && mse !== null && psnr !== null && ssim !== null ? (
          <>
            <div className="mt-8 bg-[#EADDC3] rounded-lg shadow-md p-6 text-[#4A3E30]">
              <h2 className="text-xl font-semibold mb-4 text-[#C89F6B]">
                Результати порівняння
              </h2>

              <div className="mb-4">
                <h3 className="font-semibold text-[#4A3E30]">
                  Середньоквадратична похибка (MSE)
                </h3>
                <p>
                  <strong>Формула:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderKatex(
                        `MSE = \\frac{1}{M \\cdot N} \\sum_{i=0}^{M-1} \\sum_{j=0}^{N-1} [I(i, j) - K(i, j)]^2`
                      ),
                    }}
                  />
                </p>
                {imageInfos[0]?.width && imageInfos[0]?.height && (
                  <p>
                    <strong>З розмірами:</strong>{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: renderKatex(
                          `MSE = \\frac{1}{${imageInfos[0].width} \\cdot ${
                            imageInfos[0].height
                          }} \\sum_{i=0}^{${
                            imageInfos[0].width - 1
                          }} \\sum_{j=0}^{${
                            imageInfos[0].height - 1
                          }} [I(i, j) - K(i, j)]^2`
                        ),
                      }}
                    />
                  </p>
                )}
                <p>
                  <strong>Значення:</strong> {mse.toFixed(2)}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-[#4A3E30]">
                  Пікове відношення сигнал/шум (PSNR)
                </h3>
                <p>
                  <strong>Формула:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderKatex(
                        `PSNR = 10 \\log_{10} \\left( \\frac{MAX^2}{MSE} \\right)`
                      ),
                    }}
                  />
                </p>
                <p>
                  <strong>
                    З значеннями (MAX = 255, MSE ={" "}
                    {mse !== null ? mse.toFixed(2) : "?"}):
                  </strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderKatex(
                        `PSNR = 10 \\log_{10} \\left( \\frac{255^2}{${
                          mse !== null ? mse.toFixed(2) : "?"
                        }} \\right)`
                      ),
                    }}
                  />
                </p>
                <p>
                  <strong>Значення:</strong>{" "}
                  {psnr !== null ? psnr.toFixed(2) + " дБ" : "?"}
                </p>
                {psnr !== null && (
                  <p className="mt-2 text-sm text-gray-600">
                    PSNR зазвичай вимірюється в децибелах (дБ). Чим вище
                    значення PSNR, тим краща якість відновленого зображення.
                    Загалом, значення PSNR вище 30 дБ вважаються прийнятними для
                    більшості випадків.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-[#4A3E30]">
                  Індекс структурної подібності (SSIM)
                </h3>
                <p>
                  <strong>Формула:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderKatex(
                        `SSIM(x, y) = \\frac{(2\\mu_x\\mu_y + C_1)(2\\sigma_{xy} + C_2)}{(\\mu_x^2 + \\mu_y^2 + C_1)(\\sigma_x^2 + \\sigma_y^2 + C_2)}`
                      ),
                    }}
                  />
                </p>
                <p>
                  <strong>Значення:</strong>{" "}
                  {ssim !== null ? ssim.toFixed(4) : "?"}
                </p>
                {ssim !== null && (
                  <p className="mt-2 text-sm text-gray-600">
                    SSIM варіюється від -1 до 1, де 1 означає ідеальну
                    структурну подібність між зображеннями. Значення ближче до 1
                    вказують на високу подібність, тоді як значення ближче до 0
                    — на меншу. SSIM враховує яскравість, контраст та структуру
                    пікселів, що робить його більш узгодженим із людським
                    сприйняттям якості.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-[#4A3E30]">
                  Feature Similarity Index (FSSIM)
                </h3>
                <p>
                  <strong>Формула:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderKatex(`
    \\mathrm{FSSIM} = \\alpha \\cdot \\mathrm{SSIM} + (1 - \\alpha) \\cdot G
  `),
                    }}
                  />
                </p>

                <p>
                  <strong>Значення:</strong>{" "}
                  {fssim !== null ? fssim.toFixed(4) : "?"}
                </p>

                {fssim !== null && (
                  <>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>FSSIM (Feature Similarity Index)</strong> — це
                      метрика, яка поєднує <strong>SSIM</strong> з оцінкою
                      схожості градієнтів (G). Вона краще захоплює візуальні
                      особливості зображень, важливі для людського сприйняття,
                      такі як <em>текстура, форма, структура</em>.
                    </p>
                    <p className="text-sm text-gray-600">
                      SSIM вимірює подібність між яскравістю, контрастом і
                      структурою пікселів, але може бути чутливим до незначних
                      локальних змін. У FSSIM додається оцінка схожості
                      градієнтів — змін яскравості між сусідніми пікселями, що
                      краще відображає межі та контури.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Градієнтна подібність (G)</strong> обчислюється
                      шляхом порівняння локальних градієнтів для кожного
                      пікселя, подібно до фільтрів ознак. Завдяки цьому FSSIM є
                      більш стійким до шуму, зміни освітлення чи дрібних
                      дефектів.
                    </p>
                    <p className="text-sm text-gray-600">
                      Значення <strong>FSSIM ∈ [0, 1]</strong>, де 1 означає
                      ідеальну відповідність між двома зображеннями. Значення
                      ближче до 1 свідчать про високу якість і схожість.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 bg-[#EADDC3] rounded-lg shadow-md p-6 text-[#4A3E30]">
              {aemc !== null && (
                <div className="mt-2 text-sm">
                  <strong>Адаптивна комбінована оцінка (AEMC):</strong>{" "}
                  <span className="text-[#FFA500] font-medium">{aemc}</span>
                  <br />
                  <em className="text-gray-500">
                    Враховує тип спотворення та комбінує значення PSNR, SSIM і
                    FSIM із відповідними вагами.
                  </em>
                  <br />
                  <div className="text-gray-600 mt-1">
                    <strong>Розрахунок:</strong>
                    <ul className="list-disc list-inside ml-2">
                      <li>
                        PSNR = <span className="font-mono">{psnr}</span>
                      </li>
                      <li>
                        SSIM = <span className="font-mono">{ssim}</span>
                      </li>
                      <li>
                        FSIM = <span className="font-mono">{fssim}</span>
                      </li>
                    </ul>
                    <div className="mt-1">
                      <strong>Ваги:</strong>{" "}
                      <span className="font-mono">
                        w₁ = {weights?.wPSNR}, w₂ = {weights?.wSSIM}, w₃ ={" "}
                        {weights?.wFSSIM}
                      </span>
                    </div>
                    <div className="mt-1">
                      <strong>Формула:</strong>{" "}
                      <code className="font-mono px-1 rounded">
                        AEMC = w₁ × PSNR + w₂ × SSIM + w₃ × FSIM
                      </code>
                    </div>
                    <div className="mt-1 text-gray-500 text-xs">
                      Ваги змінюються залежно від типу спотворення (наприклад,
                      шум, розмиття, стиснення), щоб адаптивно підлаштувати
                      метрику до людського сприйняття.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          images.filter((item) => !!item).length > 2 && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded mb-5">
              🚫 Неможливо відобразити результати порівняння. Переконайтеся, що
              ви завантажили два зображення з однаковими розмірами для аналізу.
            </div>
          )
        )}
      </div>
    </div>
  );
};
