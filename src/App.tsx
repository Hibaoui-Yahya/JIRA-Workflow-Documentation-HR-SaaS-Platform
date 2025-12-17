import React, { useState } from 'react';
import {
  TickCircle, Record, Code1, Eye, Refresh2, Hierarchy, Send2,
  Lamp, CloseCircle, DocumentText, TaskSquare, Layer,
  ArrowDown2, ArrowRight, Flash, Shield, Calendar, People,
  Timer1, Chart, Category, Star1, MessageQuestion, Book, TickSquare
} from 'iconsax-react';
import './App.css';

// Types
interface Status {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  activities: string[];
  metrics?: {
    avgTime: string;
    successRate: string;
  };
}

interface IssueType {
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  bgColor: string;
  whenToUse: string;
  examples: string[];
  workflow: string;
  estimatedSize: string;
  assignee: string;
  priority: string;
  bestPractices: string[];
}

interface BestPractice {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  points: string[];
}

// Diagram node info
interface DiagramNode {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  title: string;
  description: string;
  example: string;
  tip: string;
}

const JiraWorkflow: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedIssueType, setSelectedIssueType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'workflow' | 'issues' | 'practices'>('workflow');
  const [selectedDiagramNode, setSelectedDiagramNode] = useState<string | null>(null);

  const statuses: Status[] = [
    {
      id: 'backlog',
      name: 'Backlog',
      icon: Record,
      color: '#64748b',
      bgColor: '#f1f5f9',
      description: 'Ideas and requirements waiting to be refined',
      activities: ['Product grooming', 'Priority assignment', 'Initial estimation'],
      metrics: { avgTime: '∞', successRate: 'N/A' }
    },
    {
      id: 'ready',
      name: 'Ready for Dev',
      icon: TickCircle,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      description: 'Fully refined and ready to be picked up',
      activities: ['Acceptance criteria defined', 'Technical design reviewed', 'Dependencies identified'],
      metrics: { avgTime: '2-3 days', successRate: '95%' }
    },
    {
      id: 'inprogress',
      name: 'In Progress',
      icon: Code1,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      description: 'Active development work',
      activities: ['Coding', 'Unit testing', 'Code review preparation'],
      metrics: { avgTime: '3-5 days', successRate: '88%' }
    },
    {
      id: 'codereview',
      name: 'Code Review',
      icon: Eye,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      description: 'Peer review of implementation',
      activities: ['PR review', 'Security check', 'Code quality verification'],
      metrics: { avgTime: '1-2 days', successRate: '92%' }
    },
    {
      id: 'qa',
      name: 'QA Testing',
      icon: Refresh2,
      color: '#f97316',
      bgColor: '#fff7ed',
      description: 'Quality assurance verification',
      activities: ['Functional testing', 'Integration testing', 'Regression testing'],
      metrics: { avgTime: '2-3 days', successRate: '85%' }
    },
    {
      id: 'staging',
      name: 'Staging',
      icon: Hierarchy,
      color: '#6366f1',
      bgColor: '#eef2ff',
      description: 'Pre-production validation',
      activities: ['UAT', 'Performance testing', 'Security scan'],
      metrics: { avgTime: '1-2 days', successRate: '97%' }
    },
    {
      id: 'ready-prod',
      name: 'Ready for Prod',
      icon: Send2,
      color: '#14b8a6',
      bgColor: '#f0fdfa',
      description: 'Approved and scheduled for release',
      activities: ['Release notes prepared', 'Deployment plan ready', 'Stakeholder approval'],
      metrics: { avgTime: '< 1 day', successRate: '99%' }
    },
    {
      id: 'done',
      name: 'Done',
      icon: TickCircle,
      color: '#22c55e',
      bgColor: '#f0fdf4',
      description: 'Deployed to production and verified',
      activities: ['Live in production', 'Monitoring active', 'Documentation updated'],
      metrics: { avgTime: 'Complete', successRate: '100%' }
    }
  ];

  const issueTypes: IssueType[] = [
    {
      name: 'Idea',
      icon: Lamp,
      description: 'Initial concepts and suggestions from team or customers',
      color: '#eab308',
      bgColor: '#fefce8',
      whenToUse: 'Use for brainstorming and innovation before formal planning',
      examples: [
        'Add AI-powered resume screening',
        'Integration with LinkedIn for recruiting',
        'Mobile app for employee check-ins',
        'Automated onboarding workflows'
      ],
      workflow: 'Idea → Discussion → Approved → Convert to Epic/Story',
      estimatedSize: 'Not estimated yet',
      assignee: 'Product Manager or team member who suggested it',
      priority: 'Not prioritized until reviewed',
      bestPractices: [
        'Keep description brief but clear',
        'Include business value or problem being solved',
        'Attach mockups or references if available',
        'Tag with relevant stakeholders for review',
        'Review ideas monthly in innovation meetings'
      ]
    },
    {
      name: 'Epic',
      icon: Layer,
      description: 'Large feature sets that span multiple sprints',
      color: '#a855f7',
      bgColor: '#faf5ff',
      whenToUse: 'For major features that take 2+ sprints and contain multiple stories',
      examples: [
        'Employee Onboarding Module',
        'Performance Review System',
        'Time & Attendance Tracking',
        'Payroll Integration Platform'
      ],
      workflow: 'Break down into Stories → Track progress → Close when all stories complete',
      estimatedSize: '20-100+ story points',
      assignee: 'Product Owner or Tech Lead',
      priority: 'High/Medium based on roadmap',
      bestPractices: [
        'Define clear business objectives and KPIs',
        'Create a feature brief with user flows',
        'Break down into 5-15 user stories',
        'Set target release date or quarter',
        'Review progress in sprint reviews',
        'Include technical spikes if architecture needs research'
      ]
    },
    {
      name: 'Story',
      icon: DocumentText,
      description: 'User-facing features from end-user perspective',
      color: '#22c55e',
      bgColor: '#f0fdf4',
      whenToUse: 'For any feature that delivers value to users',
      examples: [
        'As an HR Admin, I want to bulk upload employee data via CSV',
        'As an Employee, I want to request time off through mobile app',
        'As a Manager, I want to approve leave requests with one click',
        'As a Recruiter, I want to filter candidates by skills'
      ],
      workflow: 'Backlog → Ready for Dev → In Progress → Code Review → QA → Staging → Done',
      estimatedSize: '1-13 story points',
      assignee: 'Developer',
      priority: 'Must Have / Should Have / Could Have',
      bestPractices: [
        'Use format: As a [role], I want [feature], so that [benefit]',
        'Include clear acceptance criteria (3-7 points)',
        'Add mockups or wireframes when UI is involved',
        'Define edge cases and error handling',
        'Estimate in story points during refinement',
        'Keep stories completable within one sprint',
        'Tag with affected user roles (HR Admin, Employee, Manager)'
      ]
    },
    {
      name: 'Task',
      icon: TaskSquare,
      description: 'Technical work without direct user value',
      color: '#3b82f6',
      bgColor: '#eff6ff',
      whenToUse: 'For infrastructure, refactoring, or internal improvements',
      examples: [
        'Setup Redis caching for employee search',
        'Migrate database to PostgreSQL 15',
        'Configure CI/CD pipeline for staging',
        'Implement rate limiting on API endpoints',
        'Update dependencies to latest versions'
      ],
      workflow: 'Backlog → In Progress → Code Review → QA (if needed) → Done',
      estimatedSize: '1-8 story points',
      assignee: 'Developer or DevOps Engineer',
      priority: 'Based on technical debt or performance impact',
      bestPractices: [
        'Explain why this work is needed',
        'Include technical acceptance criteria',
        'Document any configuration changes',
        'Add links to relevant documentation or ADRs',
        'Specify if it blocks other work',
        'Consider impact on existing features'
      ]
    },
    {
      name: 'Bug',
      icon: CloseCircle,
      description: 'Issues in production or staging that need fixing',
      color: '#ef4444',
      bgColor: '#fef2f2',
      whenToUse: 'When something is broken or not working as designed',
      examples: [
        'Employee profile page returns 500 error',
        'Leave balance calculation is incorrect',
        'Email notifications not being sent',
        'Dashboard loads slowly with 1000+ employees',
        'Mobile app crashes when uploading documents'
      ],
      workflow: 'Reported → Triaged → In Progress → Code Review → QA → Hotfix/Next Release',
      estimatedSize: '1-5 story points (fix time)',
      assignee: 'Developer (often who wrote the feature)',
      priority: 'Critical / High / Medium / Low',
      bestPractices: [
        'Include steps to reproduce',
        'Add screenshots or error logs',
        'Specify environment (production/staging)',
        'Tag severity: Critical, High, Medium, Low',
        'Link to related story if applicable',
        'Set SLA based on priority',
        'Add regression test after fixing'
      ]
    },
    {
      name: 'Sub-task',
      icon: Category,
      description: 'Breakdown of Stories or Tasks into smaller pieces',
      color: '#64748b',
      bgColor: '#f8fafc',
      whenToUse: 'To divide complex work into manageable chunks',
      examples: [
        'Parent: Employee Profile Page',
        '• Design database schema',
        '• Create API endpoints',
        '• Build frontend UI',
        '• Write unit tests'
      ],
      workflow: 'Same as parent issue',
      estimatedSize: '0.5-3 story points each',
      assignee: 'Different team members can take different sub-tasks',
      priority: 'Inherits from parent',
      bestPractices: [
        'Create 3-6 sub-tasks per story',
        'Each sub-task should be completable in 2-4 hours',
        'Assign to specific team members',
        'Use for parallel work distribution',
        'Parent story closes only when all sub-tasks done',
        'Good for new developers to pick smaller chunks'
      ]
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: 'Sprint Structure',
      icon: Calendar,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      points: [
        '2-week sprints for faster feedback',
        'Sprint planning every Monday morning',
        'Daily standups at 9:30 AM (15 min max)',
        'Sprint review and retrospective on Friday'
      ]
    },
    {
      title: 'Story Points',
      icon: Star1,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      points: [
        'Use Fibonacci sequence (1, 2, 3, 5, 8, 13)',
        '1-2 points: Few hours of work',
        '3-5 points: 1-2 days of work',
        '8+ points: Consider breaking down'
      ]
    },
    {
      title: 'Definition of Done',
      icon: TickCircle,
      color: '#22c55e',
      bgColor: '#f0fdf4',
      points: [
        'Code reviewed and approved',
        'Unit tests written (80% coverage)',
        'QA tested and approved',
        'Documentation updated',
        'No critical/high bugs remaining'
      ]
    },
    {
      title: 'SLA Guidelines',
      icon: Timer1,
      color: '#f97316',
      bgColor: '#fff7ed',
      points: [
        'Critical bugs: 4 hours response',
        'High priority: 24 hours response',
        'Medium priority: 3 days response',
        'Low priority: Next sprint'
      ]
    }
  ];

  // Scrum Elements
  const scrumElements = [
    {
      title: 'Sprint',
      icon: Refresh2,
      color: '#6366f1',
      bgColor: '#eef2ff',
      description: 'A time-boxed iteration (usually 2 weeks) where a potentially releasable product increment is created.',
      keyPoints: ['Fixed duration', 'Cannot be extended', 'Has a clear Sprint Goal']
    },
    {
      title: 'Daily Standup',
      icon: People,
      color: '#22c55e',
      bgColor: '#f0fdf4',
      description: '15-minute daily meeting where team members synchronize activities and create a plan for the next 24 hours.',
      keyPoints: ['What did I do yesterday?', 'What will I do today?', 'Any blockers?']
    },
    {
      title: 'Sprint Planning',
      icon: Calendar,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      description: 'Collaborative meeting to define the Sprint Goal and select Product Backlog items for the Sprint.',
      keyPoints: ['Define Sprint Goal', 'Select backlog items', 'Plan the work']
    },
    {
      title: 'Sprint Review',
      icon: Eye,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      description: 'Meeting at sprint end to inspect the increment and adapt the Product Backlog if needed.',
      keyPoints: ['Demo working software', 'Gather feedback', 'Update backlog']
    },
    {
      title: 'Sprint Retrospective',
      icon: MessageQuestion,
      color: '#ec4899',
      bgColor: '#fdf2f8',
      description: 'Meeting for the Scrum Team to inspect itself and create an improvement plan.',
      keyPoints: ['What went well?', 'What needs improvement?', 'Action items']
    },
    {
      title: 'Product Backlog',
      icon: Layer,
      color: '#0ea5e9',
      bgColor: '#f0f9ff',
      description: 'Ordered list of everything that is known to be needed in the product.',
      keyPoints: ['Prioritized by PO', 'Living document', 'Single source of truth']
    }
  ];

  // Tips for Scrum
  const scrumTips = [
    {
      title: 'Keep Sprints Short',
      description: '2-week sprints provide faster feedback loops and reduce risk of going off-track.',
      icon: Timer1
    },
    {
      title: 'Protect the Sprint',
      description: 'Once a sprint starts, avoid adding new work. Scope changes should wait for next sprint.',
      icon: Shield
    },
    {
      title: 'Embrace Transparency',
      description: 'Make work visible using JIRA boards. Everyone should see progress and blockers.',
      icon: Eye
    },
    {
      title: 'Focus on Outcomes',
      description: 'Measure success by delivered value, not just completed tasks or velocity.',
      icon: Chart
    },
    {
      title: 'Continuous Improvement',
      description: 'Use retrospectives to identify one actionable improvement each sprint.',
      icon: Refresh2
    },
    {
      title: 'Collaborate Daily',
      description: 'Keep standups focused. Use them for coordination, not status reports to managers.',
      icon: People
    }
  ];

  // Diagram nodes for interactive hierarchy
  const diagramNodes: DiagramNode[] = [
    {
      id: 'epic',
      name: 'Epic',
      icon: Flash,
      color: '#a855f7',
      bgColor: '#faf5ff',
      title: 'An Epic represents a large body of work',
      description: 'Epics can be broken down into smaller chunks called Stories, Tasks, and Bugs. You and your team can decide what constitutes a large body of work.',
      example: 'For example: You might create an epic for a redesign of the Employee Dashboard, or implementing the entire Time & Attendance module.',
      tip: 'Known as "parent" work items, epics contain smaller work items within them.'
    },
    {
      id: 'story',
      name: 'Story',
      icon: DocumentText,
      color: '#22c55e',
      bgColor: '#f0fdf4',
      title: 'A Story represents user-facing functionality',
      description: 'Stories capture requirements from the end-user perspective. They deliver value directly to users and are sized to complete in one sprint.',
      example: 'For example: "As an HR Admin, I want to bulk upload employee data via CSV so that I can onboard multiple employees at once."',
      tip: 'Use the format: As a [role], I want [feature], so that [benefit].'
    },
    {
      id: 'task',
      name: 'Task',
      icon: TickSquare,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      title: 'A Task represents technical work',
      description: 'Tasks are technical work that doesn\'t directly provide user value but is necessary for the system. Often infrastructure, refactoring, or internal improvements.',
      example: 'For example: Setup Redis caching for employee search, Configure CI/CD pipeline, or Migrate database to PostgreSQL 15.',
      tip: 'Tasks help track work that needs to be done but isn\'t visible to end users.'
    },
    {
      id: 'bug',
      name: 'Bug',
      icon: CloseCircle,
      color: '#ef4444',
      bgColor: '#fef2f2',
      title: 'A Bug represents something broken',
      description: 'Bugs are defects or issues that cause the system to behave incorrectly. They need to be triaged, prioritized, and fixed based on severity.',
      example: 'For example: Employee profile page returns 500 error, Leave balance calculation is incorrect, or Email notifications not being sent.',
      tip: 'Always include steps to reproduce, expected vs actual behavior, and screenshots.'
    },
    {
      id: 'subtask',
      name: 'Subtask',
      icon: Category,
      color: '#64748b',
      bgColor: '#f8fafc',
      title: 'A Subtask breaks down larger items',
      description: 'Subtasks divide Stories or Tasks into smaller, manageable pieces. They help distribute work among team members and track progress granularly.',
      example: 'For example: A Story "Employee Profile Page" might have subtasks: Design database schema, Create API endpoints, Build frontend UI, Write unit tests.',
      tip: 'Each subtask should be completable in 2-4 hours. Create 3-6 subtasks per story.'
    }
  ];

  // Example tree data
  const exampleTree = {
    epic: {
      title: 'Epic: Develop Employee Management Module',
      icon: Flash,
      color: '#a855f7',
      bgColor: '#faf5ff'
    },
    children: [
      { type: 'story', title: 'Story: As an admin, I can view employee list', icon: DocumentText, color: '#22c55e' },
      { type: 'story', title: 'Story: As an admin, I can add new employees', icon: DocumentText, color: '#22c55e' },
      { type: 'task', title: 'Task: Design database schema for employees', icon: TickSquare, color: '#3b82f6' },
      { type: 'task', title: 'Task: Create REST API endpoints', icon: TickSquare, color: '#3b82f6' },
      { type: 'task', title: 'Task: Build employee list UI component', icon: TickSquare, color: '#3b82f6' },
      { type: 'bug', title: 'Bug: Fix pagination on employee list', icon: CloseCircle, color: '#ef4444' },
      { type: 'subtask', title: 'Subtask: Deploy to staging environment', icon: Category, color: '#64748b', indent: true }
    ]
  };

  const tabs = [
    { id: 'workflow', label: 'Development Workflow', icon: Hierarchy },
    { id: 'issues', label: 'Issue Types', icon: Layer },
    { id: 'practices', label: 'Best Practices', icon: Star1 }
  ] as const;

  return (
    <div className="app-container">
      {/* Background Elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-badge">
            <Flash size={16} color="#6366f1" variant="Bold" />
            <span>HR SaaS Platform</span>
          </div>
          <h1 className="header-title">
            <span className="gradient-text">JIRA Workflow</span>
          </h1>
          <p className="header-subtitle">
            The most intuitive and effective development workflow guide
          </p>
          <p className="header-description">
            Optimized for continuous delivery, quality assurance, and team collaboration
          </p>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ background: '#eff6ff' }}>
              <Chart size={22} color="#3b82f6" variant="Bold" />
            </div>
            <div className="stat-content">
              <span className="stat-value">8</span>
              <span className="stat-label">Workflow Stages</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ background: '#f5f3ff' }}>
              <Layer size={22} color="#8b5cf6" variant="Bold" />
            </div>
            <div className="stat-content">
              <span className="stat-value">6</span>
              <span className="stat-label">Issue Types</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ background: '#f0fdf4' }}>
              <People size={22} color="#22c55e" variant="Bold" />
            </div>
            <div className="stat-content">
              <span className="stat-value">2 wk</span>
              <span className="stat-label">Sprint Length</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrapper" style={{ background: '#fff7ed' }}>
              <Flash size={22} color="#f97316" variant="Bold" />
            </div>
            <div className="stat-content">
              <span className="stat-value">100%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon
                size={20}
                color={activeTab === tab.id ? '#ffffff' : '#64748b'}
                variant={activeTab === tab.id ? 'Bold' : 'Linear'}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Workflow Section */}
        {activeTab === 'workflow' && (
          <section className="workflow-section fade-in">
            <div className="section-header">
              <h2>Development Pipeline</h2>
              <p>Click on any stage to explore key activities and metrics</p>
            </div>

            <div className="workflow-grid">
              {statuses.map((status, index) => {
                const Icon = status.icon;
                const isSelected = selectedStatus === status.id;
                return (
                  <div key={status.id} className="workflow-item">
                    <div
                      onClick={() => setSelectedStatus(isSelected ? null : status.id)}
                      className={`workflow-card ${isSelected ? 'selected' : ''}`}
                      style={{ '--accent-color': status.color, '--bg-color': status.bgColor } as React.CSSProperties}
                    >
                      <div className="workflow-card-header">
                        <div className="workflow-icon-wrapper" style={{ background: status.bgColor }}>
                          <Icon size={24} color={status.color} variant="Bold" />
                        </div>
                        <span className="workflow-number">{index + 1}</span>
                      </div>
                      <div className="workflow-card-body">
                        <h3>{status.name}</h3>
                        <p>{status.description}</p>

                        {status.metrics && (
                          <div className="workflow-metrics">
                            <div className="metric">
                              <Timer1 size={14} color={status.color} variant="Linear" />
                              <span>{status.metrics.avgTime}</span>
                            </div>
                            <div className="metric">
                              <TickCircle size={14} color={status.color} variant="Linear" />
                              <span>{status.metrics.successRate}</span>
                            </div>
                          </div>
                        )}

                        {isSelected && (
                          <div className="workflow-activities">
                            <h4>Key Activities</h4>
                            <ul>
                              {status.activities.map((activity, i) => (
                                <li key={i}>
                                  <ArrowRight size={14} color={status.color} />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="workflow-card-footer">
                        <span>{isSelected ? 'Click to collapse' : 'Click to expand'}</span>
                        <ArrowDown2
                          size={16}
                          color="#94a3b8"
                          className={isSelected ? 'rotated' : ''}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Flow Legend */}
            <div className="flow-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'linear-gradient(135deg, #64748b, #3b82f6)' }}></div>
                <span>Planning Phase</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'linear-gradient(135deg, #f59e0b, #8b5cf6)' }}></div>
                <span>Development Phase</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'linear-gradient(135deg, #f97316, #6366f1)' }}></div>
                <span>Testing Phase</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'linear-gradient(135deg, #14b8a6, #22c55e)' }}></div>
                <span>Deployment Phase</span>
              </div>
            </div>
          </section>
        )}

        {/* Issue Types Section */}
        {activeTab === 'issues' && (
          <section className="issues-section fade-in">
            <div className="section-header">
              <h2>Issue Types Guide</h2>
              <p>Complete documentation for each JIRA issue type with examples and best practices</p>
            </div>

            {/* Interactive Hierarchy Diagram */}
            <div className="hierarchy-diagram-container">
              <div className="diagram-instruction">
                <span className="instruction-icon">👆</span>
                <span>Click each item in the diagram below to explore common work types.</span>
              </div>

              <div className="hierarchy-diagram">
                {/* Epic - Top Level */}
                <div className="diagram-level epic-level">
                  <button
                    className={`diagram-node epic-node ${selectedDiagramNode === 'epic' ? 'selected' : ''}`}
                    onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'epic' ? null : 'epic')}
                  >
                    <Flash size={18} color="#a855f7" variant="Bold" />
                    <span>Epic</span>
                  </button>
                </div>

                {/* Connector Lines */}
                <div className="diagram-connector">
                  <div className="connector-vertical"></div>
                  <div className="connector-horizontal">
                    <div className="connector-middle"></div>
                  </div>
                </div>

                {/* Second Level - Story, Task, Bug */}
                <div className="diagram-level second-level">
                  <div className="diagram-branch">
                    <button
                      className={`diagram-node story-node ${selectedDiagramNode === 'story' ? 'selected' : ''}`}
                      onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'story' ? null : 'story')}
                    >
                      <DocumentText size={18} color="#22c55e" variant="Bold" />
                      <span>Story</span>
                    </button>
                    <div className="branch-connector"></div>
                    <button
                      className={`diagram-node subtask-node ${selectedDiagramNode === 'subtask' ? 'selected' : ''}`}
                      onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'subtask' ? null : 'subtask')}
                    >
                      <Category size={16} color="#64748b" variant="Bold" />
                      <span>Subtask</span>
                    </button>
                  </div>

                  <div className="diagram-branch">
                    <button
                      className={`diagram-node task-node ${selectedDiagramNode === 'task' ? 'selected' : ''}`}
                      onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'task' ? null : 'task')}
                    >
                      <TickSquare size={18} color="#3b82f6" variant="Bold" />
                      <span>Task</span>
                    </button>
                    <div className="branch-connector"></div>
                    <button
                      className={`diagram-node subtask-node ${selectedDiagramNode === 'subtask' ? 'selected' : ''}`}
                      onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'subtask' ? null : 'subtask')}
                    >
                      <Category size={16} color="#64748b" variant="Bold" />
                      <span>Subtask</span>
                    </button>
                  </div>

                  <div className="diagram-branch">
                    <button
                      className={`diagram-node bug-node ${selectedDiagramNode === 'bug' ? 'selected' : ''}`}
                      onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'bug' ? null : 'bug')}
                    >
                      <CloseCircle size={18} color="#ef4444" variant="Bold" />
                      <span>Bug</span>
                    </button>
                    <div className="branch-connector"></div>
                    <button
                      className={`diagram-node subtask-node ${selectedDiagramNode === 'subtask' ? 'selected' : ''}`}
                      onClick={() => setSelectedDiagramNode(selectedDiagramNode === 'subtask' ? null : 'subtask')}
                    >
                      <Category size={16} color="#64748b" variant="Bold" />
                      <span>Subtask</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              {selectedDiagramNode && (
                <div className="diagram-info-card" style={{
                  borderColor: diagramNodes.find(n => n.id === selectedDiagramNode)?.color
                }}>
                  <div className="info-card-content">
                    <p className="info-title">
                      {diagramNodes.find(n => n.id === selectedDiagramNode)?.name && (
                        <span
                          className="highlight-text"
                          style={{ background: diagramNodes.find(n => n.id === selectedDiagramNode)?.bgColor, color: diagramNodes.find(n => n.id === selectedDiagramNode)?.color }}
                        >
                          {diagramNodes.find(n => n.id === selectedDiagramNode)?.name}
                        </span>
                      )}
                      {' '}{diagramNodes.find(n => n.id === selectedDiagramNode)?.title.replace(/^An? \w+ represents/, 'represents')}
                    </p>
                    <p className="info-example">
                      <strong>For example:</strong> {diagramNodes.find(n => n.id === selectedDiagramNode)?.example.replace('For example: ', '')}
                    </p>
                    <p className="info-tip">
                      {diagramNodes.find(n => n.id === selectedDiagramNode)?.tip}
                    </p>
                  </div>
                  <div className="info-card-decoration">
                    <Star1 size={32} color="#e2e8f0" variant="Linear" />
                    <Star1 size={24} color="#e2e8f0" variant="Bold" />
                  </div>
                </div>
              )}
            </div>

            {/* Example Tree */}
            <div className="example-tree-container">
              <h3 className="example-tree-title">Real-World Example</h3>
              <div className="example-tree">
                {/* Epic */}
                <div className="tree-node epic-tree-node">
                  <div className="tree-node-content" style={{ background: exampleTree.epic.bgColor }}>
                    <Flash size={20} color={exampleTree.epic.color} variant="Bold" />
                    <span>{exampleTree.epic.title}</span>
                  </div>
                </div>

                {/* Children */}
                {exampleTree.children.map((child, index) => {
                  const ChildIcon = child.icon;
                  return (
                    <div key={index} className={`tree-node child-tree-node ${child.indent ? 'indented' : ''}`}>
                      <div className="tree-connector">
                        <div className="connector-line"></div>
                      </div>
                      <div className="tree-node-content">
                        <ChildIcon size={18} color={child.color} variant="Bold" />
                        <span>{child.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Comparison Table */}
            <div className="comparison-table-container">
              <h3 className="comparison-title">Quick Comparison</h3>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Time to Complete</th>
                      <th>Who Creates It</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="type-cell">
                          <Lamp size={18} color="#eab308" variant="Bold" />
                          <span>Idea</span>
                        </div>
                      </td>
                      <td className="size-cell">Just a suggestion</td>
                      <td className="time-cell">Never (until approved)</td>
                      <td className="creator-cell">Anyone</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="type-cell">
                          <Flash size={18} color="#a855f7" variant="Bold" />
                          <span>Epic</span>
                        </div>
                      </td>
                      <td className="size-cell">HUGE (50-100+ points)</td>
                      <td className="time-cell">2-3 months</td>
                      <td className="creator-cell">Product Manager</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="type-cell">
                          <DocumentText size={18} color="#22c55e" variant="Bold" />
                          <span>Story</span>
                        </div>
                      </td>
                      <td className="size-cell">Medium (3-8 points)</td>
                      <td className="time-cell">2-5 days</td>
                      <td className="creator-cell">Product Manager</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="type-cell">
                          <TickSquare size={18} color="#3b82f6" variant="Bold" />
                          <span>Task</span>
                        </div>
                      </td>
                      <td className="size-cell">Small-Medium (1-8 points)</td>
                      <td className="time-cell">1-3 days</td>
                      <td className="creator-cell">Developers</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="type-cell">
                          <CloseCircle size={18} color="#ef4444" variant="Bold" />
                          <span>Bug</span>
                        </div>
                      </td>
                      <td className="size-cell">Varies (1-5 points)</td>
                      <td className="time-cell">4 hours - 2 days</td>
                      <td className="creator-cell">Anyone</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="type-cell">
                          <Category size={16} color="#64748b" variant="Bold" />
                          <span>Sub-task</span>
                        </div>
                      </td>
                      <td className="size-cell">Tiny (0.5-2 points)</td>
                      <td className="time-cell">2-4 hours</td>
                      <td className="creator-cell">Developers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Issue Cards */}
            <h3 className="detailed-cards-title">Detailed Issue Type Documentation</h3>
            <div className="issues-grid">
              {issueTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedIssueType === type.name;
                return (
                  <div
                    key={type.name}
                    className={`issue-card ${isSelected ? 'expanded' : ''}`}
                    style={{ '--accent-color': type.color, '--bg-color': type.bgColor } as React.CSSProperties}
                  >
                    <div
                      onClick={() => setSelectedIssueType(isSelected ? null : type.name)}
                      className="issue-card-header"
                    >
                      <div className="issue-info">
                        <div className="issue-icon-wrapper" style={{ background: type.bgColor }}>
                          <Icon size={28} color={type.color} variant="Bold" />
                        </div>
                        <div className="issue-title">
                          <h3>{type.name}</h3>
                          <p>{type.description}</p>
                        </div>
                      </div>
                      <div className={`expand-indicator ${isSelected ? 'rotated' : ''}`}>
                        <ArrowDown2 size={20} color="#94a3b8" />
                      </div>
                    </div>

                    {isSelected && (
                      <div className="issue-card-content">
                        <div className="issue-grid">
                          {/* Left Column */}
                          <div className="issue-column">
                            <div className="info-block">
                              <h4>
                                <MessageQuestion size={16} color={type.color} variant="Bold" />
                                When to Use
                              </h4>
                              <p>{type.whenToUse}</p>
                            </div>

                            <div className="info-block">
                              <h4>
                                <Hierarchy size={16} color={type.color} variant="Bold" />
                                Workflow
                              </h4>
                              <code>{type.workflow}</code>
                            </div>

                            <div className="info-row">
                              <div className="info-mini">
                                <span className="label">Size</span>
                                <span className="value">{type.estimatedSize}</span>
                              </div>
                              <div className="info-mini">
                                <span className="label">Priority</span>
                                <span className="value">{type.priority}</span>
                              </div>
                            </div>

                            <div className="info-block">
                              <h4>
                                <People size={16} color={type.color} variant="Bold" />
                                Assignee
                              </h4>
                              <p>{type.assignee}</p>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="issue-column">
                            <div className="info-block">
                              <h4>
                                <Book size={16} color={type.color} variant="Bold" />
                                Examples
                              </h4>
                              <ul className="examples-list">
                                {type.examples.map((example, i) => (
                                  <li key={i}>{example}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="info-block">
                              <h4>
                                <TickCircle size={16} color={type.color} variant="Bold" />
                                Best Practices
                              </h4>
                              <ul className="practices-list">
                                {type.bestPractices.map((practice, i) => (
                                  <li key={i}>
                                    <span className="check">✓</span>
                                    {practice}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Best Practices Section */}
        {activeTab === 'practices' && (
          <section className="practices-section fade-in">
            <div className="section-header">
              <h2>Sprint & Team Best Practices</h2>
              <p>Guidelines for efficient team collaboration and delivery</p>
            </div>

            <div className="practices-grid">
              {bestPractices.map((practice) => {
                const Icon = practice.icon;
                return (
                  <div
                    key={practice.title}
                    className="practice-card"
                    style={{ '--accent-color': practice.color, '--bg-color': practice.bgColor } as React.CSSProperties}
                  >
                    <div className="practice-icon-wrapper" style={{ background: practice.bgColor }}>
                      <Icon size={28} color={practice.color} variant="Bold" />
                    </div>
                    <h3>{practice.title}</h3>
                    <ul>
                      {practice.points.map((point, i) => (
                        <li key={i}>
                          <TickCircle size={14} color={practice.color} variant="Bold" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Scrum Elements */}
            <div className="scrum-elements-section">
              <div className="section-header">
                <h2>Scrum Elements</h2>
                <p>Core components of the Scrum framework</p>
              </div>
              <div className="scrum-elements-grid">
                {scrumElements.map((element) => {
                  const Icon = element.icon;
                  return (
                    <div
                      key={element.title}
                      className="scrum-element-card"
                      style={{ '--accent-color': element.color, '--bg-color': element.bgColor } as React.CSSProperties}
                    >
                      <div className="element-header">
                        <div className="element-icon-wrapper" style={{ background: element.bgColor }}>
                          <Icon size={24} color={element.color} variant="Bold" />
                        </div>
                        <h3>{element.title}</h3>
                      </div>
                      <p className="element-description">{element.description}</p>
                      <div className="element-key-points">
                        {element.keyPoints.map((point, i) => (
                          <span key={i} className="key-point-tag" style={{ background: element.bgColor, color: element.color }}>
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tips For Scrum */}
            <div className="scrum-tips-section">
              <div className="section-header">
                <h2>💡 Tips For Scrum Success</h2>
                <p>Pro tips to improve your Scrum implementation</p>
              </div>
              <div className="scrum-tips-grid">
                {scrumTips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <div key={tip.title} className="tip-card">
                      <div className="tip-icon-wrapper">
                        <Icon size={20} color="#6366f1" variant="Bold" />
                      </div>
                      <div className="tip-content">
                        <h4>{tip.title}</h4>
                        <p>{tip.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HR Platform Specifics */}
            <div className="hr-specifics">
              <div className="specifics-header">
                <div className="specifics-icon-wrapper">
                  <Shield size={28} color="#6366f1" variant="Bold" />
                </div>
                <h3>HR Platform Specific Considerations</h3>
              </div>
              <div className="specifics-grid">
                <div className="specific-card">
                  <h4>🔒 Security & Compliance</h4>
                  <ul>
                    <li>GDPR compliance checks</li>
                    <li>PII data protection review</li>
                    <li>Access control verification</li>
                    <li>Audit logging validation</li>
                  </ul>
                </div>
                <div className="specific-card">
                  <h4>🔗 Integration Testing</h4>
                  <ul>
                    <li>Payroll system integration</li>
                    <li>SSO/authentication flows</li>
                    <li>Email notification systems</li>
                    <li>Calendar integrations</li>
                  </ul>
                </div>
                <div className="specific-card">
                  <h4>⚡ Performance</h4>
                  <ul>
                    <li>Report generation speed</li>
                    <li>Dashboard load times</li>
                    <li>Bulk operations handling</li>
                    <li>Mobile responsiveness</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>JIRA Workflow Documentation • HR SaaS Platform</p>
          <p className="footer-subtitle">Optimized for continuous delivery and quality assurance</p>
        </div>
      </footer>
    </div>
  );
};

export default JiraWorkflow;
