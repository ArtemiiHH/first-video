import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { showcase, timeline } from "./showcase-config";

const clampProgress = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const floatAt = (frame: number, start: number, end: number) => {
  if (frame <= start || frame >= end) return 0;

  const { floatPixels, floatPeriod, floatSettle } = showcase.motion;
  const elapsed = (frame - start) / showcase.fps;
  const phase = (Math.PI * elapsed) / floatPeriod;
  const settleStart = Math.max(start, end - floatSettle * showcase.fps);
  const settle = interpolate(frame, [settleStart, end], [1, 0], {
    ...clampProgress,
    easing: showcase.motion.floatSettleEasing,
  });

  return -floatPixels * Math.sin(phase) ** 2 * settle;
};

const AssetEntrance = ({
  asset,
  tickerVisible,
}: {
  asset: (typeof timeline.reveals)[number];
  tickerVisible: boolean;
}) => {
  const frame = useCurrentFrame();
  const globalFrame = asset.start + frame;
  const { entrance } = asset;
  const progress = interpolate(frame, [0, asset.duration], [0, 1], {
    ...clampProgress,
    easing: entrance.easing,
  });
  const remaining = 1 - progress;
  const inset = remaining * 100;
  const clipPath =
    entrance.wipe === "right"
      ? `inset(0 ${inset}% 0 0)`
      : entrance.wipe === "bottom"
        ? `inset(0 0 ${inset}% 0)`
        : undefined;
  const float =
    asset.motion === "hero-float"
      ? floatAt(globalFrame, asset.start, timeline.heroHoldEnd)
      : asset.motion === "footer-float"
        ? -floatAt(globalFrame, asset.start, timeline.zoomStart)
        : 0;
  const style: CSSProperties = {
    position: "absolute",
    left: asset.x,
    top: asset.y,
    width: asset.width,
    height: asset.height,
    zIndex: asset.layer,
    opacity: progress,
    translate: `${(entrance.x ?? 0) * remaining}px ${(entrance.y ?? 0) * remaining + float}px`,
    scale: 1 + ((entrance.scale ?? 1) - 1) * remaining,
    clipPath,
  };
  const src = staticFile(`assets/${asset.file}`);

  if (asset.motion === "ticker" && tickerVisible) {
    const elapsed = frame / showcase.fps;
    const offset =
      (elapsed * showcase.motion.tickerPixelsPerSecond) % asset.width;
    return (
      <div style={{ ...style, overflow: "hidden" }}>
        {[-asset.width, 0].map((left) => (
          <Img
            key={left}
            src={src}
            style={{
              position: "absolute",
              left,
              width: asset.width,
              height: asset.height,
              translate: `${offset}px 0`,
            }}
          />
        ))}
      </div>
    );
  }

  return <Img src={src} style={style} />;
};

export const Showcase = () => {
  const frame = useCurrentFrame();
  const scroll = timeline.scrolls.find((move) => frame >= move.start);
  const top = scroll
    ? interpolate(frame, [scroll.start, scroll.end], [scroll.from, scroll.to], {
        ...clampProgress,
        easing: showcase.scroll.easing,
      })
    : 0;

  const zoom = interpolate(
    frame,
    [timeline.zoomStart, timeline.zoomEnd],
    [0, 1],
    {
      ...clampProgress,
      easing: showcase.ending.zoomEasing,
    },
  );
  const margin = showcase.ending.zoomMargin;
  const fit = Math.min(
    (showcase.height - 2 * margin) / showcase.pageHeight,
    (showcase.width - 2 * margin) / showcase.width,
  );
  const scale = 1 + (fit - 1) * zoom;
  const x = (showcase.width - showcase.width * scale) / 2;
  const centeredY = (showcase.height - showcase.pageHeight * fit) / 2;
  const y = -top + (centeredY + top) * zoom;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: showcase.width,
          height: showcase.pageHeight,
          transformOrigin: "top left",
          scale,
          translate: `${x}px ${y}px`,
        }}
      >
        {timeline.reveals.map((asset) => (
          <Sequence
            key={asset.file}
            name={asset.file}
            from={asset.start}
            durationInFrames={timeline.duration - asset.start}
            layout="none"
          >
            <AssetEntrance
              asset={asset}
              tickerVisible={top < asset.y + asset.height && zoom === 0}
            />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
