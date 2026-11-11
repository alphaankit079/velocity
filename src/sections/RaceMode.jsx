
import { useEffect, useRef, useState } from "react";
import {
  Gauge,
  Power,
  Zap,
  Volume2,
  VolumeX,
} from "lucide-react";

function RaceMode() {
  const [engineOn, setEngineOn] = useState(false);
  const [accelerating, setAccelerating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [gear, setGear] = useState(1);

  const idleAudioRef = useRef(null);
  const revAudioRef = useRef(null);

  // Load engine audio
  useEffect(() => {
    const idle = new Audio("/audio/engine-idle.mp3");
    const rev = new Audio("/audio/engine-rev.mp3");

    idle.loop = true;
    rev.loop = true;

    idle.preload = "auto";
    rev.preload = "auto";

    idle.volume = 0.65;
    rev.volume = 0;

    idleAudioRef.current = idle;
    revAudioRef.current = rev;

    return () => {
      idle.pause();
      rev.pause();

      idleAudioRef.current = null;
      revAudioRef.current = null;
    };
  }, []);

  // Engine sound volume
  useEffect(() => {
    const idle = idleAudioRef.current;
    const rev = revAudioRef.current;

    if (!idle || !rev) return;

    idle.volume = engineOn && soundEnabled
      ? accelerating ? 0.15 : 0.65
      : 0;

    rev.volume = engineOn && soundEnabled && accelerating
      ? 0.85
      : 0;
  }, [engineOn, accelerating, soundEnabled]);

  const playIdleSound = () => {
    const idle = idleAudioRef.current;

    if (!idle || !soundEnabled) return;

    idle.play().catch((error) => {
      console.error("Idle audio failed:", error);
    });
  };

  const playRevSound = () => {
    const rev = revAudioRef.current;

    if (!rev || !soundEnabled) return;

    if (rev.paused) {
      rev.play().catch((error) => {
        console.error("Rev audio failed:", error);
      });
    }
  };

  const pauseRevSound = () => {
    revAudioRef.current?.pause();
  };

  // Engine ON / OFF
  const toggleEngine = () => {
    if (!engineOn) {
      setEngineOn(true);
      setAccelerating(false);
      setSpeed(0);
      setRpm(900);
      setGear(1);

      if (soundEnabled) {
        playIdleSound();
      }
    } else {
      setEngineOn(false);
      setAccelerating(false);
      setSpeed(0);
      setRpm(0);
      setGear(1);

      idleAudioRef.current?.pause();
      revAudioRef.current?.pause();

      if (idleAudioRef.current) {
        idleAudioRef.current.currentTime = 0;
      }

      if (revAudioRef.current) {
        revAudioRef.current.currentTime = 0;
      }
    }
  };

  // Sound ON / OFF
  const toggleSound = () => {
    if (soundEnabled) {
      setSoundEnabled(false);
      idleAudioRef.current?.pause();
      revAudioRef.current?.pause();
    } else {
      setSoundEnabled(true);

      if (engineOn) {
        playIdleSound();

        if (accelerating) {
          playRevSound();
        }
      }
    }
  };

  // Accelerator controls
  const startAcceleration = (event) => {
    event.preventDefault();

    if (!engineOn) return;

    setAccelerating(true);

    if (soundEnabled) {
      playRevSound();
    }
  };

  const stopAcceleration = () => {
    setAccelerating(false);
    pauseRevSound();
  };

  // RPM, Speed and Gear simulation
  useEffect(() => {
    if (!engineOn) return;

    const interval = setInterval(() => {
      if (accelerating) {
        setRpm((currentRpm) => {
          let nextRpm = currentRpm + 260;

          if (nextRpm >= 7800 && gear < 7) {
            setGear((currentGear) => Math.min(currentGear + 1, 7));
            nextRpm = 5500;
          } else {
            nextRpm = Math.min(nextRpm, 8500);
          }

          return nextRpm;
        });

        setSpeed((currentSpeed) =>
          Math.min(currentSpeed + 1.4 + gear * 0.15, 350)
        );
      } else {
        setRpm((currentRpm) => {
          if (currentRpm <= 900) return 900;

          const nextRpm = currentRpm - 350;

          if (nextRpm < 2500 && gear > 1) {
            setGear((currentGear) => Math.max(currentGear - 1, 1));
            return 4000;
          }

          return Math.max(nextRpm, 900);
        });

        setSpeed((currentSpeed) =>
          Math.max(currentSpeed - 0.5, 0)
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [engineOn, accelerating, gear]);

  const rpmPercentage = Math.min((rpm / 9000) * 100, 100);

  return (
    <section
      id="race-mode"
      className="relative overflow-hidden bg-[#080808] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:py-36"
    >
      <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e51b23]/10 blur-[120px] sm:h-125 sm:w-125 sm:blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-350">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14 md:mb-16">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e51b23] sm:text-xs sm:tracking-[0.4em]">
            VELOCITY / RACING SYSTEM
          </p>

          <h2 className="display-font text-[clamp(3rem,10vw,6rem)] uppercase leading-[0.95] text-white md:text-8xl">
            Enter The
            <br className="sm:hidden" />{" "}
            <span className="text-[#e51b23]">Race Mode.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-white/40 sm:text-sm sm:leading-7">
            Start the engine. Accelerate. Experience the
            performance of VELOCITY.
          </p>
        </div>

        {/* Dashboard */}
        <div className="border border-white/10 bg-[#0d0d0d] p-4 sm:p-6 md:p-10 lg:p-12">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 sm:mb-10 sm:flex-row sm:items-center sm:justify-between md:mb-12">

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                Digital Cockpit
              </p>

              <h3 className="mt-2 text-sm font-bold tracking-[0.12em] text-white sm:text-lg sm:tracking-widest">
                VELOCITY PERFORMANCE UNIT
              </h3>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-5">

              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    engineOn
                      ? "animate-pulse bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                <span className="text-[9px] uppercase tracking-widest text-white/50 sm:text-[10px]">
                  {engineOn ? "Engine Online" : "Engine Offline"}
                </span>
              </div>

              <button
                onClick={toggleSound}
                aria-label="Toggle sound"
                aria-pressed={soundEnabled}
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/60 transition hover:border-[#e51b23] hover:text-[#e51b23]"
              >
                {soundEnabled ? (
                  <Volume2 size={19} />
                ) : (
                  <VolumeX size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-3 md:gap-6">

            {/* Speed */}
            <div className="min-w-0 border-b border-white/10 pb-7 text-center sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3 md:pr-6">

              <Gauge className="mx-auto mb-4 text-[#e51b23] sm:mb-5" size={25} />

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                Vehicle Speed
              </p>

              <div className="my-3 sm:my-5">
                <span className="display-font text-7xl leading-none text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {String(Math.round(speed)).padStart(3, "0")}
                </span>
              </div>

              <p className="text-[10px] tracking-[0.25em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                KM / H
              </p>
            </div>

            {/* RPM */}
            <div className="min-w-0 border-b border-white/10 pb-7 text-center sm:border-b-0 sm:border-r sm:px-3 sm:pb-0 md:px-6">

              <Zap className="mx-auto mb-4 text-[#e51b23] sm:mb-5" size={25} />

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                Engine RPM
              </p>

              <div className="my-3 sm:my-5">
                <span className="display-font text-7xl leading-none text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {(rpm / 1000).toFixed(1)}
                </span>
              </div>

              <p className="text-[10px] tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                X 1000 RPM
              </p>

              <div className="mx-auto mt-5 h-1.5 max-w-55 overflow-hidden bg-white/10 sm:mt-6">
                <div
                  className="h-full bg-[#e51b23] transition-all duration-100"
                  style={{ width: `${rpmPercentage}%` }}
                />
              </div>
            </div>

            {/* Gear */}
            <div className="min-w-0 text-center sm:pl-3 md:pl-6">

              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 sm:mb-5 sm:text-xs sm:tracking-[0.3em]">
                Transmission
              </p>

              <div className="my-3 sm:my-5">
                <span className="display-font text-7xl leading-none text-[#e51b23] sm:text-6xl md:text-7xl lg:text-8xl">
                  {gear}
                </span>
              </div>

              <p className="text-[10px] tracking-[0.25em] text-white/40 sm:text-xs sm:tracking-[0.3em]">
                CURRENT GEAR
              </p>
            </div>
          </div>

          {/* RPM Bar */}
          <div className="mt-9 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8 md:mt-16">

            <div className="mb-4 flex justify-between gap-3 text-[9px] uppercase tracking-widest text-white/40 sm:text-[10px]">
              <span>Engine Load</span>
              <span className="tabular-nums">{rpm} RPM</span>
            </div>

            <div className="flex h-2 gap-0.5 sm:gap-1">
              {Array.from({ length: 30 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-w-0 flex-1 transition-colors duration-100 ${
                    index < (rpmPercentage / 100) * 30
                      ? index > 24
                        ? "bg-red-500"
                        : "bg-[#e51b23]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6">

            <button
              onClick={toggleEngine}
              className={`flex min-h-13.5 w-full items-center justify-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 sm:w-auto sm:px-8 sm:text-xs sm:tracking-[0.2em] md:px-10 ${
                engineOn
                  ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  : "bg-[#e51b23] text-white hover:bg-white hover:text-black"
              }`}
            >
              <Power size={18} />
              {engineOn ? "Stop Engine" : "Start Engine"}
            </button>

            <button
              onPointerDown={startAcceleration}
              onPointerUp={stopAcceleration}
              onPointerLeave={stopAcceleration}
              onPointerCancel={stopAcceleration}
              onContextMenu={(event) => event.preventDefault()}
              disabled={!engineOn}
              aria-label="Hold to accelerate"
              className="flex min-h-13.5 w-full touch-none select-none items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-[#e51b23] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-8 sm:text-xs sm:tracking-[0.2em] md:px-10"
            >
              <Zap size={18} />
              Hold Accelerator
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-9 border-t border-white/10 pt-6 text-center sm:mt-12">
            <p className="text-[8px] leading-5 uppercase tracking-[0.15em] text-white/30 sm:text-[10px] sm:tracking-[0.25em]">
              VELOCITY DIGITAL SIMULATION — NOT REAL VEHICLE TELEMETRY
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RaceMode;
