import { useState } from "react";

interface AuthModalProps {
  initialMode: "login" | "register";
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export default function AuthModal({
  initialMode,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const displayName = name.trim() || email.split("@")[0] || "Student";
    onSuccess(displayName);
  };

  return (
    <div className="auth-modal" role="dialog" aria-modal="true" aria-label={initialMode}>
      <form onSubmit={submit} className="auth-modal-card">
        <h2>{initialMode === "login" ? "Welcome back" : "Create account"}</h2>
        {initialMode === "register" && (
          <input
            aria-label="Name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        )}
        <input
          aria-label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input aria-label="Password" type="password" placeholder="Password" required />
        <button type="submit">{initialMode === "login" ? "Log in" : "Create account"}</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}
