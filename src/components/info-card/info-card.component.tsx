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

const getParameterExplanation = (
  value: number,
  type: "contrast" | "brightness" | "mp" | "size"
) => {
  switch (type) {
    case "contrast":
      return value > 40
        ? "Високий контраст (детальне зображення, хороша різкість)"
        : value > 20
        ? "Середній контраст (зображення може бути трохи тьмяним)"
        : "Низький контраст (може бути розмите або слабо виражене)";
    case "brightness":
      return value > 180 || value < 60
        ? "Яскравість занадто висока або низька (може бути засвітлене або темне)"
        : "Оптимальна яскравість (добре збалансоване зображення)";
    case "mp":
      return value > 8
        ? "Більше 8 МП (висока деталізація, DSLR або сучасні смартфони)"
        : value > 3
        ? "3–8 МП (стандартна якість для мобільних пристроїв)"
        : "Менше 3 МП (може бути занадто низька роздільна здатність)";
    case "size":
      return value > 8000
        ? "Файл > 8 МБ (може бути надмірно великий або з високим шумом)"
        : value > 1000
        ? "1–8 МБ (типово для середньої якості JPEG/PNG)"
        : "Менше 1 МБ (може бути стиснений або низької якості)";
    default:
      return "";
  }
};

const getQualityColor = (
  value: number,
  type: "contrast" | "brightness" | "mp" | "size" | "noise" | "clarity"
) => {
  switch (type) {
    case "contrast":
      return value > 40
        ? "text-green-600"
        : value > 20
        ? "text-yellow-500"
        : "text-red-500";
    case "brightness":
      return value > 180 || value < 60 ? "text-red-500" : "text-green-600";
    case "mp":
      return value > 8
        ? "text-green-600"
        : value > 3
        ? "text-yellow-500"
        : "text-red-500";
    case "size":
      return value > 8000
        ? "text-red-500"
        : value > 1000
        ? "text-yellow-500"
        : "text-green-600";
    case "noise":
      return value > 30
        ? "text-red-500"
        : value > 10
        ? "text-yellow-500"
        : "text-green-600";
    case "clarity":
      return value > 100
        ? "text-green-600"
        : value > 50
        ? "text-yellow-500"
        : "text-red-500";
    default:
      return "";
  }
};

export const ImageInfoCard: React.FC<{ info: ImageInfo }> = ({ info }) => (
  <div className="w-full rounded-lg p-4 mt-2 text-sm bg-[#EADDC3] text-[#4A3E30]">
    <h3 className="font-semibold mb-2">Інформація про зображення</h3>

    <p>
      <strong>Назва:</strong> {info.name}
    </p>

    <p>
      <strong>Розмір:</strong>
      <span className={`ml-1 ${getQualityColor(info.size, "size")}`}>{info.size} КБ</span>
      <br />
      <em className="text-[#4A3E30]/70">{getParameterExplanation(info.size, "size")}</em>
    </p>

    <p>
      <strong>Тип:</strong> {info.type}
    </p>

    <p>
      <strong>Роздільна здатність:</strong>
      <span className={`ml-1 ${getQualityColor(info.megapixels, "mp")}`}>{info.megapixels} МП</span>
      <br />
      <em className="text-[#4A3E30]/70">{getParameterExplanation(info.megapixels, "mp")}</em>
    </p>

    <p>
      <strong>Яскравість:</strong>
      <span
        className={`ml-1 ${getQualityColor(info.brightness, "brightness")}`}
      >{info.brightness}</span>
      <br />
      <em className="text-[#4A3E30]/70">{getParameterExplanation(info.brightness, "brightness")}</em>
    </p>

    <p>
      <strong>Контраст:</strong>
      <span className={`ml-1 ${getQualityColor(info.contrast, "contrast")}`}>{info.contrast}</span>
      <br />
      <em className="text-[#4A3E30]/70">{getParameterExplanation(info.contrast, "contrast")}</em>
    </p>

    <p>
      <strong>Оцінка якості:</strong>
      <span
        className={`ml-1 font-medium ${
          info.quality === "Висока"
            ? "text-green-600"
            : info.quality === "Середня"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {info.quality}
      </span>
      <br />
      <em className="text-[#4A3E30]/70">
        Базується на співвідношенні розміру до мегапікселів (КБ/МП): Вища щільність = вища якість
      </em>
    </p>
  </div>
);