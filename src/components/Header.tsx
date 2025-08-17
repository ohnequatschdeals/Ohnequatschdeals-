import React from "react";

type HeaderProps = {
  title?: string;
  onNavigate?: (key: string) => void;
};

export default function Header({ title = "OhneQuatschDeals", onNavigate }: HeaderProps) {
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-semibold">{title}</h1>
      <nav className="flex gap-3">
        <button onClick={() => onNavigate?.("angebote")}>Angebote</button>
        <button onClick={() => onNavigate?.("berater")}>Berater</button>
        <button onClick={() => onNavigate?.("berater-login")}>Login</button>
      </nav>
    </header>
  );
}
