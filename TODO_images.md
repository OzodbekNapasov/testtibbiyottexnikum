# TODO: Add Rounded Corners to ALL Images

## Task Summary
Fix all images to have rounded (soft) corners using border-radius: 10px or more.

## Files to Edit

### 1. app/globals.css
Add global image styles:
- img { border-radius: 12px; }
- .image-frame { border-radius: 12px; padding: 8px; background: white; }

### 2. app/teachers/page.tsx
- Line with className containing `rounded-none` → Change to `rounded-xl`
- Image container div: `rounded-none` → `rounded-xl`

### 3. components/sections/Gallery.tsx
- Image container div: `rounded-none` → `rounded-xl`
- Image class: `rounded-none` → `rounded-xl`

### 4. components/sections/Hero.tsx
- Add rounded corners to the building image container

### 5. components/sections/About.tsx
- Already has rounded-3xl - verify softness (rounded-3xl = 24px is good!)

### 6. components/sections/License.tsx
- Already has rounded-2xl - verify softness (rounded-2xl = 16px is good!)

### 7. components/sections/Programs.tsx
- Already has rounded-[1.25rem] - verify (1.25rem = 20px is good!)

### 8. components/sections/Testimonials.tsx
- Testimonial avatars use rounded-full - this could be too round
- Consider changing to rounded-2xl for a softer look

## Priority
1. Critical: Fix explicitly rounded-none (teachers, gallery)
2. Important: Add global CSS for all images
3. Nice-to-have: Review other image sections

## Border Radius Values
- soft corners: 10px (rounded)
- softer: 12px (rounded-xl)
- softest: 16px-24px (rounded-2xl, rounded-3xl)

Let's go with: border-radius: 12px (rounded-xl) for a nice soft but not overly round look.
