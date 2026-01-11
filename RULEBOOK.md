# BPM-OS Frontend Vibe-Coding Rulebook

**SCOPE:** FRONTEND ONLY
**VERSION:** V3.1

## Core Mandate
This project is a **Frontend-Only** implementation of the BPM-OS V3.1 interface.
**ABSOLUTE CONSTRAINT:** Backend logic, databases, APIs, and persistence layers are **FORBIDDEN** in this codebase. All data must be mocked or managed via ephemeral client-side state.

## Non-Negotiable Rules

1.  **Patch-Based Development Only**
    - All changes must be executed via discrete, numbered patches (e.g., BP-001).
    - No ad-hoc changes outside the patch system.

2.  **One Patch = One Intent**
    - Patches must be atomic and focused on a single specific outcome.
    - Do not mix refactoring with feature additions.

3.  **Demo-Safe at All Times**
    - The `main` branch must always render a working UI.
    - No "Work in Progress" blank screens.
    - Error boundaries must catch and display failures gracefully.

4.  **Source of Truth**
    - Section 13 (Patch Skeleton) of the Master Plan is the authoritative reference for development flow.
    - This file governs all AI-assisted development behavior.

5.  **IST Date Authority**
    - All dates in logs, UI displays, and documentation must be recorded in Indian Standard Time (IST).
    - Dates must be computed at runtime or execution time; do not infer from stale context.
    - Format: YYYY-MM-DD (IST).

6.  **Single Patch ID Source**
    - The Patch ID must be defined in exactly one location (`types.ts`).
    - All UI components (HUD, Sidebar, Headers) must reference this single source.
    - Hardcoding the patch ID string in components is strictly forbidden.

7.  **Human-Injected Date Authority**
    - AI must **NEVER** guess, infer, or increment dates for governance logs.
    - Every patch prompt MUST include the specific date to be used.
    - **Missing Date = STOP EXECUTION.**
    - All future patch prompts MUST include: `AUTHORITATIVE DATE (IST): <human-provided>`.

## AI & Vibe-Coding Protocol
- Do not hallucinate business logic not present in the SOPs.
- Do not invent future patches.
- Stick strictly to the "IN-SCOPE" definitions of the current patch.