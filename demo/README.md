# Backup Demo Recording

This directory holds the backup demo recording for the talk. Record it in advance so you have a fallback if the live demo has network issues, tool hiccups, or the app misbehaves during the presentation.

---

## Recording checklist

- [ ] Demo app is running and all bugs are confirmed present
- [ ] `/dogfood` skill is installed and `agent-browser` is up to date
- [ ] Font size in terminal is bumped up (≥16px) for readability
- [ ] Screen resolution is 1920×1080 or 1440×900
- [ ] Notifications silenced / Do Not Disturb enabled
- [ ] Terminal theme is dark (easier to read on projector)

---

## Recording setup

**macOS (QuickTime):**
```
File → New Screen Recording → select your terminal/browser window
```

**With OBS (recommended for annotations):**
1. Add a Display Capture or Window Capture source
2. Set output to 1920×1080, 30fps
3. Use `Start Recording` — not `Start Streaming`

**Trim the recording:**
Use QuickTime (`Edit → Trim`) or `ffmpeg`:
```bash
ffmpeg -i raw-recording.mov -ss 00:00:05 -to 00:04:30 -c copy demo-trimmed.mp4
```

---

## Demo script / narration

Use this as your narration guide for the recording. Speak it aloud as you do the demo — you'll use the same script during the live talk.

---

**[0:00 — Setup]**
> "I have the ShopLab demo app running on localhost:3000. It's a small e-commerce site for developer tools. To a casual visitor, it looks fine. But we know there are bugs in here — let's see if Claude can find them."

---

**[0:20 — Invoke the skill]**

Type in Claude Code:
```
/dogfood http://localhost:3000
```

> "I'm just running `/dogfood` with the URL. That's it. The skill takes over from here."

---

**[0:35 — First snapshot]**

> "You can see it's using `agent-browser snapshot` to get a compact wireframe of the page — not a screenshot. Every interactive element gets a ref like @e1, @e2. The model will use these refs to click and fill things without ever needing to look at pixels."

---

**[1:00 — Navigation check]**

Wait for Claude to click nav links. Highlight when it hits the Blog link.

> "Here it's clicking through all the nav links. Watch what happens when it hits 'Blog'..."

After it 404s:
> "404. Link is dead. First bug found. And notice — it didn't need a screenshot to detect this. It read the HTTP status."

---

**[1:45 — Cart interaction]**

> "Now it's going into the cart flow. It'll add an item, then try changing the quantity."

After qty change:
> "It changed the quantity from 1 to 3. But watch the total... it still says the original price. The total isn't recalculating. That's bug two."

---

**[2:30 — Contact form]**

> "Here's the contact form. It's going to fill in a name and email — but leave the message blank. Watch what happens."

After form submits with success banner:
> "Success message. But the message field was empty. The form accepted a completely blank message with no validation. That's bug three — and the kind of thing that's very easy to miss manually."

---

**[3:00 — Console errors]**

> "It runs `agent-browser errors` after each interaction. Here it caught a ReferenceError from the Quick View button — `productModal is not defined`. No visible UI feedback, but it's in the console. Bug four."

---

**[3:30 — The report]**

> "When it's done, it writes a markdown report — `dogfood-report.md`. Structured, with repro steps and evidence for each issue. Ready to paste into Linear, Jira, GitHub Issues — wherever you track bugs."

Show the report file briefly.

---

**[3:50 — Wrap]**

> "That's it. One command, one URL, a couple of minutes — and we have a reproducible bug report for six issues that a casual manual review would have missed."

---

## File naming

Save the final recording as:
```
demo/dogfood-demo.mp4
```

Keep the raw file as:
```
demo/dogfood-demo-raw.mov
```

(Add both to `.gitignore` if they're too large for the repo — link to them from the README instead.)
