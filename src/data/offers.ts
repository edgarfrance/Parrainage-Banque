export type Category = 'all' | 'banque' | 'bourse' | 'crypto';

export interface OfferStep {
  number: number;
  title: string;
  description: string;
  caution?: string;
}

export interface OfferFaq {
  question: string;
  answer: string;
}

export interface ReferralOffer {
  id: string;
  name: string;
  fullName: string;
  category: 'banque' | 'bourse' | 'crypto';
  categoryLabel: string;
  tagline: string;
  estimatedBonus: number; // numeric in EUR for calculation
  bonusDisplay: string;
  bonusSubtitle: string;
  defaultCode: string;
  defaultUrl: string;
  brandColor: string;
  accentBg: string;
  badgeText: string;
  summaryHighlights: string[];
  difficulty: 'Très facile' | 'Facile' | 'Moyen';
  estimatedTime: string;
  payoutDelay: string;
  minDeposit: string;
  trustScore: number;
  reviewsCount: string;
  regulatory: string;
  overview: string;
  bonusBreakdown: {
    label: string;
    amount: string;
    condition: string;
  }[];
  steps: OfferStep[];
  conditions: string[];
  pros: string[];
  cons: string[];
  faq: OfferFaq[];
  officialSite: string;
}

export const REFERRAL_OFFERS: ReferralOffer[] = [
  {
    id: 'boursobank',
    name: 'BoursoBank',
    fullName: 'BoursoBank (ex-Boursorama)',
    category: 'banque',
    categoryLabel: 'Banque en ligne',
    tagline: 'Gagne jusqu’à 240 € à partir de 1 € de dépôt seulement',
    estimatedBonus: 240,
    bonusDisplay: 'Jusqu’à 240 €',
    bonusSubtitle: 'Dès 1 € de dépôt (+ 80 € si mobilité bancaire)',
    defaultCode: 'BOURSO240',
    defaultUrl: 'https://www.boursobank.com',
    brandColor: '#e00072',
    accentBg: 'bg-pink-50 text-pink-700 border-pink-200',
    badgeText: 'Dépôt dès 1 € seulement',
    summaryHighlights: [
      '1 € de dépôt = 130 € de prime immédiate',
      '50 € de dépôt = 140 € de prime | 300 € de dépôt = 160 € de prime',
      '+ 80 € offerts si mobilité bancaire EasyMove sur toutes les offres',
      'Carte bancaire Ultim Visa gratuite sans frais à l’étranger'
    ],
    difficulty: 'Très facile',
    estimatedTime: '6 minutes',
    payoutDelay: 'Le jour même du premier versement',
    minDeposit: '1 € seulement (ou 50€ / 300€ selon prime)',
    trustScore: 4.9,
    reviewsCount: 'Plus de 6M de clients en France',
    regulatory: 'Filiale Société Générale, agréée ACPR & Banque de France',
    overview: 'BoursoBank propose l’offre la plus accessible du marché bancaire français : gagnez jusqu’à 240 € avec seulement 1 € de dépôt initial ! La prime d’ouverture de compte est proportionnelle au montant de votre premier virement (130 € pour 1 €, 140 € pour 50 €, 160 € pour 300 €), à laquelle s’ajoute une prime de 80 € si vous optez pour la mobilité bancaire EasyMove.',
    bonusBreakdown: [
      {
        label: 'Palier 1 : Premier dépôt de 1 €',
        amount: '130 €',
        condition: 'Crédité immédiatement dès réception de votre virement de 1 €'
      },
      {
        label: 'Palier 2 : Premier dépôt de 50 €',
        amount: '140 €',
        condition: 'Crédité immédiatement dès réception de votre virement de 50 €'
      },
      {
        label: 'Palier 3 : Premier dépôt de 300 €',
        amount: '160 €',
        condition: 'Crédité immédiatement dès réception de votre virement de 300 €'
      },
      {
        label: 'Bonus Mobilité Bancaire EasyMove',
        amount: '+ 80 €',
        condition: 'Valable sur toutes les offres en domiciliant au moins 1 prélèvement automatique'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Accédez au formulaire avec le code parrain',
        description: 'Cliquez sur le bouton pour ouvrir BoursoBank avec le code parrainage déjà actif dans le formulaire.'
      },
      {
        number: 2,
        title: 'Renseignez vos informations & choisissez l’offre Ultim',
        description: 'Complétez votre état civil et optez pour la carte Visa Ultim gratuite (aucun flux obligatoire).'
      },
      {
        number: 3,
        title: 'Validez votre dossier en photo',
        description: 'Photographiez votre pièce d’identité, un justificatif de domicile et votre signature.'
      },
      {
        number: 4,
        title: 'Effectuez votre premier dépôt (1 €, 50 € ou 300 €)',
        description: 'Faites un virement depuis votre compte actuel : 1 € (pour toucher 130 €), 50 € (pour 140 €) ou 300 € (pour 160 €).'
      },
      {
        number: 5,
        title: 'Activez la mobilité EasyMove (+80 € en option)',
        description: 'Bénéficiez des 80 € additionnels en transférant un prélèvement vers votre nouveau compte BoursoBank.'
      }
    ],
    conditions: [
      'Être une personne physique majeure résidant fiscalement en France',
      'Ne pas être déjà titulaire d’un compte BoursoBank',
      'Effectuer le 1er versement choisi (1 €, 50 € ou 300 €) dans les 5 jours ouvrés suivant la validation du dossier',
      'Conserver le compte ouvert au minimum 12 mois',
      '1 utilisation de la carte par mois pour conserver la gratuité totale'
    ],
    pros: [
      'Accessible à partir de seulement 1 € de dépôt pour empocher 130 € cash',
      'Prime versée directement le jour de l’ouverture effective',
      'Virements instantanés gratuits et carte gratuite sans frais à l’étranger',
      'Cumulable avec les 80 € de mobilité bancaire EasyMove'
    ],
    cons: [
      'Frais de 9 € / mois si aucune utilisation de la carte au cours du mois'
    ],
    faq: [
      {
        question: 'Puis-je vraiment toucher 130 € avec seulement 1 € de dépôt ?',
        answer: 'Oui ! Chez BoursoBank, le palier d’entrée permet d’activer votre compte avec un simple virement de 1 € seulement et d’empocher 130 € de prime de bienvenue.'
      },
      {
        question: 'Comment obtenir les 240 € au maximum ?',
        answer: 'Versez 300 € lors de l’ouverture pour débloquer 160 € de prime, puis activez la mobilité bancaire gratuite EasyMove pour encaisser les 80 € supplémentaires, soit un total de 240 €.'
      },
      {
        question: 'L’argent déposé est-il bloqué ?',
        answer: 'Non, absolument pas. Vos 1 €, 50 € ou 300 € ainsi que la prime vous appartiennent immédiatement et sont 100% utilisables ou retirables.'
      }
    ],
    officialSite: 'https://www.boursobank.com'
  },
  {
    id: 'fortuneo',
    name: 'Fortuneo',
    fullName: 'Fortuneo Banque',
    category: 'banque',
    categoryLabel: 'Banque en ligne',
    tagline: 'Jusqu’à 160 € à partir de 300 € de dépôt',
    estimatedBonus: 160,
    bonusDisplay: 'Jusqu’à 160 €',
    bonusSubtitle: 'Dès 300 € de dépôt selon vos revenus',
    defaultCode: '12847921',
    defaultUrl: 'https://www.fortuneo.fr',
    brandColor: '#008559',
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badgeText: 'Carte Gold CB Gratuite',
    summaryHighlights: [
      '80 € offerts avec 300 € de dépôt (revenus de moins de 1 800 € / Carte Fosfo)',
      '160 € offerts avec 300 € de dépôt (revenus de plus de 1 800 € / Carte Gold)',
      'Cartes bancaires gratuites, 0 € de frais à l’étranger dans le monde entier',
      'Garanties et assurances voyage Gold Mastercard complètes'
    ],
    difficulty: 'Facile',
    estimatedTime: '8 minutes',
    payoutDelay: 'Versée sous 30 jours après les 5 premiers paiements',
    minDeposit: '300 € (restitués immédiatement)',
    trustScore: 4.8,
    reviewsCount: 'Plus de 1M de clients',
    regulatory: 'Filiale du Crédit Mutuel Arkéa, dépôts garantis jusqu’à 100 000 €',
    overview: 'Fortuneo est la banque en ligne premium du groupe Crédit Mutuel Arkéa. Elle propose jusqu’à 160 € de prime avec un dépôt de 300 € : 80 € avec la carte Fosfo (accessible sans condition de revenus pour moins de 1 800 €) ou 160 € avec la prestigieuse carte Gold Mastercard gratuite (dès 1 800 € nets de revenus mensuels justifiés).',
    bonusBreakdown: [
      {
        label: 'Offre Carte Fosfo (Moins de 1 800 € de revenus)',
        amount: '80 € offerts',
        condition: '300 € de premier dépôt + 5 paiements par carte dans les 90 jours'
      },
      {
        label: 'Offre Carte Gold Mastercard (Plus de 1 800 € de revenus)',
        amount: '160 € offerts',
        condition: '300 € de premier dépôt + 5 paiements par carte dans les 90 jours'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Remplissez le formulaire en ligne',
        description: 'Cliquez sur le lien parrain et insérez le code parrainage Fortuneo dans le champ dédié au début du formulaire.'
      },
      {
        number: 2,
        title: 'Sélectionnez votre carte',
        description: 'Choisissez Fosfo (80 € offerts sans condition de revenus) ou Gold Mastercard (160 € offerts dès 1 800 € de revenus nets mensuels).'
      },
      {
        number: 3,
        title: 'Effectuez le premier dépôt de 300 €',
        description: 'Transférez 300 € depuis votre compte bancaire habituel. Ces 300 € restent entièrement disponibles sur votre compte Fortuneo.'
      },
      {
        number: 4,
        title: 'Réalisez 5 paiements par carte',
        description: 'Effectuez 5 paiements de votre choix avec la carte (même de petits montants comme 1 €) dans les 90 jours pour déclencher le versement de la prime.'
      }
    ],
    conditions: [
      'Être majeur et résident fiscal en France',
      'Ouvrir un premier compte bancaire chez Fortuneo',
      'Verser au moins 300 € à l’ouverture',
      'Effectuer 5 paiements avec la carte dans les 90 jours',
      'Conserver le compte ouvert au minimum 1 an'
    ],
    pros: [
      'Carte Gold Mastercard gratuite avec garanties assistance & voyage haut de gamme',
      'Paiements et retraits en devises 100% gratuits partout dans le monde',
      'Service client basé en France réputé pour sa disponibilité'
    ],
    cons: [
      'Nécessite de justifier 1 800 €/mois de revenus pour toucher les 160 € de la Gold',
      '1 opération par mois requise pour maintenir la gratuité de la carte'
    ],
    faq: [
      {
        question: 'Dois-je domicilier mon salaire chez Fortuneo ?',
        answer: 'Non, aucune domiciliation bancaire requise. Vous devez uniquement justifier de vos revenus à la souscription si vous choisissez la carte Gold.'
      },
      {
        question: 'Comment valider les 5 paiements rapidement ?',
        answer: 'Toutes les dépenses comptent : des achats du quotidien comme du pain, des tickets de transport ou des recharges en ligne.'
      }
    ],
    officialSite: 'https://www.fortuneo.fr'
  },
  {
    id: 'revolut',
    name: 'Revolut',
    fullName: 'Revolut Bank UAB',
    category: 'banque',
    categoryLabel: 'Néobanque & Voyage',
    tagline: 'Gagne 40 €',
    estimatedBonus: 40,
    bonusDisplay: '40 €',
    bonusSubtitle: 'Ajoutez 15 €, faites 3 achats de 5 € & commandez la carte',
    defaultCode: 'REVOLUT40',
    defaultUrl: 'https://revolut.com',
    brandColor: '#191c1f',
    accentBg: 'bg-zinc-100 text-zinc-900 border-zinc-300',
    badgeText: 'IBAN Français & Multi-devises',
    summaryHighlights: [
      'Gagnez 40 € de prime en quelques étapes simples',
      'Ajoutez 15 € sur le compte par carte ou virement instantané',
      'Réalisez 3 paiements de 5 € chacun avec votre carte',
      'Commandez votre carte bancaire physique'
    ],
    difficulty: 'Facile',
    estimatedTime: '5 minutes',
    payoutDelay: '3 à 5 jours après les 3 paiements',
    minDeposit: '15 € (utilisés pour vos achats)',
    trustScore: 4.8,
    reviewsCount: '45+ millions d’utilisateurs',
    regulatory: 'Licence bancaire européenne (Revolut Bank UAB), succursale en France agréée ACPR',
    overview: 'Revolut est la néobanque la plus populaire d’Europe avec plus de 45 millions d’utilisateurs. Elle propose un IBAN français, des virements instantanés gratuits, le change de devises sans frais et des cartes virtuelles éphémères. L’offre de parrainage vous permet de gagner 40 € simplement en ajoutant 15 €, en faisant 3 achats de 5 € et en commandant une carte physique.',
    bonusBreakdown: [
      {
        label: 'Prime de parrainage Revolut',
        amount: '40 €',
        condition: 'Validée dès l’ajout de 15 €, la commande de la carte et 3 paiements de 5 €'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Inscrivez-vous via le lien de parrainage',
        description: 'Cliquez sur le lien d’invitation et téléchargez l’application Revolut en vérifiant votre numéro de téléphone.'
      },
      {
        number: 2,
        title: 'Ajoutez 15 € sur votre compte',
        description: 'Rechargez votre compte d’au moins 15 € par carte bancaire ou virement instantané gratuit.'
      },
      {
        number: 3,
        title: 'Commandez une carte physique Revolut',
        description: 'Commandez votre carte physique dans l’application (livraison à votre domicile).'
      },
      {
        number: 4,
        title: 'Effectuez 3 paiements de 5 € minimum',
        description: 'Réalisez 3 achats réels d’au moins 5 € chacun (vous pouvez utiliser la carte virtuelle via Apple Pay / Google Pay sans attendre la carte physique).'
      }
    ],
    conditions: [
      'Être un nouvel utilisateur Revolut',
      'Ajouter au moins 15 € sur votre solde',
      'Commander la carte bancaire physique',
      'Faire 3 paiements distincts d’au moins 5 € chacun (les virements, jeux de hasard et cartes cadeaux sont exclus)'
    ],
    pros: [
      'Inscription express en moins de 5 minutes',
      'Paiements réalisables immédiatement via Apple Pay ou Google Pay',
      'IBAN français et gestion multi-devises gratuite'
    ],
    cons: [
      'Frais d’envoi de la carte physique (environ 6,99 €) déductibles de vos gains nets'
    ],
    faq: [
      {
        question: 'Dois-je attendre de recevoir la carte physique pour faire les 3 paiements ?',
        answer: 'Non ! Dès la commande de la carte validée, vous pouvez associer votre carte à Apple Pay ou Google Pay et réaliser vos 3 paiements de 5 € immédiatement en magasin ou en ligne.'
      }
    ],
    officialSite: 'https://revolut.com'
  },
  {
    id: 'traderepublic',
    name: 'Trade Republic',
    fullName: 'Trade Republic Bank GmbH',
    category: 'bourse',
    categoryLabel: 'Bourse & Épargne',
    tagline: 'Gagne 25 €',
    estimatedBonus: 25,
    bonusDisplay: '25 €',
    bonusSubtitle: 'Déposez 100 € et faites 3 investissements (retirables directement)',
    defaultCode: 'TRADEREPUBLIC',
    defaultUrl: 'https://traderepublic.com',
    brandColor: '#000000',
    accentBg: 'bg-slate-100 text-slate-900 border-slate-300',
    badgeText: '100 € Retirables Directement',
    summaryHighlights: [
      'Gagnez 25 € de prime de bienvenue en cash ou fraction d’action',
      'Déposez 100 € sur votre compte (entièrement retirables directement)',
      'Réalisez 3 investissements à partir de 5 € seulement',
      'Profitez de 3,75% d’intérêts annuels sur vos liquidités + 1% de Saveback'
    ],
    difficulty: 'Très facile',
    estimatedTime: '6 minutes',
    payoutDelay: 'Attribué sous 2 à 4 jours ouvrés',
    minDeposit: '100 € (retirables directement)',
    trustScore: 4.9,
    reviewsCount: 'Plus de 4 millions d’investisseurs',
    regulatory: 'Banque d’investissement allemande de plein exercice agréée par la BaFin et la Bundesbank',
    overview: 'Trade Republic est la première plateforme d’épargne et d’investissement en Europe. Avec votre compte espèces, vos liquidités non investies sont rémunérées à hauteur de 3,75% par an. Pour obtenir les 25 € offerts, il vous suffit de déposer 100 € et d’effectuer 3 petits investissements (dès 5 € chacun) : vos 100 € restent entièrement retirables directement.',
    bonusBreakdown: [
      {
        label: 'Prime de bienvenue Trade Republic',
        amount: '25 €',
        condition: 'Déposer 100 € et réaliser 3 investissements d’au moins 5 €'
      },
      {
        label: 'Rémunération des liquidités',
        amount: '3,75% annuel',
        condition: 'Calculé au jour le jour sur les fonds disponibles sur le compte espèces'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Ouvrez votre compte via le lien parrain',
        description: 'Inscrivez-vous et vérifiez rapidement votre identité en quelques minutes.'
      },
      {
        number: 2,
        title: 'Déposez 100 € sur votre compte',
        description: 'Effectuez un virement ou un dépôt par carte de 100 €. Ces fonds vous appartiennent et sont retirables à tout moment.'
      },
      {
        number: 3,
        title: 'Réalisez 3 investissements (dès 5 €)',
        description: 'Achetez pour au moins 5 € de l’action ou de l’ETF de votre choix à 3 reprises (ex: ETF Monde ou actions stables).'
      },
      {
        number: 4,
        title: 'Recevez vos 25 € et retirez si vous le souhaitez',
        description: 'Dès validation des 3 transactions, votre prime de 25 € est créditée. Vous pouvez retirer l’ensemble de vos fonds (100 € + prime) directement vers votre banque.'
      }
    ],
    conditions: [
      'Être majeur et résident fiscal en France',
      'Nouveau compte Trade Republic',
      'Déposer 100 € et finaliser 3 ordres d’achat d’au moins 5 € chacun dans les 21 jours'
    ],
    pros: [
      'Les 100 € déposés ne sont pas bloqués et sont retirables directement',
      'Rémunération attractive de 3,75% par an sur les liquidités',
      'Plans d’épargne programmée gratuits et frais fixes de 1 € par ordre'
    ],
    cons: [
      'Investir comporte des risques de perte en capital sur les marchés financiers'
    ],
    faq: [
      {
        question: 'Puis-je retirer mes 100 € déposés immédiatement ?',
        answer: 'Oui, vos 100 € sont entièrement retirables directement vers votre compte bancaire. Après avoir effectué les 3 petits investissements (par exemple 3 x 5 € = 15 €), vous pouvez soit revendre les titres, soit laisser le reste et retirer la totalité.'
      },
      {
        question: 'Quels investissements de 5 € puis-je faire ?',
        answer: 'Vous êtes libre de choisir n’importe quelle action ou ETF proposé sur Trade Republic (par exemple une fraction d’action Apple, LVMH ou un ETF S&P 500).'
      }
    ],
    officialSite: 'https://traderepublic.com'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    fullName: 'Coinbase Inc. (Régulé PSAN)',
    category: 'crypto',
    categoryLabel: 'Plateforme Crypto & Web3',
    tagline: 'Gagne 20 € en BTC',
    estimatedBonus: 20,
    bonusDisplay: '20 € en BTC',
    bonusSubtitle: 'Déposez 20 € et faites 1 transaction (tout est retirable directement)',
    defaultCode: 'COINBASE20',
    defaultUrl: 'https://www.coinbase.com',
    brandColor: '#0052ff',
    accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Retirable Directement',
    summaryHighlights: [
      'Gagnez 20 € en Bitcoin offerts',
      'Déposez seulement 20 € sur la plateforme',
      'Faites 1 transaction de 20 € (achat de crypto de votre choix)',
      'Tout est retirable directement vers votre compte bancaire'
    ],
    difficulty: 'Très facile',
    estimatedTime: '5 minutes',
    payoutDelay: 'Crédité immédiatement ou sous 24h',
    minDeposit: '20 € (retirables directement)',
    trustScore: 4.8,
    reviewsCount: 'Plus de 100M d’utilisateurs',
    regulatory: 'Enregistré auprès de l’AMF en France en tant que PSAN (Prestataire de Services sur Actifs Numériques)',
    overview: 'Coinbase est la plateforme de référence pour débuter dans les crypto-actifs en toute sécurité. Société cotée au Nasdaq (COIN) et régulée en France auprès de l’AMF, elle propose une offre de parrainage ultra-simple : déposez 20 €, effectuez une transaction de 20 €, et gagnez 20 € en Bitcoin. L’ensemble du capital (dépôt + bonus) est retirable directement.',
    bonusBreakdown: [
      {
        label: 'Bonus parrainage en Bitcoin',
        amount: '20 € en BTC',
        condition: 'Dépôt de 20 € et première transaction de 20 € effectuée'
      },
      {
        label: 'Programme Learn & Earn (bonus additionnel)',
        amount: '15 € à 30 €',
        condition: 'Mini-quiz gratuits de 2 minutes pour gagner d’autres cryptos'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Créez votre compte Coinbase',
        description: 'Cliquez sur le lien de parrainage pour associer le bonus de 20 € à votre compte.'
      },
      {
        number: 2,
        title: 'Validez votre identité (KYC rapide)',
        description: 'Prenez en photo votre pièce d’identité pour débloquer les dépôts en euros.'
      },
      {
        number: 3,
        title: 'Déposez 20 € par virement ou carte',
        description: 'Créditez 20 € sur votre solde en euros.'
      },
      {
        number: 4,
        title: 'Effectuez une transaction de 20 €',
        description: 'Achetez pour 20 € de Bitcoin ou d’USDC pour déclencher le versement instantané des 20 € en BTC.'
      },
      {
        number: 5,
        title: 'Retirez l’ensemble sur votre compte',
        description: 'Vous pouvez convertir vos BTC en euros et virer l’intégralité de vos fonds (40 € au total) directement sur votre compte bancaire.'
      }
    ],
    conditions: [
      'Nouveau compte Coinbase',
      'Déposer 20 € et exécuter une transaction de 20 €',
      'Compte vérifié avec pièce d’identité conforme'
    ],
    pros: [
      'Dépôt très faible de 20 € seulement',
      'Tout est 100% retirable directement vers votre banque',
      'Société cotée à Wall Street, régulée PSAN en France par l’AMF'
    ],
    cons: [
      'Légers frais de conversion lors du rachat/retrait'
    ],
    faq: [
      {
        question: 'Comment retirer les 20 € offerts vers ma banque ?',
        answer: 'Dès que vous recevez les 20 € en Bitcoin, cliquez sur "Vendre" pour convertir les BTC en euros, puis cliquez sur "Retirer" pour transférer le montant vers votre compte bancaire français.'
      }
    ],
    officialSite: 'https://www.coinbase.com'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    fullName: 'Kraken Digital Asset Exchange',
    category: 'crypto',
    categoryLabel: 'Plateforme Crypto & Trading',
    tagline: 'Gagne 30 € en BTC',
    estimatedBonus: 30,
    bonusDisplay: '30 € en BTC',
    bonusSubtitle: 'Déposez 200 € et faites 1 transaction de 200 € (retirables directement)',
    defaultCode: 'KRAKEN30',
    defaultUrl: 'https://www.kraken.com',
    brandColor: '#5741d9',
    accentBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: '30 € en BTC Retirables',
    summaryHighlights: [
      'Gagnez 30 € en Bitcoin versés sur votre compte',
      'Déposez 200 € par virement SEPA ou carte',
      'Effectuez une transaction de 200 €',
      'L’ensemble de vos 200 € + les 30 € de prime sont retirables directement'
    ],
    difficulty: 'Facile',
    estimatedTime: '6 minutes',
    payoutDelay: 'Crédité sous 24h à 48h après la transaction',
    minDeposit: '200 € (retirables directement)',
    trustScore: 4.9,
    reviewsCount: 'Plus de 10 millions d’utilisateurs',
    regulatory: 'Plateforme historique fondée en 2011, conformité européenne et réserves d’actifs 100% auditées (Proof of Reserves)',
    overview: 'Fondée en 2011, Kraken est l’une des plateformes crypto les plus réputées, sécurisées et fiables au monde. Elle bénéficie d’une réputation exemplaire en matière de sécurité sans faille. Son offre de parrainage vous récompense de 30 € en Bitcoin dès que vous déposez 200 € et faites une transaction de 200 €. Vous pouvez retirer l’intégralité de vos fonds immédiatement après.',
    bonusBreakdown: [
      {
        label: 'Prime de bienvenue en Bitcoin',
        amount: '30 € en BTC',
        condition: 'Déposer 200 € et réaliser au moins une transaction de 200 €'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Inscrivez-vous via le lien de parrainage',
        description: 'Créez votre compte Kraken en cliquant sur le lien parrain officiel.'
      },
      {
        number: 2,
        title: 'Vérifiez votre compte (Niveau Express ou Intermédiaire)',
        description: 'Complétez la vérification d’identité sécurisée avec votre pièce d’identité.'
      },
      {
        number: 3,
        title: 'Déposez 200 €',
        description: 'Effectuez un dépôt de 200 € par virement instantané SEPA gratuit ou par carte.'
      },
      {
        number: 4,
        title: 'Réalisez une transaction de 200 €',
        description: 'Achetez pour 200 € de Bitcoin ou d’USDT/USDC. Vos 30 € en Bitcoin sont attribués.'
      },
      {
        number: 5,
        title: 'Retirez vos fonds librement',
        description: 'Reconvertissez si vous le souhaitez et virez l’intégralité (200 € de départ + 30 € de bonus) vers votre compte bancaire.'
      }
    ],
    conditions: [
      'Nouveau client Kraken',
      'Déposer 200 € et réaliser une transaction d’au moins 200 €',
      'Tous les fonds et bonus sont retirables directement'
    ],
    pros: [
      'Plateforme ultra-sécurisée réputée depuis plus de 13 ans',
      '30 € de prime en Bitcoin directement retirable',
      'Virements SEPA instantanés vers et depuis les banques européennes'
    ],
    cons: [
      'Nécessite une avance temporaire de 200 € (reprise aussitôt)'
    ],
    faq: [
      {
        question: 'Puis-je retirer mes 200 € et les 30 € de Bitcoin aussitôt ?',
        answer: 'Oui ! Tout est retirable directement. Dès que votre transaction est effectuée et que les 30 € en BTC sont crédités, vous pouvez vendre la crypto et rapatrier l’argent sur votre compte bancaire habituel.'
      },
      {
        question: 'Y a-t-il des frais sur les virements bancaires ?',
        answer: 'Non, les virements SEPA en euros vers Kraken sont généralement gratuits et traités quasi instantanément.'
      }
    ],
    officialSite: 'https://www.kraken.com'
  }
];
