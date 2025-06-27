import * as abushakir from 'https://esm.sh/abushakir@1.5.2';

// Ethiopian Calendar Application
document.addEventListener('alpine:init', () => {
  Alpine.data('calendarApp', function() {
  return {
    // State
    loaded: false,
    currentTab: 'month',
    today: new Date(),
    viewDate: new Date(),
    showModal: false,
    modalTitle: '',
    modalSub: '',
    additionalInfo: '',
    isLoading: false,
    dateError: null,

    // Converter State
    gregorianInput: '',
    etiResult: '',
    etiDay: 1,
    etiMonth: 1,
    etiYear: 2017,
    gregResult: '',

    // Constants with Amharic names
    weekdayHeaders: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
    ethiopianMonths: [
      { name: 'መስከረም', english: 'Meskerem' },
      { name: 'ጥቅምት', english: 'Tikimt' },
      { name: 'ህዳር', english: 'Hidar' },
      { name: 'ታህሳስ', english: 'Tahesas' },
      { name: 'ጥር', english: 'Tir' },
      { name: 'የካቲት', english: 'Yekatit' },
      { name: 'መጋቢት', english: 'Megabit' },
      { name: 'ሚያዝያ', english: 'Miazia' },
      { name: 'ግንቦት', english: 'Ginbot' },
      { name: 'ሰኔ', english: 'Sene' },
      { name: 'ሐምሌ', english: 'Hamle' },
      { name: 'ነሐሴ', english: 'Nehase' },
      { name: 'ጳጉሜ', english: 'Pagumen' },
    ],

    // Computed
    get currentYear() {
      return this.viewDate.getFullYear();
    },

    get gregorianMonthName() {
      return this.viewDate.toLocaleDateString('en-US', { month: 'long' });
    },

    get gregorianMonthLabel() {
      return this.viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    },

    get ethiopianMonthLabel() {
      try {
        if (!abushakir) return 'Loading Ethiopian Calendar...';
        const etDate = new abushakir.EtDatetime(this.viewDate.getTime());
        const monthIndex = etDate.date.month - 1;
        return `${this.ethiopianMonths[monthIndex].name} ${etDate.date.year}`;
      } catch (error) {
        console.warn('Ethiopian month label failed:', error);
        return `Loading Ethiopian Calendar...`;
      }
    },

    get availableEthiopianDays() {
      if (this.etiMonth === 13) {
        // Pagumen month has 5 or 6 days (6 in leap years)
        return this.isEthiopianLeapYear(this.etiYear) ? 6 : 5;
      }
      return 30; // Regular months have 30 days
    },

    get calendarDays() {
      const firstDayOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
      const startDay = firstDayOfMonth.getDay(); // Sunday=0, Monday=1, etc.
      const daysInMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0).getDate();

      const daysArray = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startDay; i++) {
        daysArray.push({ key: `empty-${i}`, empty: true });
      }
      
      // Add all days of the month
      for (let d = 1; d <= daysInMonth; d++) {
        const gYear = this.viewDate.getFullYear();
        const gMonth = this.viewDate.getMonth();
        const gDay = d;
        let ethiopian;
        try {
          if (abushakir) {
            // Create date at noon to avoid timezone issues
            const gregDate = new Date(gYear, gMonth, gDay, 12, 0, 0);
            const etDate = new abushakir.EtDatetime(gregDate.getTime());
            ethiopian = { year: etDate.date.year, month: etDate.date.month, day: etDate.date.day };
          } else {
            ethiopian = { year: '?', month: '?', day: '?' };
          }
        } catch (error) {
          console.warn('Ethiopian date conversion failed for', gYear, gMonth + 1, gDay, ':', error);
          ethiopian = { year: '?', month: '?', day: '?' };
        }
        const dateKey = `${gYear}-${gMonth + 1}-${gDay}`;
        const isToday =
          gYear === this.today.getFullYear() &&
          gMonth === this.today.getMonth() &&
          gDay === this.today.getDate();
        
        daysArray.push({
          key: dateKey,
          gregorianDate: d,
          ethiopianDate: ethiopian.day,
          isToday,
          fullGregorian: new Date(gYear, gMonth, gDay),
          ethiopian,
        });
      }
      
      return daysArray;
    },

    // Methods
    async init() {
      // Prevent duplicate initialization
      if (this.loaded) return;
      
      // Fetch current date from internet
      await this.fetchCurrentDate();
      
      // Initialize converter year defaults
      try {
        if (abushakir) {
          const etiNow = new abushakir.EtDatetime(this.today.getTime());
          this.etiYear = etiNow.date.year;
          this.etiMonth = etiNow.date.month;
          this.etiDay = etiNow.date.day;
        }
      } catch (error) {
        console.warn('Ethiopian date init failed:', error);
      }

      this.loaded = true;
    },

    async fetchCurrentDate() {
      this.isLoading = true;
      this.dateError = null;
      
      try {
        // Try to fetch from multiple time APIs
        const timeAPIs = [
          'https://worldtimeapi.org/api/ip',
          'https://timeapi.io/api/Time/current/zone?timeZone=UTC',
          'http://worldclockapi.com/api/json/utc/now'
        ];

        for (const api of timeAPIs) {
          try {
            const response = await fetch(api, { 
              signal: AbortSignal.timeout(5000) // 5 second timeout
            });
            if (response.ok) {
              const data = await response.json();
              let currentDate;
              
              if (data.datetime) {
                // WorldTimeAPI format
                currentDate = new Date(data.datetime);
              } else if (data.dateTime) {
                // TimeAPI format
                currentDate = new Date(data.dateTime);
              } else if (data.currentDateTime) {
                // WorldClockAPI format
                currentDate = new Date(data.currentDateTime);
              }
              
              if (currentDate && !isNaN(currentDate.getTime())) {
                this.today = currentDate;
                this.viewDate = new Date(currentDate);
                console.log('✅ Fetched current date from internet:', currentDate.toISOString());
                return; // Exit completely after success
              }
            }
          } catch (apiError) {
            console.warn(`Failed to fetch from ${api}:`, apiError.message);
            continue;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch internet date:', error.message);
      }
      
      // If no date was fetched from internet, use system date as fallback
      if (!this.today || this.today.getTime() === 0) {
        this.dateError = 'Using local system date (internet time unavailable)';
        this.today = new Date();
        this.viewDate = new Date(this.today);
        console.log('📅 Using local system date:', this.today.toISOString());
      }
      
      this.isLoading = false;
    },

    async refreshDate() {
      await this.fetchCurrentDate();
      this.goToday();
    },

    goToday() {
      this.viewDate = new Date(this.today);
      this.currentTab = 'month';
    },

    prevMonth() {
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    },

    nextMonth() {
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    },

    prevYear() {
      this.viewDate = new Date(this.viewDate.getFullYear() - 1, this.viewDate.getMonth(), 1);
    },

    nextYear() {
      this.viewDate = new Date(this.viewDate.getFullYear() + 1, this.viewDate.getMonth(), 1);
    },

    openDetail(dateObj) {
      if (dateObj.empty) return;
      
      this.modalTitle = dateObj.fullGregorian.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      const et = dateObj.ethiopian;
      this.modalSub = `${this.ethiopianMonths[et.month - 1].name} ${et.day}, ${et.year}`;
      
      // Remove the unnecessary additional info
      this.additionalInfo = '';
      this.showModal = true;
    },


    convertToEthiopian() {
      if (!this.gregorianInput) {
        this.etiResult = '';
        return;
      }
      try {
        if (abushakir) {
          const etDate = new abushakir.EtDatetime(new Date(this.gregorianInput).getTime());
          const monthIndex = etDate.date.month - 1;
          this.etiResult = `${this.ethiopianMonths[monthIndex].name} ${etDate.date.day}, ${etDate.date.year}`;
        }
      } catch (error) {
        console.warn('Gregorian to Ethiopian conversion failed:', error);
        this.etiResult = 'Invalid Date';
      }
    },

    convertToGregorian() {
      console.log('Converting Ethiopian to Gregorian:', { year: this.etiYear, month: this.etiMonth, day: this.etiDay });
      
      try {
        // Clear result first
        this.gregResult = '';
        
        // Check if we have all required values
        if (!abushakir) {
          console.warn('Abushakir library not loaded');
          this.gregResult = 'Library not loaded';
          return;
        }
        
        if (!abushakir.EtDatetime) {
          console.warn('EtDatetime constructor not available');
          this.gregResult = 'EtDatetime not available';
          return;
        }
        
        if (!this.etiYear || !this.etiMonth || !this.etiDay) {
          console.log('Missing required fields');
          return;
        }
        
        // Validate Ethiopian date
        if (this.etiMonth < 1 || this.etiMonth > 13) {
          this.gregResult = 'Invalid Month';
          return;
        }
        
        // Validate day based on month
        if (this.etiMonth === 13) {
          // Pagumen month has only 5 or 6 days (6 in leap years)
          const maxDays = this.isEthiopianLeapYear(this.etiYear) ? 6 : 5;
          if (this.etiDay < 1 || this.etiDay > maxDays) {
            this.gregResult = `Pagumen has only ${maxDays} days`;
            return;
          }
        } else {
          // Regular months have 30 days
          if (this.etiDay < 1 || this.etiDay > 30) {
            this.gregResult = 'Invalid Day (1-30)';
            return;
          }
        }
        
        console.log('Creating EtDatetime with:', { year: this.etiYear, month: this.etiMonth, day: this.etiDay });
        
        // Use the correct constructor format based on AbushakirJs documentation
        const etDate = new abushakir.EtDatetime({
          year: this.etiYear,
          month: this.etiMonth,
          day: this.etiDay,
          hour: 0,
          minute: 0,
          second: 0
        });
        
        console.log('EtDatetime created:', etDate);
        
        if (etDate && etDate.moment) {
          const gcDate = new Date(etDate.moment);
          console.log('Gregorian date:', gcDate);
          
          this.gregResult = gcDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } else {
          this.gregResult = 'Conversion failed';
        }
        
      } catch (error) {
        console.error('Ethiopian to Gregorian conversion failed:', error);
        this.gregResult = 'Invalid Date - ' + error.message;
      }
    },

    // Helper function to check Ethiopian leap year
    isEthiopianLeapYear(year) {
      // Ethiopian leap year calculation: every 4 years, year % 4 === 3
      return (year % 4) === 3;
    },

    // Method to adjust day when month/year changes
    adjustDayForMonth() {
      const maxDays = this.availableEthiopianDays;
      if (this.etiDay > maxDays) {
        this.etiDay = maxDays;
      }
      this.convertToGregorian();
    },
  };
  });
});

// Alpine will be started automatically when using the CDN version
