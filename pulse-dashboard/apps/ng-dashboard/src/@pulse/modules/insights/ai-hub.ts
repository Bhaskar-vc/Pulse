import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

interface AiMessage { text: string; isUser: boolean; html?: string; }
interface AiResponse { keywords: string[]; reply: string; chips?: string[]; }

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

  constructor(private cdr: ChangeDetectorRef) {}

  inputValue = '';
  chatMode = false;
  chatExpanded = false;
  showPlaceholder = true;
  thinkActive = false;
  deepActive = false;
  messages: Array<{ isUser: boolean; html: string; chips?: string[]; isTyping?: boolean }> = [];
  placeholderLetters: Array<{ ch: string; delay: string }> = [];
  placeholderHiding = false;

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

    document.addEventListener('mousedown', this.handleDocClick);
  }

  ngOnDestroy() {
    this.stopCycle();
    document.removeEventListener('mousedown', this.handleDocClick);
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
