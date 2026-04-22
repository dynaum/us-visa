export type InterviewQuestion = {
  id: string;
  en: string;
  pt: string;
  guidance: string;
};

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'purpose',
    en: 'What is the purpose of your trip?',
    pt: 'Qual o objetivo da sua viagem?',
    guidance:
      'Uma frase direta: turismo, visita a parentes, conhecer Disney, etc. Nada de discurso longo.',
  },
  {
    id: 'destination',
    en: 'Where will you go and for how long?',
    pt: 'Para onde você vai e por quantos dias?',
    guidance:
      'Cite as cidades principais e a duração. Se ainda não tem tudo fechado, diga o plano geral.',
  },
  {
    id: 'who-pays',
    en: 'Who is paying for the trip?',
    pt: 'Quem está pagando a viagem?',
    guidance:
      'Diga a verdade — você, um familiar, a empresa. Se for alguém, diga quem e a relação.',
  },
  {
    id: 'work',
    en: 'Where do you work and for how long?',
    pt: 'Onde você trabalha e há quanto tempo?',
    guidance:
      'Nome da empresa, cargo e tempo. Se for autônomo ou tem empresa própria, diga isso claramente.',
  },
  {
    id: 'ties',
    en: 'Do you have family, a home, or ties in Brazil?',
    pt: 'Você tem família, casa, vínculos no Brasil?',
    guidance:
      'Mencione o que for verdade: cônjuge, filhos, pais dependentes, imóvel, trabalho estável.',
  },
  {
    id: 'prior-travel',
    en: 'Have you been to the US or other countries before?',
    pt: 'Já viajou para os EUA ou outros países?',
    guidance: 'Liste os principais. Se for primeira vez internacional, diga tranquilamente.',
  },
  {
    id: 'us-family',
    en: 'Do you have relatives in the US?',
    pt: 'Você tem parentes nos EUA?',
    guidance: 'Diga a verdade. Ter parente lá não é problema; esconder é.',
  },
];
