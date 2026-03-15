# Mahadev Kumar — Full-Stack Developer Portfolio

---

## ✨ What's New in v3

| Feature | Details |
| ------- | ------- |
| 🌙 **Dark / Light Mode** | Toggle button in Navbar — persisted via `next-themes` + `localStorage` |
| 🗄️ **Database** | Prisma ORM + SQLite (swap to PostgreSQL/Supabase/PlanetScale easily) |
| 📬 **Contact Form → DB** | Name, email, subject, message, emoji, star rating all saved to `Feedback` table |
| ⭐ **Star Rating** | 1–5 star interactive rating stored with each message |
| 😊 **Emoji Reactions** | Visual mood picker stored as emoji character in DB |
| ✅ **Full Validation** | Client-side + server-side validation with friendly error messages |
| 🎨 **CSS Variables** | All colors controlled via CSS variables — both themes defined in `globals.css` |

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
# Create the SQLite database and push the schema
npx prisma db push

# (Optional) View data in Prisma Studio
npx prisma studio
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database

### Default: SQLite (zero setup, local file)

```env
# .env
DATABASE_URL="file:./prisma/dev.db"
```

### Switch to PostgreSQL (e.g. Supabase, Neon, Railway)

1. Update `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `.env`:

   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
   ```

3. Re-run: `npx prisma db push`

### Feedback Table Schema

```prisma
model Feedback {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  subject   String
  message   String
  emoji     String?   // e.g. "🚀"
  rating    Int?      // 1–5
  createdAt DateTime  @default(now())
  source    String?   @default("portfolio")
}
```

### API Endpoints

| Method | URL                                | Description                    |
| ------ | ---------------------------------- | ------------------------------ |
| `POST` | `/api/feedback`                    | Save new feedback to DB        |
| `GET`  | `/api/feedback?page=1&limit=20`    | List all feedback (paginated)  |

---

## 🌙 Dark / Light Mode

- Controlled by `next-themes` with `attribute="class"`
- Toggle button in the Navbar (pill switch with ☀️/🌙 icons)
- All colors are CSS variables in `app/globals.css`:
  - `:root { }` = light mode
  - `.dark { }` = dark mode
- Tailwind configured with `darkMode: "class"`

---

## 📁 Project Structure

```sh
portfolio-v3/
├── app/
│   ├── api/feedback/route.ts   # POST + GET API endpoints
│   ├── globals.css              # CSS variables, themes, animations
│   ├── layout.tsx               # Root layout with ThemeProvider
│   └── page.tsx                 # Page assembly
├── components/
│   ├── Cursor.tsx
│   ├── Navbar.tsx               # Includes ThemeToggle
│   ├── ThemeToggle.tsx          # ☀️/🌙 pill toggle
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx              # Form with DB submission
│   └── Footer.tsx
├── lib/
│   └── prisma.ts                # Prisma client singleton
├── prisma/
│   └── schema.prisma            # DB schema
├── .env                         # DATABASE_URL
├── tailwind.config.ts
└── package.json
```

---

## 🛠 Customization

- **Personal info** → edit data arrays in each component
- **Colors** → `app/globals.css` (`:root` and `.dark` blocks)
- **Projects** → `PROJECTS` array in `components/Projects.tsx`
- **Skills** → `GROUPS` array in `components/Skills.tsx`
- **Send email notifications** → add Resend/Nodemailer to `app/api/feedback/route.ts` after `prisma.feedback.create()`

---

## 📦 Deploy to Vercel

```bash
npx vercel
```

> For production, switch from SQLite to a hosted DB (Supabase / Neon / PlanetScale) and set `DATABASE_URL` in Vercel environment variables.
