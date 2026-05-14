"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";
type WheelOfFortuneProps = {
  products: Product[];
  winningIndex: number;
};
const COLORS = [
  ["#dc2626", "#ef4444"], // red gradient (deeper)
  ["#ea580c", "#f97316"], // orange gradient (deeper)
  ["#eab308", "#facc15"], // yellow gradient (deeper)
  ["#65a30d", "#84cc16"], // lime gradient (deeper)
  ["#059669", "#10b981"], // emerald gradient (deeper)
  ["#0891b2", "#06b6d4"], // cyan gradient (deeper)
  ["#2563eb", "#3b82f6"], // blue gradient (deeper)
  ["#4f46e5", "#6366f1"], // indigo gradient (deeper)
  ["#9333ea", "#a855f7"], // purple gradient (deeper)
  ["#db2777", "#ec4899"], // pink gradient (deeper)
] as const;
const getSliceStyle = (length: number, index: number): React.CSSProperties => {
  const degrees = 360 / length;
  const rotate = degrees * index;

  const angle = (2 * Math.PI) / length;
  const r = 100;
  const startAngle = -angle / 2;
  const endAngle = angle / 2;
  const numPoints = 20;
  const points = [];

  points.push("50% 50%");
  for (let i = 0; i <= numPoints; i++) {
    const currentAngle = startAngle + (endAngle - startAngle) * (i / numPoints);
    const x = 50 + r * Math.cos(currentAngle);
    const y = 50 + r * Math.sin(currentAngle);
    points.push(`${x}% ${y}%`);
  }
  const [colorStart, colorEnd] = COLORS[index % COLORS.length];
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    // điểm xoay
    transformOrigin: "50% 50%",
    // rotate
    transform: `rotate(${rotate}deg)`,
    background: `
            linear-gradient(115deg, ${colorStart} 0%, ${colorEnd} 100%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%)
        `,
    //Cho 2 gradient phía trên blend với nhau theo mode overlay.
    backgroundBlendMode: "overlay",
    // Đây là thứ cắt element thành hình tùy ý. Tạo hình tam giá
    clipPath: `polygon(${points.join(", ")})`,
  };
};
const getTextStyle = (): React.CSSProperties => {
  const midAngle = 0;
  const radian = midAngle * Math.PI;

  const radius = 35;
  const x = Math.cos(radian) * radius - 20;
  const y = Math.sin(radian) * radius - 5;

  return {
    position: "absolute",
    width: "200px",
    height: "80px",
    wordWrap: "break-word",
    left: `calc(50% + ${x}%)`,
    top: `calc(50% + ${y}%)`,
    color: "white",
    fontSize: "13px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    whiteSpace: "wrap",
    display: "flex",
    flexDirection: "column",
  };
};
const PriceTag = ({ price }: { price: number }) => {
  return (
    <div className="flex items-center">
      <span className="text-white text-base font-extrabold drop-shadow-lg [text-shadow:-2px_-2px_0_#22c55e,2px_-2px_0_#22c55e,-2px_2px_0_#22c55e,2px_2px_0_#22c55e]">
        ${price.toFixed(2)}
      </span>
    </div>
  );
};
function WheelOfFortune({ products, winningIndex }: WheelOfFortuneProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showWinningItem, setShowWinningItem] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [hasSpin, setHasSpin] = useState<boolean>(false);
  const [wheelStyle, setWheelStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    const hasPlayed = localStorage.getItem("has-played-wheel-of-fortune");
    if (!hasPlayed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-200 p-0">
        <DialogTitle>
          <div className="p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-red-500/20 to-orange-500/20 animate-pulse"></div>
            <h2 className="text-2xl font-bold mb-2 animate-bounce">
              Spin & win!
            </h2>
            <p className="text-muted-foreground mb-4 relative animate-pulse">
              Try your luck! Spin the wheel for a change to win amazing prizes!
            </p>
            <div className="absolute -left-10 top-1/2 h-8 w-40 bg-white/20 rotate-45 animate-[shine_2s_infinity]"></div>
          </div>
        </DialogTitle>
        <div className="flex flex-col items-center justify-center p-0 gap-4 bg-gray-50">
          <div
            className={`relative w-87.5 h-87.5 md:w-150 md:h-150 transition-all duration-1000 transform ${showWinningItem ? "scale-0 opacity-0 rotate-100" : "scale-100 opacity-100"}`}
          >
            <div
              className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-5 border-t-transparentr border-r-10 border-r-red-600 border-b-5 border-b-transparent z-20`}
            />
            <div
              className={`absolute inset-0 rounded-full overflow-hidden border-0 border-gray-200 shadow-[0_0_20px_rgba(0,0,0,0.2)] ${!isSpinning && !hasSpin && "animate-[float_3s_ease-in-out_infinite]"}`}
              style={{
                ...wheelStyle,
                animation:
                  !isSpinning && !hasSpin
                    ? "spin 30s linear infinite"
                    : undefined,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product._id}
                  style={getSliceStyle(products.length, index)}
                  className="absolute inset-0"
                >
                  <div style={getTextStyle()} className="truncate px-2">
                    <span className="truncate">{product.title}</span>
                    <PriceTag price={(product.price || 0) * 5} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WheelOfFortune;
