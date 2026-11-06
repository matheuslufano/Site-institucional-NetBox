type Player = { destroy: () => void; getPlayerState: () => number };
type PlayerOptions = {
  events: {
    onStateChange: (event: { data: number }) => void;
    onReady: (event: { target: Player }) => void;
  };
};
type YouTube = {
  Player: new (iframe: HTMLIFrameElement, options: PlayerOptions) => Player;
};
type YouTubeWindow = Window & {
  YT?: YouTube;
  onYouTubeIframeAPIReady?: () => void;
};
let loading: Promise<YouTube> | null = null;

/** Official IFrame API; callers count PLAYING (1), never iframe load or thumbnail clicks. */
export function youtubeApi() {
  const target = window as YouTubeWindow;
  if (target.YT?.Player) return Promise.resolve(target.YT);
  if (loading) return loading;
  loading = new Promise<YouTube>((resolve, reject) => {
    const previous = target.onYouTubeIframeAPIReady;
    const timeout = setTimeout(() => {
      loading = null;
      reject(new Error("API de vídeo indisponível."));
    }, 20000);
    target.onYouTubeIframeAPIReady = () => {
      previous?.();
      clearTimeout(timeout);
      if (target.YT) resolve(target.YT);
    };
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        clearTimeout(timeout);
        loading = null;
        reject(new Error("API de vídeo indisponível."));
      };
      document.head.append(script);
    }
  });
  return loading;
}
