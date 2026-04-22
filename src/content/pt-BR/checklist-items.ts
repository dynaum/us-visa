export type ChecklistGroup = {
  id: string;
  title: string;
  items: { id: string; label: string }[];
};

export const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    id: 'required',
    title: 'Documentos obrigatórios',
    items: [
      { id: 'passport', label: 'Passaporte válido (mínimo 6 meses além da viagem)' },
      { id: 'old-passports', label: 'Passaportes antigos (se houver)' },
      { id: 'ds160-confirmation', label: 'Página de confirmação do DS-160 com código de barras' },
      { id: 'mrv-receipt', label: 'Comprovante da taxa MRV' },
      { id: 'appointment-letter', label: 'Carta de agendamento da entrevista' },
      { id: 'photo', label: 'Foto 5×5 cm impressa' },
    ],
  },
  {
    id: 'ties',
    title: 'Vínculos com o Brasil',
    items: [
      { id: 'income', label: 'Comprovante de renda (holerites, IR, extratos)' },
      { id: 'residence', label: 'Comprovante de residência recente' },
      {
        id: 'employment',
        label: 'Carteira de trabalho, contrato social ou declaração do empregador',
      },
      { id: 'education', label: 'Matrícula escolar ou universitária (se aplicável)' },
      { id: 'family', label: 'Certidões: casamento, nascimento de filhos' },
    ],
  },
  {
    id: 'trip',
    title: 'Sobre a viagem',
    items: [
      { id: 'itinerary', label: 'Itinerário com datas e cidades' },
      { id: 'hotels', label: 'Reservas de hotel ou comprovante de hospedagem' },
      { id: 'flights', label: 'Passagens ou reservas de voo' },
      { id: 'funds', label: 'Prova de como a viagem será paga' },
    ],
  },
];
