# Surprise Letter for Sayanika

## Current State
- Home page: floating envelope SVG on a pink/cream gradient background, with petals and sparkles. Clicking the envelope navigates to `/letter`.
- Letter page: full-page letter card with back button, flower SVG in top-right corner.
- Hint text "click to open" is shown below the envelope.
- Background is a pink/cream gradient with floating petals and sparkles.
- No use of the uploaded bouquet image.

## Requested Changes (Diff)

### Add
- Use the uploaded bouquet illustration (`/assets/uploads/image-1-1.png`) as the main centrepiece of the home page.
- Overlay a small animated envelope on top of the bouquet image (positioned around the centre/lower area so it looks tucked in the bouquet).
- A clearly visible pulsing "Tap the envelope to open your letter" hint text with arrow pointing to the envelope.
- Bounce animation on the envelope to draw attention.
- Page background color theme pulled from the bouquet: warm cream (`oklch(0.97 0.02 75)`), sunflower yellow accents, soft pink, muted lavender, sage green.

### Modify
- Home page: replace the standalone envelope with a layered composition: bouquet image as background element, envelope SVG overlaid on top of it.
- Background gradient updated to warm cream/ivory to match bouquet image background.
- Remove the old generic pink/lavender gradient; use cream/ivory that matches the bouquet illustration.
- Hint text made more prominent and animated.

### Remove
- Standalone envelope-only layout (envelope is now overlaid on bouquet).
- Old pink gradient background on home page (replaced with cream matching bouquet).

## Implementation Plan
1. Update `HomePage` in `App.tsx`:
   - Set background to warm cream matching the bouquet illustration.
   - Create a relative-positioned container holding the bouquet `<img>` and the envelope button overlaid on top.
   - The bouquet image fills the container; envelope is absolutely positioned over the lower-centre of the bouquet.
   - Envelope retains its bounce/float animation.
   - Update hint text: make it larger, more prominent, with a bouncing arrow pointing up toward the envelope.
2. Update `index.css`:
   - Add a `@keyframes envelope-bounce` that is more pronounced than the current float.
   - Adjust hint text animation to be more eye-catching.
3. Keep the letter page (`/letter`) unchanged.
