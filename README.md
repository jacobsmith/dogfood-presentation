# Let Claude Break Your App: Automated QA with /dogfood

Presentation materials for a community talk on the [`/dogfood`](https://github.com/vercel-labs/agent-browser/tree/main/skills/dogfood) skill from vercel-labs — a Claude Code skill that turns your AI assistant into a systematic QA tester for your web app.

## What's in this repo

| Directory | Contents |
|---|---|
| [`/app`](./app) | Deliberately-buggy demo web app to run `/dogfood` against |
| [`/slides`](./slides) | Reveal.js presentation deck |
| [`/token-comparison`](./token-comparison) | Guide for measuring token usage: native Chrome tool vs `/dogfood` |
| [`/demo`](./demo) | Backup recording instructions and narration script |

## Key links

| Resource | URL |
|---|---|
| agent-browser (Rust CLI + skill) | https://github.com/vercel-labs/agent-browser |
| dogfood GitHub Action | https://github.com/jacobsmith/dogfood-github-action |
| Claude Code | https://claude.ai/code |

## How it works

`agent-browser` is a Rust CLI that drives Chrome via the CDP protocol and keeps a **persistent browser session** alive across commands. The `/dogfood` skill issues a sequence of CLI calls against that live session — no browser cold-start per step, no fragile CSS selectors, just stable element refs.

```
agent-browser open https://app.com   # start session
agent-browser snapshot -i            # get interactive wireframe with refs
agent-browser click @e4              # interact by ref
agent-browser errors                 # read console errors
agent-browser screenshot --annotate  # capture evidence
```

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- `agent-browser` + `/dogfood` skill installed:
  ```bash
  npm i -g agent-browser
  npx skills add vercel-labs/agent-browser --skill dogfood
  ```

## Running the demo app

```bash
cd app
# No build step needed — open index.html directly or serve it:
npx serve .
```

Then in Claude Code:
```
/dogfood http://localhost:3000
```

## Running the slides

```bash
cd slides
npx serve .
# Open http://localhost:3000
```

## Automating with the GitHub Action

[`dogfood-github-action`](https://github.com/jacobsmith/dogfood-github-action) wires `/dogfood` into your CI pipeline:

1. Comment `/dogfood` on any open PR
2. The action polls Vercel for the preview deployment URL
3. Runs Claude in headless mode (`claude -p`) with `agent-browser`
4. Posts a full bug report + up to 20 screenshots back to the PR

**Cost:** ~$0.75 – $1.50 per PR depending on app size.

Setup:
```bash
cp action .github/workflows/dogfood.yml
# Add secrets: ANTHROPIC_API_KEY, PREVIEW_TEST_USER_EMAIL, PREVIEW_TEST_USER_PASSWORD
```

## Talk abstract

> Claude Code can browse the web natively — but what happens to your context window when it does? In this talk we dig into `agent-browser`, a Rust CLI from Vercel Labs that drives a persistent Chrome session, and the `/dogfood` skill built on top of it. We'll compare real token counts between Claude's built-in Chrome tool and `/dogfood` (same bugs found, 2× more pages visited at lower cost per step), live-demo a systematic QA run against a deliberately-broken web app, and show how to wire the whole thing into CI with a GitHub Action. You'll leave with the skill installed, a mental model for when to reach for it, and a ready-to-copy workflow file.

## Credits

- [`vercel-labs/agent-browser`](https://github.com/vercel-labs/agent-browser)
- [`dogfood-github-action`](https://github.com/jacobsmith/dogfood-github-action)
- [Claude Code](https://claude.ai/code)
