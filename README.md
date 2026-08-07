# SBTE Student Portal (MERN)

A full-stack student portal: students register once, download semester-wise
study material and results, and admins manage everything from a dashboard.

**Stack**
- Frontend: React (Vite) + Tailwind CSS → deployed on **Vercel**
- Backend: Node/Express → deployed on **Render**
- Database: **MongoDB Atlas** (free M0 cluster)
- PDF storage: **Cloudinary** (free tier, 25GB)
- Profile photo storage: **ImgBB** (free, uploaded directly from the browser)

---

## 1. Project structure

```
mern-app/
  backend/     Express API (deploy this to Render)
  frontend/    React app (deploy this to Vercel)
```

---

## 2. Set up MongoDB Atlas (free)

1. Create a free account at https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster.
3. Database Access → add a database user (username + password).
4. Network Access → add IP `0.0.0.0/0` (allow from anywhere — Render's IPs
   aren't static on the free plan).
5. Click "Connect" → "Drivers" → copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   Add a database name before the `?`, e.g. `.../sbte_portal?retryWrites=...`

---

## 3. Set up Cloudinary (free, for PDFs)

1. Sign up at https://cloudinary.com/users/register_free
2. On your Cloudinary dashboard, copy: **Cloud name**, **API Key**, **API Secret**.
   That's it — no bucket/policy setup needed, the backend uploads directly via SDK.

---

## 4. Set up ImgBB (free, for profile photos)

1. Sign up / log in at https://imgbb.com (you already have an account:
   https://ujjwal-mehta.imgbb.com/)
2. Get your API key at https://api.imgbb.com/ (click "Get API key" while logged in).
3. You'll paste this into the **frontend's** env vars (`VITE_IMGBB_KEY`) — the
   browser uploads the photo directly to ImgBB, the backend never sees the file,
   it just stores the resulting URL.

---

## 5. Deploy the backend to Render

1. Push this whole `mern-app` folder to a GitHub repo.
2. On https://render.com → New → Web Service → connect your repo.
3. Settings:
   - **Root directory**: `backend`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Instance type**: Free
4. Add these Environment Variables (Render dashboard → Environment):

   | Key | Value |
   |---|---|
   | `MONGO_URI` | your Atlas connection string |
   | `JWT_SECRET` | any long random string |
   | `ADMIN_USERNAME` | pick an admin username |
   | `ADMIN_PASSWORD` | pick an admin password |
   | `CLOUDINARY_CLOUD_NAME` | from Cloudinary dashboard |
   | `CLOUDINARY_API_KEY` | from Cloudinary dashboard |
   | `CLOUDINARY_API_SECRET` | from Cloudinary dashboard |
   | `CLIENT_ORIGIN` | your Vercel URL, e.g. `https://your-app.vercel.app` (comma-separate if you have more than one, e.g. add `http://localhost:5173` too while testing) |
   | `RENDER_EXTERNAL_URL` | your Render URL once it's assigned, e.g. `https://sbte-portal-backend.onrender.com` (add this AFTER first deploy, then redeploy) |

5. Deploy. Once live, note the URL Render gives you (e.g.
   `https://sbte-portal-backend.onrender.com`) — you'll need it for the frontend.

### About the free-tier "keep-alive" helper
Render's free tier spins a service down after ~15 minutes of no traffic, and the
next request then takes 30–60s to "wake it up." `backend/src/utils/keepAlive.js`
pings the server's own `/api/health` endpoint every 5 minutes, which counts as
traffic and prevents the spin-down — as long as `RENDER_EXTERNAL_URL` is set.
Good enough for a student project; if you outgrow the free tier, remove it and
upgrade the Render plan instead (self-pinging is a workaround, not a real fix).

---

## 6. Deploy the frontend to Vercel

1. On https://vercel.com → New Project → import the same GitHub repo.
2. Settings:
   - **Root directory**: `frontend`
   - Framework preset: Vite (auto-detected)
3. Add Environment Variables:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | your Render backend URL (no trailing slash) |
   | `VITE_IMGBB_KEY` | your ImgBB API key |

4. Deploy. Vercel will give you a URL like `https://your-app.vercel.app`.
5. **Go back to Render** and make sure `CLIENT_ORIGIN` includes this exact URL,
   then redeploy the backend (env var changes require a redeploy on Render).

---

## 7. Try it out

- Visit your Vercel URL → Sign up as a student → you'll land on the profile
  page automatically the first time → fill it in → dashboard.
- Visit `/admin/login` → log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD`
  you set on Render → upload content, send notices, manage students.

---

## New features added

**Student-facing**
1. Global search bar on the dashboard (searches title + subject across your semester's content)
2. Search, subject filter, and sort (newest/oldest/most downloaded) inside each content section
3. "NEW" badge on anything uploaded in the last 7 days
4. Bookmarks — star any resource, view them all on a dedicated Bookmarks page
5. Inline PDF preview (no download needed just to check a file)
6. "Report a problem" flag on any resource, sent straight to the admin
7. Recently downloaded list on the dashboard (last 5)
8. Notices page with a bell icon + unread badge in the navbar
9. Pinned notices (📌 shown first) and targeted notices (branch/semester-specific, or everyone)
10. Change password from the profile page
11. Profile now shows total downloads and member-since date

**Admin-facing**
12. Bulk PDF upload — attach many files at once under shared branch/semester/subject, filename becomes the title
13. Search + type filter in the content manager
14. CSV export of all content
15. CSV export of all students (includes last login, total downloads)
16. Bulk "promote to next semester" for selected students
17. Reported Files page — see and resolve everything students have flagged
18. Activity Log — an audit trail of every admin action (uploads, edits, deletes, notices, promotions)
19. "Top downloaded resources" widget on the admin overview

No new services are required for any of this — same MongoDB Atlas / Cloudinary / ImgBB / Render / Vercel setup as before.

## Notes on how a few specific features work

- **Result download**: the backend builds the roll number as
  `<semester>1<boardRegNo>` (e.g. semester 2, reg no `1151825007` →
  `211151825007`) and calls the SBTE result API. If it doesn't return a PDF
  (result not published), the student sees a clean "Result not published yet"
  message instead of an error.
- **Semester-wise filtering**: every content item is tagged with a branch +
  semester; students only ever query (and only ever see) items matching their
  own profile.
- **First-login redirect**: both register and login responses include a
  `firstLogin` flag; the frontend redirects there once, then never again once
  the student saves their profile.
- **Passwords are stored in plain text**, at your explicit request — this
  means anyone with database access (or anyone who breaches the DB) can read
  every student's password directly, and because people reuse passwords, that
  risk extends beyond this app. If you ever want it fixed, it's a ~10 line
  change in `backend/src/routes/auth.js` (hash on register, compare-hash on
  login) with no other changes needed anywhere else in the app.

## Local development

```bash
# backend
cd backend
cp .env.example .env   # fill in real values
npm install
npm run dev             # http://localhost:5000

# frontend (separate terminal)
cd frontend
cp .env.example .env    # set VITE_API_URL=http://localhost:5000
npm install
npm run dev              # http://localhost:5173
```
