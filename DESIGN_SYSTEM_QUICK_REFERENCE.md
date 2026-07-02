# 🎨 Design System Quick Reference

## Importing Theme Service

```typescript
import { ThemeService } from './core/services/theme.service';

constructor(private themeService: ThemeService) {
  // Theme is auto-initialized
}
```

## Theme Switching

```typescript
// Switch theme
this.themeService.setTheme('dark');
this.themeService.setTheme('ocean');
this.themeService.setTheme('forest');
this.themeService.setTheme('sunset');

// Get current theme
const currentTheme = this.themeService.getCurrentTheme();

// Get all available themes
const themes = this.themeService.getAllThemes();

// Subscribe to theme changes
this.themeService.currentTheme$.subscribe(theme => {
  console.log('Theme changed:', theme);
});
```

## CSS Variables

### Colors
```css
.my-component {
  background: var(--color-background);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  box-shadow: 0 0 0 2px var(--color-primary);
}
```

### Spacing
```css
.container {
  padding: var(--spacing-xl);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}
```

### Border Radius
```css
.button {
  border-radius: var(--radius-md); /* 8px */
}

.card {
  border-radius: var(--radius-lg); /* 12px */
}

.avatar {
  border-radius: var(--radius-full); /* 9999px */
}
```

### Shadows
```css
.card {
  box-shadow: var(--shadow-md); /* Standard */
}

.card:hover {
  box-shadow: var(--shadow-lg); /* Elevated */
}
```

### Transitions
```css
.element {
  transition: all var(--transition-base); /* 250ms */
}
```

## Common Utility Classes

### Spacing
```html
<div class="mt-lg mb-xl px-md py-lg">Content</div>
```

### Flexbox
```html
<div class="flex gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex-between">
  <span>Left</span>
  <span>Right</span>
</div>

<div class="flex-center">
  Centered content
</div>
```

### Grid
```html
<div class="grid grid-3 gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Text
```html
<p class="text-primary">Primary color text</p>
<p class="text-center">Centered text</p>
```

### Responsive
```html
<div class="hide-mobile">Desktop only</div>
<div class="hide-desktop">Mobile only</div>
```

## Color Palette Quick Reference

| Variable | Light | Dark | Ocean | Forest | Sunset |
|----------|-------|------|-------|--------|--------|
| --color-primary | #1976d2 | #1565c0 | #0277bd | #2e7d32 | #d84315 |
| --color-secondary | #42a5f5 | #42a5f5 | #0288d1 | #43a047 | #ff7043 |
| --color-accent | #ff6b6b | #ff7979 | #00838f | #ff6e40 | #ffa726 |
| --color-background | #f5f7fa | #0f1419 | #e0f2f1 | #f1f8e9 | #fff3e0 |
| --color-surface | #ffffff | #1a1f2e | #ffffff | #ffffff | #ffffff |

## Responsive Typography

```css
/* Use clamp() for fluid text */
h1 {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
}

p {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}
```

## Responsive Grid Patterns

### Auto-fit Grid (Recommended)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}
```

### Fixed Grid
```css
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

## Button Styles

### Primary Button
```html
<button class="btn btn-primary">Click me</button>
```

### Secondary Button
```html
<button class="btn btn-secondary">Cancel</button>
```

### Accent Button
```html
<button class="btn btn-accent">Delete</button>
```

### Size Variants
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Large</button>
```

## Form Field Styling

```html
<input 
  type="text" 
  placeholder="Enter text"
  class="form-control"
/>

<textarea class="form-control" rows="4"></textarea>

<select class="form-control">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

## Card Component

```html
<div class="card">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</div>
```

## Badges

```html
<span class="badge">New</span>
<span class="badge badge-secondary">Draft</span>
<span class="badge badge-accent">Error</span>
```

## Media Queries

```css
/* Mobile first */
@media (max-width: 640px) {
  /* Mobile styles */
}

@media (min-width: 641px) and (max-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 769px) {
  /* Desktop styles */
}

@media (min-width: 1024px) {
  /* Large screen styles */
}
```

## Animations

### Available Keyframes
- `pulse` - Scaling animation
- `spin` - Rotating animation
- `slideInUp` - Slide from bottom
- `slideInDown` - Slide from top
- `fadeIn` - Fade in effect
- `shimmer` - Shimmer loading effect

### Using Animations
```css
.element {
  animation: slideInUp var(--transition-base);
}

.loader {
  animation: spin 1s linear infinite;
}

.badge {
  animation: pulse 1.5s infinite;
}
```

## Theme Switching in Templates

```html
<!-- Desktop Theme Switcher -->
<button 
  class="nav-item" 
  (click)="toggleThemeMenu()"
  title="Change Theme">
  🎨
</button>

<div class="theme-menu" *ngIf="showThemeMenu">
  <button 
    *ngFor="let theme of availableThemes" 
    (click)="switchTheme(theme)"
    [class.active]="currentTheme === theme">
    {{ theme | titlecase }}
  </button>
</div>
```

## Best Practices

1. **Always use variables** instead of hard-coded colors
2. **Follow mobile-first approach** in media queries
3. **Use semantic HTML** with proper heading hierarchy
4. **Maintain consistent spacing** using the spacing scale
5. **Use CSS Grid** for complex layouts
6. **Use Flexbox** for component-level layout
7. **Test on real devices** not just browser DevTools
8. **Optimize images** for mobile devices
9. **Consider touch targets** minimum 44x44px
10. **Use `clamp()`** for responsive typography

## Performance Tips

- ✅ Use CSS variables (faster than SCSS)
- ✅ Minimize repaints (batch DOM changes)
- ✅ Use GPU acceleration (`transform`, `opacity`)
- ✅ Lazy load images
- ✅ Code split for large bundles
- ✅ Minimize JavaScript
- ✅ Use CSS Grid (native browser optimization)
- ✅ Avoid expensive animations

## Accessibility Checklist

- ✅ Color contrast ratios (WCAG AA)
- ✅ Touch target sizes (min 44x44px)
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Focus indicators visible
- ✅ Semantic HTML elements
- ✅ Alt text for images
- ✅ Form labels associated with inputs

---

**Quick Links:**
- [Design Improvements](./DESIGN_IMPROVEMENTS.md)
- [Theme Service](./src/app/core/services/theme.service.ts)
- [Global Styles](./src/styles.css)
- [App Component](./src/app/app.component.ts)

