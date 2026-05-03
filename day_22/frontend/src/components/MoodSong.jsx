import { useState, useRef, useEffect } from 'react';
import './MoodSong.scss';

/* ── Custom Audio Player ────────────────────────────────────── */
const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!dragging) {
        setCurrentTime(audio.currentTime);
        setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
      }
    };
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [dragging, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const seek = (e) => {
    const bar = progressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = pct * audio.duration;
      setProgress(pct * 100);
      setCurrentTime(pct * audio.duration);
    }
  };

  const handleProgressMouseDown = (e) => {
    setDragging(true);
    seek(e);
    const onMove = (ev) => seek(ev);
    const onUp = () => { setDragging(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const changeVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.muted = next;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const skipBack = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };
  const skipFwd = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + 10);
  };

  const volIcon = muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';

  return (
    <div className={`custom-player ${playing ? 'is-playing' : ''}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Progress bar */}
      <div className="player-progress-wrap">
        <span className="player-time">{fmt(currentTime)}</span>
        <div
          className="player-progress"
          ref={progressRef}
          onMouseDown={handleProgressMouseDown}
        >
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              <div className="progress-thumb" />
            </div>
          </div>
        </div>
        <span className="player-time">{fmt(duration)}</span>
      </div>

      {/* Controls row */}
      <div className="player-controls">

        {/* Left: volume */}
        <div className="player-volume">
          <button className="vol-btn" onClick={toggleMute} title="Mute">
            <span>{volIcon}</span>
          </button>
          <input
            type="range"
            className="vol-slider"
            min="0" max="1" step="0.02"
            value={muted ? 0 : volume}
            onChange={changeVolume}
          />
        </div>

        {/* Center: transport */}
        <div className="player-transport">
          <button className="ctrl-btn skip-btn" onClick={skipBack} title="-10s">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.66"/>
              <text x="8.5" y="14" fontSize="5.5" fontWeight="bold" stroke="none" fill="currentColor">10</text>
            </svg>
          </button>

          <button className="ctrl-btn play-btn" onClick={togglePlay} title={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
            )}
          </button>

          <button className="ctrl-btn skip-btn" onClick={skipFwd} title="+10s">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-3.66"/>
              <text x="8.5" y="14" fontSize="5.5" fontWeight="bold" stroke="none" fill="currentColor">10</text>
            </svg>
          </button>
        </div>

        {/* Right: spacer to balance */}
        <div className="player-right" />
      </div>
    </div>
  );
};


/* ── Main Component ─────────────────────────────────────────── */
const MoodSong = ({ songs }) => {
  return (
    <div className="mood-song-wrapper">

      {/* Header */}
      <div className="mood-song-header">
        <div className="badge">
          <span className="dot" />
          🎵 Now Playing
        </div>
        <h1>Songs for Your <span className="gradient-text">Mood</span></h1>
        <p className="subtitle">Curated tracks based on your facial expression</p>
        <div className="divider" />
      </div>

      {/* Count */}
      {songs && songs.length > 0 && (
        <p className="song-count">
          Showing <span>{songs.length}</span> track{songs.length !== 1 ? 's' : ''} for you
        </p>
      )}

      {/* Grid */}
      <div className="song-grid">
        {songs && songs.length > 0 ? (
          songs.map((song, i) => (
            <div className="song-card" key={i}>

              <div className="album-art">
                <div className="vinyl" />
                <div className="eq-bars">
                  <span /><span /><span /><span /><span />
                </div>
              </div>

              <div className="card-body">
                <div className="song-number">Track {String(i + 1).padStart(2, '0')}</div>
                <div className="song-title">{song.title}</div>
                <div className="song-artist">
                  <span className="artist-icon">♪</span>
                  {song.artist}
                </div>
              </div>

              <div className="audio-wrap">
                <AudioPlayer src={song.audio} />
              </div>

            </div>
          ))
        ) : (
          <div className="mood-empty">
            <div className="empty-visual">🎧</div>
            <div className="empty-title">No tracks yet</div>
            <p className="empty-sub">Start the camera and let AI read your mood to get personalised song recommendations.</p>
            <span className="empty-hint">👆 Enable camera to begin</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default MoodSong;