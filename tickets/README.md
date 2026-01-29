# EventFlow - Modern Ticket Sale Website Template

A professional, responsive ticket sale website template with a vibrant purple/blue gradient theme. Perfect for event organizers, ticket platforms, and entertainment venues.

## ✨ Features

- **Modern Design** - Clean, card-based layout with beautiful gradients
- **Fully Responsive** - Mobile-first design that works on all devices
- **Purple/Blue Theme** - Vibrant gradient color scheme perfect for events
- **Mobile Navigation** - Bottom tab bar for easy mobile browsing
- **Event Management** - Complete pages for browsing and booking events
- **User Dashboard** - User profile and ticket management pages
- **Admin Panel** - Full admin dashboard for managing events and bookings
- **Authentication Pages** - Login and registration forms included
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Easy to Customize** - Well-organized CSS with CSS variables

## 📁 File Structure

```
tickets/
├── index.html              # Homepage with featured events
├── events.html             # Events listing page
├── event-details.html      # Single event details (to be created)
├── checkout.html           # Booking/checkout page (to be created)
├── about.html              # About page (to be created)
├── contact.html            # Contact page (to be created)
├── styles.css              # Main stylesheet
├── auth/
│   ├── login.html          # Login page (to be created)
│   └── register.html       # Registration page (to be created)
├── user/
│   ├── dashboard.html      # User dashboard (to be created)
│   ├── tickets.html        # My tickets page (to be created)
│   └── profile.html        # User profile (to be created)
└── admin/
    ├── index.html          # Admin dashboard (to be created)
    ├── events.html         # Manage events (to be created)
    ├── bookings.html       # View bookings (to be created)
    ├── analytics.html      # Analytics page (to be created)
    └── styles.css          # Admin-specific styles (to be created)
```

## 🚀 Quick Start

1. **Extract the template** to your desired location
2. **Open `index.html`** in your browser to view the homepage
3. **Customize the colors** in `styles.css` by modifying CSS variables
4. **Update content** in HTML files with your event information
5. **Deploy** to your web server

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #6366f1;        /* Main purple color */
    --secondary: #8b5cf6;      /* Secondary purple */
    --accent: #ec4899;         /* Pink accent */
}
```

### Fonts

The template uses:
- **Poppins** for headings
- **Inter** for body text

Change fonts by updating the Google Fonts import in `styles.css`.

### Event Cards

Event cards use gradient backgrounds. Customize gradients in the inline styles:

```html
<div class="event-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This template is licensed for **single project commercial use**. See [LICENSE.md](LICENSE.md) for details.

## 👤 Author

**Celio Natti**
- GitHub: [@celionatti](https://github.com/celionatti)
- Email: celionatti@gmail.com

## 🙏 Credits

- Design & Development: Celio Natti
- Fonts: Google Fonts (Poppins, Inter)
- Icons: Inline SVG icons

---

© 2026 Celio Natti. All rights reserved.
