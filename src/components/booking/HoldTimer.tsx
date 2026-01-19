"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface HoldTimerProps {
  expiresAt: Date;
  onExpire?: () => void;
}

export function HoldTimer({ expiresAt, onExpire }: HoldTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));
      return diff;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const left = calculateTimeLeft();
      setTimeLeft(left);

      if (left <= 0) {
        setExpired(true);
        clearInterval(timer);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (expired) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <span className="text-red-800 font-medium">
          Sua reserva expirou. Por favor, faca uma nova busca.
        </span>
      </div>
    );
  }

  const isLow = timeLeft < 120; // less than 2 minutes

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        isLow
          ? "bg-yellow-50 border border-yellow-200"
          : "bg-[var(--color-light)] border border-[var(--border)]"
      }`}
    >
      <Clock
        className={`w-5 h-5 ${isLow ? "text-yellow-600" : "text-[var(--color-accent)]"}`}
      />
      <span className={isLow ? "text-yellow-800" : "text-[var(--color-text)]"}>
        Reserva mantida por{" "}
        <span className="font-bold tabular-nums">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </span>
    </div>
  );
}
