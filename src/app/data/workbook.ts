export interface ExampleRawInterface {
  id: number;
  title: string;
  desc: string;
}
export interface GoalRawInterface {
  id: number;
  title: string;
  desc: string;
}
export interface WorkbookRawInterface {
  id: number;
  title: string;
  examples: ExampleRawInterface[];
  goals: GoalRawInterface[];
}

export interface WorkbookRawInterface {
  id: number;
  title: string;
  examples: ExampleRawInterface[];
  goals: GoalRawInterface[];
}

export interface WorkbookReducerInterface {
  id: number;
  title: string;
  examples: number[];
  goals: number[];
}

export interface GoalReducerInterface {
  id: number;
  title: string;
  desc: string;
  reminder?: any;
  date_created?: any;
}

export interface GoalFormItemInterface {
  goal: string;
}

export interface NoteFormItemInterface {
  note: string;
}

export interface NoteReducerInterface {
  id: number;
  text: string;
}

export const wbData: WorkbookRawInterface[] = [
        { id:1, title: 'Relationships', examples: [
            {id: 1,title: 'Community', desc: '(Lead, Organize, Support Agencies, Volunteer, Cultural Arts)'},
            {id: 2,title: 'Leisure', desc: '("Down Time," Activities, Sports, Vacations)"'},
            {id: 3,title: 'Family',desc: ': (Prioritize, Quality Time, Special/Important Events)'},
            {id: 4,title: 'Friendships',desc: '(Birthdays, Events, Interaction/Nurture)'},
            {id: 5,title: 'Diversity',desc: '(Cultural Events, Exchanges, Tours)'},
            {id: 6,title: 'Marital',desc: '(Anniversaries, Couples’ Retreats, Dating)'},
            {id: 7, title: 'Work',desc: '(SAY THANK YOU, Challenge, Communicate, Support, Compassion)'}
          ],
          goals: [{id: 1,title: 'Whale Washing', desc: ''}]
        },
        { id:2, title: 'Professional', examples: [
            {id: 8, title: 'Achievments & Awards', desc: '(Civilian and Military Awards)'},
            {id: 9, title: 'Advancement & Promotion', desc: '(Professional Development, Leader Development)'},
            {id: 10, title: 'Career Requirements', desc: '(Continuing Education, Certifica- tions, Licenses, Supervisory Training)'},
            {id: 11, title: 'Education', desc: '(College, Graduate Degree, Correspondence Courses, Leadership Training, PMP)'},
            {id: 12, title: 'Nominations', desc: '(Civilian of the Quarter and Year, Volunteer of Year)'},
            {id: 13, title: 'Social Development', desc: '(Lunch with colleagues; potlucks)'},
            {id: 14, title: 'Team Goals', desc: '(Section Accomplishments, Section Events, Awards for Excellence, Employee Recognition)'}
          ],
          goals: []
        },
        { id:3, title: 'Personal', examples: [
            {id: 15, title: 'Activity', desc: ': (Overall Fitness, Yoga, 10,000 Steps Per Day)'},
            {id: 16, title: 'Nutrition:', desc: '(Good Nutritional Choices, Reduce Fat Intake, Increase Fiber)'},
            {id: 17, title: 'Sleep', desc: '(7-9 hrs/day, Good Sleep Hygiene, Limited Caffeine)'},
            {id: 18, title: 'Community Service', desc: ': (USO, Red Cross, Habitat for Humanity)'},
            {id: 19, title: 'Emotional Wellness', desc: '(Mindfulness, Lunch Away from Desk, Relaxation Techniques, Artistic Expression, Seek Help/Advice)'},
            {id: 20, title: 'Financial Investment', desc: '(Savings Plan, Debt Reduction, Credit Management, Investment Plan)'},
            {id: 21, title: 'Wellness Exams', desc: '(Physical Exam, Dental, Well-Woman Exam )'},
            {id: 22, title: 'Cultural Awareness', desc: '(Celebrate Our Diversity, History, Travel)'},
            {id: 23, title: 'Personal Health', desc: '(Responsible use of Alcohol, Tobacco Cessation, Stress Management, Meditation)'},
            {id: 24, title: 'Recreational & Leisure', desc: '(Friends/Family, Hobbies, Travel)'}
          ],
          goals: []
        },
        { id:4, title: 'Spiritual', examples: [
            {id: 25, title: 'Growth', desc: '(Connect Actions and Goals to Values)'},
            {id: 26, title: 'Ceremonies', desc: '(Religious, Marriage, Naming)'},
            {id: 27, title: 'Participation', desc: '(Chapel Programs, Spiritual Fitness, Train- ing Events)'},
            {id: 28, title: 'Holidays', desc: '(Observances, Meals, Fasting, etc.)'},
            {id: 29, title: 'Study', desc: '(Tours, Reading, Classes)'},
            {id: 30, title: 'Support', desc: '(Donations, Helping, Volunteerism)'}
          ],
          goals: []
        }
];
