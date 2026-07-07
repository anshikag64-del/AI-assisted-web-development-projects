import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Baby, Briefcase, Heart, Wallet, Utensils, MessageCircleHeart,
  Star, Check, Sun, Moon, ArrowRight, PlayCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const startAuth = () => {
  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const redirectUrl = window.location.origin + "/app";
  window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const PROBLEMS = [
  "I forgot the vaccination.",
  "I never get time to study.",
  "I lose track of expenses.",
  "I miss job opportunities.",
  "I feel overwhelmed.",
  "I can't remember when she last slept.",
];

const FEATURES = [
  { icon: Sparkles, title: "AI Daily Planner", desc: "Your day, gently choreographed around baby's sleep, meetings, learning and life.", color: "from-[#7C4DFF] to-[#B388FF]" },
  { icon: Baby, title: "Baby Care", desc: "Feeding, sleep, vaccinations, growth and milestones — never forget the important stuff.", color: "from-[#FFB6C1] to-[#B388FF]" },
  { icon: Briefcase, title: "Career Hub", desc: "AI resume ATS, interview prep, job tracker, cover letters, skill gaps — a career coach in your pocket.", color: "from-[#7C4DFF] to-[#FFB6C1]" },
  { icon: Wallet, title: "Family Finance", desc: "Expenses, budgets, savings goals and bill scanner — clarity without the spreadsheet.", color: "from-[#B388FF] to-[#4CAF50]" },
  { icon: Utensils, title: "Meal Planner", desc: "Healthy recipes, baby food ideas and weekly plans — with a smart shopping list.", color: "from-[#FFB6C1] to-[#FFC107]" },
  { icon: MessageCircleHeart, title: "AI Life Coach", desc: "A calm, thoughtful voice that helps you plan, breathe and grow — anytime.", color: "from-[#7C4DFF] to-[#FFB6C1]" },
];

const TESTIMONIALS = [
  { name: "Aanya M.", role: "Product Manager & mom of two", quote: "I feel like I finally have a co-pilot. My mornings aren't chaos anymore — they're choreographed.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya R.", role: "Returning to work after 3 years", quote: "The ATS analysis found gaps I didn't know I had. Landed 4 interviews in 2 weeks.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { name: "Sara L.", role: "Stay-at-home mom, founder", quote: "The Life Balance Score is oddly emotional — like the app truly sees me. In a good way.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
];

const PRICING = [
  { name: "Free", price: "$0", desc: "For getting started.", perks: ["AI Coach (10 msgs/day)", "Baby tracker", "Job tracker (5)", "Life Balance Score"], cta: "Start Free" },
  { name: "Pro", price: "$12", suffix: "/mo", desc: "For ambitious mothers.", perks: ["Unlimited AI Coach", "Full Career Hub + ATS", "Bill scanner", "All modules", "Priority support"], featured: true, cta: "Try Pro" },
  { name: "Family", price: "$19", suffix: "/mo", desc: "For the whole household.", perks: ["Everything in Pro", "Up to 5 members", "Shared calendars", "Nanny mode"], cta: "Choose Family" },
];

const FAQS = [
  { q: "Is BloomNest AI really designed for mothers?", a: "Yes. Every workflow — from the tone of our AI coach to the way we surface baby tasks — was built with mothers, not for a generic user." },
  { q: "How safe is my data?", a: "Everything is encrypted, tied to your account, and never sold. You can export or delete anytime." },
  { q: "Do I have to use every module?", a: "No. Use only what serves you today. Add more as your life evolves." },
  { q: "Can I share access with my partner or nanny?", a: "On the Family plan, yes — with granular permissions." },
  { q: "How does the AI Life Balance Score work?", a: "It combines your career, family, health, finance and learning activity into one gentle number — with actionable suggestions." },
  { q: "Can I use it for interview prep?", a: "Absolutely. Career Hub includes ATS analysis, cover letter generation and (soon) mock interviews." },
  { q: "Is there a dark mode?", a: "Yes — toggle it from the top-right of your dashboard." },
  { q: "Do you have a mobile app?", a: "Our web app is beautifully mobile-responsive. Native apps are in the works." },
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const enter = () => (user ? navigate("/app") : startAuth());

  return (
    <div className={dark ? "dark" : ""}>
      <div className="relative min-h-screen bg-bloom-hero dark:bg-[#160f22]">
        {/* Nav */}
        <nav className="fixed top-0 inset-x-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7C4DFF] to-[#FFB6C1] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl tracking-tight">BloomNest AI</span>
              </div>
              <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
                <a href="#features" className="hover:text-[#7C4DFF] transition-colors">Features</a>
                <a href="#pricing" className="hover:text-[#7C4DFF] transition-colors">Pricing</a>
                <a href="#faq" className="hover:text-[#7C4DFF] transition-colors">FAQ</a>
              </div>
              <div className="flex items-center gap-3">
                <button
                  data-testid="theme-toggle"
                  onClick={() => setDark((d) => !d)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <Button data-testid="nav-start-btn" onClick={enter} className="rounded-full bg-[#7C4DFF] hover:bg-[#651FFF]">
                  Start Free
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-bloom-radial opacity-70 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div {...fadeUp} className="max-w-3xl">
              <Badge variant="secondary" className="rounded-full px-4 py-1 bg-white/70 dark:bg-white/10 border border-white/50 text-[#7C4DFF] dark:text-[#B388FF]">
                <Sparkles className="w-3.5 h-3.5 mr-2" /> The AI Operating System for Mothers
              </Badge>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-gray-900 dark:text-white font-light">
                Ambitious mothers deserve an <em className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#7C4DFF] to-[#FFB6C1]">intelligent</em> assistant.
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Manage your baby, your career, your health, your finances, and your family from one beautifully calm dashboard — powered by AI that actually understands your life.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button data-testid="hero-start-btn" onClick={enter} size="lg" className="rounded-full bg-[#7C4DFF] hover:bg-[#651FFF] text-white px-8 h-12 shadow-[0_10px_30px_-8px_rgba(124,77,255,0.5)]">
                  Start Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button data-testid="hero-demo-btn" variant="outline" size="lg" className="rounded-full border-gray-300 dark:border-white/20 bg-white/70 dark:bg-white/5 px-8 h-12">
                  <PlayCircle className="mr-2 w-4 h-4" /> Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex -space-x-2">
                  {["1580489944761-15a19d654956", "1544005313-94ddf0286df2", "1573496359142-b8d87734a5a2"].map((id) => (
                    <img key={id} src={`https://images.unsplash.com/photo-${id}?w=80&h=80&fit=crop&crop=face`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                Loved by 12,000+ mothers · 4.9★ average rating
              </div>
            </motion.div>

            {/* Hero mock */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-20 relative"
            >
              <div className="glass rounded-[2rem] p-6 shadow-[0_40px_80px_-40px_rgba(124,77,255,0.35)]">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 rounded-2xl bg-white/80 dark:bg-white/5 p-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Life Balance Score</div>
                    <div className="mt-3 flex items-end gap-4">
                      <span className="font-display text-7xl text-gray-900 dark:text-white">84</span>
                      <span className="text-lg text-gray-500 mb-3">/100</span>
                    </div>
                    <div className="mt-6 grid grid-cols-4 gap-3">
                      {[{k:"Career",v:82},{k:"Baby",v:91},{k:"Health",v:74},{k:"Learning",v:79}].map(x => (
                        <div key={x.k} className="rounded-xl p-3 bg-gradient-to-br from-white to-purple-50 dark:from-white/5 dark:to-white/0 border border-purple-100 dark:border-white/10">
                          <div className="text-xs text-gray-500">{x.k}</div>
                          <div className="mt-1 font-display text-2xl">{x.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-[#7C4DFF] to-[#B388FF] p-6 text-white">
                    <div className="text-xs uppercase tracking-[0.2em] opacity-80">AI Suggestion</div>
                    <p className="mt-3 font-display text-2xl leading-tight">"Practice SQL for 20 minutes today — small steps compound."</p>
                    <div className="mt-6 flex items-center gap-2 text-sm opacity-90">
                      <Sparkles className="w-4 h-4" /> BloomNest Coach
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problems */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">The reality</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gray-900 dark:text-white">Motherhood is beautiful. It's also a lot.</h2>
            </motion.div>
            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {PROBLEMS.map((p, i) => (
                <motion.div key={p} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
                  <Card className="rounded-3xl p-6 bg-white/80 dark:bg-white/5 border-purple-50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="text-2xl">💭</div>
                    <p className="mt-3 font-display text-xl italic text-gray-700 dark:text-gray-200">"{p}"</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp} className="mt-16 text-center">
              <p className="font-display text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#7C4DFF] to-[#FFB6C1]">BloomNest AI solves all of these — in one calm place.</p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Everything, gently connected</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gray-900 dark:text-white">Six modules. One elegant system.</h2>
            </motion.div>
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                    <Card data-testid={`feature-card-${i}`} className="group rounded-3xl p-8 bg-white/80 dark:bg-white/5 border-purple-50 dark:border-white/10 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(124,77,255,0.1)] transition-all duration-300 h-full">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mt-5 font-display text-2xl text-gray-900 dark:text-white">{f.title}</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Loved by mothers</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gray-900 dark:text-white">Real stories, real relief.</h2>
            </motion.div>
            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <Card className="rounded-3xl p-8 bg-white/80 dark:bg-white/5 border-purple-50 dark:border-white/10 h-full">
                    <div className="flex gap-1 text-[#FFC107]">
                      {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="mt-4 font-display text-xl italic text-gray-800 dark:text-gray-100 leading-snug">"{t.quote}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                        <div className="text-sm text-gray-500">{t.role}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Simple pricing</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gray-900 dark:text-white">Start free. Grow beautifully.</h2>
            </motion.div>
            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {PRICING.map((p) => (
                <motion.div key={p.name} {...fadeUp}>
                  <Card data-testid={`pricing-${p.name.toLowerCase()}`} className={`rounded-3xl p-8 h-full border ${p.featured ? "bg-gradient-to-br from-[#7C4DFF] to-[#B388FF] text-white border-transparent shadow-[0_30px_60px_-20px_rgba(124,77,255,0.5)]" : "bg-white/80 dark:bg-white/5 border-purple-50 dark:border-white/10"}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl">{p.name}</h3>
                      {p.featured && <Badge className="rounded-full bg-white/20 text-white border-0">Most loved</Badge>}
                    </div>
                    <div className="mt-4 flex items-end gap-1">
                      <span className="font-display text-5xl">{p.price}</span>
                      {p.suffix && <span className={p.featured ? "opacity-80 mb-2" : "text-gray-500 mb-2"}>{p.suffix}</span>}
                    </div>
                    <p className={`mt-2 text-sm ${p.featured ? "opacity-90" : "text-gray-500"}`}>{p.desc}</p>
                    <ul className="mt-6 space-y-3">
                      {p.perks.map(perk => (
                        <li key={perk} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 mt-0.5 ${p.featured ? "text-white" : "text-[#4CAF50]"}`} /> {perk}
                        </li>
                      ))}
                    </ul>
                    <Button
                      data-testid={`pricing-cta-${p.name.toLowerCase()}`}
                      onClick={enter}
                      className={`mt-8 w-full rounded-full ${p.featured ? "bg-white text-[#7C4DFF] hover:bg-white/90" : "bg-[#7C4DFF] hover:bg-[#651FFF] text-white"}`}
                    >
                      {p.cta}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7C4DFF] font-semibold">Questions</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gray-900 dark:text-white">Honest answers</h2>
            </motion.div>
            <div className="mt-14">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-purple-100 dark:border-white/10">
                    <AccordionTrigger data-testid={`faq-${i}`} className="font-display text-xl text-left hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div {...fadeUp} className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center bg-gradient-to-br from-[#7C4DFF] via-[#B388FF] to-[#FFB6C1] text-white shadow-[0_40px_80px_-30px_rgba(124,77,255,0.6)]">
              <Heart className="w-10 h-10 mx-auto mb-6 opacity-90" />
              <h2 className="font-display text-4xl sm:text-5xl leading-tight">Because every mother deserves an intelligent assistant.</h2>
              <p className="mt-4 text-white/90 max-w-xl mx-auto">Try BloomNest AI free today. Your calmer, more capable tomorrow starts in one click.</p>
              <Button data-testid="cta-final" onClick={enter} size="lg" className="mt-8 rounded-full bg-white text-[#7C4DFF] hover:bg-white/90 px-8 h-12">
                Start Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-purple-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#7C4DFF] to-[#FFB6C1] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg text-gray-800 dark:text-gray-200">BloomNest AI</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#7C4DFF]">Privacy</a>
              <a href="#" className="hover:text-[#7C4DFF]">Terms</a>
              <a href="#" className="hover:text-[#7C4DFF]">Contact</a>
              <a href="#" className="hover:text-[#7C4DFF]">Newsletter</a>
            </div>
            <div>© {new Date().getFullYear()} BloomNest AI. Made with love for mothers.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
