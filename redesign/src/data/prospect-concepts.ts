export type ProspectConcept = {
  slug: string;
  name: string;
  category: 'bakery' | 'florist' | 'auto' | 'barber' | 'pet' | 'tailor';
  label: string;
  headline: string;
  subhead: string;
  focus: [string, string, string];
  palette: string;
};

export const prospectConcepts: ProspectConcept[] = [
  {
    slug: 'thorough-bread-pastry', name: 'Thorough Bread & Pastry', category: 'bakery',
    label: 'A clearer path from browsing to pre-ordering',
    headline: 'A little more time for the good stuff.',
    subhead: 'See what is fresh, find the right order path, and get back to the reason you came.',
    focus: ['Bring pre-orders into view', 'Make the next step unmistakable', 'Give the bakery its own voice'],
    palette: 'bakery',
  },
  {
    slug: 'pavilion-of-flowers', name: 'Pavilion of Flowers', category: 'florist',
    label: 'A more distinctive floral storefront',
    headline: 'Flowers with a feeling.',
    subhead: 'A more personal first impression, with the next step close at hand.',
    focus: ['Make the visual identity more memorable', 'Put local contact details in context', 'Create a clearer path to inquire'],
    palette: 'florist',
  },
  {
    slug: 'bw-service-center', name: 'B & W Service Center', category: 'auto',
    label: 'A more polished service and booking experience',
    headline: 'Good work deserves a clear first impression.',
    subhead: 'Put accurate information, useful proof, and the existing booking path in one easy-to-scan place.',
    focus: ['Keep service details accurate', 'Bring trust signals forward', 'Make the existing booking path easy to find'],
    palette: 'auto',
  },
  {
    slug: 'automotive-clinic', name: 'Automotive Clinic', category: 'auto',
    label: 'A modern service-request concept',
    headline: 'Get back on the road with less guesswork.',
    subhead: 'A focused starting point for learning about the shop and requesting the next step.',
    focus: ['Organize information for phone screens', 'Make service requests easier to start', 'Put contact details within reach'],
    palette: 'auto',
  },
  {
    slug: 'fillmore-florist', name: 'Fillmore Florist', category: 'florist',
    label: 'A more ownable neighborhood florist identity',
    headline: 'Flowers that feel like they came from here.',
    subhead: 'A warmer, more individual presentation that helps shoppers find their way to the shop.',
    focus: ['Replace generic-feeling copy with a distinct voice', 'Let the arrangements lead', 'Make the next step easy to spot'],
    palette: 'florist',
  },
  {
    slug: 'joes-barbershop', name: "Joe's Barbershop", category: 'barber',
    label: 'A phone-first refresh for a neighborhood barbershop',
    headline: 'A good cut starts with an easy hello.',
    subhead: 'A clear, modern introduction with the essentials ready for the next visit.',
    focus: ['Make the site comfortable to use on a phone', 'Put the appointment path up front', 'Give the shop a more current first impression'],
    palette: 'barber',
  },
  {
    slug: 'castro-barber-lounge', name: 'Castro Barber Lounge', category: 'barber',
    label: 'An appointment-ready studio concept',
    headline: 'Make room for the next appointment.',
    subhead: 'A considered introduction to the shop, with a more direct path from browsing to booking.',
    focus: ['Turn the appointment path into a clear action', 'Show the shop experience with intention', 'Keep hours and contact easy to scan'],
    palette: 'barber',
  },
  {
    slug: 'janes-roses-flowers', name: "Jane's Roses & Flowers", category: 'florist',
    label: 'A clearer, more human floral storefront',
    headline: 'Say it with flowers. Start here.',
    subhead: 'Make the words feel personal and the route to the right arrangement feel simple.',
    focus: ['Use a more natural brand voice', 'Help visitors choose a direction', 'Make ordering details easy to find'],
    palette: 'florist',
  },
  {
    slug: 'golden-door-barbershop', name: 'Golden Door Barbershop', category: 'barber',
    label: 'A booking-first version of a simple shop site',
    headline: 'Your next cut, without the extra steps.',
    subhead: 'Keep the essentials visible and make the booking choice clear on every screen.',
    focus: ['Put booking beside the shop introduction', 'Keep pricing easy to read', 'Design around quick mobile decisions'],
    palette: 'barber',
  },
  {
    slug: 'action-auto-care', name: 'Action Auto Care', category: 'auto',
    label: 'A first owned-website concept',
    headline: 'A dependable place to start.',
    subhead: 'A simple, ownable home online that can introduce the business and guide a service inquiry.',
    focus: ['Establish a clear business home online', 'Make the inquiry path straightforward', 'Leave room for verified services and shop details'],
    palette: 'auto',
  },
  {
    slug: 'mikes-barber-shop', name: "Mike's Barber Shop", category: 'barber',
    label: 'A fuller, more useful barbershop homepage',
    headline: 'A familiar neighborhood stop, easier to find.',
    subhead: 'Build beyond a logo-only first impression and give visitors the details they need.',
    focus: ['Introduce the shop in a few clear lines', 'Put appointment information in view', 'Make the mobile experience feel current'],
    palette: 'barber',
  },
  {
    slug: 'yasukochis-sweet-stop', name: "Yasukochi's Sweet Stop", category: 'bakery',
    label: 'A more useful home for celebration-order inquiries',
    headline: 'Make the next celebration easier to plan.',
    subhead: 'A warm introduction with a clearer way to explore the menu and ask about an order.',
    focus: ['Give the menu a more useful home', 'Make order inquiries easy to begin', 'Keep payment and pickup details clear'],
    palette: 'bakery',
  },
  {
    slug: 'the-alchemist-barbershop', name: 'The Alchemist Barbershop', category: 'barber',
    label: 'A home base alongside social and marketplace listings',
    headline: 'Your own place in the neighborhood.',
    subhead: 'A direct introduction that can bring the shop, its work, and its booking path together.',
    focus: ['Create a home base the shop controls', 'Connect discovery to the booking destination', 'Make the shop easy to find again'],
    palette: 'barber',
  },
  {
    slug: 'urban-flowers', name: 'Urban Flowers', category: 'florist',
    label: 'A fresh storefront concept for a long-running florist',
    headline: 'A fresh way to send something thoughtful.',
    subhead: 'Bring the story of the shop forward and make the path to browse or inquire more direct.',
    focus: ['Refresh the storefront presentation', 'Give arrangements more room to stand out', 'Explore a clearer online-order path'],
    palette: 'florist',
  },
  {
    slug: 'next-level-barbershop', name: 'Next Level Barbershop', category: 'barber',
    label: 'A direct website concept alongside Booksy',
    headline: 'The next visit starts here.',
    subhead: 'An ownable introduction that can direct visitors to the existing booking destination.',
    focus: ['Create a direct home online', 'Make the Booksy path easy to recognize', 'Keep the shop details consistent'],
    palette: 'barber',
  },
  {
    slug: 'kc-auto-service', name: 'K & C Auto Service', category: 'auto',
    label: 'A first website concept for an import specialist',
    headline: 'Specialist care, clearly introduced.',
    subhead: 'A straightforward way to explain the shop and start a service conversation online.',
    focus: ['Explain the specialty in plain language', 'Build a clear service inquiry path', 'Add only verified shop details'],
    palette: 'auto',
  },
  {
    slug: 'pak-auto-service', name: 'Pak Auto Service', category: 'auto',
    label: 'A clearer, more direct shop homepage',
    headline: 'A better first stop for your next service.',
    subhead: 'Bring the essentials together and make it easier to ask about an appointment.',
    focus: ['Use contact details consistently', 'Make service requests easier to start', 'Design for mobile-first browsing'],
    palette: 'auto',
  },
  {
    slug: 'precision-auto-repair', name: 'Precision Auto Repair', category: 'auto',
    label: 'A more useful service and scheduling experience',
    headline: 'Experience you can find in a few taps.',
    subhead: 'Give the shop a clear introduction and a more convenient way to begin a service request.',
    focus: ['Bring the shop story into the first screen', 'Make scheduling options visible', 'Keep essential details easy to scan'],
    palette: 'auto',
  },
  {
    slug: 'embarcadero-automotive', name: 'Embarcadero Automotive', category: 'auto',
    label: 'A clear, working front door for the shop',
    headline: 'A better first stop than a blank page.',
    subhead: 'An independent concept showing how a visitor could find the shop and start an inquiry.',
    focus: ['Replace a dead-end visit with useful information', 'Keep contact options visible', 'Build a lightweight mobile-first experience'],
    palette: 'auto',
  },
  {
    slug: 'residents-barbershop', name: 'Residents Barbershop', category: 'barber',
    label: 'A more complete barbershop homepage',
    headline: 'A good neighborhood cut, clearly presented.',
    subhead: 'A polished introduction with the practical details easy to find before someone visits.',
    focus: ['Give the first impression a careful proofread', 'Make booking or calling a clear next step', 'Keep the page easy to use on a phone'],
    palette: 'barber',
  },
  {
    slug: 'natalini-flowers', name: 'Natalini Flowers', category: 'florist',
    label: 'A clearer, more dependable floral storefront',
    headline: 'Make room for the flowers, not the placeholders.',
    subhead: 'A fresh direction centered on the arrangements and a straightforward path to inquire.',
    focus: ['Replace placeholder content with verified details', 'Make the contact path dependable', 'Give ordering a clearer starting point'],
    palette: 'florist',
  },
  {
    slug: 'sams-bakery', name: "Sam's Bakery", category: 'bakery',
    label: 'A first owned-website concept for a neighborhood bakery',
    headline: 'A neighborhood bakery, with a home of its own.',
    subhead: 'A simple concept to help customers find the essentials and learn how to visit or order.',
    focus: ['Create a direct home online', 'Put verified hours and location in one place', 'Offer a clear path to ask about orders'],
    palette: 'bakery',
  },
  {
    slug: 'the-dog-spa', name: 'The Dog Spa', category: 'pet',
    label: 'A calmer, clearer grooming discovery experience',
    headline: 'Good care starts with a calmer first step.',
    subhead: 'A friendly introduction that helps pet owners find the right information and next step.',
    focus: ['Make key details easier to find', 'Show the care experience with warmth', 'Keep booking options clear and current'],
    palette: 'pet',
  },
  {
    slug: 'diaz-brothers-tailors', name: 'Diaz Brothers Tailors', category: 'tailor',
    label: 'An initial tailoring-site concept',
    headline: 'A better fit starts with a clear introduction.',
    subhead: 'A considered home for the shop story, tailoring services, and a simple first inquiry.',
    focus: ['Explain the tailoring experience clearly', 'Make the consultation path easy to spot', 'Confirm all services and details before launch'],
    palette: 'tailor',
  },
];

export function getProspectConcept(slug: string | undefined) {
  return prospectConcepts.find((concept) => concept.slug === slug);
}
