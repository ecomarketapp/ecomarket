import localFont from "next/font/local";

export const k2DFont = localFont({
  src: [
    {
      path: "./K2D/K2D-ExtraBold.ttf",
      weight: "900",
    },
    {
      path: "./K2D/K2D-Bold.ttf",
      weight: "700",
    },
    {
      path: "./K2D/K2D-Medium.ttf",
      weight: "500",
    },
    {
      path: "./K2D/K2D-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-k2d",
});

