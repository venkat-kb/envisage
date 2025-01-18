import { twMerge } from "tailwind-merge";

const KgOrTonneCo2e: React.FC<{
  val: number;
  className?: string;
  decimals?: number;
  isIntensity?: boolean;
}> = ({ val, decimals = 1, className = "", isIntensity }) => (
  <span className={twMerge("font-semibold", className)}>
    {val > 1000
      ? `${(val / 1000).toFixed(decimals)} MT `
      : `${val.toFixed(decimals)} KG `}
    CO
    <sub>2</sub>e {isIntensity && "/ MT"}
  </span>
);

export default KgOrTonneCo2e;
