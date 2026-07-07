import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const session_id = params.get("session_id");
    if (!session_id) {
      navigate("/", { replace: true });
      return;
    }
    (async () => {
      try {
        const { data } = await api.post("/auth/session", { session_id });
        setUser(data);
        window.history.replaceState({}, "", "/app");
        navigate("/app", { replace: true, state: { user: data } });
      } catch (e) {
        navigate("/", { replace: true });
      }
    })();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bloom-hero">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full border-4 border-brand-secondary border-t-brand-primary animate-spin mx-auto" />
        <p className="mt-6 font-display text-2xl text-gray-800">Welcoming you in…</p>
      </div>
    </div>
  );
}
