# Roman Quintero — Portfolio / Stage I

Personal portfolio built with Next.js for selected engineering work and the **30 Projects** experimental build program.

The site combines project case studies, a README-driven challenge tracker and a lightweight technical visual system built with React, TypeScript, Tailwind CSS and Motion.

No database or backend application is required.

## Run

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

Production build:

```sh
npm run build
npm start
```

Quality checks:

```sh
npm run lint
npm run typecheck
npm test
```

> Tailwind CSS 3 is intentional. Tailwind 4's import resolver currently fails with the `#` character in this Windows workspace path. Turbopack is used because webpack's React client manifest has the same workspace-path issue.

## Architecture

Main routes:

- `/` — identity, selected work, 30 Projects preview and profile.
- `/projects` — curated selection of research, engineering and personal work.
- `/projects/multi-uav` — cooperative multi-UAV research case study.
- `/projects/remote-4g-drone` — remote 4G UAV engineering case study.
- `/projects/mugen-no-sekai` — early personal lab and experimentation.
- `/30-projects` — live progression of the 30 Projects challenge.
- `/about` — profile, current focus and contact links.

Most of the interface is server rendered. Client components are limited to interactions that require browser state.

Project content and profile data are kept separate from presentation components, while the project visualizations use lightweight SVG/CSS rather than WebGL or 3D.

## Major project case studies

The portfolio presents three different forms of work:

### Multi-UAV Cooperative Search

Current Master's thesis exploring natural-language mission definition, cooperative UAV search, systematic baselines and reinforcement-learning experimentation.

Mission trajectories, coverage and telemetry-style values shown in the interface are explicitly illustrative and are not presented as research results.

### Remote 4G Drone Control

Completed Computer Engineering final project combining a physical UAV, Raspberry Pi companion computer, PX4/Pixhawk, MAVLink/MAVSDK, 4G connectivity, cloud infrastructure, real-time video and embedded STM32/FreeRTOS work.

The control visualization is an interface study and does not represent a live aircraft connection or fabricated telemetry.

### Mugen no Sekai

Presented as an early personal lab rather than a single product: a space for experimentation across mobile, web, backend, NFC, Unity and other technologies.

Detailed historical entries are intentionally left for future documentation rather than reconstructed or invented.

## README-driven 30 Projects challenge

The challenge uses the central repository as its source of truth:

https://github.com/RomanQuintero/30-projects

`getChallengeProjects()` fetches its README server-side and `parseChallengeReadme()` parses the Markdown project table into typed project data.

Project numbers come explicitly from the central table. Repository names do not determine numbering.

The publishing workflow is intentionally simple:

1. Publish the new project repository.
2. Update the central `30-projects` README.
3. The portfolio updates automatically.

No portfolio deployment or duplicated project metadata is required.

### Revalidation and fallback

Challenge data is cached and revalidated every **3600 seconds** using Next.js ISR.

GitHub is never queried directly from client browsers.

If the upstream README cannot be retrieved or parsed, the site can fall back to a checked-in verified snapshot rather than breaking the challenge page.

The local snapshot can be regenerated when required with:

```sh
npx tsx scripts/snapshot.ts
```

This is an emergency/fallback mechanism and is **not** part of the normal publishing workflow.

## Challenge progression

Stage I defines three challenge states:

- **Level I — #01–#09:** completed projects.
- **#10:** Portfolio / Stage I checkpoint.
- **Level II — #11–#19:** active progression.
- **#20:** Portfolio / Stage II checkpoint.
- **Level III — #21–#30:** locked until Stage II.

Within Level II:

- released projects remain fully visible and static;
- only the next missing project is marked **Awaiting Release**;
- later slots remain **Unreleased / Restricted**;
- completing all nine projects changes the level to **Complete**.

Previously released projects do not replay artificial unlock animations when the page loads.

## Configuration

Environment configuration is documented in `.env.example`.

Important values include:

```env
SITE_URL=https://example.com
CHALLENGE_README_URL=...
```

`SITE_URL` should contain the final HTTPS production URL. It is used for canonical URLs, sitemap generation and indexing behavior.

`CHALLENGE_README_URL` can replace the default challenge source without changing UI code.

Personal links are configured separately in `src/lib/profile.ts`.

LinkedIn and the provided CV are supported by default. Email remains optional and is omitted when not configured.

## Hosting

The portfolio requires a Next.js runtime with ISR support.

**Do not deploy it as a static export.**

A static export would freeze the challenge README at build time and remove the automatic project-update behavior.

## Accessibility and responsive design

The portfolio includes:

- semantic page structure;
- keyboard navigation and skip-to-content support;
- visible focus states;
- reduced-motion behavior;
- responsive project visualizations;
- accessible touch targets;
- layouts tested from desktop down to small mobile widths.

Complex visualizations reduce their information density on smaller screens instead of simply scaling the desktop interface down.

## Verification

The project includes automated tests for the challenge parser and project content, including:

- real challenge data;
- future Level II releases;
- reordered Markdown columns;
- escaped table pipes;
- placeholders and drafts;
- malformed tables;
- unsafe links.

Before release, the project was validated with:

- ESLint;
- TypeScript;
- production build;
- unit tests;
- responsive browser checks;
- keyboard navigation;
- reduced-motion behavior;
- production smoke checks.

Browser verification scripts are available under `scripts/` but are not required at runtime.

## Stage II

Portfolio Stage II is intentionally deferred.

Potential future work includes:

- richer project visualizations;
- 3D / WebGL experiences;
- advanced challenge statistics;
- additional verified project material;
- a different challenge data provider;
- unlocking Level III.

Stage I deliberately keeps these features out of scope.