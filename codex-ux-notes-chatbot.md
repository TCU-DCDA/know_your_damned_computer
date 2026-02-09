# Codex UX Notes: Chatbot (Draft)

Date: 2026-02-08

## Context
- Resource is dense and the TOC can feel overwhelming.
- Primary audience is college students who are less confident with tech than they think.
- Use pattern is more reference than linear reading.
- Chatbot would be additive, not a replacement for the resource.

## Intent
- Support productive struggle with guided help.
- Reduce navigation friction for reference use.
- Preserve trust and alignment with the text.

## Decisions So Far
- Answer style: Socratic.
- First response: hint + question.
- Scope: global across the resource.
- Citations: show by default (more often than not).
- Analytics: aggregate only.
- Access: likely public.

## Suggested Interaction Flow
- Student asks a question.
- Bot responds with a hint + question and citations.
- "Show steps" reveals 2-3 steps, then asks a check-in question.
- "Show more" reveals the next chunk of steps if needed.

## UI Shape (Lean)
- Collapsed by default with a simple toggle.
- Slide-in drawer rather than a fixed sidebar.
- Minimal controls to avoid adding to TOC overwhelm.

## Analytics and Privacy Notes (High Level)
- Track aggregate module usage and engagement time only.
- Avoid storing chat logs by default.
- If chat logging is ever added, consider opt-in and clear disclosure.

## Open Questions
- Should "Show steps" ever reveal a full solution, or only partial steps?
- Should the bot be page-scoped by default even if it can search globally?
- What citation format best fits the existing UI (inline links or a compact block)?
