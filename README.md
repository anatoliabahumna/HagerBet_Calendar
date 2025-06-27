# Ethiopian Calendar (HagerBet Calendar) 📅

A modern, responsive Ethiopian calendar web application built with vanilla JavaScript, Alpine.js, and TailwindCSS. Features both Gregorian and Ethiopian calendar systems with seamless date conversion.

## Features

✨ **Dual Calendar System**
- Ethiopian calendar display with Amharic month names and weekdays
- Gregorian calendar integration
- Real-time date synchronization

🔄 **Date Conversion**
- Gregorian to Ethiopian date conversion
- Ethiopian to Gregorian date conversion
- Interactive date picker interface

🎨 **Modern Design**
- Dark theme with elegant UI
- Responsive design for all devices
- Smooth animations and transitions
- Beautiful Ethiopian typography with Noto Sans Ethiopic font
- Consistent font weights and sizes throughout

📱 **Progressive Web App**
- Offline support with service worker
- Mobile-friendly responsive design
- Fast loading and smooth performance

## Technologies Used

- **Frontend**: Vanilla JavaScript, Alpine.js
- **Styling**: TailwindCSS, Custom CSS
- **Calendar Library**: [AbushakirJs](https://github.com/Nabute/AbushakirJs) - Ethiopian calendar implementation
- **Typography**: Inter (Latin), Noto Sans Ethiopic (Ethiopian)
- **Icons**: Heroicons (embedded SVG)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/anatoliabahumna/HagerBet_Calendar.git
   cd HagerBet_Calendar
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or serve using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Access the app**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or directly open the `index.html` file

## Project Structure

```
├── assets/
│   ├── css/
│   │   └── style.css          # Custom styles and design system
│   ├── js/
│   │   └── app.js             # Main application logic
│   └── icons/                 # Future icon assets
├── index.html                 # Main HTML file
├── manifest.json             # PWA manifest
├── sw.js                     # Service worker for offline support
└── README.md                 # This file
```

## Usage

### Month View
- Navigate between months using arrow buttons
- View both Gregorian and Ethiopian dates for each day
- Click on any date to see detailed information
- Use "Today" button to quickly return to current date

### Date Converter
- **Gregorian to Ethiopian**: Select any Gregorian date to see its Ethiopian equivalent
- **Ethiopian to Gregorian**: Choose Ethiopian day, month, and year to get the Gregorian date

## Ethiopian Calendar System

The Ethiopian calendar is based on the ancient Coptic calendar and has:
- 13 months (12 months of 30 days + 1 month of 5-6 days)
- New Year starts on September 11 (or 12 in leap years)
- Currently about 7-8 years behind the Gregorian calendar

### Ethiopian Months (የወረሶች ስሞች)
1. **መስከረም** (Meskerem) - September/October
2. **ጥቅምት** (Tikimt) - October/November
3. **ህዳር** (Hidar) - November/December
4. **ታህሳስ** (Tahesas) - December/January
5. **ጥር** (Tir) - January/February
6. **የካቲት** (Yekatit) - February/March
7. **መጋቢት** (Megabit) - March/April
8. **ሚያዝያ** (Miazia) - April/May
9. **ግንቦት** (Ginbot) - May/June
10. **ሰኔ** (Sene) - June/July
11. **ሐምሌ** (Hamle) - July/August
12. **ነሐሴ** (Nehase) - August/September
13. **ጳጉሜ** (Pagumen) - September (5-6 days)

### Weekdays (የሳምንቱ ቀናት)
- **እሑድ** (Sunday)
- **ሰኞ** (Monday)
- **ማክሰኞ** (Tuesday)
- **ረቡዕ** (Wednesday)
- **ሐሙስ** (Thursday)
- **ዓርብ** (Friday)
- **ቅዳሜ** (Saturday)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [AbushakirJs](https://github.com/Nabute/AbushakirJs) for the Ethiopian calendar implementation
- [Alpine.js](https://alpinejs.dev/) for reactive JavaScript framework
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS framework
- [Noto Sans Ethiopic](https://fonts.google.com/noto/specimen/Noto+Sans+Ethiopic) for beautiful Ethiopian typography

---

Built with ❤️ for the Ethiopian community 