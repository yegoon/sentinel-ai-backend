# 🛡️ Sentinel AI Kenya

**AI-Powered Fraud Detection for Kenya's Digital Economy**

[![Deploy Backend](https://img.shields.io/badge/deploy-railway-blueviolet)](https://railway.app)
[![Deploy Frontend](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com)
[![Python](https://img.shields.io/badge/python-3.10+-blue)](https://python.org)
[![React](https://img.shields.io/badge/react-18+-61DAFB)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688)](https://fastapi.tiangolo.com)

---

## 🚀 Overview

Sentinel AI Kenya is Kenya's first AI-powered fraud detection platform specifically designed for the local market. We protect banks, SACCOs, and betting companies from fraud losses through real-time machine learning-based detection.

### Products

**SwapGuard** - SIM Swap Fraud Detection
- Real-time risk scoring for SIM swap requests
- Location anomaly detection
- Behavioral pattern analysis
- Sub-100ms response time

**BetShield** - Betting Fraud Prevention
- Multi-account detection
- Bonus abuse prevention  
- Device fingerprinting
- Payment fraud detection

---

## 💰 The Problem

- Banks lost **KSh 1.59 billion** to fraud in 2024 (286% increase)
- **28,000 SIM swaps daily** at Safaricom alone
- **82% of Kenyans** targeted by fraud attempts
- Betting companies lose millions to bonus abuse and multi-accounting

---

## ✨ Our Solution

### Why Sentinel AI?

✅ **Kenya-Specific** - Trained on local fraud patterns (M-Pesa, mobile money, betting)
✅ **90% Cheaper** - $50K-200K/year vs. $500K-2M+ for global vendors
✅ **10x Faster** - Deploy in 2 weeks vs. 6-12 months
✅ **Real-Time** - Sub-100ms fraud detection
✅ **Explainable AI** - Clear reasons for each decision
✅ **Easy Integration** - Simple REST API

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│     Frontend (Vercel)           │
│     React Dashboard             │
│     Real-time Monitoring        │
└──────────┬──────────────────────┘
           │ REST API
           │
┌──────────▼──────────────────────┐
│     Backend (Railway)           │
│     FastAPI + Python            │
│     ML Fraud Detection Engine   │
└──────────┬──────────────────────┘
           │
┌──────────▼──────────────────────┐
│     Database (PostgreSQL)       │
│     Transaction History         │
│     User Data & Analytics       │
└─────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- Git
- Railway account (backend)
- Vercel account (frontend)

### Backend Deployment

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/sentinel-ai-backend.git
cd sentinel-ai-backend

# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn main:app --reload

# Visit API docs
# http://localhost:8000/docs
```

### Deploy to Railway

1. Push code to GitHub
2. Connect repository to Railway
3. Railway auto-deploys
4. Get your API URL: `https://your-app.up.railway.app`

### Frontend Deployment

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/sentinel-ai-frontend.git
cd sentinel-ai-frontend

# Install dependencies
npm install

# Run locally
npm run dev

# Visit dashboard
# http://localhost:5173
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variable: `VITE_API_URL`
4. Deploy automatically

---

## 📡 API Documentation

### SwapGuard Endpoint

**Check SIM Swap Request**

```bash
POST /api/v1/swapguard/check
```

Request:
```json
{
  "phone_number": "+254712345678",
  "request_location": "Nairobi",
  "previous_location": "Mombasa",
  "request_time": "2025-11-18T14:30:00Z",
  "device_id": "device_abc123",
  "customer_id": "cust_001"
}
```

Response:
```json
{
  "transaction_id": "swap_20251118143000_1234",
  "phone_number": "+254712345678",
  "risk_score": 85,
  "risk_level": "HIGH",
  "decision": "REVIEW",
  "reasons": [
    "Location anomaly: Request from Nairobi, previous location Mombasa"
  ],
  "recommended_action": "Flag for immediate manual review and send SMS verification code",
  "timestamp": "2025-11-18T14:30:00.123456",
  "processing_time_ms": 12
}
```

### BetShield Endpoint

**Analyze Betting Transaction**

```bash
POST /api/v1/betshield/analyze
```

Request:
```json
{
  "user_id": "user_12345",
  "bet_amount": 15000,
  "device_fingerprint": "fp_xyz789",
  "ip_address": "105.163.1.1",
  "bet_type": "sports",
  "bonus_claimed": true,
  "account_age_days": 3,
  "previous_bets_count": 2
}
```

Response:
```json
{
  "transaction_id": "bet_20251118143000_5678",
  "user_id": "user_12345",
  "risk_score": 78,
  "risk_level": "HIGH",
  "decision": "REVIEW",
  "fraud_types": ["bonus_abuse", "new_account_abuse"],
  "linked_accounts": null,
  "recommendation": "Hold transaction for manual review and request additional KYC verification",
  "timestamp": "2025-11-18T14:30:00.123456",
  "processing_time_ms": 15
}
```

### Get Recent Alerts

```bash
GET /api/v1/alerts/recent?limit=10&product=swapguard
```

### Get Statistics

```bash
GET /api/v1/stats
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
PORT=8000
ENVIRONMENT=production
API_KEY_SECRET=your-secret-key
DATABASE_URL=postgresql://user:pass@host:5432/db
SENDGRID_API_KEY=your-sendgrid-key
```

**Frontend (.env)**
```
VITE_API_URL=https://your-backend.up.railway.app
VITE_APP_NAME=Sentinel AI Kenya
```

---

## 📊 Features

### Current (MVP)
- ✅ Real-time fraud detection API
- ✅ SwapGuard (SIM swap detection)
- ✅ BetShield (betting fraud prevention)
- ✅ Risk scoring (0-100)
- ✅ Real-time dashboard
- ✅ API documentation
- ✅ Rule-based detection engine

### Coming Soon (v1.1)
- 🔄 Machine learning models (XGBoost, LSTM)
- 🔄 Database persistence (PostgreSQL)
- 🔄 Authentication & API keys
- 🔄 Email/SMS alerts
- 🔄 Webhook support
- 🔄 Advanced analytics
- 🔄 Client portal

### Roadmap (v2.0)
- 📅 Federated learning across clients
- 📅 Graph neural networks for fraud rings
- 📅 NLP for social engineering detection
- 📅 Biometric verification integration
- 📅 Mobile SDKs (Android/iOS)
- 📅 Real-time streaming (Kafka)

---

## 💼 Business Model

### Pricing

**SwapGuard**
- Tier 1 (SACCOs): KSh 100K/month (up to 1,000 checks/day)
- Tier 2 (Small Banks): KSh 500K/month (up to 5,000 checks/day)
- Tier 3 (Enterprise): KSh 2M+/month (unlimited)
- Pay-per-check: KSh 15 per verification

**BetShield**
- Startup: KSh 300K/month (up to 5,000 bets/day)
- Growth: KSh 800K/month (up to 20,000 bets/day)
- Enterprise: KSh 2M+/month (unlimited)
- Transaction-based: KSh 3 per bet analyzed

### Target Clients

1. **Banks & SACCOs** - 30+ potential clients
2. **Betting Companies** - 221 licensed operators
3. **Fintech Apps** - M-Shwari, Tala, Branch, etc.
4. **Mobile Money Operators** - Safaricom, Airtel, Telkom

---

## 📈 Market Opportunity

- **Total Addressable Market:** $500M+ in Kenya
- **Banks losing:** KSh 1.6B+ annually
- **Betting market:** KSh 766B wagered annually
- **SIM swaps:** 28,000 daily at Safaricom
- **Growth rate:** 286% YoY increase in fraud

---

## 🛠️ Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **ML/AI:** Scikit-learn, XGBoost, TensorFlow
- **Database:** PostgreSQL + Redis
- **Hosting:** Railway.app
- **API Docs:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Build Tool:** Vite

### DevOps
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry, Railway Metrics
- **Version Control:** Git/GitHub

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

Copyright © 2025 Sentinel AI Kenya. All rights reserved.

---

## 📞 Contact

- **Website:** sentinelai.vercel.app
- **Email:** founder@sentinelai.co.ke
- **LinkedIn:** [Sentinel AI Kenya](https://linkedin.com/company/sentinel-ai-kenya)
- **Twitter:** @SentinelAIKE

---

## 🙏 Acknowledgments

Built with support from:
- Kenya's developer community
- Open source ML libraries
- FastAPI & React ecosystems

---

## 🚀 Status

- ✅ **MVP Complete** - Production ready
- 🔄 **Active Development** - New features weekly
- 📈 **Seeking Pilots** - 5 slots available for free 60-day trials
- 💰 **Fundraising** - Seed round Q1 2026

---

**Protecting Kenya's Digital Economy, One Transaction at a Time** 🛡️🇰🇪