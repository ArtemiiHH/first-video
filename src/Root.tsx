import { Composition } from "remotion";
import { Showcase } from "./Composition";
import { showcase, timeline } from "./showcase-config";

export const RemotionRoot = () => (
  <Composition
    id="Showcase"
    component={Showcase}
    width={showcase.width}
    height={showcase.height}
    fps={showcase.fps}
    durationInFrames={timeline.duration}
  />
);
