import React, { useState } from "react";

type Props = { onNavigate?: (key: string) => void };

export default function AdminLoginPage({ onNavigate }: Props) {
  const [phone, setPhone] = useState("");

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <label className="block mb-2 text-sm">Telefonnummer (WhatsApp)</label>
      <input
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="+49 ..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        className="w-full px-4 py-2 rounded bg-black text-white"
        onClick={() => onNavigate?.("admin")}
      >
        Einmal-Code anfordern
      </button>
    </div>
  );
}
