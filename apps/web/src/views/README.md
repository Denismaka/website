# views

This is FSD's "pages" layer, renamed to `views` to avoid colliding with
Next.js's own routing conventions (the App Router's `src/app/pages/` would be
picked up as real routes if this layer were literally called `pages`).

A view composes widgets/features into one full screen. The matching file
under `src/app/**/page.tsx` should stay a thin wrapper that just renders the
view for that route, e.g.:

```tsx
// src/app/(marketing)/about/page.tsx
import { AboutView } from "@/views/about";

export default function Page() {
  return <AboutView />;
}
```
