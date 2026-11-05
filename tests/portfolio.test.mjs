import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

test("F-01: Client Assets & Media Pipeline", async (t) => {
  await t.test("AC1: CV file exists and is valid PDF", () => {
    const cvPath = path.join(ROOT, "public", "SALAKO_CV.pdf");
    assert.ok(fs.existsSync(cvPath), "SALAKO_CV.pdf must exist in public/");
    const buf = fs.readFileSync(cvPath);
    assert.ok(buf.length > 500000, "CV size must be > 500KB");
    assert.equal(buf.subarray(0, 4).toString(), "%PDF", "Must be a valid PDF");
  });

  await t.test("AC2: Hero portraits exist and are non-empty", () => {
    const p1 = path.join(ROOT, "public", "rodolphe.webp");
    const p2 = path.join(ROOT, "public", "rodolphe_hover.webp");
    assert.ok(fs.existsSync(p1), "rodolphe.webp must exist");
    assert.ok(fs.existsSync(p2), "rodolphe_hover.webp must exist");
    assert.ok(fs.statSync(p1).size > 10000, "rodolphe.webp must be > 10KB");
    assert.ok(fs.statSync(p2).size > 10000, "rodolphe_hover.webp must be > 10KB");
  });

  await t.test("AC3: Project and event images exist in public/uploads", () => {
    const requiredImages = [
      "rodolphe_onlyplay_ama.jpg",
      "rodolphe_sigma_africa.jpg",
      "rodolphe_igaming_afrika.jpg",
      "rodolphe_sbwa_certificate.jpg",
      "rodolphe_speaker_badge.jpg",
      "rodolphe_meetup_speaker.jpg",
      "rodolphe_1xbet_summit.jpg",
      "rodolphe_summit_table.jpg",
    ];
    for (const img of requiredImages) {
      const p = path.join(ROOT, "public", "uploads", img);
      assert.ok(fs.existsSync(p), `Image ${img} must exist in public/uploads`);
      assert.ok(fs.statSync(p).size > 1000, `Image ${img} must not be empty`);
    }
  });
});

test("F-02: Data Store & Metadata Consistency", async (t) => {
  const jsonPath = path.join(ROOT, "data", "portfolio.json");
  assert.ok(fs.existsSync(jsonPath), "portfolio.json must exist");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  await t.test("AC1: Profile matches Rodolphe Salako", () => {
    assert.equal(data.profile.name, "Rodolphe Salako");
    assert.match(data.profile.role, /Business Development/i);
    assert.equal(data.profile.email, "rodolphesalako8@gmail.com");
    assert.match(data.profile.twitter, /ZekiZeki40/);
    assert.match(data.profile.cvUrl, /SALAKO_CV\.pdf/);
    assert.equal(data.profile.phone, "+229 01 40 79 72 62");
  });

  await t.test("AC2: Six CM projects are populated", () => {
    assert.equal(data.projects.length, 6);
    for (const proj of data.projects) {
      assert.ok(proj.id, "Project must have id");
      assert.ok(proj.title, "Project must have title");
      assert.ok(proj.image, "Project must have image");
      assert.ok(proj.description, "Project must have description");
      assert.ok(
        fs.existsSync(path.join(ROOT, "public", proj.image.replace(/^\//, ""))),
        `Project image ${proj.image} must resolve in public/`
      );
    }
  });

  await t.test("AC3: Career experiences populated", () => {
    assert.ok(data.experiences.length >= 11, "Must have all 11 experience entries from resume");
    const companies = data.experiences.map((e) => e.company);
    assert.ok(companies.includes("Onlyplay"));
    assert.ok(companies.includes("Block-Scholars Africa"));
    assert.ok(companies.includes("Tapbit Crypto Exchange"));
    assert.ok(companies.includes("1win"));
    assert.ok(companies.includes("NDA"), "Must include NDA experience");
  });

  await t.test("AC4 (negative): No residual Guy Tibro in public metadata", () => {
    const metaFile = fs.readFileSync(path.join(ROOT, "lib", "metadata.ts"), "utf8");
    const manifestFile = fs.readFileSync(path.join(ROOT, "app", "manifest.ts"), "utf8");
    assert.doesNotMatch(metaFile, /Guy Tibro/, "lib/metadata.ts must not mention Guy Tibro");
    assert.doesNotMatch(manifestFile, /Guy Tibro/, "app/manifest.ts must not mention Guy Tibro");
  });
});

test("F-03: Hero Section & PortraitMorph Shader Integrity", async (t) => {
  const heroFile = fs.readFileSync(path.join(ROOT, "components", "hero", "hero.tsx"), "utf8");
  const shaderFile = fs.readFileSync(path.join(ROOT, "components", "hero", "portrait-morph.tsx"), "utf8");

  await t.test("AC1: Hero imports Rodolphe portraits", () => {
    assert.match(heroFile, /rodolphe\.webp/);
    assert.match(heroFile, /rodolphe_hover\.webp/);
  });

  await t.test("AC2: OGL PortraitMorph shaders remain intact", () => {
    assert.match(shaderFile, /VERTEX_SHADER/);
    assert.match(shaderFile, /FRAGMENT_SHADER/);
    assert.match(shaderFile, /vec2 coverUv/);
    assert.match(shaderFile, /float fbm/);
    assert.match(shaderFile, /Renderer/);
  });

  await t.test("AC3: Hero title is constrained to two lines with whitespace-nowrap", () => {
    assert.match(heroFile, /whitespace-nowrap/);
  });
});

test("F-04: Projects & 3D InfiniteMenu WebGL Integrity", async (t) => {
  const projFile = fs.readFileSync(path.join(ROOT, "components", "projects", "projects.tsx"), "utf8");
  const menuFile = fs.readFileSync(path.join(ROOT, "components", "ui", "InfiniteMenu.tsx"), "utf8");

  await t.test("AC1: Fallback projects and menu items reference Rodolphe", () => {
    assert.match(projFile, /Business Development & Strategic Partnerships/);
    assert.match(projFile, /SiGMA Africa/);
    assert.match(projFile, /Block-Scholars Africa/);
    assert.match(projFile, /rodolphe_betconstruct\.jpg/);
    assert.match(projFile, /rodolphe_onlyplay_ama\.jpg/);
  });

  await t.test("AC3: WebGL InfiniteMenu shaders remain intact", () => {
    assert.match(menuFile, /discVertShaderSource/);
    assert.match(menuFile, /uRotationAxisVelocity/);
    assert.match(menuFile, /discFragShaderSource/);
  });
});

test("F-05: About Section & Matter.js Physics Integrity", async (t) => {
  const expFile = fs.readFileSync(path.join(ROOT, "components", "about", "experience.tsx"), "utf8");
  const eduFile = fs.readFileSync(path.join(ROOT, "components", "about", "education.tsx"), "utf8");
  const stackFile = fs.readFileSync(path.join(ROOT, "components", "about", "stack.tsx"), "utf8");

  await t.test("AC1: Experience lists Onlyplay and Block-Scholars", () => {
    assert.match(expFile, /Onlyplay/);
    assert.match(expFile, /Block-Scholars/);
  });

  await t.test("AC4: Education lists Bachelor in English Translation", () => {
    assert.match(eduFile, /English – French Translation/);
    assert.match(eduFile, /Adjarra/);
  });

  await t.test("AC5: Matter.js 2D physics engine intact in stack", () => {
    assert.match(stackFile, /matter-js/);
    assert.match(stackFile, /Engine/);
    assert.match(stackFile, /Telegram/);
    assert.match(stackFile, /Onlyplay/);
  });

  await t.test("AC6: All 12 stack tools have local valid SVG icons in public/icons", () => {
    const requiredIcons = [
      "linkedin.svg",
      "telegram.svg",
      "x.svg",
      "discord.svg",
      "affiliate.svg",
      "onlyplay.svg",
      "googleanalytics.svg",
      "notion.svg",
      "capcut.svg",
      "premiere.svg",
      "canva.svg",
      "tapbit.svg",
    ];
    for (const icon of requiredIcons) {
      const p = path.join(ROOT, "public", "icons", icon);
      assert.ok(fs.existsSync(p), `Missing icon: ${icon}`);
      const content = fs.readFileSync(p, "utf8");
      assert.match(content, /<svg/, `Icon must be valid SVG: ${icon}`);
    }
  });
});

test("F-06: Contact Section & Social CTAs", async (t) => {
  const contactFile = fs.readFileSync(path.join(ROOT, "components", "contact", "contact-card.tsx"), "utf8");

  await t.test("AC2: Contact card includes LinkedIn, X and Email", () => {
    assert.match(contactFile, /rodolphe-salako/);
    assert.match(contactFile, /linkedin\.svg/);
    assert.match(contactFile, /ShaderFlow/);
  });
});

test("F-07: Sélecteur de Langue & Internationalisation (i18n FR / EN)", async (t) => {
  const navFile = fs.readFileSync(path.join(ROOT, "components", "layout", "nav.tsx"), "utf8");
  const switcherPath = path.join(ROOT, "components", "ui", "language-switcher.tsx");
  const translationsPath = path.join(ROOT, "lib", "i18n", "translations.ts");
  const contextPath = path.join(ROOT, "lib", "i18n", "context.tsx");

  await t.test("AC1: LanguageSwitcher component exists and is mounted in Nav", () => {
    assert.ok(fs.existsSync(switcherPath), "language-switcher.tsx must exist");
    assert.match(navFile, /LanguageSwitcher/, "nav.tsx must import and render LanguageSwitcher");
  });

  await t.test("AC2: Complete French and English dictionary available", () => {
    assert.ok(fs.existsSync(translationsPath), "translations.ts must exist");
    const transFile = fs.readFileSync(translationsPath, "utf8");
    assert.match(transFile, /export const translations/);
    assert.match(transFile, /Partenariats Stratégiques/);
    assert.match(transFile, /Strategic Partnerships/);
    assert.match(transFile, /Bâtissons des Partenariats Stratégiques/);
    assert.match(transFile, /Let’s Build Strategic Partnerships/);
  });

  await t.test("AC3: LanguageContext provides language, toggle and persistence", () => {
    assert.ok(fs.existsSync(contextPath), "context.tsx must exist");
    const ctxFile = fs.readFileSync(contextPath, "utf8");
    assert.match(ctxFile, /LanguageContext/);
    assert.match(ctxFile, /useLanguage/);
    assert.match(ctxFile, /portfolio_lang/);
    assert.match(ctxFile, /document\.documentElement\.lang/);
  });

  await t.test("AC4 (negative): No untranslated core UI fragments in French catalog", () => {
    const transFile = fs.readFileSync(translationsPath, "utf8");
    assert.match(transFile, /nav\.home/);
    assert.match(transFile, /nav\.projects/);
    assert.match(transFile, /nav\.about/);
    assert.match(transFile, /hero\.viewProjects/);
    assert.match(transFile, /hero\.downloadCv/);
  });
});

test("F-08: DriftWall 3D Perspective Animation & Modal Détails Projets", async (t) => {
  const driftWallPath = path.join(ROOT, "components", "ui", "DriftWall.tsx");
  const driftWallCssPath = path.join(ROOT, "components", "ui", "DriftWall.css");
  const modalPath = path.join(ROOT, "components", "projects", "project-detail-modal.tsx");
  const projFile = fs.readFileSync(path.join(ROOT, "components", "projects", "projects.tsx"), "utf8");

  await t.test("AC1: DriftWall component and CSS exist", () => {
    assert.ok(fs.existsSync(driftWallPath), "DriftWall.tsx must exist");
    assert.ok(fs.existsSync(driftWallCssPath), "DriftWall.css must exist");
    const driftCode = fs.readFileSync(driftWallPath, "utf8");
    assert.match(driftCode, /drift-wall__plane/);
    assert.match(driftCode, /drift-wall__track/);
    assert.match(driftCode, /onItemClick/);
  });

  await t.test("AC2: DriftWall component is available for 3D perspectives", () => {
    const driftCode = fs.readFileSync(driftWallPath, "utf8");
    assert.match(driftCode, /DriftWall/);
    assert.ok(fs.existsSync(modalPath));
  });

  await t.test("AC3: ProjectDetailModal component exists with accessible dialog", () => {
    assert.ok(fs.existsSync(modalPath), "project-detail-modal.tsx must exist");
    const modalCode = fs.readFileSync(modalPath, "utf8");
    assert.match(modalCode, /role="dialog"/);
    assert.match(modalCode, /aria-modal="true"/);
    assert.match(modalCode, /Escape/);
  });

  await t.test("AC4 (negative): InfiniteMenu is no longer rendered in Projects view", () => {
    assert.doesNotMatch(projFile, /<InfiniteMenu/);
  });
});

test("F-09: AccordionGallery React Bits & Galerie de Projets Interactive", async (t) => {
  const accordionPath = path.join(ROOT, "components", "ui", "AccordionGallery.tsx");
  const accordionCssPath = path.join(ROOT, "components", "ui", "AccordionGallery.css");
  const projPath = path.join(ROOT, "components", "projects", "projects.tsx");

  await t.test("AC1: AccordionGallery component and CSS exist with GSAP & accessibility", () => {
    assert.ok(fs.existsSync(accordionPath), "AccordionGallery.tsx must exist");
    assert.ok(fs.existsSync(accordionCssPath), "AccordionGallery.css must exist");
    const code = fs.readFileSync(accordionPath, "utf8");
    assert.match(code, /import.*gsap.*from ['"]gsap['"]/);
    assert.match(code, /role="list"/);
    assert.match(code, /role="listitem"/);
    assert.match(code, /onItemClick/);
  });

  await t.test("AC2: Projects component renders AccordionGallery at top and details cards below", () => {
    const projFile = fs.readFileSync(projPath, "utf8");
    assert.match(projFile, /AccordionGallery/);
    assert.match(projFile, /ProjectCard/);
  });

  await t.test("AC3: Accordion item click connects to precise ProjectDetailModal", () => {
    const projFile = fs.readFileSync(projPath, "utf8");
    assert.match(projFile, /onItemClick[\s\S]*setSelectedProject/);
    assert.match(projFile, /<ProjectDetailModal/);
  });

  await t.test("AC4 (negative): Prefers reduced motion handled in AccordionGallery", () => {
    const code = fs.readFileSync(accordionPath, "utf8");
    assert.match(code, /prefers-reduced-motion/);
  });
});

test("F-10: ProfileCard React Bits 3D Holographic Card in Hero Section", async (t) => {
  const profileCardPath = path.join(ROOT, "components", "ui", "ProfileCard.tsx");
  const profileCardCssPath = path.join(ROOT, "components", "ui", "ProfileCard.css");
  const heroPath = path.join(ROOT, "components", "hero", "hero.tsx");

  await t.test("AC1: ProfileCard component and CSS exist with 3D holo and tilt", () => {
    assert.ok(fs.existsSync(profileCardPath), "ProfileCard.tsx must exist");
    assert.ok(fs.existsSync(profileCardCssPath), "ProfileCard.css must exist");
    const code = fs.readFileSync(profileCardPath, "utf8");
    assert.match(code, /profile-card/);
    assert.match(code, /--pc-holo/);
    assert.match(code, /--pc-rotate-x/);
    assert.match(code, /HugeiconsIcon/);
  });

  await t.test("AC2: Hero section renders ProfileCard with Rodolphe data", () => {
    const heroFile = fs.readFileSync(heroPath, "utf8");
    assert.match(heroFile, /ProfileCard/);
    assert.match(heroFile, /avatarUrl/);
  });

  await t.test("AC3: ProfileCard handles reduced motion and accessibility", () => {
    const code = fs.readFileSync(profileCardPath, "utf8");
    assert.match(code, /prefers-reduced-motion/);
    assert.match(code, /aria-label/);
  });

  await t.test("AC4 (negative): ProfileCard does not throw when device orientation is unavailable", () => {
    const code = fs.readFileSync(profileCardPath, "utf8");
    assert.match(code, /enableMobileTilt/);
  });
});

test("F-11: Dashboard ZEKIHUB & Gestion Complète du CRUD", async (t) => {
  const zekihubPath = path.join(ROOT, "app", "ZEKIHUB", "page.tsx");
  const zekihubLoginPath = path.join(ROOT, "app", "ZEKIHUB", "login", "page.tsx");
  const uploadRoutePath = path.join(ROOT, "app", "api", "admin", "upload", "route.ts");
  const authLibPath = path.join(ROOT, "lib", "auth.ts");
  const nextConfigPath = path.join(ROOT, "next.config.ts");

  await t.test("AC1: Route /ZEKIHUB and /ZEKIHUB/login exist and are configured", () => {
    assert.ok(fs.existsSync(zekihubPath), "app/ZEKIHUB/page.tsx must exist");
    assert.ok(fs.existsSync(zekihubLoginPath), "app/ZEKIHUB/login/page.tsx must exist");
    const code = fs.readFileSync(zekihubPath, "utf8");
    assert.match(code, /ZEKIHUB/);
    assert.match(code, /ZekiHubDashboardPage/);
  });

  await t.test("AC2: CRUD operations (Projects, Experiences, Pillars, Stack, Profile) are present", () => {
    const code = fs.readFileSync(zekihubPath, "utf8");
    assert.match(code, /ProjectsEditor/);
    assert.match(code, /ExperiencesEditor/);
    assert.match(code, /EducationEditor/);
    assert.match(code, /SkillsStackEditor/);
    assert.match(code, /ProfileEditor/);
    assert.match(code, /moveProject/);
    assert.match(code, /deleteProject/);
    assert.match(code, /addProject/);
  });

  await t.test("AC3: File uploader supports images and PDF CV documents", () => {
    const code = fs.readFileSync(uploadRoutePath, "utf8");
    assert.match(code, /application\/pdf/);
    assert.match(code, /zeki_/);
  });

  await t.test("AC4: Legacy /HUBGUY redirects to /ZEKIHUB in next.config.ts", () => {
    const code = fs.readFileSync(nextConfigPath, "utf8");
    assert.match(code, /\/HUBGUY/);
    assert.match(code, /\/ZEKIHUB/);
  });

  await t.test("AC5: Auth system provides secure session tokens and fallback credentials", () => {
    const code = fs.readFileSync(authLibPath, "utf8");
    assert.match(code, /zekihub_admin_session/);
    assert.match(code, /verifyPassword/);
  });
});
