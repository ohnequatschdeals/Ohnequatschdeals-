import React from "react";

type Props = {
  message?: string;
  position?: "left" | "right";
};

export default function AIConsultantFloatingAvatar({
  message = "Hi! Wie kann ich helfen?",
  position = "right",
}: Props) {
  return (
    <div
      className={`fixed bottom-6 ${position === "right" ? "right-6" : "left-6"} 
                  flex items-center gap-3 p-3 rounded-xl border bg-white/80 backdrop-blur`}
    >
      <div className="w-10 h-10 rounded-full border" />
      <div className="text-sm">{message}</div>
    </div>
  );
}
