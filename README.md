# Let Claude Break Your App: Automated QA with /dogfood

Presentation materials for a community talk on the [`/dogfood`](https://github.com/vercel-labs/agent-browser) skill from vercel-labs — a Claude Code skill that turns your AI assistant into a systematic QA tester for your web app.

## What's in this repo

| Directory | Contents |
|---|---|
| [`/app`](./app) | Deliberately-buggy demo web app to run `/dogfood` against |
| [`/slides`](./slides) | Reveal.js presentation deck |
| [`/token-comparison`](./token-comparison) | Guide for measuring token usage: native Chrome tool vs `/dogfood` |
| [`/demo`](./demo) | Backup recording instructions and narration script |

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

## Talk abstract

> Claude Code can browse the web natively — but what happens to your context window when it does? In this talk we dig into `agent-browser`, a token-efficient browser CLI from Vercel Labs, and the `/dogfood` skill built on top of it. We'll compare real token counts between Claude's built-in Chrome tool and `/dogfood`, explain how ASCII wireframes replace screenshots, and live-demo a systematic QA run against a deliberately-broken web app. You'll leave with the skill installed and a mental model for when (and why) to reach for it.

## Credits

- [`vercel-labs/agent-browser`](https://github.com/vercel-labs/agent-browser)
- [Claude Code](https://claude.ai/code)
