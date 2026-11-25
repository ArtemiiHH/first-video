import { Easing } from "remotion";

type Entrance = {
  duration?: number;
  pauseAfter?: number;
  easing?: (progress: number) => number;
  x?: number;
  y?: number;
  scale?: number;
  wipe?: "right" | "bottom";
};

type Asset = {
  file: string;
  x: number;
  y: number;
  width: number;
  height: number;
  layer?: number;
  // Use the visible region when the source extends beneath another section.
  focus?: readonly [top: number, bottom: number] | false;
  entrance?: Entrance;
  motion?: "ticker" | "hero-float" | "footer-float";
};

const sectionRise = Easing.bezier(0.34, 0.08, 0.24, 1);

export const showcase = {
  width: 1920,
  height: 1080,
  fps: 60,
  pageHeight: 4113,
  entrance: {
    duration: 0.5,
    pauseAfter: 0.1,
    easing: Easing.bezier(0.22, 0.78, 0.26, 1),
  },
  scroll: {
    padding: 72,
    pixelsPerSecond: 1300,
    minDuration: 0.55,
    maxDuration: 1.05,
    easing: Easing.bezier(0.52, 0, 0.28, 1),
  },
  motion: {
    tickerPixelsPerSecond: 60,
    floatPixels: 26,
    floatPeriod: 5,
    floatSettle: 1,
    floatSettleEasing: Easing.inOut(Easing.sin),
  },
  ending: {
    footerHold: 5,
    zoomDuration: 1.8,
    zoomMargin: 36,
    zoomEasing: Easing.bezier(0.48, 0, 0.26, 1),
    hold: 2,
  },
};

// Coordinates are in reference-image pixels. Layer values only control compositing.
const assets: Asset[] = [
  {
    file: "01-background.png",
    x: 0,
    y: 0,
    width: 1920,
    height: 4113,
    focus: false,
  },
  {
    file: "02-logo.svg",
    x: 50,
    y: 38,
    width: 154,
    height: 36,
    layer: 2,
    entrance: { y: 8 },
  },
  {
    file: "03-nav.svg",
    x: 1382,
    y: 31,
    width: 333,
    height: 50,
    layer: 2,
    entrance: { y: 8 },
  },
  {
    file: "04-yc-tag.png",
    x: 1730,
    y: 31,
    width: 140,
    height: 50,
    layer: 2,
    entrance: { y: 8, scale: 0.98 },
  },
  {
    file: "05-moving-banner.png",
    x: 0,
    y: 112,
    width: 1920,
    height: 40,
    layer: 2,
    motion: "ticker",
    entrance: { wipe: "right" },
  },
  {
    file: "06title.svg",
    x: 58,
    y: 782,
    width: 697,
    height: 234,
    layer: 2,
    entrance: { y: 22, wipe: "bottom" },
  },
  {
    file: "07-3d-asset-hero.png",
    x: 305,
    y: 0,
    width: 1615,
    height: 2147,
    layer: 1,
    focus: [152, 1080],
    motion: "hero-float",
    entrance: { x: 14, y: 14, scale: 1.017, pauseAfter: 5 },
  },
  {
    file: "08-about-us.svg",
    x: 0,
    y: 1271,
    width: 1920,
    height: 1039,
    layer: 3,
    focus: [1271, 2157],
    entrance: { y: 1010, duration: 1, pauseAfter: 1.5, easing: sectionRise },
  },
  {
    file: "09-join-us-empty.svg",
    x: 0,
    y: 2157,
    width: 1920,
    height: 1080,
    layer: 4,
    entrance: { y: 1080, duration: 1, pauseAfter: 1, easing: sectionRise },
  },
  {
    file: "10-join-us-inside-section.svg",
    x: 96,
    y: 2245,
    width: 1729,
    height: 992,
    layer: 5,
    entrance: { y: 992, duration: 0.9, pauseAfter: 1, easing: sectionRise },
  },
  {
    file: "11-join-us-title.svg",
    x: 96,
    y: 2245,
    width: 1728,
    height: 432,
    layer: 6,
    entrance: { y: 19, wipe: "bottom" },
  },
  {
    file: "12-join-us-subtitle.svg",
    x: 149,
    y: 3014,
    width: 652,
    height: 77,
    layer: 6,
    entrance: { y: 12 },
  },
  {
    file: "13-join-us-button.svg",
    x: 1506,
    y: 3009,
    width: 268,
    height: 76,
    layer: 6,
    entrance: { y: 10, scale: 0.97 },
  },
  {
    file: "14-footer-empty.svg",
    x: 0,
    y: 3237,
    width: 1920,
    height: 876,
    layer: 7,
    entrance: { y: 876, duration: 1.2, easing: sectionRise },
  },
  {
    file: "15-copyright-left.svg",
    x: 97,
    y: 4030,
    width: 320,
    height: 18,
    layer: 9,
    entrance: { y: 30 },
  },
  {
    file: "16-copyright-right.svg",
    x: 1524,
    y: 4026,
    width: 300,
    height: 23,
    layer: 9,
    entrance: { y: 30 },
  },
  {
    file: "17-divider.svg",
    x: 96,
    y: 3993,
    width: 1728,
    height: 1,
    layer: 9,
    entrance: { y: 28 },
  },
  {
    file: "18-brand-right.svg",
    x: 1716,
    y: 3365,
    width: 108,
    height: 146,
    layer: 9,
    entrance: { y: 54 },
  },
  {
    file: "19-brand-left.svg",
    x: 96,
    y: 3365,
    width: 450,
    height: 252,
    layer: 9,
    entrance: { y: 60 },
  },
  {
    file: "20-3d-asset-footer.png",
    x: 0,
    y: 3637,
    width: 1920,
    height: 476,
    layer: 8,
    motion: "footer-float",
    entrance: { y: 476, duration: 1.25, easing: sectionRise },
  },
];

const frames = (seconds: number) => Math.round(seconds * showcase.fps);
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

type Scroll = { start: number; end: number; from: number; to: number };
const scrolls: Scroll[] = [];
let cameraTop = 0;
let nextFrame = 0;

const reveals = [...assets]
  .sort((a, b) => parseInt(a.file, 10) - parseInt(b.file, 10))
  .map((asset) => {
    if (asset.focus !== false) {
      const [top, bottom] = asset.focus ?? [asset.y, asset.y + asset.height];
      if (top < cameraTop || bottom > cameraTop + showcase.height) {
        const target = clamp(
          Math.min(
            top,
            Math.max(top - showcase.scroll.padding, bottom - showcase.height),
          ),
          0,
          showcase.pageHeight - showcase.height,
        );

        if (target !== cameraTop) {
          const duration = frames(
            clamp(
              Math.abs(target - cameraTop) / showcase.scroll.pixelsPerSecond,
              showcase.scroll.minDuration,
              showcase.scroll.maxDuration,
            ),
          );
          scrolls.push({
            start: nextFrame,
            end: nextFrame + duration,
            from: cameraTop,
            to: target,
          });
          nextFrame += duration;
          cameraTop = target;
        }
      }
    }

    const entrance = { ...showcase.entrance, ...asset.entrance };
    const start = nextFrame;
    const duration = Math.max(1, frames(entrance.duration));
    nextFrame += duration + frames(entrance.pauseAfter);
    return { ...asset, entrance, start, duration };
  });

const hero = reveals.find((asset) => asset.motion === "hero-float")!;
const footer = reveals[reveals.length - 1];
const heroComplete = hero.start + hero.duration;
const footerComplete = footer.start + footer.duration;
const zoomStart = footerComplete + frames(showcase.ending.footerHold);
const zoomEnd = zoomStart + frames(showcase.ending.zoomDuration);

export const timeline = {
  reveals,
  scrolls: scrolls.reverse(),
  heroHoldEnd: heroComplete + frames(hero.entrance.pauseAfter),
  zoomStart,
  zoomEnd,
  duration: zoomEnd + frames(showcase.ending.hold),
};
