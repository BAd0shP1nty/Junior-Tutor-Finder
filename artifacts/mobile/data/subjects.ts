export interface Chapter {
  id: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  darkColor: string;
  description: string;
  chapters: Record<number, Chapter[]>;
  quiz: Record<number, QuizQuestion[]>;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: 'calculator',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    darkColor: '#1D4ED8',
    description: 'Numbers, algebra, geometry & more',
    chapters: {
      6: [
        { id: 'm6-1', title: 'Integers', duration: '45 min', topics: ['Positive & negative integers', 'Number line', 'Addition & subtraction'] },
        { id: 'm6-2', title: 'Fractions & Decimals', duration: '40 min', topics: ['Types of fractions', 'Multiplication of fractions', 'Decimal operations'] },
        { id: 'm6-3', title: 'Data Handling', duration: '35 min', topics: ['Bar graphs', 'Pictographs', 'Mean, Median, Mode'] },
        { id: 'm6-4', title: 'Simple Equations', duration: '50 min', topics: ['Variables', 'Forming equations', 'Solving equations'] },
        { id: 'm6-5', title: 'Lines & Angles', duration: '40 min', topics: ['Types of angles', 'Complementary & supplementary', 'Parallel lines'] },
        { id: 'm6-6', title: 'Triangles', duration: '45 min', topics: ['Types of triangles', 'Angle sum property', 'Congruence'] },
        { id: 'm6-7', title: 'Comparing Quantities', duration: '35 min', topics: ['Ratio & proportion', 'Percentage', 'Profit & Loss'] },
      ],
      7: [
        { id: 'm7-1', title: 'Rational Numbers', duration: '45 min', topics: ['Properties of rational numbers', 'Number line representation', 'Operations'] },
        { id: 'm7-2', title: 'Linear Equations', duration: '50 min', topics: ['Equations in one variable', 'Applications', 'Word problems'] },
        { id: 'm7-3', title: 'Practical Geometry', duration: '40 min', topics: ['Construction of triangles', 'SSS, SAS, ASA, RHS congruence'] },
        { id: 'm7-4', title: 'Percentage & Profit-Loss', duration: '45 min', topics: ['Converting percentage', 'Simple interest', 'Profit, Loss, Discount'] },
        { id: 'm7-5', title: 'Algebraic Expressions', duration: '50 min', topics: ['Monomials & polynomials', 'Addition & subtraction', 'Identities'] },
        { id: 'm7-6', title: 'Exponents & Powers', duration: '35 min', topics: ['Laws of exponents', 'Negative exponents', 'Standard form'] },
        { id: 'm7-7', title: 'Symmetry & Visualising 3D', duration: '30 min', topics: ['Lines of symmetry', 'Rotational symmetry', 'Nets of 3D shapes'] },
      ],
      8: [
        { id: 'm8-1', title: 'Rational Numbers', duration: '45 min', topics: ['Properties', 'Representation on number line', 'Rational numbers between'] },
        { id: 'm8-2', title: 'Linear Equations in One Variable', duration: '50 min', topics: ['Solving equations', 'Applications', 'Reducing equations to linear form'] },
        { id: 'm8-3', title: 'Understanding Quadrilaterals', duration: '45 min', topics: ['Properties of parallelogram', 'Rhombus, rectangle, square', 'Trapezium'] },
        { id: 'm8-4', title: 'Squares & Square Roots', duration: '40 min', topics: ['Perfect squares', 'Finding square roots', 'Pythagorean triplets'] },
        { id: 'm8-5', title: 'Cubes & Cube Roots', duration: '40 min', topics: ['Perfect cubes', 'Cube roots by prime factorisation'] },
        { id: 'm8-6', title: 'Comparing Quantities', duration: '45 min', topics: ['Percent change', 'Discount, Tax, Simple & Compound Interest'] },
        { id: 'm8-7', title: 'Algebraic Expressions & Identities', duration: '55 min', topics: ['Multiplication of polynomials', 'Standard identities', 'Factorisation'] },
      ],
      9: [
        { id: 'm9-1', title: 'Number Systems', duration: '50 min', topics: ['Irrational numbers', 'Real numbers on number line', 'Laws of exponents for real numbers'] },
        { id: 'm9-2', title: 'Polynomials', duration: '55 min', topics: ['Degree of polynomial', 'Zeros of a polynomial', "Remainder theorem, Factor theorem"] },
        { id: 'm9-3', title: 'Coordinate Geometry', duration: '45 min', topics: ['Cartesian plane', 'Plotting points', 'Abscissa & ordinate'] },
        { id: 'm9-4', title: 'Linear Equations in 2 Variables', duration: '50 min', topics: ['Solutions of linear equations', 'Graphs of linear equations', 'Equations of lines parallel to axes'] },
        { id: 'm9-5', title: "Euclid's Geometry", duration: '40 min', topics: ["Euclid's definitions", 'Axioms & postulates', 'Equivalent versions of fifth postulate'] },
        { id: 'm9-6', title: 'Lines & Angles', duration: '45 min', topics: ['Pairs of angles', 'Parallel lines & transversal', 'Angle sum property of triangle'] },
        { id: 'm9-7', title: 'Triangles', duration: '50 min', topics: ['Congruence criteria', 'Properties of isosceles triangle', 'Inequalities in triangle'] },
        { id: 'm9-8', title: 'Quadrilaterals', duration: '45 min', topics: ['Properties of parallelogram', 'Mid-point theorem', 'Diagonal properties'] },
      ],
      10: [
        { id: 'm10-1', title: 'Real Numbers', duration: '50 min', topics: ["Euclid's division lemma", 'Fundamental theorem of arithmetic', 'Irrational numbers'] },
        { id: 'm10-2', title: 'Polynomials', duration: '55 min', topics: ['Relationship between zeros & coefficients', 'Division algorithm for polynomials'] },
        { id: 'm10-3', title: 'Pair of Linear Equations', duration: '60 min', topics: ['Graphical method', 'Substitution method', 'Cross-multiplication method'] },
        { id: 'm10-4', title: 'Quadratic Equations', duration: '55 min', topics: ['Standard form', 'Completing the square', 'Discriminant'] },
        { id: 'm10-5', title: 'Arithmetic Progressions', duration: '50 min', topics: ['nth term formula', 'Sum of n terms', 'Applications'] },
        { id: 'm10-6', title: 'Triangles (Similarity)', duration: '50 min', topics: ['Similar figures', 'Criteria for similarity', "Pythagoras' theorem"] },
        { id: 'm10-7', title: 'Coordinate Geometry', duration: '45 min', topics: ['Distance formula', 'Section formula', 'Area of triangle'] },
        { id: 'm10-8', title: 'Introduction to Trigonometry', duration: '60 min', topics: ['Trigonometric ratios', 'Ratios of complementary angles', 'Trigonometric identities'] },
      ],
    },
    quiz: {
      6: [
        { id: 'mq6-1', question: 'What is (-5) + (-3)?', options: ['8', '-8', '-2', '2'], correctIndex: 1 },
        { id: 'mq6-2', question: 'What is 3/4 + 1/4?', options: ['4/8', '1', '3/8', '4/4'], correctIndex: 1 },
        { id: 'mq6-3', question: 'If x + 5 = 12, then x = ?', options: ['17', '7', '60', '5'], correctIndex: 1 },
        { id: 'mq6-4', question: 'Sum of all angles in a triangle is:', options: ['180°', '360°', '90°', '270°'], correctIndex: 0 },
        { id: 'mq6-5', question: 'What is 25% of 80?', options: ['20', '25', '40', '15'], correctIndex: 0 },
      ],
      7: [
        { id: 'mq7-1', question: 'Is 0 a rational number?', options: ['Yes', 'No', 'Sometimes', 'Cannot say'], correctIndex: 0 },
        { id: 'mq7-2', question: 'Solve: 2x + 3 = 11', options: ['x=4', 'x=7', 'x=3', 'x=5'], correctIndex: 0 },
        { id: 'mq7-3', question: 'Value of 2³ is:', options: ['6', '8', '9', '12'], correctIndex: 1 },
        { id: 'mq7-4', question: 'Simple Interest on ₹1000 at 10% for 2 years:', options: ['₹100', '₹200', '₹20', '₹150'], correctIndex: 1 },
        { id: 'mq7-5', question: '(a+b)² = ?', options: ['a²+b²', 'a²+2ab+b²', 'a²-2ab+b²', '2a²+2b²'], correctIndex: 1 },
      ],
      8: [
        { id: 'mq8-1', question: 'Square root of 144 is:', options: ['12', '14', '11', '13'], correctIndex: 0 },
        { id: 'mq8-2', question: 'Cube root of 27 is:', options: ['9', '4', '3', '6'], correctIndex: 2 },
        { id: 'mq8-3', question: 'Compound interest is calculated on:', options: ['Principal only', 'Principal + Interest', 'Interest only', 'None'], correctIndex: 1 },
        { id: 'mq8-4', question: 'Opposite sides of a parallelogram are:', options: ['Equal', 'Perpendicular', 'Unequal', 'Parallel only'], correctIndex: 0 },
        { id: 'mq8-5', question: '(x+3)(x-3) = ?', options: ['x²+6x+9', 'x²-9', 'x²+9', 'x²-6x+9'], correctIndex: 1 },
      ],
      9: [
        { id: 'mq9-1', question: 'Is √2 a rational number?', options: ['Yes', 'No, it is irrational', 'Yes, it equals 1.4', 'Cannot determine'], correctIndex: 1 },
        { id: 'mq9-2', question: 'Degree of polynomial 3x² + 2x + 1 is:', options: ['1', '2', '3', '0'], correctIndex: 1 },
        { id: 'mq9-3', question: 'Point (3, 0) lies on:', options: ['Y-axis', 'X-axis', 'Origin', 'Quadrant I'], correctIndex: 1 },
        { id: 'mq9-4', question: 'Vertically opposite angles are:', options: ['Supplementary', 'Equal', 'Complementary', 'Adjacent'], correctIndex: 1 },
        { id: 'mq9-5', question: 'Sum of angles of a quadrilateral is:', options: ['180°', '270°', '360°', '540°'], correctIndex: 2 },
      ],
      10: [
        { id: 'mq10-1', question: 'HCF of 12 and 18 by Euclid\'s algorithm:', options: ['3', '6', '9', '12'], correctIndex: 1 },
        { id: 'mq10-2', question: 'Discriminant of x²-5x+6=0 is:', options: ['1', '-1', '4', '0'], correctIndex: 0 },
        { id: 'mq10-3', question: 'In AP: 2, 5, 8... the common difference is:', options: ['2', '5', '3', '1'], correctIndex: 2 },
        { id: 'mq10-4', question: 'sin 30° = ?', options: ['1', '√3/2', '1/2', '0'], correctIndex: 2 },
        { id: 'mq10-5', question: 'Distance between (0,0) and (3,4) is:', options: ['7', '5', '12', '1'], correctIndex: 1 },
      ],
    },
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'flask',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    darkColor: '#15803D',
    description: 'Physics, Chemistry & Biology',
    chapters: {
      6: [
        { id: 's6-1', title: 'Food: Where Does It Come From?', duration: '35 min', topics: ['Plant & animal sources', 'Herbivores, carnivores, omnivores', 'Food production'] },
        { id: 's6-2', title: 'Components of Food', duration: '40 min', topics: ['Carbohydrates, proteins, fats', 'Vitamins & minerals', 'Balanced diet'] },
        { id: 's6-3', title: 'Fibre to Fabric', duration: '35 min', topics: ['Natural fibres', 'Cotton & jute', 'Spinning & weaving'] },
        { id: 's6-4', title: 'Sorting Materials into Groups', duration: '30 min', topics: ['Properties of materials', 'Transparency', 'Conductors & insulators'] },
        { id: 's6-5', title: 'Changes Around Us', duration: '40 min', topics: ['Reversible & irreversible changes', 'Examples of changes', 'Physical vs chemical changes'] },
        { id: 's6-6', title: 'Living Organisms & Surroundings', duration: '45 min', topics: ['Habitat', 'Adaptations', 'Biotic & abiotic factors'] },
      ],
      7: [
        { id: 's7-1', title: 'Nutrition in Plants', duration: '40 min', topics: ['Photosynthesis', 'Chlorophyll', 'Heterotrophic & autotrophic'] },
        { id: 's7-2', title: 'Nutrition in Animals', duration: '45 min', topics: ['Digestion in humans', 'Teeth & tongue', 'Digestion in grass-eating animals'] },
        { id: 's7-3', title: 'Heat', duration: '40 min', topics: ['Temperature & thermometer', 'Conduction, convection, radiation', 'Land breeze & sea breeze'] },
        { id: 's7-4', title: 'Acids, Bases & Salts', duration: '45 min', topics: ['Properties of acids & bases', 'Indicators', 'Neutralisation'] },
        { id: 's7-5', title: 'Physical & Chemical Changes', duration: '40 min', topics: ['Physical changes', 'Chemical changes', 'Rusting & crystallisation'] },
        { id: 's7-6', title: 'Weather, Climate & Adaptations', duration: '35 min', topics: ['Weather vs climate', 'Climate zones', 'Adaptations of animals'] },
      ],
      8: [
        { id: 's8-1', title: 'Crop Production & Management', duration: '40 min', topics: ['Preparation of soil', 'Types of crops', 'Irrigation methods'] },
        { id: 's8-2', title: 'Microorganisms', duration: '45 min', topics: ['Types of microorganisms', 'Useful & harmful microbes', 'Food preservation'] },
        { id: 's8-3', title: 'Materials: Metals & Non-Metals', duration: '45 min', topics: ['Physical properties', 'Chemical properties', 'Reactivity series'] },
        { id: 's8-4', title: 'Coal & Petroleum', duration: '35 min', topics: ['Formation of fossil fuels', 'Products of coal', 'Refining of petroleum'] },
        { id: 's8-5', title: 'Combustion & Flame', duration: '40 min', topics: ['Types of combustion', 'Structure of flame', 'Fire extinguishers'] },
        { id: 's8-6', title: 'Force & Pressure', duration: '50 min', topics: ['Contact & non-contact forces', 'Pressure in fluids', 'Atmospheric pressure'] },
      ],
      9: [
        { id: 's9-1', title: 'Matter in Our Surroundings', duration: '45 min', topics: ['States of matter', 'Evaporation', 'Sublimation'] },
        { id: 's9-2', title: 'Atoms & Molecules', duration: '50 min', topics: ["Dalton's atomic theory", 'Atomic mass', 'Mole concept'] },
        { id: 's9-3', title: 'Structure of Atom', duration: '50 min', topics: ["Thomson's model", "Rutherford's model", "Bohr's model"] },
        { id: 's9-4', title: 'The Fundamental Unit of Life', duration: '45 min', topics: ['Cell structure', 'Plasma membrane', 'Organelles'] },
        { id: 's9-5', title: 'Tissues', duration: '45 min', topics: ['Plant tissues', 'Animal tissues', 'Meristematic tissue'] },
        { id: 's9-6', title: 'Motion', duration: '55 min', topics: ['Distance & displacement', 'Velocity & acceleration', 'Equations of motion'] },
        { id: 's9-7', title: 'Force & Laws of Motion', duration: '55 min', topics: ["Newton's laws", 'Inertia', 'Action & reaction'] },
      ],
      10: [
        { id: 's10-1', title: 'Chemical Reactions & Equations', duration: '50 min', topics: ['Writing chemical equations', 'Types of chemical reactions', 'Balancing equations'] },
        { id: 's10-2', title: 'Acids, Bases & Salts', duration: '50 min', topics: ['pH scale', 'Salts', 'Importance of pH'] },
        { id: 's10-3', title: 'Metals & Non-Metals', duration: '50 min', topics: ['Physical & chemical properties', 'Ionic compounds', 'Corrosion'] },
        { id: 's10-4', title: 'Carbon & Its Compounds', duration: '55 min', topics: ['Covalent bonds', 'Versatile nature of carbon', 'Soaps & detergents'] },
        { id: 's10-5', title: 'Life Processes', duration: '55 min', topics: ['Nutrition', 'Respiration', 'Transportation & excretion'] },
        { id: 's10-6', title: 'Light – Reflection & Refraction', duration: '60 min', topics: ['Laws of reflection', 'Mirrors & lenses', 'Lens formula'] },
        { id: 's10-7', title: 'Electricity', duration: '60 min', topics: ["Ohm's law", 'Resistance', 'Electric power'] },
      ],
    },
    quiz: {
      6: [
        { id: 'sq6-1', question: 'Organisms that eat both plants and animals are called:', options: ['Herbivores', 'Carnivores', 'Omnivores', 'Decomposers'], correctIndex: 2 },
        { id: 'sq6-2', question: 'Which nutrient gives us energy quickly?', options: ['Proteins', 'Fats', 'Carbohydrates', 'Vitamins'], correctIndex: 2 },
        { id: 'sq6-3', question: 'Which of these is a reversible change?', options: ['Burning paper', 'Boiling water', 'Cooking rice', 'Rusting of iron'], correctIndex: 1 },
        { id: 'sq6-4', question: 'Natural fibre obtained from plants:', options: ['Wool', 'Silk', 'Nylon', 'Cotton'], correctIndex: 3 },
        { id: 'sq6-5', question: 'Which gas is used in photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correctIndex: 1 },
      ],
      7: [
        { id: 'sq7-1', question: 'Chlorophyll is found in:', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Cell wall'], correctIndex: 2 },
        { id: 'sq7-2', question: 'Mode of heat transfer in liquids:', options: ['Conduction', 'Convection', 'Radiation', 'All of these'], correctIndex: 1 },
        { id: 'sq7-3', question: 'Litmus paper turns red in:', options: ['Base', 'Acid', 'Neutral', 'Salt'], correctIndex: 1 },
        { id: 'sq7-4', question: 'Rusting of iron is a:', options: ['Physical change', 'Chemical change', 'Reversible change', 'None'], correctIndex: 1 },
        { id: 'sq7-5', question: 'Tropical rainforests receive _____ rainfall.', options: ['Low', 'High', 'Moderate', 'No'], correctIndex: 1 },
      ],
      8: [
        { id: 'sq8-1', question: 'Which type of soil is best for cotton?', options: ['Sandy', 'Loamy', 'Black', 'Red'], correctIndex: 2 },
        { id: 'sq8-2', question: 'Bacteria are example of:', options: ['Fungi', 'Algae', 'Microorganisms', 'Protozoa'], correctIndex: 2 },
        { id: 'sq8-3', question: 'Which is a good conductor of electricity?', options: ['Sulphur', 'Copper', 'Wood', 'Plastic'], correctIndex: 1 },
        { id: 'sq8-4', question: 'Coal is formed from:', options: ['Animal remains', 'Plant remains', 'Rocks', 'Sea water'], correctIndex: 1 },
        { id: 'sq8-5', question: 'Pressure = Force / ?', options: ['Mass', 'Volume', 'Area', 'Length'], correctIndex: 2 },
      ],
      9: [
        { id: 'sq9-1', question: 'Sublimation is conversion of solid directly to:', options: ['Liquid', 'Gas', 'Plasma', 'Water'], correctIndex: 1 },
        { id: 'sq9-2', question: 'Atomic number of Carbon is:', options: ['12', '6', '14', '8'], correctIndex: 1 },
        { id: 'sq9-3', question: 'Cell membrane is made of:', options: ['Protein only', 'Lipid only', 'Protein and Lipid', 'Cellulose'], correctIndex: 2 },
        { id: 'sq9-4', question: 'Unit of acceleration is:', options: ['m/s', 'm/s²', 'km/h', 'N'], correctIndex: 1 },
        { id: 'sq9-5', question: 'Newton\'s second law relates force to:', options: ['Velocity', 'Acceleration', 'Distance', 'Time'], correctIndex: 1 },
      ],
      10: [
        { id: 'sq10-1', question: 'In a chemical equation, the reactants are on which side?', options: ['Right', 'Left', 'Both sides', 'Neither'], correctIndex: 1 },
        { id: 'sq10-2', question: 'pH of neutral solution is:', options: ['0', '7', '14', '1'], correctIndex: 1 },
        { id: 'sq10-3', question: 'Carbon atoms form how many covalent bonds?', options: ['2', '3', '4', '6'], correctIndex: 2 },
        { id: 'sq10-4', question: 'Focal length of convex lens is:', options: ['Negative', 'Positive', 'Zero', 'Infinity'], correctIndex: 1 },
        { id: 'sq10-5', question: 'Electric current is measured in:', options: ['Volts', 'Ohms', 'Watts', 'Amperes'], correctIndex: 3 },
      ],
    },
  },
  {
    id: 'english',
    name: 'English',
    icon: 'book',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    darkColor: '#6D28D9',
    description: 'Grammar, literature & writing skills',
    chapters: {
      6: [
        { id: 'e6-1', title: 'Noun & Pronoun', duration: '35 min', topics: ['Types of nouns', 'Personal pronouns', 'Reflexive pronouns'] },
        { id: 'e6-2', title: 'Adjective & Adverb', duration: '35 min', topics: ['Degrees of adjective', 'Types of adverbs', 'Position of adverbs'] },
        { id: 'e6-3', title: 'Verb & Tenses', duration: '45 min', topics: ['Types of verbs', 'Simple present, past, future', 'Continuous tenses'] },
        { id: 'e6-4', title: 'Prepositions & Conjunctions', duration: '30 min', topics: ['Types of prepositions', 'Coordinating conjunctions', 'Subordinating conjunctions'] },
        { id: 'e6-5', title: 'Reading Comprehension', duration: '40 min', topics: ['Extracting information', 'Inference questions', 'Vocabulary in context'] },
        { id: 'e6-6', title: 'Paragraph & Essay Writing', duration: '45 min', topics: ['Topic sentence', 'Supporting details', 'Conclusion'] },
      ],
      7: [
        { id: 'e7-1', title: 'Sentence Types & Structure', duration: '40 min', topics: ['Simple, compound, complex', 'Subject & predicate', 'Phrases & clauses'] },
        { id: 'e7-2', title: 'Active & Passive Voice', duration: '45 min', topics: ['Changing active to passive', 'Rules for tenses', 'Impersonal passive'] },
        { id: 'e7-3', title: 'Direct & Indirect Speech', duration: '45 min', topics: ['Rules for conversion', 'Tense changes', 'Pronoun changes'] },
        { id: 'e7-4', title: 'Articles & Determiners', duration: '35 min', topics: ['Definite & indefinite articles', 'Uses of a/an/the', 'Zero article'] },
        { id: 'e7-5', title: 'Comprehension & Summary', duration: '40 min', topics: ['Scanning & skimming', 'Note-making', 'Summarising a passage'] },
        { id: 'e7-6', title: 'Letter Writing', duration: '40 min', topics: ['Formal letters', 'Informal letters', 'Application writing'] },
      ],
      8: [
        { id: 'e8-1', title: 'Modals & Auxiliaries', duration: '40 min', topics: ['Can, could, may, might', 'Should, would, shall, will', 'Uses of modals'] },
        { id: 'e8-2', title: 'Clauses & Phrases', duration: '45 min', topics: ['Noun clause', 'Adverb clause', 'Relative clause'] },
        { id: 'e8-3', title: 'Idioms & Phrases', duration: '35 min', topics: ['Common idioms', 'Phrasal verbs', 'Proverbs'] },
        { id: 'e8-4', title: 'Reading & Literary Devices', duration: '45 min', topics: ['Simile & metaphor', 'Personification', 'Alliteration & rhyme'] },
        { id: 'e8-5', title: 'Essay & Report Writing', duration: '50 min', topics: ['Types of essays', 'Structure of report', 'Formal writing style'] },
        { id: 'e8-6', title: 'Story Writing', duration: '45 min', topics: ['Plot development', 'Character description', 'Dialogue writing'] },
      ],
      9: [
        { id: 'e9-1', title: 'Parts of Speech Advanced', duration: '45 min', topics: ['Verbals: gerund, infinitive, participle', 'Appositive phrases', 'Absolute phrases'] },
        { id: 'e9-2', title: 'Tenses Advanced', duration: '50 min', topics: ['Perfect tenses', 'Perfect continuous', 'Sequence of tenses'] },
        { id: 'e9-3', title: 'Narration Advanced', duration: '45 min', topics: ['Changing narration with questions', 'Commands & exclamations', 'Mixed narration'] },
        { id: 'e9-4', title: 'Literature: Prose', duration: '50 min', topics: ['Character analysis', 'Theme & plot', 'Author\'s message'] },
        { id: 'e9-5', title: 'Literature: Poetry', duration: '45 min', topics: ['Poetic devices', 'Rhyme scheme', 'Interpretation'] },
        { id: 'e9-6', title: 'Formal Writing', duration: '50 min', topics: ['Debate & speech', 'Notice & advertisement', 'Formal letter'] },
      ],
      10: [
        { id: 'e10-1', title: 'Grammar for Board Exams', duration: '55 min', topics: ['Gap filling', 'Sentence transformation', 'Error correction'] },
        { id: 'e10-2', title: 'Reading Skills (Board)', duration: '50 min', topics: ['Factual passages', 'Discursive passages', 'Literary passages'] },
        { id: 'e10-3', title: 'Writing Skills (Board)', duration: '55 min', topics: ['Formal letters', 'Analytical paragraphs', 'Debate & speech'] },
        { id: 'e10-4', title: 'Literature: First Flight', duration: '60 min', topics: ['Chapter-wise notes', 'Important questions', 'Character study'] },
        { id: 'e10-5', title: 'Literature: Footprints', duration: '55 min', topics: ['Supplementary reader notes', 'Moral of the story', 'Q&A practice'] },
        { id: 'e10-6', title: 'Grammar in Context', duration: '50 min', topics: ['Subject-verb agreement', 'Modals in context', 'Conditionals'] },
      ],
    },
    quiz: {
      6: [
        { id: 'eq6-1', question: 'Which of these is a proper noun?', options: ['city', 'river', 'Ganga', 'mountain'], correctIndex: 2 },
        { id: 'eq6-2', question: '"He runs fast." The word "fast" is a/an:', options: ['Adjective', 'Adverb', 'Noun', 'Verb'], correctIndex: 1 },
        { id: 'eq6-3', question: 'Choose the correct preposition: She is good ___ maths.', options: ['in', 'at', 'on', 'for'], correctIndex: 1 },
        { id: 'eq6-4', question: 'Plural of "child" is:', options: ['childs', 'childes', 'children', 'child\'s'], correctIndex: 2 },
        { id: 'eq6-5', question: '"A/An" is used before a _______ sound.', options: ['Consonant', 'Vowel', 'Plural', 'Proper noun'], correctIndex: 1 },
      ],
      7: [
        { id: 'eq7-1', question: 'Change to passive: "She sings a song."', options: ['A song is sung by her.', 'A song was sung by her.', 'A song will be sung.', 'A song has been sung.'], correctIndex: 0 },
        { id: 'eq7-2', question: 'A sentence that asks a question is called:', options: ['Declarative', 'Exclamatory', 'Interrogative', 'Imperative'], correctIndex: 2 },
        { id: 'eq7-3', question: '"He said, \'I am happy.\'" In indirect speech:', options: ['He said he was happy.', 'He said he is happy.', 'He said he will be happy.', 'He said he had been happy.'], correctIndex: 0 },
        { id: 'eq7-4', question: 'Which is the correct use of "the"?', options: ['the Sun', 'the India', 'the honesty', 'the apple'], correctIndex: 0 },
        { id: 'eq7-5', question: 'A group of words with a subject and predicate is a:', options: ['Phrase', 'Clause', 'Word', 'Sentence fragment'], correctIndex: 1 },
      ],
      8: [
        { id: 'eq8-1', question: '"I ___ finish this by 5 PM." Choose the correct modal:', options: ['can', 'shall', 'must', 'might'], correctIndex: 2 },
        { id: 'eq8-2', question: 'The word "break the ice" means:', options: ['Break glass', 'Start a conversation', 'Make someone angry', 'Be very cold'], correctIndex: 1 },
        { id: 'eq8-3', question: 'Identify the simile: ', options: ['"The lion roared"', '"She is as brave as a lion"', '"The moon smiled"', '"Stars danced"'], correctIndex: 1 },
        { id: 'eq8-4', question: 'A noun clause starts with:', options: ['While', 'Because', 'That/What/Whether', 'Although'], correctIndex: 2 },
        { id: 'eq8-5', question: 'A formal letter ends with:', options: ['With love,', 'Yours faithfully,', 'Take care,', 'Regards,'], correctIndex: 1 },
      ],
      9: [
        { id: 'eq9-1', question: '"Swimming is fun." Here "swimming" is a:', options: ['Verb', 'Gerund', 'Participle', 'Infinitive'], correctIndex: 1 },
        { id: 'eq9-2', question: 'He ___ go to school (past habit). Choose modal:', options: ['can', 'must', 'used to', 'shall'], correctIndex: 2 },
        { id: 'eq9-3', question: 'Which tense: "By 5 PM, she will have finished."', options: ['Future simple', 'Future perfect', 'Future continuous', 'Present perfect'], correctIndex: 1 },
        { id: 'eq9-4', question: '"To err is human" — "to err" is a/an:', options: ['Gerund', 'Participle', 'Infinitive', 'Modal'], correctIndex: 2 },
        { id: 'eq9-5', question: 'A speech starts with:', options: ['Respected audience', 'Dear Diary', 'To Whomsoever', 'Subject:'], correctIndex: 0 },
      ],
      10: [
        { id: 'eq10-1', question: 'Error: "He don\'t know the answer." Correction:', options: ['He doesn\'t know', 'He didn\'t know', 'He won\'t know', 'He shan\'t know'], correctIndex: 0 },
        { id: 'eq10-2', question: 'Analytical paragraph includes:', options: ['Personal opinions only', 'Data interpretation + analysis', 'Story + moral', 'Dialogue + action'], correctIndex: 1 },
        { id: 'eq10-3', question: 'Conditional type II is used for:', options: ['Real conditions', 'Unreal/imaginary conditions', 'Past facts', 'Future certainty'], correctIndex: 1 },
        { id: 'eq10-4', question: 'In a debate, a rebuttal means:', options: ['Agreeing with opponent', 'Counter-arguing opponent\'s points', 'Giving a summary', 'Asking a question'], correctIndex: 1 },
        { id: 'eq10-5', question: 'Which is NOT a literary device?', options: ['Metaphor', 'Simile', 'Allegory', 'Acronym'], correctIndex: 3 },
      ],
    },
  },
  {
    id: 'social',
    name: 'Social Studies',
    icon: 'globe',
    color: '#D97706',
    bgColor: '#FEF3C7',
    darkColor: '#B45309',
    description: 'History, Geography & Civics',
    chapters: {
      6: [
        { id: 'ss6-1', title: 'What, Where, How & When?', duration: '30 min', topics: ['Sources of history', 'Ancient India', 'Archaeological sources'] },
        { id: 'ss6-2', title: 'Globe: Latitudes & Longitudes', duration: '40 min', topics: ['Latitudes', 'Longitudes', 'International Date Line'] },
        { id: 'ss6-3', title: 'Understanding Diversity', duration: '35 min', topics: ['Unity in diversity', 'Prejudice & discrimination', 'Equality'] },
        { id: 'ss6-4', title: 'On the Trail of Earliest People', duration: '35 min', topics: ['Hunter-gatherers', 'Tools & fire', 'Cave paintings'] },
        { id: 'ss6-5', title: 'Motions of the Earth', duration: '40 min', topics: ['Rotation', 'Revolution', 'Seasons'] },
        { id: 'ss6-6', title: 'Our Panchayati Raj', duration: '35 min', topics: ['Village Panchayat', 'Functions of gram sabha', 'Gram panchayat'] },
      ],
      7: [
        { id: 'ss7-1', title: 'Tracing Changes Through a Thousand Years', duration: '40 min', topics: ['Historical records', 'Cartography', 'Changes in India'] },
        { id: 'ss7-2', title: 'Inside Our Earth', duration: '40 min', topics: ['Interior of earth', 'Rocks & minerals', 'Types of rocks'] },
        { id: 'ss7-3', title: 'On Equality', duration: '35 min', topics: ['Democratic equality', 'Gender equality', 'Dignity'] },
        { id: 'ss7-4', title: 'The Sultanate Period', duration: '45 min', topics: ['Delhi Sultanate', 'Mongol invasions', 'Administration'] },
        { id: 'ss7-5', title: 'Natural Vegetation & Wildlife', duration: '40 min', topics: ['Tropical forests', 'Temperate forests', 'Wildlife'] },
        { id: 'ss7-6', title: 'Role of Government in Health', duration: '35 min', topics: ['Public health', 'Private health', 'Right to health'] },
      ],
      8: [
        { id: 'ss8-1', title: 'Resources', duration: '40 min', topics: ['Types of resources', 'Natural resources', 'Human-made resources'] },
        { id: 'ss8-2', title: 'The Indian Constitution', duration: '45 min', topics: ['Making of the constitution', 'Fundamental rights', 'Directive principles'] },
        { id: 'ss8-3', title: 'How, When & Where (1857 Revolt)', duration: '45 min', topics: ['Causes of revolt', 'Events of 1857', 'Aftermath'] },
        { id: 'ss8-4', title: 'Agriculture', duration: '40 min', topics: ['Types of farming', 'Cropping pattern', 'Agricultural development'] },
        { id: 'ss8-5', title: 'Parliament & Making of Laws', duration: '40 min', topics: ['Structure of parliament', 'Making a law', 'Lok Sabha vs Rajya Sabha'] },
        { id: 'ss8-6', title: 'Colonialism & the City', duration: '40 min', topics: ['British rule in cities', 'Planning of New Delhi', 'Bombay changes'] },
      ],
      9: [
        { id: 'ss9-1', title: 'The French Revolution', duration: '50 min', topics: ['Causes', 'Events of 1789', 'Impact on Europe'] },
        { id: 'ss9-2', title: 'Physical Features of India', duration: '45 min', topics: ['Himalayan mountains', 'Northern plains', 'Peninsular plateau'] },
        { id: 'ss9-3', title: 'Democracy & the Constitution', duration: '45 min', topics: ['Democracy in India', 'Features of Indian constitution', 'Fundamental rights'] },
        { id: 'ss9-4', title: 'Nazism & the Rise of Hitler', duration: '50 min', topics: ['Weimar Republic', 'Hitler\'s rise', 'Holocaust'] },
        { id: 'ss9-5', title: 'Climate of India', duration: '45 min', topics: ['Factors affecting climate', 'Monsoon', 'Seasons in India'] },
        { id: 'ss9-6', title: 'Poverty as a Challenge', duration: '40 min', topics: ['Poverty line', 'Causes & effects', 'Government schemes'] },
      ],
      10: [
        { id: 'ss10-1', title: 'The Rise of Nationalism in Europe', duration: '55 min', topics: ['Concept of nationalism', 'Nation-states in Europe', 'Balkans problem'] },
        { id: 'ss10-2', title: 'Resources & Development', duration: '50 min', topics: ['Classification of resources', 'Resource planning', 'Land use pattern'] },
        { id: 'ss10-3', title: 'Power Sharing', duration: '45 min', topics: ['Belgium & Sri Lanka', 'Forms of power sharing', 'Federalism'] },
        { id: 'ss10-4', title: 'Nationalism in India', duration: '55 min', topics: ['Non-Cooperation Movement', 'Civil Disobedience Movement', 'Quit India Movement'] },
        { id: 'ss10-5', title: 'Forest & Wildlife Resources', duration: '45 min', topics: ['Types of forests', 'Causes of depletion', 'Conservation'] },
        { id: 'ss10-6', title: 'Gender, Religion & Caste', duration: '45 min', topics: ['Sexual division of labour', 'Communalism', 'Caste & politics'] },
        { id: 'ss10-7', title: 'Development', duration: '50 min', topics: ['Development vs growth', 'GDP', 'Human Development Index'] },
      ],
    },
    quiz: {
      6: [
        { id: 'ssq6-1', question: 'The Tropic of Cancer passes through:', options: ['Only India', 'India & other countries', 'Only Africa', 'Only Australia'], correctIndex: 1 },
        { id: 'ssq6-2', question: 'Who were hunter-gatherers?', options: ['People who farmed', 'Early humans who hunted animals & gathered food', 'Traders', 'Soldiers'], correctIndex: 1 },
        { id: 'ssq6-3', question: 'The Earth rotates from:', options: ['East to West', 'West to East', 'North to South', 'South to North'], correctIndex: 1 },
        { id: 'ssq6-4', question: 'Panchayati Raj is related to:', options: ['City government', 'State government', 'Village/local self-government', 'Central government'], correctIndex: 2 },
        { id: 'ssq6-5', question: 'International Date Line is at:', options: ['0° longitude', '180° longitude', '90° east', '45° west'], correctIndex: 1 },
      ],
      7: [
        { id: 'ssq7-1', question: 'Igneous rocks are formed from:', options: ['Sediments', 'Pressure', 'Molten magma', 'River deposits'], correctIndex: 2 },
        { id: 'ssq7-2', question: 'The Delhi Sultanate was established in:', options: ['1000 AD', '1206 AD', '1526 AD', '1857 AD'], correctIndex: 1 },
        { id: 'ssq7-3', question: 'Tropical evergreen forests are found near:', options: ['Poles', 'Equator', 'Deserts', 'Himalayan region'], correctIndex: 1 },
        { id: 'ssq7-4', question: 'Gender equality means:', options: ['Women only', 'Equal rights for all genders', 'Men only', 'None'], correctIndex: 1 },
        { id: 'ssq7-5', question: 'The innermost layer of Earth is called:', options: ['Crust', 'Mantle', 'Core', 'Lithosphere'], correctIndex: 2 },
      ],
      8: [
        { id: 'ssq8-1', question: 'The First War of Independence was in:', options: ['1757', '1857', '1947', '1965'], correctIndex: 1 },
        { id: 'ssq8-2', question: 'Fundamental Rights are in Part ___ of Constitution:', options: ['I', 'II', 'III', 'IV'], correctIndex: 2 },
        { id: 'ssq8-3', question: 'Lok Sabha has how many elected members?', options: ['250', '543', '552', '600'], correctIndex: 1 },
        { id: 'ssq8-4', question: 'Which type of farming uses chemical fertilisers?', options: ['Organic farming', 'Subsistence farming', 'Commercial farming', 'Mixed farming'], correctIndex: 2 },
        { id: 'ssq8-5', question: 'A natural resource is:', options: ['Car', 'Coal', 'Plastic', 'Computer'], correctIndex: 1 },
      ],
      9: [
        { id: 'ssq9-1', question: 'The French Revolution occurred in:', options: ['1776', '1789', '1804', '1848'], correctIndex: 1 },
        { id: 'ssq9-2', question: 'The Deccan Plateau is part of:', options: ['Northern Plains', 'Peninsular Plateau', 'Eastern Ghats', 'Western Ghats'], correctIndex: 1 },
        { id: 'ssq9-3', question: 'Hitler came to power in Germany in:', options: ['1929', '1933', '1939', '1945'], correctIndex: 1 },
        { id: 'ssq9-4', question: 'South-West monsoon enters India from:', options: ['Arabian Sea only', 'Bay of Bengal only', 'Both Arabian Sea & Bay of Bengal', 'Indian Ocean directly'], correctIndex: 2 },
        { id: 'ssq9-5', question: 'The poverty line in India measures:', options: ['Wealth of the rich', 'Minimum income needed for basic needs', 'Population growth', 'GDP per capita'], correctIndex: 1 },
      ],
      10: [
        { id: 'ssq10-1', question: 'Non-Cooperation Movement was launched in:', options: ['1919', '1920', '1930', '1942'], correctIndex: 1 },
        { id: 'ssq10-2', question: 'Belgium has two main communities:', options: ['French & German', 'Dutch & French', 'Flemish & Walloon', 'Belgian & Flemish'], correctIndex: 2 },
        { id: 'ssq10-3', question: 'Human Development Index was created by:', options: ['World Bank', 'UNDP', 'IMF', 'WHO'], correctIndex: 1 },
        { id: 'ssq10-4', question: 'Federalism means power is shared between:', options: ['Centre & states', 'President & PM', 'Army & Judiciary', 'Legislature & Executive'], correctIndex: 0 },
        { id: 'ssq10-5', question: 'GDP stands for:', options: ['Gross Domestic Policy', 'Gross Domestic Product', 'General Domestic Product', 'Global Development Plan'], correctIndex: 1 },
      ],
    },
  },
  {
    id: 'hindi',
    name: 'Hindi',
    icon: 'language',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    darkColor: '#B91C1C',
    description: 'व्याकरण, साहित्य और लेखन',
    chapters: {
      6: [
        { id: 'h6-1', title: 'संज्ञा और सर्वनाम', duration: '35 min', topics: ['संज्ञा के भेद', 'सर्वनाम के प्रकार', 'वाक्य में प्रयोग'] },
        { id: 'h6-2', title: 'क्रिया और काल', duration: '40 min', topics: ['सकर्मक-अकर्मक क्रिया', 'भूत, वर्तमान, भविष्य काल', 'क्रिया के रूप'] },
        { id: 'h6-3', title: 'विशेषण', duration: '35 min', topics: ['गुणवाचक', 'संख्यावाचक', 'परिमाणवाचक'] },
        { id: 'h6-4', title: 'पत्र लेखन', duration: '40 min', topics: ['औपचारिक पत्र', 'अनौपचारिक पत्र', 'पत्र के अंग'] },
        { id: 'h6-5', title: 'वसंत पाठ्यक्रम', duration: '45 min', topics: ['पाठ का सारांश', 'मुख्य पात्र', 'प्रश्नोत्तर'] },
        { id: 'h6-6', title: 'निबंध लेखन', duration: '40 min', topics: ['प्रस्तावना', 'विषय विस्तार', 'उपसंहार'] },
      ],
      7: [
        { id: 'h7-1', title: 'संधि और समास', duration: '45 min', topics: ['स्वर संधि', 'व्यंजन संधि', 'द्वंद्व व तत्पुरुष समास'] },
        { id: 'h7-2', title: 'मुहावरे और लोकोक्तियाँ', duration: '35 min', topics: ['मुहावरों का प्रयोग', 'लोकोक्तियों का अर्थ', 'वाक्यों में उपयोग'] },
        { id: 'h7-3', title: 'काव्य-बोध', duration: '45 min', topics: ['रस', 'छंद', 'अलंकार'] },
        { id: 'h7-4', title: 'महाभारत का काल – वसंत', duration: '40 min', topics: ['पाठ सारांश', 'पात्र विश्लेषण', 'महत्त्वपूर्ण प्रश्न'] },
        { id: 'h7-5', title: 'अपठित गद्यांश', duration: '40 min', topics: ['गद्यांश पढ़ना', 'प्रश्नों के उत्तर', 'शीर्षक देना'] },
        { id: 'h7-6', title: 'अनुच्छेद लेखन', duration: '40 min', topics: ['विषय चुनाव', 'भाषा शैली', 'विचारों का क्रम'] },
      ],
      8: [
        { id: 'h8-1', title: 'रस और अलंकार', duration: '45 min', topics: ['शृंगार, वीर, करुण रस', 'उपमा, रूपक, अनुप्रास', 'उदाहरण सहित पहचान'] },
        { id: 'h8-2', title: 'वाच्य परिवर्तन', duration: '40 min', topics: ['कर्तृवाच्य', 'कर्मवाच्य', 'भाववाच्य'] },
        { id: 'h8-3', title: 'वसंत – गद्य पाठ', duration: '50 min', topics: ['पाठ सारांश', 'प्रश्नोत्तर', 'शब्दार्थ'] },
        { id: 'h8-4', title: 'वसंत – पद्य पाठ', duration: '50 min', topics: ['कविता व्याख्या', 'काव्य-सौंदर्य', 'प्रश्नोत्तर'] },
        { id: 'h8-5', title: 'विज्ञापन लेखन', duration: '35 min', topics: ['विज्ञापन के तत्त्व', 'भाषा', 'उदाहरण'] },
        { id: 'h8-6', title: 'औपचारिक संदेश व आवेदन पत्र', duration: '40 min', topics: ['आवेदन पत्र का प्रारूप', 'उचित भाषा', 'व्यावहारिक उदाहरण'] },
      ],
      9: [
        { id: 'h9-1', title: 'शब्द-भंडार और शब्द रचना', duration: '45 min', topics: ['उपसर्ग', 'प्रत्यय', 'समास विग्रह'] },
        { id: 'h9-2', title: 'कृतिका – गद्य', duration: '55 min', topics: ['पाठ विश्लेषण', 'मूल्यपरक प्रश्न', 'सारांश'] },
        { id: 'h9-3', title: 'क्षितिज – पद्य', duration: '55 min', topics: ['कविता व्याख्या', 'भाव-सौंदर्य', 'प्रश्नोत्तर'] },
        { id: 'h9-4', title: 'व्याकरण – बोर्ड स्तर', duration: '50 min', topics: ['अनुच्छेद', 'संवाद लेखन', 'अपठित बोध'] },
        { id: 'h9-5', title: 'रचनात्मक लेखन', duration: '45 min', topics: ['निबंध', 'पत्र', 'सूचना लेखन'] },
      ],
      10: [
        { id: 'h10-1', title: 'क्षितिज भाग 2 – पद्य', duration: '60 min', topics: ['सूर, तुलसी, कबीर', 'मीरा, मैथिलीशरण', 'आधुनिक कवि'] },
        { id: 'h10-2', title: 'क्षितिज भाग 2 – गद्य', duration: '60 min', topics: ['पाठ सारांश', 'लेखक परिचय', 'प्रश्नोत्तर'] },
        { id: 'h10-3', title: 'कृतिका भाग 2', duration: '55 min', topics: ['उपन्यास-अंश', 'मुख्य विचार', 'प्रश्नोत्तर'] },
        { id: 'h10-4', title: 'व्याकरण (बोर्ड)', duration: '55 min', topics: ['पद परिचय', 'रचना के आधार पर वाक्य', 'अर्थ के आधार पर वाक्य'] },
        { id: 'h10-5', title: 'लेखन कौशल (बोर्ड)', duration: '55 min', topics: ['विविध विषयों पर निबंध', 'औपचारिक पत्र', 'संदेश व विज्ञापन'] },
      ],
    },
    quiz: {
      6: [
        { id: 'hq6-1', question: '"राम" किस प्रकार की संज्ञा है?', options: ['जातिवाचक', 'व्यक्तिवाचक', 'भाववाचक', 'समूहवाचक'], correctIndex: 1 },
        { id: 'hq6-2', question: '"मैं", "तुम", "वह" — ये क्या हैं?', options: ['संज्ञा', 'विशेषण', 'सर्वनाम', 'क्रिया'], correctIndex: 2 },
        { id: 'hq6-3', question: 'भूतकाल का उदाहरण:', options: ['वह खाएगा', 'वह खा रहा है', 'उसने खाया', 'वह खाता है'], correctIndex: 2 },
        { id: 'hq6-4', question: '"सुंदर फूल" — "सुंदर" क्या है?', options: ['संज्ञा', 'क्रिया', 'विशेषण', 'सर्वनाम'], correctIndex: 2 },
        { id: 'hq6-5', question: 'औपचारिक पत्र किसे लिखा जाता है?', options: ['मित्र को', 'माता-पिता को', 'प्रधानाचार्य को', 'भाई को'], correctIndex: 2 },
      ],
      7: [
        { id: 'hq7-1', question: '"विद्या + आलय" की संधि है:', options: ['विद्यालय', 'विद्यालाय', 'विद्यआलय', 'विद्यालोय'], correctIndex: 0 },
        { id: 'hq7-2', question: '"आँख का अंधा" मुहावरे का अर्थ:', options: ['नेत्रहीन', 'मूर्ख व्यक्ति', 'तेज नजर', 'दयालु'], correctIndex: 1 },
        { id: 'hq7-3', question: 'उपमा अलंकार में क्या होता है?', options: ['भेद', 'समानता का बोध', 'विरोध', 'अतिशयोक्ति'], correctIndex: 1 },
        { id: 'hq7-4', question: '"राम-श्याम" किस समास का उदाहरण है?', options: ['तत्पुरुष', 'कर्मधारय', 'द्वंद्व', 'अव्ययीभाव'], correctIndex: 2 },
        { id: 'hq7-5', question: 'गद्यांश में "शीर्षक" का अर्थ है:', options: ['लेखक का नाम', 'पाठ का अंत', 'पाठ का मुख्य नाम', 'कठिन शब्द'], correctIndex: 2 },
      ],
      8: [
        { id: 'hq8-1', question: 'करुण रस का स्थायी भाव है:', options: ['रति', 'शोक', 'उत्साह', 'हास'], correctIndex: 1 },
        { id: 'hq8-2', question: '"वह काम किया जाता है" — यह कौन-सा वाच्य है?', options: ['कर्तृवाच्य', 'कर्मवाच्य', 'भाववाच्य', 'क्रियावाच्य'], correctIndex: 1 },
        { id: 'hq8-3', question: '"उपमा" अलंकार है जब:', options: ['दो चीजों में अंतर हो', 'समानता बताई जाए', 'अतिशयोक्ति हो', 'विरोध दिखे'], correctIndex: 1 },
        { id: 'hq8-4', question: 'विज्ञापन में सबसे ज़रूरी क्या होता है?', options: ['लंबा वाक्य', 'आकर्षक नारा', 'कठिन भाषा', 'केवल चित्र'], correctIndex: 1 },
        { id: 'hq8-5', question: '"जंगल में मोर नाचा, किसने देखा" — यह क्या है?', options: ['मुहावरा', 'लोकोक्ति', 'श्लोक', 'अलंकार'], correctIndex: 1 },
      ],
      9: [
        { id: 'hq9-1', question: '"अभि + मान" = ?', options: ['अभिमान', 'अभीमान', 'अभिमन', 'अभिमाण'], correctIndex: 0 },
        { id: 'hq9-2', question: 'उपसर्ग "अन्" किस शब्द में है?', options: ['अनुभव', 'अन्याय', 'अनुकूल', 'अनुरोध'], correctIndex: 1 },
        { id: 'hq9-3', question: '"पत्र-पत्रिका" कौन-सा समास है?', options: ['तत्पुरुष', 'द्विगु', 'द्वंद्व', 'बहुव्रीहि'], correctIndex: 2 },
        { id: 'hq9-4', question: 'संवाद लेखन में कितने पात्र होते हैं?', options: ['एक', 'कम से कम दो', 'पाँच', 'सात'], correctIndex: 1 },
        { id: 'hq9-5', question: 'काव्य-सौंदर्य में "भाव-सौंदर्य" का अर्थ है:', options: ['शब्दों की सुंदरता', 'भावनाओं की अभिव्यक्ति', 'लय व छंद', 'अलंकार'], correctIndex: 1 },
      ],
      10: [
        { id: 'hq10-1', question: 'कबीर किस काल के कवि हैं?', options: ['आदिकाल', 'भक्तिकाल', 'रीतिकाल', 'आधुनिककाल'], correctIndex: 1 },
        { id: 'hq10-2', question: '"पद परिचय" में क्या बताया जाता है?', options: ['शब्द का इतिहास', 'शब्द का व्याकरणिक परिचय', 'शब्द का अर्थ', 'शब्द की उत्पत्ति'], correctIndex: 1 },
        { id: 'hq10-3', question: 'संयुक्त वाक्य में क्या होता है?', options: ['एक उपवाक्य', 'दो स्वतंत्र उपवाक्य', 'मुख्य व आश्रित उपवाक्य', 'कोई उपवाक्य नहीं'], correctIndex: 1 },
        { id: 'hq10-4', question: 'मीराबाई किस देवता की भक्त थीं?', options: ['शिव', 'राम', 'कृष्ण', 'ब्रह्मा'], correctIndex: 2 },
        { id: 'hq10-5', question: 'बोर्ड परीक्षा में निबंध कितने शब्दों का होता है?', options: ['50-80', '100-120', '150-200', '200-300'], correctIndex: 3 },
      ],
    },
  },
  {
    id: 'computer',
    name: 'Computer Science',
    icon: 'laptop',
    color: '#0F766E',
    bgColor: '#CCFBF1',
    darkColor: '#0D9488',
    description: 'ICT, programming & digital skills',
    chapters: {
      6: [
        { id: 'c6-1', title: 'Introduction to Computers', duration: '30 min', topics: ['History of computers', 'Parts of computer', 'Input & output devices'] },
        { id: 'c6-2', title: 'Hardware & Software', duration: '35 min', topics: ['Types of hardware', 'System & application software', 'Examples of software'] },
        { id: 'c6-3', title: 'MS Paint & MS Word Basics', duration: '40 min', topics: ['Drawing tools in Paint', 'Creating a document in Word', 'Formatting text'] },
        { id: 'c6-4', title: 'Internet Basics', duration: '35 min', topics: ['What is internet', 'Web browsing', 'Email basics'] },
        { id: 'c6-5', title: 'Scratch Programming', duration: '45 min', topics: ['Introduction to Scratch', 'Sprites & backdrops', 'Creating simple animations'] },
      ],
      7: [
        { id: 'c7-1', title: 'Memory & Storage Devices', duration: '35 min', topics: ['RAM & ROM', 'Hard disk & USB drives', 'Capacity units'] },
        { id: 'c7-2', title: 'Operating Systems', duration: '40 min', topics: ['Functions of OS', 'Windows vs Linux', 'Desktop management'] },
        { id: 'c7-3', title: 'MS Word Advanced', duration: '45 min', topics: ['Tables & images', 'Headers & footers', 'Mail merge basics'] },
        { id: 'c7-4', title: 'MS Excel Basics', duration: '45 min', topics: ['Spreadsheet introduction', 'Formulas & functions', 'Charts & graphs'] },
        { id: 'c7-5', title: 'Cyber Safety', duration: '35 min', topics: ['Internet safety', 'Passwords', 'Cyberbullying & privacy'] },
      ],
      8: [
        { id: 'c8-1', title: 'Number Systems', duration: '40 min', topics: ['Binary, Octal, Hexadecimal', 'Conversion methods', 'Uses in computing'] },
        { id: 'c8-2', title: 'HTML Basics', duration: '50 min', topics: ['Structure of HTML page', 'Common tags', 'Creating a simple webpage'] },
        { id: 'c8-3', title: 'MS Excel Advanced', duration: '50 min', topics: ['Conditional formatting', 'VLOOKUP, IF functions', 'Data analysis'] },
        { id: 'c8-4', title: 'Database Basics (MS Access)', duration: '45 min', topics: ['Tables & fields', 'Primary key', 'Basic queries'] },
        { id: 'c8-5', title: 'Networking Concepts', duration: '40 min', topics: ['Types of networks', 'LAN, WAN, MAN', 'Network devices'] },
      ],
      9: [
        { id: 'c9-1', title: 'Python Programming – Basics', duration: '55 min', topics: ['Variables & data types', 'Input/output', 'Operators & expressions'] },
        { id: 'c9-2', title: 'Python – Control Flow', duration: '55 min', topics: ['if-else statements', 'for & while loops', 'Nested structures'] },
        { id: 'c9-3', title: 'Python – Lists & Strings', duration: '50 min', topics: ['List operations', 'String methods', 'Slicing & indexing'] },
        { id: 'c9-4', title: 'Web Technologies', duration: '50 min', topics: ['HTML structure', 'CSS styling basics', 'How websites work'] },
        { id: 'c9-5', title: 'Data Representation', duration: '45 min', topics: ['Binary numbers', 'ASCII code', 'Image & sound representation'] },
      ],
      10: [
        { id: 'c10-1', title: 'Python – Functions', duration: '55 min', topics: ['Defining functions', 'Parameters & return values', 'Recursion basics'] },
        { id: 'c10-2', title: 'Python – Dictionaries & Tuples', duration: '55 min', topics: ['Dictionary operations', 'Tuple vs list', 'Practical programs'] },
        { id: 'c10-3', title: 'Python – File Handling', duration: '50 min', topics: ['Reading & writing files', 'File modes', 'Exception handling'] },
        { id: 'c10-4', title: 'SQL Basics', duration: '55 min', topics: ['Creating tables', 'SELECT queries', 'WHERE, ORDER BY, GROUP BY'] },
        { id: 'c10-5', title: 'Networking & Security', duration: '50 min', topics: ['TCP/IP model', 'Encryption', 'Cybersecurity threats'] },
        { id: 'c10-6', title: 'Societal Impacts of IT', duration: '45 min', topics: ['Digital divide', 'E-governance', 'Ethical issues in IT'] },
      ],
    },
    quiz: {
      6: [
        { id: 'cq6-1', question: 'Which is an input device?', options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'], correctIndex: 2 },
        { id: 'cq6-2', question: 'MS Word is an example of:', options: ['Hardware', 'System software', 'Application software', 'Operating system'], correctIndex: 2 },
        { id: 'cq6-3', question: 'WWW stands for:', options: ['World Wide Web', 'World Wide Word', 'World Web Work', 'Wide World Wire'], correctIndex: 0 },
        { id: 'cq6-4', question: 'In Scratch, a "sprite" is:', options: ['Background', 'A character/object', 'A sound', 'A command'], correctIndex: 1 },
        { id: 'cq6-5', question: 'Which stores data permanently?', options: ['RAM', 'Cache', 'Hard Disk', 'CPU'], correctIndex: 2 },
      ],
      7: [
        { id: 'cq7-1', question: 'RAM stands for:', options: ['Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory'], correctIndex: 1 },
        { id: 'cq7-2', question: '1 GB = ? MB', options: ['100 MB', '512 MB', '1000 MB', '1024 MB'], correctIndex: 3 },
        { id: 'cq7-3', question: 'Which is the correct Excel formula for sum?', options: ['=ADD(A1:A5)', '=SUM(A1:A5)', '=TOTAL(A1:A5)', '=PLUS(A1:A5)'], correctIndex: 1 },
        { id: 'cq7-4', question: 'A strong password should have:', options: ['Only numbers', 'Only letters', 'Mix of letters, numbers & symbols', 'Your name'], correctIndex: 2 },
        { id: 'cq7-5', question: 'The brain of a computer is:', options: ['RAM', 'Hard Disk', 'CPU', 'Monitor'], correctIndex: 2 },
      ],
      8: [
        { id: 'cq8-1', question: 'Binary number 1010 in decimal is:', options: ['8', '10', '12', '14'], correctIndex: 1 },
        { id: 'cq8-2', question: 'Which HTML tag creates a paragraph?', options: ['<h1>', '<div>', '<p>', '<br>'], correctIndex: 2 },
        { id: 'cq8-3', question: 'LAN stands for:', options: ['Large Area Network', 'Local Area Network', 'Long Area Network', 'Limited Access Network'], correctIndex: 1 },
        { id: 'cq8-4', question: 'Primary key in a database is:', options: ['Unique identifier for each record', 'First column', 'Last column', 'Password'], correctIndex: 0 },
        { id: 'cq8-5', question: 'VLOOKUP is used for:', options: ['Formatting cells', 'Looking up values in a table', 'Drawing charts', 'Sorting data'], correctIndex: 1 },
      ],
      9: [
        { id: 'cq9-1', question: 'Which data type stores text in Python?', options: ['int', 'float', 'str', 'bool'], correctIndex: 2 },
        { id: 'cq9-2', question: 'Output of: print(2 ** 3) in Python:', options: ['6', '8', '9', '5'], correctIndex: 1 },
        { id: 'cq9-3', question: 'What does a "for" loop do?', options: ['Runs once only', 'Repeats code for each item in a sequence', 'Asks user for input', 'Defines a function'], correctIndex: 1 },
        { id: 'cq9-4', question: 'In Python, list index starts at:', options: ['1', '0', '-1', '2'], correctIndex: 1 },
        { id: 'cq9-5', question: 'ASCII stands for:', options: ['American Standard Code for Information Interchange', 'Automated System Code for Internet', 'American System Code for Information', 'Automated Standard Code for Internet Interface'], correctIndex: 0 },
      ],
      10: [
        { id: 'cq10-1', question: 'Which keyword defines a function in Python?', options: ['function', 'def', 'func', 'define'], correctIndex: 1 },
        { id: 'cq10-2', question: 'SQL SELECT statement is used to:', options: ['Delete records', 'Update records', 'Retrieve records', 'Create tables'], correctIndex: 2 },
        { id: 'cq10-3', question: 'Python dictionary stores data as:', options: ['List', 'Key-value pairs', 'Tuples', 'Indexed items'], correctIndex: 1 },
        { id: 'cq10-4', question: 'TCP/IP is a:', options: ['Programming language', 'Communication protocol', 'Operating system', 'Database'], correctIndex: 1 },
        { id: 'cq10-5', question: 'File handling mode "r" in Python means:', options: ['Read', 'Write', 'Append', 'Run'], correctIndex: 0 },
      ],
    },
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getChaptersForClass(subject: Subject, cls: number): Chapter[] {
  return subject.chapters[cls] ?? subject.chapters[6];
}

export function getQuizForClass(subject: Subject, cls: number): QuizQuestion[] {
  return subject.quiz[cls] ?? subject.quiz[6];
}

export const CLASSES = [6, 7, 8, 9, 10];
