import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";


interface WeatherResponse {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: {
      date: string;
      hour: {
        time_epoch: number;
        time: string;
        temp_c: number;
        condition: {
          icon: string;
          text: string;
        };
      }[];
    }[];
  };
}

/**
 * In production move the key to an env var.
 * Vite example: VITE_WEATHER_API_KEY=xxx
 */
const API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY ??
  "c9a0ca46550648b29ce125849232709";

export default function WeatherApp() {
  const [query, setQuery] = useState("Hanoi");
  const [city, setCity] = useState("Hanoi");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Derive a slice of the next 4 hourly entries starting from the *current* hour.
   * If current hour is near the end of the day, we wrap to the start so we always
   * render exactly four cells.
   */
  const nextHours = useMemo(() => {
    if (!data) return [];

    // Current hour from "HH:mm" part of localtime
    const currentHour = Number(
      data.location.localtime.split(" ")[1].split(":")[0]
    );

    const hoursArr = data.forecast.forecastday[0].hour;
    const startIdx = hoursArr.findIndex(
      (h) => Number(h.time.split(" ")[1].split(":")[0]) === currentHour
    );

    const slice = hoursArr.slice(startIdx, startIdx + 4);

    // If we’re at e.g. 22:00 and slice < 4, wrap to beginning of next day
    return slice.length === 4
      ? slice
      : [...slice, ...hoursArr.slice(0, 4 - slice.length)];
  }, [data]);

  /**
   * Fetch weather whenever `city` changes.
   */
  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const safeCity = city.trim() || "Hanoi";
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          safeCity
        )}&days=1&aqi=no&alerts=no&lang=vi`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`(${res.status}) ${errText}`);
        }

        const json: WeatherResponse = await res.json();
        setData(json);
      } catch (e: any) {
        // Ignore abort errors (cleanup)
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();

    // Abort if component re‑renders or unmounts while fetch in‑flight.
    return () => controller.abort();
  }, [city]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) setCity(query.trim());
  }

  // ─── UI Layers ────────────────────────────────────────────────────────────

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading…
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 p-4 text-center">
        {error}
      </div>
    );

  return (
    <div className="max-w-xs mx-auto h-screen bg-gradient-to-b from-sky-200 to-sky-300 p-4 rounded-3xl shadow-2xl overflow-y-auto">
      {/* ─── Search ──────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
          size={18}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city…"
          className="w-full pl-10 py-2 rounded-full bg-white/50 backdrop-blur-sm placeholder-gray-700 text-sm focus:outline-none"
        />
      </form>

      {data && (
        <>
          {/* ─── Current Weather ─────────────────────────────────────────── */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-7xl font-light leading-none">
                {Math.round(data.current.temp_c)}°
              </p>
              <p className="text-xl mt-1 capitalize">
                {data.current.condition.text}
              </p>
            </div>
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="w-16 h-16 mt-2"
            />
          </div>

          {/* ─── Humidity & Wind ─────────────────────────────────────────── */}
          <div className="bg-white/40 rounded-2xl mt-6 p-4 flex justify-between backdrop-blur-sm">
            <div className="text-center flex-1">
              <p className="text-gray-700 text-sm">Humidity</p>
              <p className="text-2xl font-semibold">{data.current.humidity}%</p>
            </div>
            <div className="w-px bg-gray-400/30" />
            <div className="text-center flex-1">
              <p className="text-gray-700 text-sm">Wind</p>
              <p className="text-2xl font-semibold">
                {data.current.wind_kph.toFixed(1)} km/h
              </p>
            </div>
          </div>

          {/* ─── Hourly Forecast ─────────────────────────────────────────── */}
          <div className="bg-white/70 rounded-2xl mt-6 p-4">
            <p className="font-medium mb-4">Now</p>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
              {nextHours.map((h, idx) => {
                const timeLabel =
                  idx === 0 ? "Now" : h.time.split(" ")[1].slice(0, 5);
                return (
                  <div
                    key={h.time_epoch}
                    className="flex flex-col items-center flex-shrink-0"
                  >
                    <img
                      src={h.condition.icon}
                      alt={h.condition.text}
                      className="w-8 h-8"
                    />
                    <p className="text-lg font-medium mt-1">
                      {Math.round(h.temp_c)}°
                    </p>
                    <p className="text-xs text-gray-700">{timeLabel}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
