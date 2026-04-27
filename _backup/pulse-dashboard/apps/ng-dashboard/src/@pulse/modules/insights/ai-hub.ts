import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

interface AiMessage { text: string; isUser: boolean; html?: string; }
interface AiResponse { keywords: string[]; reply: string; chips?: string[]; }

interface SurveyQuestion { id: number; text: string; type: string; category?: string; }
interface SurveyCategory { name: string; questions: SurveyQuestion[]; }

interface SurveyDraft {
  name: string;
  description: string;
  categories: string[];
  questions: SurveyQuestion[];
  duration: string;
  frequency: string;
  audience: string;
}

interface SetupStep {
  label: string;
  desc: string;
  done: boolean;
  current: boolean;
}

interface TemplateCard {
  title: string;
  questions: number;
  teams: number;
  icon: string;
}

interface InFlightSurvey {
  name: string;
  progress: number;
  timeLeft: string;
}

@Component({
  standalone: false,
  selector: 'app-ai-hub',
  templateUrl: './ai-hub.html',
  styleUrl: './ai-hub.scss',
})
export class AiHubComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chatContainer') chatContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('chatInput') chatInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('chatPlaceholder') chatPlaceholderRef!: ElementRef<HTMLDivElement>;
  @ViewChild('messagesEl') messagesElRef!: ElementRef<HTMLDivElement>;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  scrolledToBottom = false;
  private scrollHandler = () => this.checkScroll();

  inputValue = '';
  chatMode = false;
  chatExpanded = true;
  showPlaceholder = true;
  thinkActive = false;
  deepActive = false;
  messages: Array<{ isUser: boolean; html: string; chips?: string[]; isTyping?: boolean }> = [];
  placeholderLetters: Array<{ ch: string; delay: string }> = [];
  placeholderHiding = false;
  statCounter = 0;
  private statTimer: ReturnType<typeof setInterval> | null = null;

  // Rotating headlines
  readonly HEADLINES = [
    'Your team has answers. Are you listening?',
    'Small surveys. Big breakthroughs.',
    "Don't guess what your team thinks — ask them.",
  ];
  currentHeadlineIndex = 0;
  headlineState: 'visible' | 'out' | 'entering' = 'visible';
  private headlineTimer: ReturnType<typeof setInterval> | null = null;

  // Live pulse dashboard
  livePulseTab = 0;
  livePulseTabs = ['Right now', 'Live pulse', 'Sentiment', 'Needs attention'];
  livePulseBadges = [0, 0, 0, 2];

  activeSurveys = 2;
  activeSurveyNote = '1 closes in 3 days';
  responsesToday = 345;
  responsesNote = '12 in last hour';
  orgEnps = 38;
  enpsNote = '3 vs last quarter';
  participation = 72;
  participationTarget = 80;

  inFlightSurveys: InFlightSurvey[] = [
    { name: 'Q2 Engagement Pulse', progress: 72, timeLeft: '3d left' },
    { name: 'Manager Effectiveness', progress: 41, timeLeft: '6d left' },
  ];

  // Survey creation flow
  surveyFlowActive = false;
  surveyStep = 0;
  surveyDraft: SurveyDraft = { name: '', description: '', categories: [], questions: [], duration: '', frequency: '', audience: '' };

  private readonly SURVEY_CATEGORIES: SurveyCategory[] = [
    { name: 'Recognition', questions: [
      { id: 1, text: 'My organization encourages employees to give recognition to one another', type: 'Rating Scale (1-5)' },
      { id: 2, text: 'If I do great work, I know that it will be recognised', type: 'Rating Scale (1-5)' },
      { id: 3, text: 'How well does your organization support your overall wellbeing and mental health?', type: 'MCQ' },
    ]},
    { name: 'Employee Satisfaction', questions: [
      { id: 4, text: 'Overall, how satisfied are you with working at this organization?', type: 'Rating Scale (1-5)' },
      { id: 5, text: 'I feel proud to work for this organization.', type: 'Rating Scale (1-5)' },
      { id: 6, text: 'I would recommend this organization as a great place to work.', type: 'Scale (1-10)' },
      { id: 7, text: 'My work gives me a feeling of personal accomplishment.', type: 'Rating Scale (1-5)' },
      { id: 8, text: 'What is one thing that would improve your work experience?', type: 'Text' },
    ]},
    { name: 'Compensation & Benefits', questions: [
      { id: 9, text: 'I believe my pay is fair for the work I do.', type: 'Rating Scale (1-5)' },
      { id: 10, text: 'The benefits package offered by my organization meets my needs.', type: 'Rating Scale (1-5)' },
      { id: 11, text: 'Which benefit matters most to you?', type: 'MCQ' },
    ]},
    { name: 'Wellness', questions: [
      { id: 12, text: 'My organization supports my physical and mental wellbeing.', type: 'Rating Scale (1-5)' },
      { id: 13, text: 'I feel I have enough energy at the end of a typical workday.', type: 'Yes/No' },
    ]},
    { name: 'Manager Effectiveness', questions: [
      { id: 14, text: 'My manager provides me with regular, useful feedback.', type: 'Rating Scale (1-5)' },
      { id: 15, text: 'My manager genuinely cares about my career development.', type: 'Rating Scale (1-5)' },
      { id: 16, text: 'My manager creates an environment where I feel safe to speak up.', type: 'Rating Scale (1-5)' },
      { id: 17, text: 'How effective is your manager at removing obstacles for your team?', type: 'Scale (1-10)' },
      { id: 18, text: 'My manager clearly communicates team goals and expectations.', type: 'Rating Scale (1-5)' },
    ]},
    { name: 'Work-Life Balance', questions: [
      { id: 19, text: 'I am able to maintain a healthy balance between my work and personal life.', type: 'Rating Scale (1-5)' },
      { id: 20, text: 'My workload is manageable on a day-to-day basis.', type: 'Rating Scale (1-5)' },
      { id: 21, text: 'I am able to disconnect from work outside of working hours.', type: 'Yes/No' },
      { id: 22, text: 'How often do you work beyond your contracted hours?', type: 'MCQ' },
    ]},
    { name: 'Diversity & Inclusion', questions: [
      { id: 23, text: 'People from all backgrounds are treated fairly in this organization.', type: 'Rating Scale (1-5)' },
      { id: 24, text: 'I feel I can be myself at work without fear of judgment.', type: 'Rating Scale (1-5)' },
      { id: 25, text: 'My organization takes diversity and inclusion seriously.', type: 'Rating Scale (1-5)' },
      { id: 26, text: 'Have you witnessed or experienced discrimination at work in the past year?', type: 'Yes/No' },
    ]},
    { name: 'Learning & Development', questions: [
      { id: 27, text: 'I have access to the learning and development resources I need.', type: 'Rating Scale (1-5)' },
      { id: 28, text: 'My organization invests in my professional growth.', type: 'Rating Scale (1-5)' },
      { id: 29, text: 'I have had meaningful career conversations with my manager this year.', type: 'Yes/No' },
      { id: 30, text: 'Which learning format do you prefer?', type: 'MCQ' },
    ]},
    { name: 'Team Collaboration', questions: [
      { id: 31, text: 'My team works well together to achieve common goals.', type: 'Rating Scale (1-5)' },
      { id: 32, text: 'I trust my team members to do their part.', type: 'Rating Scale (1-5)' },
      { id: 33, text: 'Communication within my team is clear and open.', type: 'Rating Scale (1-5)' },
      { id: 34, text: 'My team celebrates wins and learns from setbacks together.', type: 'Rating Scale (1-5)' },
      { id: 35, text: 'How would you rate cross-team collaboration in your organization?', type: 'Scale (1-10)' },
    ]},
  ];

  // Live preview state
  previewQIndex = 0;
  previewSelectedRating: number | null = null;
  previewSelectedMcq: number | null = null;
  previewSelectedYn: string | null = null;

  get previewCurrentQ(): SurveyQuestion | null {
    if (!this.surveyDraft.questions.length) return null;
    return this.surveyDraft.questions[Math.min(this.previewQIndex, this.surveyDraft.questions.length - 1)];
  }

  get previewQuestionProgress(): number {
    if (!this.surveyDraft.questions.length) return 0;
    return ((this.previewQIndex + 1) / this.surveyDraft.questions.length) * 100;
  }

  isPreviewRating(q: SurveyQuestion | null): boolean {
    return !!q && (q.type.startsWith('Rating') || q.type.startsWith('Scale'));
  }

  getPreviewRatingRange(q: SurveyQuestion | null): number[] {
    const max = q?.type.includes('10') ? 10 : 5;
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  resetPreviewSelections() {
    this.previewSelectedRating = null;
    this.previewSelectedMcq = null;
    this.previewSelectedYn = null;
  }

  get surveyEstTime(): number {
    return Math.max(1, Math.ceil(this.surveyDraft.questions.length * 20 / 60));
  }

  private phIndex = 0;
  private phTimer: ReturnType<typeof setInterval> | null = null;

  private readonly PLACEHOLDERS = [
    'What are employees saying about work-life balance?',
    'Show me the top drivers of low engagement',
    'Which teams have the lowest eNPS scores?',
    'Summarise last month\'s pulse survey results',
    'What questions should I add to the next survey?',
    'Compare engagement scores across departments',
    'What\'s causing low participation in this survey?',
  ];

  private readonly AI_RESPONSES: AiResponse[] = [
    { keywords: ['work-life','balance','wellbeing','burnout','stress'], reply: "Based on your Q1 pulse survey, **Work-Life Balance** scored **58/100** — down 6 points from last quarter. 🔴\n\n**Top employee comments:**\n• \"Deadlines feel relentless with no recovery time\"\n• \"Weekend work has become normalised in some teams\"\n\n**Affected departments:** Engineering (48), Sales (52)\n\n**Recommended action:** Consider scheduling no-meeting Fridays and reviewing workload distribution in Engineering.", chips: ['Show affected teams','Draft an action plan','Compare to benchmark'] },
    { keywords: ['enps','score','net promoter','promoter'], reply: "Your current **eNPS score is 67** — rated *Favorable* ✅\n\n| Segment | Score |\n|---|---|\n| Promoters | 21% |\n| Passives | 34% |\n| Detractors | 45% |\n\nThis is **↑ 4 points** vs your previous survey but still **36 points below** the industry benchmark of 100.\n\nThe biggest detractor themes are workload, career growth, and communication from leadership.", chips: ['What are detractors saying?','Show by department','Improve eNPS'] },
    { keywords: ['engagement','engaged','participation'], reply: "**Engagement Score: 74/100** ↑ 6 points from last survey 📈\n\n**Participation rate:** 36% (36 of 100 employees)\n\n⚠️ Low participation means results may not represent the full picture. Teams with the highest engagement:\n1. Product — 88\n2. Design — 82\n3. Marketing — 74\n\nTeams with lowest engagement:\n1. Customer Support — 52\n2. Operations — 58", chips: ['Why is participation low?','Which team needs attention?','Send reminder to non-respondents'] },
    { keywords: ['leadership','manager','management','communicate'], reply: "**Leadership & Communication** is your **#1 opportunity area** this quarter.\n\nOnly **42%** of employees feel leadership communicates transparently.\n\n**Common themes from open-text responses:**\n• \"We hear about decisions after they're made\"\n• \"1:1s feel rushed or get cancelled\"\n• \"No visibility into company direction\"\n\n**Suggested actions:**\n1. Monthly all-hands with Q&A\n2. Manager training on active listening\n3. Add a leadership communication question to next pulse", chips: ['Show full leadership data','Create a survey question','Export this insight'] },
    { keywords: ['trend','compare','previous','last','quarter','month','history'], reply: "Here's your **engagement trend over the last 4 surveys:** 📊\n\n| Survey | Score | Change |\n|---|---|---|\n| Q1 2026 | 74 | ↑ +6 |\n| Q4 2025 | 68 | ↑ +3 |\n| Q3 2025 | 65 | → 0 |\n| Q2 2025 | 65 | ↓ -2 |\n\nOverall trend is **positive** over the past 6 months. The biggest improvements were in *Teamwork* (+12) and *Role Clarity* (+8).", chips: ['What drove the improvement?','Show driver breakdown','Download full report'] },
    { keywords: ['department','team','group','division','engineering','sales','design','product'], reply: "**Department Engagement Breakdown** for Q1 2026:\n\n| Department | Score | vs Last |\n|---|---|---|\n| Product | 88 | ↑ +5 |\n| Design | 82 | ↑ +8 |\n| Marketing | 74 | → 0 |\n| HR | 71 | ↑ +2 |\n| Engineering | 63 | ↓ -4 |\n| Customer Support | 52 | ↓ -9 |\n\n⚠️ **Customer Support** needs urgent attention — down 9 points. Main concerns: role clarity and workload.", chips: ['Focus on Customer Support','What\'s affecting Engineering?','Schedule a check-in'] },
    { keywords: ['action','plan','improve','fix','solve','recommendation','suggest'], reply: "Here are your **top 3 AI-recommended actions** based on this quarter's pulse data:\n\n**1. 🔴 Address Customer Support burnout**\nSchedule team-level check-ins and review headcount vs ticket volume.\n\n**2. 🟡 Improve leadership communication**\nLaunch monthly all-hands + share decision rationale in Slack updates.\n\n**3. 🟡 Boost survey participation**\nSend personalised reminders — current rate is 36%, target 70%+.\n\nWould you like me to draft a communication for any of these?", chips: ['Draft communication','Set a goal','Create action items'] },
    { keywords: ['question','survey','add','create','draft','write'], reply: "Here are **5 suggested pulse survey questions** for your next cycle:\n\n1. *\"I feel my manager recognises my contributions\"* — Likert 1–5\n2. *\"I have the resources I need to do my best work\"* — Likert 1–5\n3. *\"I understand how my work connects to company goals\"* — Likert 1–5\n4. *\"I feel comfortable sharing feedback with my manager\"* — Yes/No\n5. *\"What one thing would most improve your experience at work?\"* — Open text\n\nThese target your lowest-scoring drivers: recognition, resources, and clarity.", chips: ['Add to next survey','Show all question templates','Focus on a specific driver'] },
  ];
  private readonly DEFAULT_REPLY = "Thanks for your question! Based on your latest pulse survey data, I can help you explore engagement scores, eNPS trends, department breakdowns, sentiment analysis, and action recommendations.\n\nTry asking me things like:\n• *\"What's our eNPS score?\"*\n• *\"Which department has the lowest engagement?\"*\n• *\"What should we do to improve work-life balance?\"*";
  private readonly DEFAULT_CHIPS = ['Show eNPS score','Department breakdown','Recommend actions'];

  ngAfterViewInit() {
    this.renderPlaceholder(this.PLACEHOLDERS[0], false);
    this.startCycle();
    this.startStatCounter();
    this.startHeadlineCycle();

    document.addEventListener('mousedown', this.handleDocClick);

    // Listen for scroll on the main-card container
    const mainCard = document.querySelector('app-ai-hub .main-card');
    if (mainCard) {
      mainCard.addEventListener('scroll', this.scrollHandler);
      this.checkScroll();
    }
  }

  private startStatCounter() {
    this.statTimer = setInterval(() => {
      this.statCounter++;
      if (this.statCounter > 99) this.statCounter = 0;
      this.cdr.detectChanges();
    }, 400);
  }

  ngOnDestroy() {
    this.stopCycle();
    this.stopHeadlineCycle();
    if (this.statTimer) clearInterval(this.statTimer);
    document.removeEventListener('mousedown', this.handleDocClick);
    const mainCard = document.querySelector('app-ai-hub .main-card');
    if (mainCard) mainCard.removeEventListener('scroll', this.scrollHandler);
  }

  private checkScroll() {
    const el = document.querySelector('app-ai-hub .main-card') as HTMLElement;
    if (!el) return;
    const hasScroll = el.scrollHeight > el.clientHeight + 10;
    const atBottom = hasScroll && el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
    if (atBottom !== this.scrolledToBottom) {
      this.scrolledToBottom = atBottom;
      this.cdr.detectChanges();
    }
  }

  private handleDocClick = (e: MouseEvent) => {
    const container = this.chatContainerRef?.nativeElement;
    if (container && !container.contains(e.target as Node)) this.deactivate();
  };

  private renderPlaceholder(text: string, hiding: boolean) {
    this.placeholderHiding = hiding;
    this.placeholderLetters = text.split('').map((ch, i) => ({
      ch: ch === ' ' ? '\u00A0' : ch,
      delay: (i * 0.022) + 's'
    }));
  }

  private cyclePlaceholder() {
    this.renderPlaceholder(this.PLACEHOLDERS[this.phIndex], true);
    this.cdr.detectChanges();
    setTimeout(() => {
      this.phIndex = (this.phIndex + 1) % this.PLACEHOLDERS.length;
      this.renderPlaceholder(this.PLACEHOLDERS[this.phIndex], false);
      this.cdr.detectChanges();
    }, 320);
  }

  private startCycle() { this.phTimer = setInterval(() => this.cyclePlaceholder(), 3200); }
  private stopCycle() { if (this.phTimer) { clearInterval(this.phTimer); this.phTimer = null; } }

  private cycleHeadline() {
    // Slide up + blur out
    this.headlineState = 'out';
    this.cdr.detectChanges();
    setTimeout(() => {
      // Snap to bottom position with no transition, change text
      this.currentHeadlineIndex = (this.currentHeadlineIndex + 1) % this.HEADLINES.length;
      this.headlineState = 'entering';
      this.cdr.detectChanges();
      // Small tick so DOM paints the entering state, then animate in
      setTimeout(() => {
        this.headlineState = 'visible';
        this.cdr.detectChanges();
      }, 32);
    }, 460);
  }

  private startHeadlineCycle() { this.headlineTimer = setInterval(() => this.cycleHeadline(), 3800); }
  private stopHeadlineCycle() { if (this.headlineTimer) { clearInterval(this.headlineTimer); this.headlineTimer = null; } }

  activateInput() {
    if (this.chatExpanded) return;
    this.chatExpanded = true;
    this.showPlaceholder = false;
    this.stopCycle();
    setTimeout(() => this.chatInputRef?.nativeElement.focus(), 0);
  }

  private deactivate() {
    if (this.inputValue) return;
    this.chatExpanded = false;
    this.showPlaceholder = true;
    this.renderPlaceholder(this.PLACEHOLDERS[this.phIndex], false);
    this.startCycle();
    this.cdr.detectChanges();
  }

  onInputChange() {
    this.showPlaceholder = !this.inputValue;
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  }

  send() {
    const text = this.inputValue.trim();
    if (!text) return;
    this.inputValue = '';
    this.showPlaceholder = false;
    this.chatMode = true;

    this.messages.push({ isUser: true, html: text });
    this.messages.push({ isUser: false, html: '', isTyping: true });
    this.cdr.detectChanges();
    this.scrollMessages();

    if (this.surveyFlowActive) {
      const response = this.handleSurveyStep(text);
      const delay = 600 + Math.random() * 400;
      setTimeout(() => {
        this.messages = this.messages.filter(m => !m.isTyping);
        this.messages.push({ isUser: false, html: this.formatMarkdown(response.reply), chips: response.chips });
        this.cdr.detectChanges();
        setTimeout(() => this.scrollMessages(), 0);
      }, delay);
      return;
    }

    const response = this.getResponse(text);
    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      this.messages = this.messages.filter(m => !m.isTyping);
      this.messages.push({ isUser: false, html: this.formatMarkdown(response.reply), chips: response.chips });
      this.cdr.detectChanges();
      setTimeout(() => this.scrollMessages(), 0);
    }, delay);
  }

  chipClick(chip: string) {
    this.inputValue = chip;
    this.send();
  }

  cardClick(query: string) {
    this.inputValue = query;
    this.activateInput();
    setTimeout(() => this.send(), 100);
  }

  startSurveyFlow() {
    this.surveyFlowActive = true;
    this.surveyStep = 0;
    this.surveyDraft = { name: '', description: '', categories: [], questions: [], duration: '', frequency: '', audience: '' };
    this.previewQIndex = 0;
    this.resetPreviewSelections();
    this.chatMode = true;
    this.showPlaceholder = false;
    this.stopCycle();

    this.messages.push({ isUser: false, html: '', isTyping: true });
    this.cdr.detectChanges();
    this.scrollMessages();

    setTimeout(() => {
      this.messages = this.messages.filter(m => !m.isTyping);
      this.messages.push({
        isUser: false,
        html: this.formatMarkdown("✨ Let's create your survey together!\n\n**Step 1 of 6**\nWhat would you like to name your survey?"),
        chips: ['Employee Engagement Pulse', 'Quarterly Check-in', 'Team Wellbeing Survey']
      });
      this.surveyStep = 1;
      this.cdr.detectChanges();
      setTimeout(() => this.scrollMessages(), 0);
    }, 700);
  }

  private handleSurveyStep(text: string): { reply: string; chips?: string[] } {
    switch (this.surveyStep) {

      // Step 1: Name
      case 1: {
        this.surveyDraft.name = text;
        this.surveyStep = 2;
        return {
          reply: `Great — **"${text}"** it is! 👍\n\n**Step 2 of 6**\nAdd a short description so participants know what this survey is about.`,
          chips: ['Quarterly pulse to measure engagement & wellbeing', 'Quick check-in on team morale', 'Skip this step']
        };
      }

      // Step 2: Description
      case 2: {
        this.surveyDraft.description = text.toLowerCase() === 'skip this step' ? '' : text;
        this.surveyStep = 3;
        const catNames = this.SURVEY_CATEGORIES.map(c => c.name);
        return {
          reply: `${text.toLowerCase() === 'skip this step' ? 'No problem, skipped!' : 'Nice description!'}\n\n**Step 3 of 6**\nWhat area would you like to focus on? I'll suggest the best questions for you.\n\nPick a category to start:`,
          chips: catNames
        };
      }

      // Step 3: Category selection
      case 3: {
        const matched = this.SURVEY_CATEGORIES.find(c => c.name.toLowerCase() === text.toLowerCase());
        if (matched) {
          this.surveyDraft.categories.push(matched.name);
          // Add all questions from this category
          matched.questions.forEach(q => {
            if (!this.surveyDraft.questions.find(sq => sq.id === q.id)) {
              this.surveyDraft.questions.push({ ...q, category: matched.name });
            }
          });
          const qList = matched.questions.map((q, i) => `${i + 1}. *"${q.text}"* — ${q.type}`).join('\n');
          this.surveyStep = 4;
          return {
            reply: `I've selected **${matched.questions.length} questions** from **${matched.name}**:\n\n${qList}\n\nWould you like to add questions from another category, or move on?`,
            chips: ['Add another category', 'I\'m done — next step']
          };
        }
        // If they type something that isn't a category, try fuzzy match
        const fuzzy = this.SURVEY_CATEGORIES.find(c => c.name.toLowerCase().includes(text.toLowerCase()));
        if (fuzzy) {
          return this.handleSurveyStep(fuzzy.name);
        }
        return {
          reply: 'I didn\'t recognise that category. Please pick one from the list:',
          chips: this.SURVEY_CATEGORIES.map(c => c.name)
        };
      }

      // Step 4: Add more categories or proceed
      case 4: {
        if (text.toLowerCase().includes('another') || text.toLowerCase().includes('add')) {
          this.surveyStep = 3;
          const remaining = this.SURVEY_CATEGORIES.filter(c => !this.surveyDraft.categories.includes(c.name));
          if (remaining.length === 0) {
            this.surveyStep = 5;
            return {
              reply: `You've already added questions from all categories! You have **${this.surveyDraft.questions.length} questions** total.\n\n**Step 4 of 6**\nHow long should this survey run?`,
              chips: ['1 Week', '2 Weeks', '1 Month', '3 Months']
            };
          }
          return {
            reply: `You've got **${this.surveyDraft.questions.length} questions** so far. Pick another category:`,
            chips: remaining.map(c => c.name)
          };
        }
        // Move to duration
        this.surveyStep = 5;
        const estTime = Math.ceil(this.surveyDraft.questions.length * 20 / 60);
        return {
          reply: `You've selected **${this.surveyDraft.questions.length} questions** across **${this.surveyDraft.categories.length} ${this.surveyDraft.categories.length === 1 ? 'category' : 'categories'}** (est. ${estTime} min to complete).\n\n**Step 4 of 6**\nHow long should this survey stay open?`,
          chips: ['1 Week', '2 Weeks', '1 Month', '3 Months']
        };
      }

      // Step 5: Duration
      case 5: {
        this.surveyDraft.duration = text;
        this.surveyStep = 6;
        return {
          reply: `Duration set to **${text}** ⏱️\n\n**Step 5 of 6**\nHow often should this survey be sent?`,
          chips: ['Just once', 'Weekly', 'Bi-weekly', 'Monthly']
        };
      }

      // Step 6: Frequency
      case 6: {
        this.surveyDraft.frequency = text;
        this.surveyStep = 7;
        return {
          reply: `Frequency: **${text}** ✅\n\n**Step 6 of 6**\nWho should receive this survey?`,
          chips: ['All employees', 'Specific departments', 'Managers only', 'Custom list']
        };
      }

      // Step 7: Audience
      case 7: {
        this.surveyDraft.audience = text;
        this.surveyStep = 8;
        const estTime = Math.ceil(this.surveyDraft.questions.length * 20 / 60);
        const catList = this.surveyDraft.categories.map(c => `• ${c}`).join('\n');
        return {
          reply: `Here's your survey summary:\n\n` +
            `**📋 ${this.surveyDraft.name}**\n` +
            (this.surveyDraft.description ? `*${this.surveyDraft.description}*\n\n` : '\n') +
            `**Questions:** ${this.surveyDraft.questions.length} (est. ${estTime} min)\n` +
            `**Categories:**\n${catList}\n` +
            `**Duration:** ${this.surveyDraft.duration}\n` +
            `**Frequency:** ${this.surveyDraft.frequency}\n` +
            `**Audience:** ${this.surveyDraft.audience}\n\n` +
            `Everything look good?`,
          chips: ['Launch Survey 🚀', 'Edit something', 'Save as draft']
        };
      }

      // Step 8: Confirm / Edit / Save
      case 8: {
        const lower = text.toLowerCase();
        if (lower.includes('launch')) {
          this.surveyFlowActive = false;
          this.surveyStep = 0;
          return {
            reply: `🎉 **Your survey "${this.surveyDraft.name}" has been launched!**\n\n` +
              `It will be sent to **${this.surveyDraft.audience.toLowerCase()}** and will run for **${this.surveyDraft.duration.toLowerCase()}**.\n\n` +
              `I'll notify you when responses start coming in. You can track progress anytime from the dashboard.`,
            chips: ['View survey dashboard', 'Create another survey', 'Show me analytics']
          };
        }
        if (lower.includes('edit')) {
          this.surveyStep = 9;
          return {
            reply: 'What would you like to change?',
            chips: ['Change name', 'Change questions', 'Change duration', 'Change frequency', 'Change audience']
          };
        }
        if (lower.includes('draft') || lower.includes('save')) {
          this.surveyFlowActive = false;
          this.surveyStep = 0;
          return {
            reply: `📝 **Survey saved as draft!**\n\n"${this.surveyDraft.name}" has been saved. You can resume editing anytime from the survey dashboard.`,
            chips: ['View drafts', 'Create another survey', 'Back to insights']
          };
        }
        return {
          reply: 'What would you like to do with this survey?',
          chips: ['Launch Survey 🚀', 'Edit something', 'Save as draft']
        };
      }

      // Step 9: Edit sub-flow
      case 9: {
        const lower = text.toLowerCase();
        if (lower.includes('name')) {
          this.surveyStep = 10;
          return { reply: `Current name: **"${this.surveyDraft.name}"**\n\nWhat would you like to change it to?`, chips: [] };
        }
        if (lower.includes('question')) {
          this.surveyStep = 3;
          this.surveyDraft.categories = [];
          this.surveyDraft.questions = [];
          return {
            reply: 'Let\'s pick questions again. Choose a category to start:',
            chips: this.SURVEY_CATEGORIES.map(c => c.name)
          };
        }
        if (lower.includes('duration')) {
          this.surveyStep = 5;
          return { reply: `Current duration: **${this.surveyDraft.duration}**. Choose a new one:`, chips: ['1 Week', '2 Weeks', '1 Month', '3 Months'] };
        }
        if (lower.includes('frequency')) {
          this.surveyStep = 6;
          return { reply: `Current frequency: **${this.surveyDraft.frequency}**. Choose a new one:`, chips: ['Just once', 'Weekly', 'Bi-weekly', 'Monthly'] };
        }
        if (lower.includes('audience')) {
          this.surveyStep = 7;
          return { reply: `Current audience: **${this.surveyDraft.audience}**. Choose a new one:`, chips: ['All employees', 'Specific departments', 'Managers only', 'Custom list'] };
        }
        return { reply: 'Which part would you like to edit?', chips: ['Change name', 'Change questions', 'Change duration', 'Change frequency', 'Change audience'] };
      }

      // Step 10: Edit name then go back to summary
      case 10: {
        this.surveyDraft.name = text;
        this.surveyStep = 8;
        const estTime = Math.ceil(this.surveyDraft.questions.length * 20 / 60);
        const catList = this.surveyDraft.categories.map(c => `• ${c}`).join('\n');
        return {
          reply: `Name updated to **"${text}"** ✅\n\nHere's your updated summary:\n\n` +
            `**📋 ${this.surveyDraft.name}**\n` +
            (this.surveyDraft.description ? `*${this.surveyDraft.description}*\n\n` : '\n') +
            `**Questions:** ${this.surveyDraft.questions.length} (est. ${estTime} min)\n` +
            `**Categories:**\n${catList}\n` +
            `**Duration:** ${this.surveyDraft.duration}\n` +
            `**Frequency:** ${this.surveyDraft.frequency}\n` +
            `**Audience:** ${this.surveyDraft.audience}\n\n` +
            `Ready to go?`,
          chips: ['Launch Survey 🚀', 'Edit something', 'Save as draft']
        };
      }

      default:
        this.surveyFlowActive = false;
        return { reply: 'Something went wrong. Let\'s start over.', chips: ['Create a survey', 'Back to insights'] };
    }
  }

  exitChatMode() {
    this.chatMode = false;
    this.surveyFlowActive = false;
    this.surveyStep = 0;
    this.messages = [];
    this.inputValue = '';
    this.showPlaceholder = true;
    this.renderPlaceholder(this.PLACEHOLDERS[this.phIndex], false);
    this.startCycle();
    this.cdr.detectChanges();
  }

  // Voice input (Web Speech API)
  isRecording = false;
  private recognition: any = null;

  toggleMic() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  private startRecording() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Try Chrome.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.continuous = false;

    this.recognition.onstart = () => {
      this.isRecording = true;
      this.activateInput();
      this.cdr.detectChanges();
    };

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      this.inputValue = transcript;
      this.showPlaceholder = false;
      this.cdr.detectChanges();
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      this.cdr.detectChanges();
      if (this.inputValue.trim()) {
        this.send();
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isRecording = false;
      this.cdr.detectChanges();
      if (event.error !== 'no-speech') {
        console.error('Speech recognition error:', event.error);
      }
    };

    this.recognition.start();
  }

  private stopRecording() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  toggleThink(e: Event) { e.stopPropagation(); this.thinkActive = !this.thinkActive; }
  toggleDeep(e: Event) { e.stopPropagation(); this.deepActive = !this.deepActive; }

  private scrollMessages() {
    const el = this.messagesElRef?.nativeElement;
    if (el) setTimeout(() => el.scrollTop = el.scrollHeight, 0);
  }

  private getResponse(text: string): { reply: string; chips?: string[] } {
    const lower = text.toLowerCase();
    for (const r of this.AI_RESPONSES) {
      if (r.keywords.some(k => lower.includes(k))) return r;
    }
    return { reply: this.DEFAULT_REPLY, chips: this.DEFAULT_CHIPS };
  }

  private formatMarkdown(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\| /g, '\n<tr><td>')
      .replace(/ \| /g, '</td><td>')
      .replace(/ \|/g, '</td></tr>')
      .replace(/\n---.*\n/g, '')
      .replace(/<tr><td>---.*<\/td><\/tr>/g, '')
      .replace(/(<tr>[\s\S]*?<\/tr>)/g, (m: string, _: string, offset: number, str: string) => {
        if (str.indexOf('<table') === -1) return '<table class="ai-table">' + m;
        return m;
      })
      .replace(/(<\/tr>)(?![\s\S]*<tr>)/g, '$1</table>')
      .replace(/\n•\s/g, '</p><p class="ai-bullet">• ')
      .replace(/\n\d+\.\s/g, (m: string) => '</p><p class="ai-bullet">' + m.trim() + ' ')
      .replace(/\n/g, '<br>');
  }
}
