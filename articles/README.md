# Serenity - Modern Minimalist Blog Template

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Commercial-green)
![Author](https://img.shields.io/badge/author-Celio%20Natti-orange)

A beautifully crafted, minimalist blog template featuring modern design principles, responsive layouts, and elegant typography. Built with pure HTML, CSS, and JavaScript for maximum compatibility and easy customization.

---

## 🎨 Features

### Modern Design
- **OKLCH Color System** - Future-proof color management with perceptually uniform colors
- **Dancing Script Typography** - Elegant cursive brand font for distinctive identity
- **Inter Font Family** - Clean, highly readable body text
- **Minimalist Aesthetics** - Clean lines, ample white space, and focused content

### Responsive Layout
- **Mobile-First Design** - Optimized for all screen sizes
- **Mobile Bottom Navigation** - App-like navigation for mobile users
- **Flexible Grid System** - Adapts seamlessly from mobile to desktop
- **Touch-Friendly Interactions** - Designed for both touch and cursor input

### Complete Page Set
- **Homepage** - Featured articles and recent posts
- **Articles Listing** - Paginated article archive
- **Single Article** - Full article view with comments
- **About Page** - Personal/brand story section
- **Contact Page** - Contact form with styling
- **Newsletter Page** - Subscription signup

### Admin Dashboard
- **Dashboard Overview** - Statistics and quick insights
- **Posts Management** - Create, edit, and manage posts
- **Categories** - Organize content by topic
- **Comments** - Moderate user comments
- **Profile Settings** - User account management

### Authentication Pages
- **Login Page** - User sign-in
- **Registration Page** - New user signup
- **Forgot Password** - Password recovery
- **Reset Password** - Password reset flow

---

## 📁 File Structure

```
serenity/
├── index.html              # Homepage
├── articles.html           # Articles listing
├── article.html            # Single article view
├── about.html              # About page
├── contact.html            # Contact page
├── newsletter.html         # Newsletter signup
├── styles.css              # Main stylesheet
├── README.md               # This file
├── LICENSE.md              # License information
│
├── auth/                   # Authentication pages
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   └── reset-password.html
│
└── admin/                  # Admin dashboard
    ├── index.html          # Dashboard
    ├── posts.html          # Posts management
    ├── create-post.html    # Create new post
    ├── view-post.html      # View/edit post
    ├── categories.html     # Categories management
    ├── comments.html       # Comments moderation
    ├── profile.html        # Profile settings
    └── styles.css          # Admin styles
```

---

## 🚀 Quick Start

1. **Download** the template files
2. **Unzip** to your project directory
3. **Open** `index.html` in your browser
4. **Customize** the content, colors, and branding to match your needs

### Customization Tips

#### Changing Brand Name
Replace "Serenity" with your brand name in:
- Navigation bar `.brand` class
- Footer `.footer-brand` class
- Page titles in `<title>` tags
- Meta descriptions

#### Adjusting Colors
Modify the CSS custom properties in `:root` within `styles.css`:
```css
:root {
    --bg-primary: oklch(98% 0.002 264);
    --accent: oklch(25% 0.015 264);
    /* ... other color variables */
}
```

#### Adding New Pages
1. Copy an existing page as a template
2. Update the navigation active states
3. Modify the content section
4. Link from other pages

---

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## 📧 Support & Contact

**Author:** Celio Natti

- **Email:** celionatti@gmail.com
- **GitHub:** [https://github.com/celionatti](https://github.com/celionatti)

For technical support, bug reports, or feature requests, please reach out via email.

---

## 📄 License

This template is licensed under a Commercial License. 

**What's Allowed:**
- ✅ Use in a single personal or commercial project
- ✅ Modify and customize for your needs
- ✅ Create derivative works for your project

**What's Not Allowed:**
- ❌ Reselling or redistributing the template
- ❌ Using in multiple projects without additional licenses
- ❌ Removing author attribution comments from source files

**Full license terms available in [LICENSE.md](LICENSE.md)**

---

## 🙏 Credits

- **Fonts:** [Google Fonts](https://fonts.google.com/) - Inter, Dancing Script
- **Images:** Placeholder images from [Unsplash](https://unsplash.com/)
- **Icons:** Custom SVG icons included

---

© 2026 Celio Natti. All rights reserved.
