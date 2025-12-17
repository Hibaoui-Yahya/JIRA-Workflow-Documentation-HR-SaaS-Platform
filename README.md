# 📋 JIRA Workflow Documentation - HR SaaS Platform

<div align="center">

![JIRA Workflow](https://img.shields.io/badge/JIRA-Workflow-6366f1?style=for-the-badge&logo=jira&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A comprehensive, interactive JIRA workflow documentation guide designed for HR SaaS development teams.**

[🚀 Live Demo](https://hibaoui-yahya.github.io/JIRA-Workflow-Documentation-HR-SaaS-Platform/) · [📖 Documentation](#features) · [🐛 Report Bug](https://github.com/Hibaoui-Yahya/JIRA-Workflow-Documentation-HR-SaaS-Platform/issues)

</div>

---

## ✨ Features

### 🎯 Interactive Hierarchy Diagram
Visual representation of JIRA issue types with clickable nodes that reveal detailed explanations:
- **Epic** → Stories, Tasks, Bugs → Subtasks
- Click any node to learn about its purpose and best practices

### 📊 Quick Comparison Table
At-a-glance reference showing:
| Type | Size | Time to Complete | Who Creates It |
|------|------|------------------|----------------|
| Idea | Just a suggestion | Never (until approved) | Anyone |
| Epic | 50-100+ points | 2-3 months | Product Manager |
| Story | 3-8 points | 2-5 days | Product Manager |
| Task | 1-8 points | 1-3 days | Developers |
| Bug | 1-5 points | 4 hours - 2 days | Anyone |
| Sub-task | 0.5-2 points | 2-4 hours | Developers |

### 🌳 Real-World Example Tree
Visual breakdown of a real Epic with its child issues:
```
📌 Epic: Develop Employee Management Module
├── 📄 Story: As an admin, I can view employee list
├── 📄 Story: As an admin, I can add new employees
├── ✅ Task: Design database schema for employees
├── ✅ Task: Create REST API endpoints
├── ✅ Task: Build employee list UI component
├── 🐛 Bug: Fix pagination on employee list
└── 📦 Subtask: Deploy to staging environment
```

### 🔄 Development Workflow Stages
8 comprehensive workflow stages with metrics:
1. **Backlog** - Ideas waiting to be refined
2. **Ready for Dev** - Fully refined and ready
3. **In Progress** - Active development
4. **Code Review** - Peer review
5. **QA Testing** - Quality assurance
6. **Staging** - Pre-production validation
7. **Ready for Prod** - Approved for release
8. **Done** - Deployed and verified

### ⭐ Best Practices Section
- Sprint Structure guidelines
- Story Points estimation (Fibonacci)
- Definition of Done checklist
- SLA Guidelines for different priorities

### 🏢 HR Platform Specific Considerations
- Security & Compliance (GDPR, PII protection)
- Integration Testing requirements
- Performance benchmarks

---

## 🎨 Design

Built with the **Iconsax** design system featuring:
- 🎯 Clean, modern light theme
- 💜 Vibrant purple/indigo accent colors
- 🔘 Pill-shaped interactive elements
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎭 Beautiful iconography with [Iconsax React](https://iconsax.io/)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Iconsax React** | Icon Library |
| **CSS3** | Styling (Custom Properties, Flexbox, Grid) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Hibaoui-Yahya/JIRA-Workflow-Documentation-HR-SaaS-Platform.git

# Navigate to project directory
cd JIRA-Workflow-Documentation-HR-SaaS-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## 📁 Project Structure

```
jira-workflow-app/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── src/
│   ├── App.tsx            # Main component with all logic
│   ├── App.css            # Component styles
│   ├── index.css          # Global styles & design system
│   └── main.tsx           # React entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

---

## 🌐 Deployment

### GitHub Pages (Automatic)
The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

### Vercel
1. Import the repository on [Vercel](https://vercel.com)
2. Click "Deploy"
3. Done! ✅

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 📝 Issue Types Explained

### 💡 Idea
Initial concepts and suggestions before formal planning. Anyone can create ideas, which are reviewed monthly.

### 🟣 Epic
Large feature sets spanning 2+ sprints (50-100+ story points). Examples:
- Employee Onboarding Module
- Performance Review System
- Time & Attendance Tracking

### 📄 Story
User-facing features with clear acceptance criteria. Format:
> "As a [role], I want [feature], so that [benefit]"

### ✅ Task
Technical work without direct user value:
- Infrastructure setup
- Database migrations
- CI/CD configuration

### 🐛 Bug
Issues that need fixing, categorized by severity:
- **Critical**: 4 hours response
- **High**: 24 hours response
- **Medium**: 3 days response
- **Low**: Next sprint

### 📦 Sub-task
Breakdown of Stories/Tasks into 2-4 hour chunks for parallel work distribution.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Yahya Hibaoui**

- GitHub: [@Hibaoui-Yahya](https://github.com/Hibaoui-Yahya)

---

## 🙏 Acknowledgments

- [Iconsax](https://iconsax.io/) for the beautiful icon library
- [Atlassian](https://www.atlassian.com/software/jira) for JIRA best practices inspiration
- React & Vite communities

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for HR SaaS Development Teams

</div>
