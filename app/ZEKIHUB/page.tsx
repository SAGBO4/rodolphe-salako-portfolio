"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Briefcase,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  KeyRound,
  Layers,
  Lock,
  LogOut,
  Plus,
  Save,
  Shield,
  Trash2,
  Upload,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, type ReactNode } from "react";
import {
  DEFAULT_PORTFOLIO_DATA,
  EducationItem,
  EventItem,
  EventPhoto,
  ExperienceItem,
  PortfolioData,
  ProjectItem,
  StackChipItem,
} from "@/lib/portfolio-data";

type TabKey =
  | "profile"
  | "projects"
  | "events"
  | "experiences"
  | "education"
  | "skills-stack"
  | "supabase"
  | "security";

export default function ZekiHubDashboardPage(): ReactNode {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [sqlSchema, setSqlSchema] = useState("");
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Load initial data
  useEffect(() => {
    async function load() {
      try {
        const authRes = await fetch("/api/admin/auth");
        const authJson = await authRes.json();
        if (!authJson.authenticated) {
          router.push("/ZEKIHUB/login");
          return;
        }

        const dataRes = await fetch("/api/admin/data");
        if (dataRes.ok) {
          const json = await dataRes.json();
          setData(json.data);
          setSupabaseConfigured(json.supabaseConfigured);
          setSqlSchema(json.sqlSchema || "");
        }
      } catch (err) {
        console.error("Failed loading admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setMessage({ type: "error", text: json.error || "Failed to save data" });
      } else {
        setMessage({
          type: "success",
          text: json.supabaseConfigured
            ? "Enregistré et synchronisé avec succès sur Supabase Cloud !"
            : "Enregistré dans le cache local ! (Connectez Supabase pour synchroniser dans le cloud)",
        });
        setSupabaseConfigured(json.supabaseConfigured);
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage({ type: "error", text: "Erreur réseau lors de la sauvegarde." });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/ZEKIHUB/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const copySqlToClipboard = () => {
    if (sqlSchema) {
      void navigator.clipboard.writeText(sqlSchema);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground/70">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
          <span className="text-sm font-medium">Chargement de ZEKI HUB...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-foreground/8 bg-background/85 backdrop-blur-md px-3 py-2.5 sm:px-10 sm:py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="font-serif text-base sm:text-lg font-semibold tracking-tight text-foreground whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              R. SALAKO
            </Link>
            <span className="shrink-0 rounded-md border border-foreground/10 bg-foreground/3 px-2 py-0.5 text-xs font-mono font-semibold text-foreground/70">
              ZEKIHUB
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <span>Voir le site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{saving ? "Sauvegarde..." : "Enregistrer"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer shrink-0"
              title="Déconnexion"
              aria-label="Déconnexion"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {message && (
        <div
          className={`mx-auto mt-4 max-w-xl w-full px-4 py-2.5 rounded-xl text-center text-xs font-medium border shadow-xs transition-all ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Dashboard Body */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-10 sm:py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10 items-start">
          {/* Sidebar Tabs */}
          <aside className="w-full lg:w-60 shrink-0">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              <TabButton
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                icon={User}
                label="Profile & Bio"
              />
              <TabButton
                active={activeTab === "projects"}
                onClick={() => setActiveTab("projects")}
                icon={Briefcase}
                label={`Projects (${data.projects?.length || 0})`}
              />
              <TabButton
                active={activeTab === "events"}
                onClick={() => setActiveTab("events")}
                icon={Calendar}
                label={`Summits & Events (${data.events?.length || 0})`}
              />
              <TabButton
                active={activeTab === "experiences"}
                onClick={() => setActiveTab("experiences")}
                icon={Layers}
                label={`Experiences (${data.experiences?.length || 0})`}
              />
              <TabButton
                active={activeTab === "education"}
                onClick={() => setActiveTab("education")}
                icon={GraduationCap}
                label={`Expertise & Pillars (${data.education?.length || 0})`}
              />
              <TabButton
                active={activeTab === "skills-stack"}
                onClick={() => setActiveTab("skills-stack")}
                icon={Wrench}
                label={`Skills & Stack (${data.stack?.length || 0})`}
              />
              <TabButton
                active={activeTab === "supabase"}
                onClick={() => setActiveTab("supabase")}
                icon={Database}
                label="Supabase DB & Setup"
              />
              <TabButton
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
                icon={Lock}
                label="Security & Password"
              />
            </nav>
          </aside>

          {/* Main Tab Content */}
          <main className="flex-1 w-full min-w-0">
            {activeTab === "profile" && (
              <ProfileEditor data={data} onChange={setData} />
            )}
            {activeTab === "projects" && (
              <ProjectsEditor data={data} onChange={setData} />
            )}
            {activeTab === "events" && (
              <EventsEditor data={data} onChange={setData} />
            )}
            {activeTab === "experiences" && (
              <ExperiencesEditor data={data} onChange={setData} />
            )}
            {activeTab === "education" && (
              <EducationEditor data={data} onChange={setData} />
            )}
            {activeTab === "skills-stack" && (
              <SkillsStackEditor data={data} onChange={setData} />
            )}
            {activeTab === "supabase" && (
              <SupabaseEditor
                data={data}
                sqlSchema={sqlSchema}
                configured={supabaseConfigured}
                copied={copiedSchema}
                onCopy={copySqlToClipboard}
                onImportData={(imported) => {
                  setData(imported);
                  setMessage({
                    type: "success",
                    text: "Sauvegarde JSON chargée dans l'éditeur ! Cliquez sur 'Enregistrer' pour propager.",
                  });
                }}
                onResetDefaults={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.confirm(
                      "Réinitialiser tout le contenu du portfolio vers les données par défaut de Rodolphe Salako ? Cliquez ensuite sur 'Enregistrer'."
                    )
                  ) {
                    setData(DEFAULT_PORTFOLIO_DATA);
                    setMessage({
                      type: "success",
                      text: "Données réinitialisées aux valeurs par défaut. Cliquez sur 'Enregistrer' pour persister.",
                    });
                  }
                }}
              />
            )}
            {activeTab === "security" && (
              <SecurityPasswordEditor />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium tracking-tight transition-all cursor-pointer whitespace-nowrap text-left ${
        active
          ? "bg-foreground text-background shadow-xs font-semibold"
          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. PROFILE & BIO EDITOR                                                    */
/* -------------------------------------------------------------------------- */
function ProfileEditor({
  data,
  onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const p = data.profile;
  const updateP = (key: string, val: unknown) => {
    onChange({ ...data, profile: { ...p, [key]: val } });
  };

  const updateParagraph = (idx: number, text: string) => {
    const updated = [...p.aboutParagraphs];
    updated[idx] = text;
    updateP("aboutParagraphs", updated);
  };

  const addParagraph = () => {
    updateP("aboutParagraphs", [...p.aboutParagraphs, "Nouveau paragraphe..."]);
  };

  const removeParagraph = (idx: number) => {
    updateP(
      "aboutParagraphs",
      p.aboutParagraphs.filter((_, i) => i !== idx)
    );
  };

  const updateStat = (idx: number, field: "label" | "value", val: string) => {
    const updated = [...p.stats];
    const cur = updated[idx];
    if (!cur) return;
    updated[idx] = {
      label: field === "label" ? val : cur.label,
      value: field === "value" ? val : cur.value,
    };
    updateP("stats", updated);
  };

  const addStat = () => {
    updateP("stats", [...p.stats, { label: "Nouveau KPI", value: "100%" }]);
  };

  const removeStat = (idx: number) => {
    updateP(
      "stats",
      p.stats.filter((_, i) => i !== idx)
    );
  };

  return (
    <div className="space-y-8">
      <SectionCard title="Identité & Hero Section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Nom complet"
            value={p.name}
            onChange={(v) => updateP("name", v)}
          />
          <InputGroup
            label="Titre du rôle"
            value={p.role}
            onChange={(v) => updateP("role", v)}
          />
          <InputGroup
            label="Salutation (Page About)"
            value={p.greeting}
            onChange={(v) => updateP("greeting", v)}
          />
          <InputGroup
            label="Intro Hero"
            value={p.heroIntro}
            onChange={(v) => updateP("heroIntro", v)}
          />
          <InputGroup
            label="Titre Hero (Ligne 1)"
            value={p.heroTitle1}
            onChange={(v) => updateP("heroTitle1", v)}
          />
          <InputGroup
            label="Titre Hero (Ligne 2)"
            value={p.heroTitle2}
            onChange={(v) => updateP("heroTitle2", v)}
          />
        </div>

        <div className="mt-4">
          <TextareaGroup
            label="Description Hero"
            value={p.heroDescription}
            onChange={(v) => updateP("heroDescription", v)}
            rows={3}
          />
        </div>
      </SectionCard>

      <SectionCard title="Portraits Officiels & Carte 3D Hero">
        <p className="text-xs text-foreground/60 mb-4">
          Gérez les portraits officiels affichés sur la carte interactive 3D de la page d&apos;accueil (portrait principal au repos et portrait alternatif affiché au survol).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DropzoneImageUploader
            label="Portrait Principal Hero (Carte 3D)"
            value={p.avatarUrl || "/rodolphe.webp"}
            onChange={(v) => updateP("avatarUrl", v)}
            aspectHint="Vertical 3:4 ou carré — Affiché au repos"
          />
          <DropzoneImageUploader
            label="Portrait Alternatif Hero (Au survol)"
            value={p.miniAvatarUrl || "/rodolphe_hover.webp"}
            onChange={(v) => updateP("miniAvatarUrl", v)}
            aspectHint="Expression souriante / angle alternatif — Au survol"
          />
        </div>
      </SectionCard>

      <SectionCard title="Histoire & Mission (Page About)">
        <div className="space-y-4">
          <TextareaGroup
            label="Accroche About (Résumé haut)"
            value={p.aboutTagline}
            onChange={(v) => updateP("aboutTagline", v)}
            rows={2}
          />

          <TextareaGroup
            label="Citation de mission"
            value={p.mission}
            onChange={(v) => updateP("mission", v)}
            rows={2}
          />

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                Paragraphes narratifs détaillés
              </label>
              <button
                type="button"
                onClick={addParagraph}
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 hover:text-foreground cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter un paragraphe
              </button>
            </div>

            <div className="space-y-3">
              {p.aboutParagraphs.map((para, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <textarea
                    value={para}
                    onChange={(e) => updateParagraph(i, e.target.value)}
                    rows={3}
                    className="flex-1 rounded-xl border border-foreground/10 bg-background p-3 text-sm text-foreground focus:border-foreground/30 focus:outline-none"
                  />
                  {p.aboutParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(i)}
                      className="p-2 text-foreground/40 hover:text-red-500 cursor-pointer"
                      title="Supprimer le paragraphe"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Statistiques clés (KPIs)">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-foreground/60">
            Chiffres clés affichés sur la page About et les sections de synthèse.
          </p>
          <button
            type="button"
            onClick={addStat}
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 hover:text-foreground cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter un KPI
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {p.stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-foreground/8 bg-foreground/2 p-3.5 flex gap-2 items-center"
            >
              <input
                value={stat.value}
                onChange={(e) => updateStat(i, "value", e.target.value)}
                placeholder="Ex: 5+"
                className="w-20 rounded-xl border border-foreground/10 bg-background px-3 py-2 text-center text-lg font-bold text-foreground focus:border-foreground/30 focus:outline-none"
              />
              <input
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                placeholder="Ex: Années d'expérience"
                className="flex-1 rounded-xl border border-foreground/10 bg-background px-3 py-2 text-xs font-medium text-foreground focus:border-foreground/30 focus:outline-none"
              />
              {p.stats.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="p-1.5 text-foreground/40 hover:text-red-500 cursor-pointer"
                  title="Supprimer ce KPI"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Coordonnées, Liens & CV">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Adresse Email"
            value={p.email}
            onChange={(v) => updateP("email", v)}
          />
          <InputGroup
            label="Numéro Téléphone / WhatsApp"
            value={p.phone || ""}
            onChange={(v) => updateP("phone", v)}
          />
          <InputGroup
            label="Localisation (Ville, Pays)"
            value={p.location || ""}
            onChange={(v) => updateP("location", v)}
          />
          <InputGroup
            label="Lien Telegram"
            value={p.telegram}
            onChange={(v) => updateP("telegram", v)}
          />
          <InputGroup
            label="Identifiant Telegram (@...)"
            value={p.telegramHandle}
            onChange={(v) => updateP("telegramHandle", v)}
          />
          <InputGroup
            label="Lien X / Twitter"
            value={p.twitter}
            onChange={(v) => updateP("twitter", v)}
          />
          <InputGroup
            label="Identifiant X / Twitter"
            value={p.twitterHandle}
            onChange={(v) => updateP("twitterHandle", v)}
          />
          <InputGroup
            label="Mention de disponibilité"
            value={p.availability}
            onChange={(v) => updateP("availability", v)}
          />
          <div className="sm:col-span-2">
            <DropzoneFileUploader
              label="Fichier CV officiel (PDF)"
              value={p.cvUrl || "/SALAKO_CV.pdf"}
              onChange={(url) => updateP("cvUrl", url)}
              accept="application/pdf"
              hint="Format PDF officiel téléchargeable par les recruteurs et partenaires"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. PROJECTS EDITOR                                                         */
/* -------------------------------------------------------------------------- */
function ProjectsEditor({
  data,
  onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const projects = data.projects || [];

  const updateProject = (id: string, field: keyof ProjectItem, val: unknown) => {
    onChange({
      ...data,
      projects: projects.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
    });
  };

  const addProject = () => {
    const newId = "proj-" + Date.now();
    const newP: ProjectItem = {
      id: newId,
      title: "Nouveau Partenariat Stratégique",
      category: "BUSINESS DEVELOPMENT",
      description: "Détails des négociations, objectifs atteints et croissance générée.",
      meta: "B2B Dealmaking • Strategic Partnerships • Growth",
      image: "/uploads/rodolphe_betconstruct.jpg",
      imageAlt: "Nouveau Projet Stratégique",
      link: "/projects",
      order: projects.length + 1,
    };
    onChange({ ...data, projects: [...projects, newP] });
  };

  const deleteProject = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Supprimer ce projet ?")) return;
    onChange({ ...data, projects: projects.filter((p) => p.id !== id) });
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const reordered = [...projects];
    const [moved] = reordered.splice(index, 1);
    if (!moved) return;
    reordered.splice(targetIndex, 0, moved);
    // Re-index orders
    const updated = reordered.map((item, idx) => ({ ...item, order: idx + 1 }));
    onChange({ ...data, projects: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Réalisations & Projets ({projects.length})
          </h2>
          <p className="text-xs text-foreground/60">
            Affichés dans le mur 3D DriftWall (Accueil) et la galerie AccordionGallery (/projects).
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-1.5 text-xs font-medium text-background hover:opacity-90 cursor-pointer shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter un projet</span>
        </button>
      </div>

      <div className="space-y-5">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="rounded-3xl border border-foreground/8 bg-foreground/2 p-5 sm:p-6 space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 border-b border-foreground/6 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/70">
                  #{idx + 1}
                </span>
                <span className="text-xs font-medium text-foreground/85 truncate max-w-[200px] sm:max-w-[400px]">
                  {proj.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveProject(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 cursor-pointer"
                  title="Monter"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveProject(idx, "down")}
                  disabled={idx === projects.length - 1}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 cursor-pointer"
                  title="Descendre"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 rounded-lg text-foreground/40 hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                  title="Supprimer ce projet"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup
                label="Titre du projet"
                value={proj.title}
                onChange={(v) => updateProject(proj.id, "title", v)}
              />
              <InputGroup
                label="Catégorie / Badge"
                value={proj.category}
                onChange={(v) => updateProject(proj.id, "category", v)}
              />
              <div className="sm:col-span-2">
                <InputGroup
                  label="Métadonnées / Sous-titre"
                  value={proj.meta}
                  onChange={(v) => updateProject(proj.id, "meta", v)}
                />
              </div>
              <InputGroup
                label="Lien cible (ex: /projects ou lien externe)"
                value={proj.link || "/projects"}
                onChange={(v) => updateProject(proj.id, "link", v)}
              />
              <InputGroup
                label="Texte alternatif de l'image (Accessibilité)"
                value={proj.imageAlt || proj.title}
                onChange={(v) => updateProject(proj.id, "imageAlt", v)}
              />
              <div className="sm:col-span-2">
                <DropzoneImageUploader
                  label="Image de couverture du projet"
                  value={proj.image}
                  onChange={(v) => updateProject(proj.id, "image", v)}
                  aspectHint="16:9 recommandé — Glissez-déposez ou collez une URL"
                />
              </div>
            </div>

            <TextareaGroup
              label="Description détaillée"
              value={proj.description}
              onChange={(v) => updateProject(proj.id, "description", v)}
              rows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2b. EVENTS & SUMMITS EDITOR                                                */
/* -------------------------------------------------------------------------- */
function EventsEditor({
  data,
  onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const events = data.events || [];

  const updateEvent = (id: string, field: keyof EventItem, val: unknown) => {
    onChange({
      ...data,
      events: events.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    });
  };

  const addEvent = () => {
    const newId = "event-" + Date.now();
    const newE: EventItem = {
      id: newId,
      slug: newId,
      title: "Nouveau Sommet International",
      eventCategory: "sbwa-dakar",
      eventCategoryLabel: "SBWA+ Summit",
      date: "Dates 2026",
      location: "Hôtel & Ville, Pays",
      city: "Ville",
      country: "Pays",
      role: "Strategic Delegate / Speaker",
      isSpeaker: false,
      badge: "Sommet & Alliances B2B",
      summary: "Description des interventions, conférences et négociations menées au sommet.",
      coverImage: "/events/sbwa-dakar/sbwa_i_am_speaking.webp",
      coverImageAlt: "Nouveau Sommet",
      photos: [],
      order: events.length + 1,
    };
    onChange({ ...data, events: [...events, newE] });
  };

  const deleteEvent = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Supprimer ce sommet de la galerie ?")) return;
    onChange({ ...data, events: events.filter((e) => e.id !== id) });
  };

  const moveEvent = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= events.length) return;
    const reordered = [...events];
    const [moved] = reordered.splice(index, 1);
    if (!moved) return;
    reordered.splice(targetIndex, 0, moved);
    const updated = reordered.map((item, idx) => ({ ...item, order: idx + 1 }));
    onChange({ ...data, events: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-semibold text-foreground">
            Galerie des Sommets &amp; Événements Internationaux
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Gérez les apparitions sur les sommets (SiGMA Africa, SBWA+ Dakar, iGaming Afrika), les photos en haute résolution, les captures de posts et les badges Speaker.
          </p>
        </div>
        <button
          type="button"
          onClick={addEvent}
          className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 transition-opacity cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter un événement</span>
        </button>
      </div>

      <div className="space-y-6">
        {events.map((ev, index) => (
          <div
            key={ev.id}
            className="rounded-2xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-foreground/8">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-foreground/10 text-foreground text-xs font-mono font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-semibold text-sm text-foreground truncate max-w-xs">
                  {ev.title}
                </span>
                {ev.isSpeaker && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-semibold">
                    Speaker 🎙️
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveEvent(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg border border-foreground/10 text-foreground/60 hover:text-foreground disabled:opacity-30 cursor-pointer"
                  title="Monter"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveEvent(index, "down")}
                  disabled={index === events.length - 1}
                  className="p-1.5 rounded-lg border border-foreground/10 text-foreground/60 hover:text-foreground disabled:opacity-30 cursor-pointer"
                  title="Descendre"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteEvent(ev.id)}
                  className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Supprimer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup
                label="Titre du Sommet"
                value={ev.title}
                onChange={(v) => updateEvent(ev.id, "title", v)}
              />
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Catégorie de Filtre
                </label>
                <select
                  value={ev.eventCategory}
                  onChange={(e) => {
                    const cat = e.target.value;
                    const label =
                      cat === "sigma-africa"
                        ? "SiGMA Africa (Cape Town)"
                        : cat === "sbwa-dakar"
                        ? "SBWA+ Summit (Dakar)"
                        : "iGaming Afrika (Nairobi)";
                    updateEvent(ev.id, "eventCategory", cat);
                    updateEvent(ev.id, "eventCategoryLabel", label);
                  }}
                  className="w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30"
                >
                  <option value="sbwa-dakar">SBWA+ Summit (Dakar)</option>
                  <option value="sigma-africa">SiGMA Africa (Cape Town)</option>
                  <option value="igaming-nairobi">iGaming Afrika (Nairobi)</option>
                </select>
              </div>

              <InputGroup
                label="Dates du sommet (ex: 14 - 16 Oct 2024)"
                value={ev.date}
                onChange={(v) => updateEvent(ev.id, "date", v)}
              />

              <InputGroup
                label="Lieu & Ville / Pays (ex: King Fahd Palace Hôtel, Dakar)"
                value={ev.location}
                onChange={(v) => updateEvent(ev.id, "location", v)}
              />

              <InputGroup
                label="Rôle Officiel (ex: Official Speaker & Onlyplay Representative)"
                value={ev.role}
                onChange={(v) => updateEvent(ev.id, "role", v)}
              />

              <InputGroup
                label="Badge Affiché (ex: Speaker Officiel 🎙️)"
                value={ev.badge}
                onChange={(v) => updateEvent(ev.id, "badge", v)}
              />

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground/80">
                  <input
                    type="checkbox"
                    checked={Boolean(ev.isSpeaker)}
                    onChange={(e) => updateEvent(ev.id, "isSpeaker", e.target.checked)}
                    className="rounded border-foreground/20 text-foreground focus:ring-0"
                  />
                  <span>Mettre en valeur comme Speaker Officiel (badge doré et icône micro)</span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <DropzoneImageUploader
                  label="Image de couverture du sommet"
                  value={ev.coverImage}
                  onChange={(v) => updateEvent(ev.id, "coverImage", v)}
                  aspectHint="16:10 ou 16:9 recommandé"
                />
              </div>
            </div>

            <TextareaGroup
              label="Résumé & Enjeux du sommet"
              value={ev.summary}
              onChange={(v) => updateEvent(ev.id, "summary", v)}
              rows={3}
            />

            <div className="pt-3 border-t border-foreground/8 space-y-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  Galerie Photos du Sommet ({ev.photos?.length || 0} photos)
                </h3>
                <p className="text-[11px] text-foreground/50">
                  Glissez-déposez une ou plusieurs photos directement ci-dessous pour enrichir la galerie de ce sommet.
                </p>
              </div>

              <DropzoneMultiPhotoUploader
                photos={ev.photos || []}
                onChange={(newPhotos) => updateEvent(ev.id, "photos", newPhotos)}
                summitTitle={ev.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. EXPERIENCES EDITOR                                                      */
/* -------------------------------------------------------------------------- */
function ExperiencesEditor({
  data,
  onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const experiences = data.experiences || [];

  const updateExp = (id: string, field: keyof ExperienceItem, val: unknown) => {
    onChange({
      ...data,
      experiences: experiences.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    });
  };

  const addExp = () => {
    const newId = "exp-" + Date.now();
    const newE: ExperienceItem = {
      id: newId,
      company: "Nouvelle Entreprise / Marque",
      role: "Business Development & Partnerships Lead",
      period: "2024 – Présent",
      brand: "#7A5AF8",
      description: "Responsabilités stratégiques, partenariats conclus et résultats mesurables.",
      order: experiences.length + 1,
    };
    onChange({ ...data, experiences: [...experiences, newE] });
  };

  const deleteExp = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Supprimer cette expérience ?")) return;
    onChange({ ...data, experiences: experiences.filter((e) => e.id !== id) });
  };

  const moveExp = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const reordered = [...experiences];
    const [moved] = reordered.splice(index, 1);
    if (!moved) return;
    reordered.splice(targetIndex, 0, moved);
    const updated = reordered.map((item, idx) => ({ ...item, order: idx + 1 }));
    onChange({ ...data, experiences: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Expériences & Postes ({experiences.length})
          </h2>
          <p className="text-xs text-foreground/60">
            Affichés sur la page About dans la chronologie de carrière de Rodolphe.
          </p>
        </div>
        <button
          type="button"
          onClick={addExp}
          className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-1.5 text-xs font-medium text-background hover:opacity-90 cursor-pointer shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter une expérience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="rounded-3xl border border-foreground/8 bg-foreground/2 p-5 sm:p-6 space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 border-b border-foreground/6 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: exp.brand || "#7A5AF8" }}
                />
                <span className="text-xs font-semibold text-foreground">
                  #{idx + 1} • {exp.company}
                </span>
                <span className="text-xs text-foreground/50 hidden sm:inline">
                  — {exp.role}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveExp(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 cursor-pointer"
                  title="Monter"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveExp(idx, "down")}
                  disabled={idx === experiences.length - 1}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 cursor-pointer"
                  title="Descendre"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteExp(exp.id)}
                  className="p-1.5 rounded-lg text-foreground/40 hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                  title="Supprimer cette expérience"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputGroup
                label="Entreprise / Marque"
                value={exp.company}
                onChange={(v) => updateExp(exp.id, "company", v)}
              />
              <InputGroup
                label="Intitulé du poste"
                value={exp.role}
                onChange={(v) => updateExp(exp.id, "role", v)}
              />
              <InputGroup
                label="Période"
                value={exp.period}
                onChange={(v) => updateExp(exp.id, "period", v)}
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Couleur de marque (HEX)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={exp.brand || "#7A5AF8"}
                    onChange={(e) => updateExp(exp.id, "brand", e.target.value)}
                    className="h-9 w-12 rounded-lg cursor-pointer border border-foreground/10 bg-background p-0.5"
                  />
                  <input
                    value={exp.brand || "#7A5AF8"}
                    onChange={(e) => updateExp(exp.id, "brand", e.target.value)}
                    className="flex-1 rounded-xl border border-foreground/10 bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputGroup
                  label="Slug d'icône SimpleIcons (optionnel, ex: telegram)"
                  value={exp.slug || ""}
                  onChange={(v) => updateExp(exp.id, "slug", v)}
                />
              </div>
            </div>

            <TextareaGroup
              label="Description & Responsabilités clés"
              value={exp.description}
              onChange={(v) => updateExp(exp.id, "description", v)}
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. EDUCATION & EXPERTISE PILLARS                                           */
/* -------------------------------------------------------------------------- */
function EducationEditor({
  data,
  onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const education = data.education || [];

  const updateEdu = (id: string, field: keyof EducationItem, val: unknown) => {
    onChange({
      ...data,
      education: education.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    });
  };

  const addEdu = () => {
    const newId = "edu-" + Date.now();
    const newE: EducationItem = {
      id: newId,
      school: "Domaine Stratégique",
      degree: "Spécialité & Compétences Clés",
      period: "2024 – Présent",
      tag: "BD",
      brand: "#7A5AF8",
      order: education.length + 1,
    };
    onChange({ ...data, education: [...education, newE] });
  };

  const deleteEdu = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Supprimer ce pilier ?")) return;
    onChange({ ...data, education: education.filter((e) => e.id !== id) });
  };

  const moveEdu = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const reordered = [...education];
    const [moved] = reordered.splice(index, 1);
    if (!moved) return;
    reordered.splice(targetIndex, 0, moved);
    const updated = reordered.map((item, idx) => ({ ...item, order: idx + 1 }));
    onChange({ ...data, education: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Piliers d&apos;Expertise & Formations ({education.length})
          </h2>
          <p className="text-xs text-foreground/60">
            Diplômes, certifications et piliers opérationnels affichés sur la page About.
          </p>
        </div>
        <button
          type="button"
          onClick={addEdu}
          className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-1.5 text-xs font-medium text-background hover:opacity-90 cursor-pointer shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter un pilier</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="rounded-3xl border border-foreground/8 bg-foreground/2 p-5 sm:p-6 space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 border-b border-foreground/6 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-6 px-2.5 rounded-lg text-white items-center justify-center text-[11px] font-bold"
                  style={{ backgroundColor: edu.brand || "#7A5AF8" }}
                >
                  {edu.tag}
                </span>
                <span className="text-xs font-semibold text-foreground">
                  #{idx + 1} • {edu.school}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveEdu(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 cursor-pointer"
                  title="Monter"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveEdu(idx, "down")}
                  disabled={idx === education.length - 1}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 cursor-pointer"
                  title="Descendre"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteEdu(edu.id)}
                  className="p-1.5 rounded-lg text-foreground/40 hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                  title="Supprimer ce pilier"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup
                label="Domaine / Institution"
                value={edu.school}
                onChange={(v) => updateEdu(edu.id, "school", v)}
              />
              <InputGroup
                label="Diplôme / Focus spécialisé"
                value={edu.degree}
                onChange={(v) => updateEdu(edu.id, "degree", v)}
              />
              <InputGroup
                label="Période"
                value={edu.period}
                onChange={(v) => updateEdu(edu.id, "period", v)}
              />
              <div className="grid grid-cols-2 gap-2">
                <InputGroup
                  label="Badge Initiale(s)"
                  value={edu.tag}
                  onChange={(v) => updateEdu(edu.id, "tag", v)}
                />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Couleur
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={edu.brand || "#7A5AF8"}
                      onChange={(e) => updateEdu(edu.id, "brand", e.target.value)}
                      className="h-9 w-10 rounded-lg cursor-pointer border border-foreground/10 bg-background p-0.5"
                    />
                    <input
                      value={edu.brand || "#7A5AF8"}
                      onChange={(e) => updateEdu(edu.id, "brand", e.target.value)}
                      className="flex-1 rounded-xl border border-foreground/10 bg-background px-2 py-2 text-xs font-mono text-foreground focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. SKILLS & STACK EDITOR                                                   */
/* -------------------------------------------------------------------------- */
function SkillsStackEditor({
  data,
  onChange,
}: {
  data: PortfolioData;
  onChange: (d: PortfolioData) => void;
}) {
  const [newSkill, setNewSkill] = useState("");
  const skills = data.skills || [];
  const stack = data.stack || [];

  const addSkill = () => {
    if (!newSkill.trim()) return;
    onChange({ ...data, skills: [...skills, newSkill.trim()] });
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    onChange({ ...data, skills: skills.filter((_, i) => i !== index) });
  };

  const updateChip = (id: string, field: keyof StackChipItem, val: unknown) => {
    onChange({
      ...data,
      stack: stack.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    });
  };

  const addChip = () => {
    const newId = "chip-" + Date.now();
    const newC: StackChipItem = {
      id: newId,
      label: "Nouvel Outil",
      slug: "telegram",
      bg: "#7A5AF8",
      fg: "#ffffff",
      iconUrl: "/icons/telegram.svg",
      order: stack.length + 1,
    };
    onChange({ ...data, stack: [...stack, newC] });
  };

  const deleteChip = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Supprimer cette pastille ?")) return;
    onChange({ ...data, stack: stack.filter((s) => s.id !== id) });
  };

  return (
    <div className="space-y-8">
      {/* Skills */}
      <SectionCard title={`Compétences ("What I do") — ${skills.length} tags`}>
        <div className="flex gap-2 mb-4">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Ajouter une compétence (ex: B2B Deal Structuring)..."
            className="flex-1 rounded-xl border border-foreground/10 bg-background px-3.5 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none"
          />
          <button
            type="button"
            onClick={addSkill}
            className="rounded-xl bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 cursor-pointer"
          >
            Ajouter
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background px-3 py-1.5 text-xs text-foreground/85"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="text-foreground/40 hover:text-red-500 cursor-pointer ml-1"
                aria-label={`Supprimer ${skill}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Stack Chips */}
      <SectionCard title={`Outils & Stack Physique Matter.js (${stack.length} pastilles)`}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-foreground/60">
            Pastilles interactives du moteur physique 2D. Icônes vectorielles locales dans /icons/.
          </p>
          <button
            type="button"
            onClick={addChip}
            className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-1.5 text-xs font-medium text-background hover:opacity-90 cursor-pointer shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Ajouter une pastille</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stack.map((chip) => (
            <div
              key={chip.id}
              className="rounded-2xl border border-foreground/8 bg-foreground/2 p-3.5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  style={{ backgroundColor: chip.bg, color: chip.fg }}
                >
                  {chip.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={chip.iconUrl}
                      alt=""
                      className="h-3.5 w-3.5 object-contain"
                    />
                  ) : null}
                  <span>{chip.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => deleteChip(chip.id)}
                  className="text-foreground/40 hover:text-red-500 cursor-pointer p-1"
                  title="Supprimer la pastille"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <InputGroup
                  label="Nom affiché"
                  value={chip.label}
                  onChange={(v) => updateChip(chip.id, "label", v)}
                />
                <InputGroup
                  label="Slug d'icône"
                  value={chip.slug}
                  onChange={(v) => updateChip(chip.id, "slug", v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">
                    Arrière-plan
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={chip.bg}
                      onChange={(e) => updateChip(chip.id, "bg", e.target.value)}
                      className="h-8 w-10 rounded border border-foreground/10 bg-background cursor-pointer"
                    />
                    <input
                      value={chip.bg}
                      onChange={(e) => updateChip(chip.id, "bg", e.target.value)}
                      className="flex-1 rounded-lg border border-foreground/10 bg-background px-2 py-1.5 text-xs font-mono text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">
                    Couleur texte
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={chip.fg}
                      onChange={(e) => updateChip(chip.id, "fg", e.target.value)}
                      className="h-8 w-10 rounded border border-foreground/10 bg-background cursor-pointer"
                    />
                    <input
                      value={chip.fg}
                      onChange={(e) => updateChip(chip.id, "fg", e.target.value)}
                      className="flex-1 rounded-lg border border-foreground/10 bg-background px-2 py-1.5 text-xs font-mono text-foreground"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <DropzoneImageUploader
                  label="Icône personnalisée (SVG, PNG ou WebP)"
                  value={chip.iconUrl || ""}
                  onChange={(v) => updateChip(chip.id, "iconUrl", v)}
                  aspectHint="SVG vectoriel ou carré recommandé"
                  placeholder="/icons/nom.svg ou https://..."
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. SUPABASE SETUP & BACKUP                                                 */
/* -------------------------------------------------------------------------- */
function SupabaseEditor({
  data,
  sqlSchema,
  configured,
  copied,
  onCopy,
  onImportData,
  onResetDefaults,
}: {
  data: PortfolioData;
  sqlSchema: string;
  configured: boolean;
  copied: boolean;
  onCopy: () => void;
  onImportData: (imported: PortfolioData) => void;
  onResetDefaults: () => void;
}) {
  const downloadBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zekihub-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <SectionCard title="État de la base de données Supabase">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-foreground/10 bg-foreground/2">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  configured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="text-sm font-semibold text-foreground">
                {configured ? "Supabase Connecté & Actif" : "Mode Stockage Local (En attente des clés)"}
              </span>
            </div>
            <p className="mt-1 text-xs text-foreground/60">
              {configured
                ? "Toutes les modifications sont synchronisées en temps réel dans votre base Cloud Supabase."
                : "Les modifications sont sauvegardées dans data/portfolio.json. Dès réception des variables .env, la synchronisation Cloud sera 100% active."}
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Connexion Supabase (3 Étapes Simples)">
        <div className="space-y-4 text-xs text-foreground/80 leading-relaxed">
          <div className="rounded-2xl border border-foreground/8 bg-background p-4 space-y-2">
            <span className="font-semibold text-foreground block">
              Étape 1 : Créer ou ouvrir un projet Supabase
            </span>
            <p className="text-foreground/70">
              Rendez-vous sur{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="underline text-foreground font-medium"
              >
                supabase.com
              </a>{" "}
              et ouvrez votre projet de portfolio.
            </p>
          </div>

          <div className="rounded-2xl border border-foreground/8 bg-background p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Étape 2 : Exécuter le schéma SQL
              </span>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier la requête SQL</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-foreground/70">
              Dans le tableau de bord Supabase, allez dans <strong>SQL Editor</strong> &rarr;{" "}
              <strong>New query</strong>, collez le script ci-dessous et cliquez sur <strong>Run</strong>.
            </p>
            <pre className="mt-2 max-h-40 overflow-y-auto rounded-xl bg-foreground/3 p-3 text-[11px] font-mono text-foreground/70">
              {sqlSchema}
            </pre>
          </div>

          <div className="rounded-2xl border border-foreground/8 bg-background p-4 space-y-2">
            <span className="font-semibold text-foreground block">
              Étape 3 : Renseigner les variables dans .env
            </span>
            <p className="text-foreground/70">
              Dans <strong>Project Settings &rarr; API</strong>, copiez l&apos;URL du projet et votre clé anon (ou service role) dans le fichier <code>.env</code> :
            </p>
            <pre className="mt-2 rounded-xl bg-foreground/3 p-3 text-[11px] font-mono text-foreground/70">
              {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_PASSWORD=your-secret-password-here`}
            </pre>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Sauvegarde, Restauration & Réinitialisation">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-foreground/8 bg-background">
            <div>
              <p className="text-xs font-semibold text-foreground">Exporter le portfolio en JSON</p>
              <p className="text-xs text-foreground/50">
                Téléchargez un instantané complet de vos projets, expériences et coordonnées.
              </p>
            </div>
            <button
              type="button"
              onClick={downloadBackup}
              className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-medium text-foreground hover:bg-foreground/10 cursor-pointer transition-colors"
            >
              Télécharger la sauvegarde (.json)
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-foreground/8 bg-background">
            <div>
              <p className="text-xs font-semibold text-foreground">Restaurer depuis un fichier JSON</p>
              <p className="text-xs text-foreground/50">
                Chargez un fichier de sauvegarde pour remplacer l&apos;ensemble des données.
              </p>
            </div>
            <label className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-medium text-foreground hover:bg-foreground/10 cursor-pointer transition-colors text-center inline-block">
              <span>Importer un JSON</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (evt) => {
                    try {
                      const parsed = JSON.parse(evt.target?.result as string);
                      if (parsed && parsed.profile) {
                        onImportData(parsed);
                      } else {
                        alert("Format de fichier JSON invalide");
                      }
                    } catch {
                      alert("Erreur lors de la lecture du fichier JSON");
                    }
                  };
                  reader.readAsText(file);
                }}
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-red-500/15 bg-red-500/5">
            <div>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                Réinitialisation aux données d&apos;origine
              </p>
              <p className="text-xs text-foreground/50">
                Restaure toutes les données standard de Rodolphe Salako (BD & Partenariats).
              </p>
            </div>
            <button
              type="button"
              onClick={onResetDefaults}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20 cursor-pointer transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* REUSABLE UI HELPERS                                                        */
/* -------------------------------------------------------------------------- */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-foreground/8 bg-foreground/1.5 dark:bg-foreground/3 p-6 sm:p-8 space-y-5">
      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InputGroup({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-foreground/10 bg-background px-3.5 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none transition-colors"
      />
    </div>
  );
}

function TextareaGroup({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-xl border border-foreground/10 bg-background p-3 text-sm text-foreground focus:border-foreground/30 focus:outline-none transition-colors"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CLIENT-SIDE UPLOAD & IMAGE OPTIMIZATION HELPERS                             */
/* -------------------------------------------------------------------------- */

async function compressImageToWebP(file: File, maxDim = 1600): Promise<{ file: File; dataUrl: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = (e.target?.result as string) || "";
      if (!dataUrl) {
        resolve({ file, dataUrl: "" });
        return;
      }
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({ file, dataUrl });
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const webpDataUrl = canvas.toDataURL("image/webp", 0.88);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^.]+$/, ".webp"),
                { type: "image/webp" }
              );
              resolve({ file: compressedFile, dataUrl: webpDataUrl });
            } else {
              resolve({ file, dataUrl: webpDataUrl });
            }
          },
          "image/webp",
          0.88
        );
      };
      img.onerror = () => resolve({ file, dataUrl });
      img.src = dataUrl;
    };
    reader.onerror = () => resolve({ file, dataUrl: "" });
    reader.readAsDataURL(file);
  });
}

async function uploadFileUnified(file: File): Promise<string> {
  const isImage = file.type.startsWith("image/") && file.type !== "image/svg+xml";
  let fileToUpload = file;
  let fallbackDataUrl = "";

  if (isImage) {
    const compressed = await compressImageToWebP(file);
    fileToUpload = compressed.file;
    fallbackDataUrl = compressed.dataUrl;
  }

  try {
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (res.ok && json.success && json.url) {
      return json.url as string;
    }
  } catch (err) {
    console.warn("Upload API failed, falling back to client dataUrl:", err);
  }

  if (fallbackDataUrl) {
    return fallbackDataUrl;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) || "");
    reader.onerror = () => reject(new Error("Impossible de lire le fichier"));
    reader.readAsDataURL(file);
  });
}

/* -------------------------------------------------------------------------- */
/* UNIVERSAL DRAG & DROP IMAGE UPLOADER                                       */
/* -------------------------------------------------------------------------- */
function DropzoneImageUploader({
  value,
  onChange,
  label = "Image",
  aspectHint,
  placeholder = "https://... ou glissez-déposez un fichier",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectHint?: string;
  placeholder?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFileUnified(file);
      onChange(url);
    } catch {
      setError("Erreur lors de l'enregistrement de l'image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">
          {label}{" "}
          {aspectHint && (
            <span className="text-[10px] text-foreground/40 font-normal lowercase">
              ({aspectHint})
            </span>
          )}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-foreground/50 hover:text-foreground underline transition-colors cursor-pointer"
        >
          {showUrlInput ? "Masquer URL directe" : "Saisir une URL"}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleProcessFile(file);
          e.target.value = "";
        }}
        className="hidden"
      />

      {value ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative group rounded-2xl border transition-all overflow-hidden ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30"
              : "border-foreground/12 bg-foreground/2 hover:border-foreground/25"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5">
            <div className="relative h-24 w-36 sm:h-20 sm:w-28 rounded-xl overflow-hidden border border-foreground/10 bg-black/40 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Aperçu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.2";
                }}
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-semibold text-foreground">Image sélectionnée</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-medium border border-emerald-500/30">
                  Prête
                </span>
              </div>
              <p className="text-[11px] text-foreground/50 font-mono truncate max-w-full">
                {value}
              </p>
              <p className="text-[10px] text-foreground/40">
                Glissez une image ici ou cliquez sur Remplacer
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background hover:bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Remplacer</span>
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Supprimer l'image"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {isDragging && (
            <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center text-emerald-300 font-medium text-xs gap-2">
              <Upload className="h-4 w-4 animate-bounce" />
              <span>Déposez pour remplacer l&apos;image</span>
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10 scale-[1.01]"
              : "border-foreground/15 hover:border-foreground/30 bg-foreground/1 hover:bg-foreground/3"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
              <p className="text-xs font-medium text-foreground/80">Téléversement et optimisation WebP...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/70">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Glissez-déposez votre image ici, ou{" "}
                  <span className="text-emerald-400 underline underline-offset-2">parcourir vos fichiers</span>
                </p>
                <p className="text-[11px] text-foreground/45 mt-0.5">
                  JPG, PNG, WebP, SVG jusqu&apos;à 10 Mo (conversion automatique en WebP léger)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {showUrlInput && (
        <div className="pt-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-foreground/10 bg-background px-3.5 py-2 text-xs font-mono text-foreground focus:border-foreground/30 focus:outline-none transition-colors"
          />
        </div>
      )}

      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MULTI-PHOTO GALLERY DRAG & DROP UPLOADER (EVENTS & SUMMITS)                */
/* -------------------------------------------------------------------------- */
function DropzoneMultiPhotoUploader({
  photos = [],
  onChange,
  summitTitle,
}: {
  photos: EventPhoto[];
  onChange: (photos: EventPhoto[]) => void;
  summitTitle: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [manualUrl, setManualUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const multiInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setError(null);
    setUploadProgress({ current: 0, total: files.length });

    const newPhotos: EventPhoto[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      setUploadProgress({ current: i + 1, total: files.length });
      try {
        const url = await uploadFileUnified(file);
        newPhotos.push({
          url,
          caption: `${summitTitle} - Photo ${photos.length + newPhotos.length + 1}`,
          type: "photo",
        });
      } catch (err) {
        console.error("Failed uploading photo:", file.name, err);
      }
    }

    setUploadProgress(null);

    if (newPhotos.length > 0) {
      onChange([...photos, ...newPhotos]);
    } else {
      setError("Aucune photo n'a pu être téléversée.");
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const addManualPhoto = () => {
    if (!manualUrl.trim()) return;
    const newP: EventPhoto = {
      url: manualUrl.trim(),
      caption: `${summitTitle} - Photo ${photos.length + 1}`,
      type: "photo",
    };
    onChange([...photos, newP]);
    setManualUrl("");
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  const movePhoto = (index: number, direction: "left" | "right") => {
    const target = direction === "left" ? index - 1 : index + 1;
    if (target < 0 || target >= photos.length) return;
    const updated = [...photos];
    const [moved] = updated.splice(index, 1);
    if (!moved) return;
    updated.splice(target, 0, moved);
    onChange(updated);
  };

  const toggleType = (index: number) => {
    const cur = photos[index];
    if (!cur) return;
    const nextType: "photo" | "speaker" | "post" =
      cur.type === "photo" ? "speaker" : cur.type === "speaker" ? "post" : "photo";
    const updated = [...photos];
    updated[index] = { ...cur, type: nextType };
    onChange(updated);
  };

  const updateCaption = (index: number, caption: string) => {
    const cur = photos[index];
    if (!cur) return;
    const updated = [...photos];
    updated[index] = { ...cur, caption };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={multiInputRef}
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={(e) => {
          if (e.target.files?.length) void handleFiles(e.target.files);
          e.target.value = "";
        }}
        className="hidden"
      />

      {/* Multi Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => multiInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? "border-emerald-500 bg-emerald-500/10 scale-[1.01]"
            : "border-foreground/15 hover:border-foreground/30 bg-foreground/1 hover:bg-foreground/3"
        }`}
      >
        {uploadProgress ? (
          <div className="flex flex-col items-center gap-2.5 py-3">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-500" />
            <p className="text-xs font-semibold text-foreground">
              Téléversement en cours : {uploadProgress.current} / {uploadProgress.total} photo(s)...
            </p>
            <p className="text-[11px] text-foreground/50">Compression WebP et intégration directe dans la galerie</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-12 w-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/80">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Glissez-déposez vos photos ici{" "}
                <span className="text-emerald-400 underline underline-offset-2">ou cliquez pour choisir</span>
              </p>
              <p className="text-xs text-foreground/50 mt-1">
                Sélectionnez 1 ou plusieurs photos en même temps (JPG, PNG, WebP). Elles seront automatiquement ajoutées à ce sommet.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      {/* Manual URL input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addManualPhoto())}
          placeholder="Ou collez une URL d'image externe (https://...)..."
          className="flex-1 rounded-xl border border-foreground/10 bg-background px-3 py-1.5 text-xs font-mono text-foreground focus:border-foreground/30 focus:outline-none"
        />
        <button
          type="button"
          onClick={addManualPhoto}
          disabled={!manualUrl.trim()}
          className="inline-flex items-center gap-1 rounded-xl border border-foreground/15 bg-background hover:bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground disabled:opacity-40 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Photo Gallery Grid */}
      {photos.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-foreground/60">
            <span>
              {photos.length} photo{photos.length > 1 ? "s" : ""} dans la galerie de ce sommet :
            </span>
            <span className="text-[11px] text-foreground/40">
              Astuce : Cliquez sur le badge d&apos;une photo pour changer son tag (Photo / Speaker / Post)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {photos.map((ph, pi) => {
              const typeLabel =
                ph.type === "speaker"
                  ? "🎙️ Speaker"
                  : ph.type === "post"
                  ? "📱 Post"
                  : "📷 Photo";

              const typeBadgeColor =
                ph.type === "speaker"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : ph.type === "post"
                  ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                  : "bg-blue-500/20 text-blue-400 border-blue-500/30";

              return (
                <div
                  key={pi}
                  className="group relative rounded-xl border border-foreground/10 bg-foreground/3 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full bg-black/40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ph.url}
                      alt={ph.caption || "Photo"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Type badge (clickable) */}
                    <button
                      type="button"
                      onClick={() => toggleType(pi)}
                      className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-xs cursor-pointer shadow-xs transition-colors ${typeBadgeColor}`}
                      title="Cliquer pour changer : Photo / Speaker / Post"
                    >
                      {typeLabel}
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removePhoto(pi)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/75 hover:bg-red-600 text-white/80 hover:text-white transition-colors cursor-pointer"
                      title="Supprimer cette photo"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>

                    {/* Order Controls */}
                    <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => movePhoto(pi, "left")}
                        disabled={pi === 0}
                        className="p-1 rounded bg-black/75 hover:bg-black text-white disabled:opacity-20 cursor-pointer"
                        title="Déplacer à gauche"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePhoto(pi, "right")}
                        disabled={pi === photos.length - 1}
                        className="p-1 rounded bg-black/75 hover:bg-black text-white disabled:opacity-20 cursor-pointer"
                        title="Déplacer à droite"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Caption Editor */}
                  <div className="p-2 border-t border-foreground/8 bg-background">
                    <input
                      type="text"
                      value={ph.caption || ""}
                      onChange={(e) => updateCaption(pi, e.target.value)}
                      placeholder="Légende de la photo..."
                      className="w-full bg-transparent text-[11px] text-foreground focus:outline-none truncate"
                      title={ph.caption}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-xs text-foreground/45 italic">
          Aucune photo dans la galerie de ce sommet. Glissez-déposez des images ci-dessus pour les ajouter.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UNIVERSAL DRAG & DROP FILE UPLOADER (PDF / CV)                             */
/* -------------------------------------------------------------------------- */
function DropzoneFileUploader({
  label,
  value,
  onChange,
  accept = "application/pdf",
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  hint?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFileUnified(file);
      onChange(url);
    } catch {
      setError("Erreur lors de l'enregistrement du document.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">
          {label} {hint && <span className="text-[10px] text-foreground/40 font-normal lowercase">({hint})</span>}
        </label>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleProcessFile(file);
          e.target.value = "";
        }}
        className="hidden"
      />

      {value ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-2xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30"
              : "border-foreground/12 bg-foreground/2"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">Document PDF Officiel</p>
              <p className="text-[11px] text-foreground/50 font-mono truncate">{value}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background hover:bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Consulter</span>
            </a>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background hover:bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Remplacer</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Supprimer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-foreground/15 hover:border-foreground/30 bg-foreground/1 hover:bg-foreground/3"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
              <p className="text-xs font-medium text-foreground/80">Téléversement du fichier PDF...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/70">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Glissez-déposez le fichier PDF du CV ici, ou{" "}
                <span className="text-emerald-400 underline underline-offset-2">parcourir</span>
              </p>
              <p className="text-[11px] text-foreground/45">Format PDF (max 10 Mo)</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}



function SecurityPasswordEditor() {
  const [status, setStatus] = useState<{
    canChange: boolean;
    lastChangedAt: string | null;
    nextAllowedDate: string | null;
    daysRemaining: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/password");
      if (res.ok) {
        const json = await res.json();
        setStatus(json.status);
      }
    } catch (e) {
      console.error("Failed loading password status:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "La confirmation ne correspond pas au nouveau mot de passe.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Le mot de passe doit comporter au moins 8 caractères.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setMessage({
          type: "error",
          text: json.error || "Erreur lors de la modification du mot de passe",
        });
      } else {
        setMessage({
          type: "success",
          text: json.message || "Mot de passe mis à jour avec succès !",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setStatus(json.status);
      }
    } catch (err) {
      console.error("Password update error:", err);
      setMessage({ type: "error", text: "Erreur réseau lors de la mise à jour." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-foreground/60">
        Chargement de l&apos;état de sécurité...
      </div>
    );
  }

  const formattedLastChange = status?.lastChangedAt
    ? new Date(status.lastChangedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Mot de passe par défaut (jamais modifié)";

  const formattedNextAllowed = status?.nextAllowedDate
    ? new Date(status.nextAllowedDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="space-y-8">
      <SectionCard title="Sécurité & Accès au ZEKI HUB">
        <div className="space-y-5">
          {/* Status summary banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-foreground/10 bg-foreground/2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border border-foreground/10 bg-background flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-foreground/80" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Dernier changement : {formattedLastChange}
                </p>
                <p className="text-xs text-foreground/60">
                  Règle de sécurité : Modification autorisée à un intervalle minimal de 2 semaines (14 jours).
                </p>
              </div>
            </div>

            <div>
              {status?.canChange ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Modification autorisée
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                  <Clock className="h-3.5 w-3.5" />
                  Bloqué : {status?.daysRemaining} jour{status && status.daysRemaining > 1 ? "s" : ""} restant{status && status.daysRemaining > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Time lock notice if not eligible */}
          {!status?.canChange && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-800 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Intervalle de 2 semaines en cours</span>
              </div>
              <p className="pl-6">
                Pour garantir la sécurité du compte, un nouveau changement de mot de passe ne sera possible qu&apos;à partir du <strong>{formattedNextAllowed}</strong>.
              </p>
            </div>
          )}

          {message && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium border ${
                message.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Change form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  disabled={!status?.canChange || submitting}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-background px-3.5 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  disabled={!status?.canChange || submitting}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 caractères"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-background px-3.5 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  disabled={!status?.canChange || submitting}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-background px-3.5 py-2 text-sm text-foreground focus:border-foreground/30 focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={!status?.canChange || submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50 cursor-pointer transition-opacity shadow-xs"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>{submitting ? "Mise à jour..." : "Enregistrer le nouveau mot de passe"}</span>
              </button>
            </div>
          </form>
        </div>
      </SectionCard>
    </div>
  );
}
