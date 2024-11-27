"use client";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

export default function VideoPlayerComponent({
  url,
  title,
}: Readonly<{ url: string; title: string }>) {
  return (
    <MediaPlayer title={title} src={url}>
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
