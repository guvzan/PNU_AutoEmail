# 📧 Excel-Driven Email Sender

A simple Node.js + Express application that lets you:

1. **Upload** an Excel file (`.xlsx`/`.xls`) of users.  
2. **Preview & validate** that data in your browser (check for missing login/password, etc.).  
3. **Submit** with one click to send personalized login/password emails via Gmail SMTP.  
4. **View a report** showing which emails were sent, failed, or skipped.

---

## ✨ Features

- **Excel upload & parsing**  
  Reads the first worksheet of your uploaded file and converts it into JSON rows.
- **Data validation**  
  Flags rows missing required fields (login, password, email, name).
- **Preview page**  
  EJS-rendered table showing each row’s data, validation status, and counts of valid vs. total records.
- **One-click send**  
  Posts only the parsed `rows` JSON to an endpoint that loops through and sends individual emails via Nodemailer.
- **Delivery report**  
  Shows a sorted list of “sent”, “failed”, and “skipped” emails, including message IDs or error reasons.
- **Gmail integration**  
  Uses Gmail SMTP with an App Password for quick setup (up to ~500 emails/day).

---

## 🛠 Prerequisites

- Node.js ≥ 14  
- A Gmail account with **2-Step Verification** enabled  
- A **Gmail App Password** for SMTP (16-character)

---

## 🚀 Installation & Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/excel-email-sender.git
   cd excel-email-sender
