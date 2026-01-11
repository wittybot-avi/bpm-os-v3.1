# BPM-OS Frontend Vibe-Coding Rulebook

**SCOPE:** FRONTEND ONLY
**VERSION:** V3.1

## A. Frontend-Only Scope (Authoritative)
This project is a **Frontend-Only** implementation of the BPM-OS V3.1 interface.
**ABSOLUTE CONSTRAINT:** Backend logic, databases, APIs, and persistence layers are **FORBIDDEN** in this codebase.
- All data must be mocked or managed via ephemeral client-side state.
- Business logic is limited to UI-visible state transitions only.
- Vibe coding focus is strictly on UI/UX, RBAC behavior, and component composition.

## B. Patch Prompt Contract
To reduce prompt overhead, the following constants apply to ALL future interactions unless explicitly overridden:
1.  **Implicit Context:** The AI must assume the "Frontend-Only" constraint applies to every request.
2.  **No Repetition:** Human prompts will provide variable data (Patch ID, Intent, Date, Scope). They will NOT repeat the standard rules defined here.
3.  **Authority:** Patch prompts must reference this `RULEBOOK.md` as the supreme authority for behavioral constraints.

## C. Date Authority Rule
1.  **No Hallucinations:** AI must **NEVER** guess, infer, increment, or simulate dates for governance logs or UI displays.
2.  **Human Injection:** Every patch prompt **MUST** include a specific "AUTHORITATIVE DATE (IST)".
3.  **Verbatim Usage:** The AI must copy the provided date string exactly (e.g., "2026-01-11 (IST)").
4.  **Stop Condition:** If a patch prompt is missing the authoritative date, the AI must **STOP** execution and request it.

## D. Patch Identity Authority
1.  **Single Source of Truth:** The Patch ID (e.g., `PP-012`) must be defined in exactly one location: `types.ts` (export const PATCH_ID).
2.  **Reference Only:** All UI components (HUD, Sidebar, Footers, Headers) must import and reference this single constant.
3.  **Prohibition:** Hardcoding the patch ID string in any UI component is strictly forbidden.

## E. Demo Safety Rules
1.  **No White Screens:** The `main` branch must always render a working UI. Critical errors must be caught by an Error Boundary.
2.  **Safe Boot:** The application must boot into a safe, non-crashing state (e.g., Guest or Demo User).
3.  **Action Feedback:** Disabled actions (due to missing backend) must visually indicate their status (e.g., "Demo Mode", "Read Only") or provide a tooltip explaining why.
4.  **Refresh Resilience:** The app must handle browser refreshes without losing critical access context (defaulting to safe fallbacks if needed).

## F. Patch Discipline
1.  **Atomic Intent:** One patch = one specific intent. Do not mix refactoring with feature additions.
2.  **Incremental Progress:** Small, verifiable patches are preferred over monolithic updates.
3.  **Versioning:** Regression fixes or sub-steps should use new IDs or sub-IDs (e.g., patch A/B/C) if the main patch structure allows, otherwise a new integer ID.
4.  **Strict Scoping:** Stick strictly to the "IN-SCOPE" section of the prompt. Do not anticipate or implement "OUT-OF-SCOPE" features.

## G. RULEBOOK Precedence Clause
**THIS FILE IS SUPREME.**
- In the event of a conflict between an AI's internal training, previous context, or vague prompt instructions, the rules in `RULEBOOK.md` take precedence.
- If a prompt asks for backend logic, this Rulebook overrides it (see Section A).

## H. AI & Vibe-Coding Protocol
- Do not hallucinate business logic not present in the SOPs.
- Do not invent future patches.
- Maintain the "Industrial UI" aesthetic defined in the project style guide.