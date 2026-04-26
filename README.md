# ConvocaPro Frontend Final

## Includes
- Login/register
- Dashboard
- Course view by user profile
- Units/resources/activities
- Final 200-question exam from backend
- Result review green/red
- Retries visible
- Admin users panel

## Run
Backend must be running at:
http://localhost:8080

Then:

```bash
npm install
npm run dev
```

Open:
http://localhost:5173

Demo users from backend:
- admin / 1234
- tecnico / 1234


## Two Exams Added

Dashboard now shows:
- Examen práctico (`examType=GENERIC`)
- Simulacro Territorial 12 (`examType=TERRITORIAL_12`)

Backend must support:

```http
GET /api/exams/full?userId=1&examType=GENERIC
GET /api/exams/full?userId=1&examType=TERRITORIAL_12
```


## Old UI updated

This version keeps the original CSS/structure and adds:
- Simulacros wording
- exam cards for known exam types
- admin hidden for non-admin users
- submit disabled until all questions are answered
- result analysis by category
- plans section
- admin resource upload UI
