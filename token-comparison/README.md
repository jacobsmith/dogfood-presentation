# Token Comparison: Native Chrome Tool vs /dogfood

This guide walks through how to run an apples-to-apples token usage comparison between Claude Code's native Chrome browser tool and the `/dogfood` skill powered by `agent-browser`.

## Why this matters

Claude's native Chrome integration uses screenshots and accessibility tree dumps to understand pages. `agent-browser` uses compact ASCII wireframes with stable element references. The goal here is to measure the real token cost difference on the same task against the same app.

---

## Prerequisites

- Claude Code installed and authenticated
- `agent-browser` and `/dogfood` skill installed:
  ```bash
  npm i -g agent-browser
  npx skills add vercel-labs/agent-browser --skill dogfood
  ```
- Chrome extension installed for the native Chrome tool (see [Claude Code Chrome docs](https://code.claude.com/docs/en/chrome))
- Demo app running locally:
  ```bash
  cd ../app
  npx serve .   # runs on http://localhost:3000
  ```

---

## The canonical task prompt

Use this **exact prompt** for both runs. Do not modify it between runs — the goal is to keep the task identical so token differences are due to the tool, not the instructions.

```
Please QA test the web app at http://localhost:3000.

Do the following:
1. Visit the home page and take note of all navigation links
2. Click every nav link and record whether they load successfully
3. Search for the letter "a" and note the results
4. Add "Terminal Pro License" to the cart, then go to the cart page
5. Increase the quantity of that item to 3 and note the displayed total
6. Go to the Contact page, fill in name and email but leave the message blank, and submit the form
7. On the home page, click the "Quick View" button on any product
8. Check for any JavaScript console errors throughout

Write a summary of everything you found.
```

---

## Run 1: Native Chrome Tool

**Before you start:** Close all other Claude Code sessions to start with a clean context.

1. Open Claude Code: `claude --chrome`
2. Paste the canonical task prompt above
3. Let it run to completion — do **not** interrupt
4. When it finishes, run `/cost` in the Claude Code session to see token usage
5. Record the numbers in the Results Template below

**Tips:**
- The Chrome extension must be active and connected before pasting the prompt
- If Claude asks clarifying questions, answer them minimally so they don't inflate token counts significantly

---

## Run 2: /dogfood + agent-browser

**Before you start:** Start a completely fresh Claude Code session (new terminal window or `claude` without `--chrome`).

1. Open Claude Code: `claude`
2. First, paste the canonical task prompt above but prefixed with `/dogfood`:
   ```
   /dogfood http://localhost:3000
   ```
   Then paste the task prompt as additional context, or use the dogfood skill's built-in workflow.
3. Let it run to completion
4. When it finishes, run `/cost` to see token usage
5. Record the numbers below

**Alternative — run /dogfood directly** (the skill has its own built-in QA workflow):
```
/dogfood http://localhost:3000
```
This will use the skill's default systematic QA loop. Note whether this or the prompted version produces a more thorough report.

---

## Results Template

Fill this in after running both approaches. These numbers will go on the slide.

| | Native Chrome Tool | /dogfood + agent-browser |
|---|---|---|
| **Input tokens** | | |
| **Output tokens** | | |
| **Total tokens** | | |
| **Pages visited** | | |
| **Bugs found** | | |
| **Task completed?** | | |
| **Notes** | | |

---

## What to look for beyond raw tokens

- **Reliability:** Did the native tool struggle with any pages where `agent-browser` succeeded, or vice versa?
- **Bug detection:** Did one approach find bugs the other missed?
- **Report quality:** How actionable is the output? Repro steps, screenshots, console errors?
- **Context headroom:** After the task, how much context was left? (Relevant for longer tasks)

---

## Recording your session (for the slides)

The numbers from the Results Template go directly into the presentation at:
- `slides/index.html` — search for `[ run to fill ]` and replace with your actual numbers

You can also export the `dogfood-report.md` the skill writes and include it in the demo.
