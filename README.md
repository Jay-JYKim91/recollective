# 📚 Recollective

> _Remember, Reflect, Rediscover._

🔗 **Live Site**: [https://recollective-five.vercel.app/](https://recollective-five.vercel.app/)

**Recollective** is a personal archiving web app that helps you keep track of what you've read or watched — including books, movies, and dramas.  
It doesn’t just store your memories — it gives you insights, like total pages read in a year or your most-watched genre.

---

## ✨ Features

- 🔐 **User Authentication**
  - Sign up / Log in / Log out with Supabase Auth
- 📌 **Record Tracking**
  - Add a record by selecting a type (book, movie, drama)
  - Edit / delete records
  - Filter records by year, type, and rating
  - Sort records by date (ascending / descending)
- ⭐ **Rating System**
  - Interactive 5-star rating component
- 📊 **Statistics**
  - Summary Overview: Watch time, total pages read, average rating, total number of records
  - Top Rated by Type: Highlights the best-rated book, movie, and drama
  - Type Breakdown: Visual distribution of content types (books, movies, dramas)
  - Genre Preferences: Shows which genres you engage with most
  - Monthly Activity Chart: Displays how many records you added per month
- 📱 **Responsive UI** using Tailwind CSS & DaisyUI

---

## 🖼️ Demo

Here’s a quick preview of Recollective in action:

### ✅ Adding and Managing Records

![Adding and Managing Records](/docs/Adding_and_Managing_Records.gif)

### ✅ Filtering and Sorting Records

![Filtering Records](/docs/Filtering_and_Sorting.gif)

### ✅ Viewing Statistics

![Viewing Statistics](/docs/Viewing_Statistics.gif)

### ✅ Dark Mode Support

![Dark Mode Support](/docs/Dark_Mode_Support.gif)

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, DaisyUI, React Query
- **Backend & Auth**: Supabase
- **Testing**: Jest, React Testing Library

---

## 🧠 What I Learned / Challenges

- 🔐 **Handling Supabase Row-Level Security (RLS)**  
  Although it wasn’t my first time dealing with access control, this was my first time doing it with Supabase.  
  I carefully read the official documentation and defined the necessary policies to ensure that users could only access their own data.

- 📦 **Managing Relational Data with Supabase**  
  I needed to link records with metadata such as genre or type using foreign keys.  
  Supabase’s approach to relational queries was different from traditional SQL or ORMs, so I had to experiment with various query methods like `select` and `filter` to get the data I wanted.

- 🌙 **Implementing Dark Mode with Tailwind + DaisyUI**  
  I wanted to support both system dark mode preferences and manual toggling.  
  I explored how DaisyUI handles themes and implemented dark mode switching using `data-theme`, storing the user’s selection in localStorage.

- 🎨 **Filtering Records by Multiple Criteria**  
  I designed a flexible filtering system that lets users filter records by year, type, and rating.  
  It required thoughtful UI/UX decisions and state management to make sure each filter worked independently and together.

- 📊 **Creating Dynamic Statistics from Raw Data**  
  I developed functions to generate insights such as average rating, total watch time, and pages read.  
  It helped me think critically about transforming raw data into meaningful summaries and taught me how to handle edge cases like empty values.

- 🧪 **Test-Driven Component Development**  
  This was my first real experience writing test code.  
  I started by writing unit tests for utility functions in `utils/common`, which helped me get used to the syntax and workflow.  
  Then I moved on to small UI components in `components/ui`, practicing how to write rendering tests using React Testing Library.  
  I'm gradually expanding test coverage and becoming more comfortable with writing tests in my development process.

---

## 📊 Future Improvements

- ♿ **Accessibility Enhancements**  
  Improve keyboard navigation, focus states, and ARIA roles to make the app more accessible to all users.

- 💡 **Chrome Lighthouse Optimization**  
  Run performance and accessibility audits using Chrome Lighthouse and address any issues to improve app quality.

- 🔍 **Auto-Fill Metadata via External API**  
  When adding a record, automatically populate fields like director, runtime, or page count by fetching data from an external API based on the title.

- 🧪 **Increase Test Coverage**  
  Continue expanding test coverage to include more components, edge cases, and integration scenarios for higher reliability.

- 🔄 **Pagination or Infinite Scroll for Record Lists**  
  As the number of records grows, implement pagination or infinite scrolling to improve performance and user experience when browsing the list.
