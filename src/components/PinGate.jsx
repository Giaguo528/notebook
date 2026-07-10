import { useState } from "react";

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        setError("密码不对，再试一次");
        setPin("");
        return;
      }
      onUnlock();
    } catch {
      setError("网络出了点问题，再试一次");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#d8d2c4] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs rounded-[24px] bg-[var(--page)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] px-8 py-10 text-center"
      >
        <p className="font-hand text-xl mb-6">Enter your PIN</p>
        <input
          autoFocus
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full text-center text-2xl tracking-[0.4em] bg-transparent border-b-2 border-black/15 focus:border-black/40 outline-none py-2 mb-4"
        />
        {error && <p className="text-sm text-[#e6473f] mb-4">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !pin}
          className="font-mono-caps text-sm tracking-[0.2em] text-[#171310]/90 hover:text-[#171310] transition-colors disabled:opacity-40"
        >
          UNLOCK
        </button>
      </form>
    </div>
  );
}
