# PRIME STREETWEAR 

A modern, high-performance e-commerce storefront designed for **PRIME STREETWEAR**. Built with React, Tailwind CSS, Supabase, and automated transactional emails.

![PRIME Store Overview](https://raw.githubusercontent.com/placeholder-image.png)

---

## Features

- **Modern & Responsive UI:** Built with React, Tailwind CSS, and Lucide React icons.
- **Dynamic Catalog & Filtering:** Clean product browsing with modal previews and volume-based pricing logic.
- **WhatsApp Ordering Pipeline:** Automated order summary formatting sent directly to WhatsApp for fast checkout.
- **Newsletter Subscription:** Interactive welcome modal that stores customer emails in Supabase.
- **Serverless Welcome Emails:** Integrated Supabase Edge Functions powered by Brevo API to send transactional welcome emails instantly without custom domain requirements.
- **Cart Persistence:** Seamless local storage integration to preserve shopping cart state.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Lucide React
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security)
- **Serverless Compute:** Supabase Edge Functions (Deno / TypeScript)
- **Email Delivery Provider:** Brevo API (SMTP / Transactional Email)
- **Build Tool:** Vite

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Supabase CLI (optional for local edge function testing)
