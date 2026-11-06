import { useEffect, useRef, useState } from "react";
import "./App.css";

const tracks = [
  { title: "Babydoll", artist: "Dominic Fike", url: "/music/Babydoll - Dominic Fike.mp3", art: "#c0475a" },
  { title: "Diet Pepsi", artist: "Addison Rae", url: "/music/Diet Pepsi - Addison Rae.mp3", art: "#d9729c" },
  { title: "Earrings", artist: "Malcolm Todd", url: "/music/Earrings - Malcolm Todd.mp3", art: "#4a6fa5" },
  { title: "Flatline", artist: "Justin Bieber", url: "/music/Flatline - Justin Bieber.mp3", art: "#7a5ca8" },
  { title: "From The Start", artist: "Laufey", url: "/music/From The Start - Laufey.mp3", art: "#c9893f" },
  { title: "One Of The Girls", artist: "The Weeknd", url: "/music/One Of The Girls - The Weeknd.mp3", art: "#a83f55" },
  { title: "Reflections", artist: "The Neighbourhood", url: "/music/Reflections - The Neighbourhood.mp3", art: "#3f7a8a" },
];

const fmt = (s) => {
  if (!isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function App() {
  const audioRef = useRef(null);
  const titleRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [theme, setTheme] = useState("pink");
  const [menu, setMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const track = tracks[index];

  useEffect(() => {
    const a = audioRef.current;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, index]);

  useEffect(() => {
    const el = titleRef.current;
    setScroll(el.offsetWidth > el.parentElement.clientWidth);
  }, [index]);

  const next = () => setIndex((index + 1) % tracks.length);
  const prev = () => setIndex((index - 1 + tracks.length) % tracks.length);
  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <div className={`app ${playing ? "playing" : ""}`} data-theme={theme}>
      <div className="bow">🎀</div>
      <div className="window">
        <div className="titlebar">
          <span className="name">crispy</span>
          <button className="tb" onClick={() => setMenu(!menu)}>⚙</button>
          <button className="tb">_</button>
          <button className="tb">□</button>
          <button className="tb">✕</button>
        </div>

        {menu && (
          <div className="menu">
            <div>theme</div>
            <button className={theme === "pink" ? "on" : ""} onClick={() => setTheme("pink")}>pink</button>
            <button className={theme === "blue" ? "on" : ""} onClick={() => setTheme("blue")}>blue</button>
          </div>
        )}

        <svg className="scene" viewBox="0 0 160 110" shapeRendering="crispEdges">
          <rect className="wall" width="160" height="110" />
          <polygon className="floor" points="0,80 160,80 160,110 0,110" />
          <rect className="winframe" x="78" y="8" width="50" height="40" />
          <rect className="sky" x="81" y="11" width="44" height="34" />
          <rect className="winframe" x="102" y="11" width="2" height="34" />
          <circle className="moon" cx="114" cy="21" r="6" />
          <circle className="sky" cx="117" cy="19" r="5" />
          <rect className="star" x="86" y="16" width="2" height="2" />
          <rect className="star" x="94" y="30" width="2" height="2" />
          <rect className="star" x="108" y="38" width="2" height="2" />
          <rect className="star" x="120" y="34" width="2" height="2" />
          <rect className="stem" x="138" y="56" width="2" height="8" />
          <rect className="stem" x="143" y="52" width="2" height="12" />
          <circle className="tulip" cx="139" cy="55" r="4" />
          <circle className="tulip" cx="144" cy="51" r="4" />
          <rect className="vase" x="132" y="62" width="16" height="22" />

          <polygon className="tt-top" points="30,64 114,64 128,92 16,92" />
          <rect className="tt-front" x="16" y="92" width="112" height="9" />
          <ellipse className="platter" cx="72" cy="79" rx="40" ry="11" />
          <g transform="translate(72 79) scale(1 0.27)">
            <g className="record">
              <circle className="vinyl" r="36" />
              <circle className="groove" r="26" />
              <circle className="label" r="12" />
              <circle className="notch" cx="6" cy="0" r="2.5" />
            </g>
          </g>
          <g className="arm">
            <line className="arm-line" x1="118" y1="66" x2="96" y2="82" />
            <rect className="arm-head" x="92" y="80" width="6" height="5" />
            <circle className="arm-base" cx="118" cy="66" r="4" />
          </g>
          <polygon className="lid" points="22,62 110,62 118,32 34,32" />
        </svg>

        <div className="card">
          <div className="art" style={{ background: track.art }}>♪</div>
          <div className="info">
            <small>now playing...</small>
            <div className="title-wrap">
              <span ref={titleRef} className={`title ${scroll ? "scroll" : ""}`}>{track.title}</span>
            </div>
            <small>by {track.artist}</small>
          </div>
        </div>

        <div className="controls">
          <button className="ctl" onClick={prev}>⏮</button>
          <button className="ctl" onClick={() => setPlaying(!playing)}>{playing ? "⏸" : "▶"}</button>
          <button className="ctl" onClick={next}>⏭</button>
        </div>

        <div className="progress">
          <div className="track">
            <div className="fill" style={{ width: `${pct}%` }} />
            <span className="starhandle" style={{ left: `${pct}%` }}>★</span>
            <input
              type="range" min="0" max={duration || 0} step="0.1" value={time}
              onChange={(e) => { audioRef.current.currentTime = e.target.value; setTime(+e.target.value); }}
            />
          </div>
          <div className="times"><span>{fmt(time)}</span><span>{fmt(duration)}</span></div>
        </div>
      </div>
      <div className="heart">♥</div>

      <audio
        ref={audioRef}
        src={encodeURI(track.url)}
        onTimeUpdate={(e) => setTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={next}
      />
    </div>
  );
}