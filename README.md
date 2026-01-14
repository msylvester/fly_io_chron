# 📧 Fly.io Email Microservice

> 🚀 A lightweight email microservice built with Express.js and Postmark, designed to run on Fly.io with cron capabilities.

## ✨ Features

- 📨 Send emails via REST API
- ⚡ Fast and lightweight Express.js server
- 📬 Powered by Postmark for reliable email delivery
- 🐳 Docker containerized for easy deployment
- 🌐 Ready for Fly.io with auto-scaling support

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| 🟢 Node.js 20 | Runtime environment |
| 📘 TypeScript | Type-safe development |
| 🚂 Express.js | Web framework |
| 📮 Postmark | Email delivery service |
| 🐳 Docker | Containerization |
| 🪂 Fly.io | Cloud deployment |

## 📁 Project Structure

```
📦 fly_io_chron
├── 📂 src/
│   ├── 📄 index.ts           # Express app setup and main server
│   ├── 📂 routes/
│   │   └── 📄 send.ts        # POST /send endpoint handler
│   └── 📂 services/
│       └── 📄 SendMail.ts    # Postmark email service
├── 📄 package.json           # Dependencies and scripts
├── 📄 tsconfig.json          # TypeScript configuration
├── 🐳 Dockerfile             # Multi-stage Docker build
├── 🐳 docker-compose.yml     # Local Docker setup
└── ✈️ fly.toml               # Fly.io deployment config
```

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Postmark account & API token

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fly_io_chron.git
   cd fly_io_chron
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   export POSTMARK_API_TOKEN="your-postmark-api-token"
   export POSTMARK_FROM_EMAIL="sender@yourdomain.com"
   ```

### 🏃 Running the App

#### 💻 Development Mode
```bash
npm run dev
```

#### 🏭 Production Mode
```bash
npm run build
npm start
```

#### 🐳 Using Docker
```bash
docker-compose up
```

## 📡 API Endpoints

### 🏥 Health Check

```http
GET /
```

**Response:**
```json
{
  "status": "ok",
  "message": "Email microservice is running"
}
```

### 📧 Send Email

```http
POST /send
Content-Type: application/json

{
  "email": "recipient@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Email is required"
}
```

## ☁️ Deployment to Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

3. **Set secrets**
   ```bash
   fly secrets set POSTMARK_API_TOKEN="your-token"
   fly secrets set POSTMARK_FROM_EMAIL="sender@yourdomain.com"
   ```

4. **Deploy**
   ```bash
   fly deploy
   ```

## ⚙️ Configuration

### 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POSTMARK_API_TOKEN` | Your Postmark API token | ✅ Yes |
| `POSTMARK_FROM_EMAIL` | Sender email address | ✅ Yes |
| `PORT` | Server port (default: 3000) | ❌ No |

### ✈️ Fly.io Settings

- **Region:** `sjc` (San Jose, California)
- **Resources:** 1 shared CPU, 1GB RAM
- **Auto-scaling:** Machines auto-stop when idle

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server with ts-node |
| `npm run build` | 🔨 Compile TypeScript to JavaScript |
| `npm start` | 🚀 Start production server |

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 💾 Commit your changes
4. 📤 Push to the branch
5. 🔃 Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ for testing Fly.io cron capabilities
</p>
