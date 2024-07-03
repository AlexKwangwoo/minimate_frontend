import { ClipLoader } from "react-spinners";

interface SingleLoaderProps {
  loadingSize: number;
  color?: string;
  extraStyle?: string;
}

export default function SingleLoader({
  loadingSize,
  color = "#ffffff",
  extraStyle,
}: SingleLoaderProps) {
  return (
    <div className={extraStyle}>
      <ClipLoader color={color} size={loadingSize} speedMultiplier={0.7} />
    </div>
  );
}
