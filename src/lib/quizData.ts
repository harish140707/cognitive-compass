export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "medium" | "hard";
}

export const quizBank: QuizQuestion[] = [
  // Algebra
  { id: "alg-1", topic: "Algebra", question: "Solve: 2x + 5 = 13", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correct: 1, difficulty: "easy" },
  { id: "alg-2", topic: "Algebra", question: "Factor: x² - 9", options: ["(x+3)(x-3)", "(x-3)²", "(x+9)(x-1)", "(x+3)²"], correct: 0, difficulty: "easy" },
  { id: "alg-3", topic: "Algebra", question: "Solve: x² - 5x + 6 = 0", options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 3, 4"], correct: 0, difficulty: "medium" },
  { id: "alg-4", topic: "Algebra", question: "Simplify: (3x²y)(4xy³)", options: ["7x³y⁴", "12x³y⁴", "12x²y³", "7x²y⁴"], correct: 1, difficulty: "medium" },
  { id: "alg-5", topic: "Algebra", question: "If f(x) = 2x² - 3x + 1, find f(2)", options: ["3", "5", "7", "9"], correct: 0, difficulty: "hard" },
  { id: "alg-6", topic: "Algebra", question: "Solve the system: x + y = 7, x - y = 3", options: ["x=5, y=2", "x=4, y=3", "x=6, y=1", "x=3, y=4"], correct: 0, difficulty: "medium" },
  { id: "alg-7", topic: "Algebra", question: "What is the slope of 3x - 2y = 6?", options: ["3/2", "-3/2", "2/3", "-2/3"], correct: 0, difficulty: "medium" },
  { id: "alg-8", topic: "Algebra", question: "Expand: (x + 4)²", options: ["x² + 8x + 16", "x² + 4x + 16", "x² + 16", "x² + 8x + 8"], correct: 0, difficulty: "easy" },

  // Geometry
  { id: "geo-1", topic: "Geometry", question: "Area of a circle with radius 5?", options: ["25π", "10π", "15π", "20π"], correct: 0, difficulty: "easy" },
  { id: "geo-2", topic: "Geometry", question: "Sum of interior angles of a hexagon?", options: ["540°", "720°", "900°", "360°"], correct: 1, difficulty: "medium" },
  { id: "geo-3", topic: "Geometry", question: "Hypotenuse of a right triangle with legs 3 and 4?", options: ["5", "6", "7", "8"], correct: 0, difficulty: "easy" },
  { id: "geo-4", topic: "Geometry", question: "Volume of a sphere with radius 3?", options: ["36π", "24π", "18π", "12π"], correct: 0, difficulty: "medium" },
  { id: "geo-5", topic: "Geometry", question: "Two angles of a triangle are 60° and 80°. Third angle?", options: ["40°", "50°", "60°", "70°"], correct: 0, difficulty: "easy" },
  { id: "geo-6", topic: "Geometry", question: "Perimeter of a rectangle 8 × 5?", options: ["26", "40", "13", "80"], correct: 0, difficulty: "easy" },
  { id: "geo-7", topic: "Geometry", question: "A regular polygon has interior angles of 108°. How many sides?", options: ["5", "6", "7", "8"], correct: 0, difficulty: "hard" },
  { id: "geo-8", topic: "Geometry", question: "Distance between (0,0) and (6,8)?", options: ["10", "12", "8", "14"], correct: 0, difficulty: "medium" },

  // Calculus
  { id: "cal-1", topic: "Calculus", question: "Derivative of x³?", options: ["3x²", "3x", "x²", "2x³"], correct: 0, difficulty: "easy" },
  { id: "cal-2", topic: "Calculus", question: "∫2x dx = ?", options: ["x² + C", "2x² + C", "x + C", "x²/2 + C"], correct: 0, difficulty: "easy" },
  { id: "cal-3", topic: "Calculus", question: "Derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"], correct: 0, difficulty: "medium" },
  { id: "cal-4", topic: "Calculus", question: "lim (x→0) sin(x)/x = ?", options: ["1", "0", "∞", "-1"], correct: 0, difficulty: "medium" },
  { id: "cal-5", topic: "Calculus", question: "Derivative of eˣ?", options: ["eˣ", "xeˣ", "eˣ⁻¹", "1/eˣ"], correct: 0, difficulty: "easy" },
  { id: "cal-6", topic: "Calculus", question: "∫ from 0 to 1 of x² dx = ?", options: ["1/3", "1/2", "1/4", "1"], correct: 0, difficulty: "medium" },
  { id: "cal-7", topic: "Calculus", question: "Derivative of ln(x)?", options: ["1/x", "x", "ln(x)", "1/x²"], correct: 0, difficulty: "medium" },
  { id: "cal-8", topic: "Calculus", question: "Critical point of f(x) = x² - 4x + 3?", options: ["x = 2", "x = 1", "x = 3", "x = 4"], correct: 0, difficulty: "hard" },

  // Statistics
  { id: "sta-1", topic: "Statistics", question: "Mean of 2, 4, 6, 8, 10?", options: ["6", "5", "7", "8"], correct: 0, difficulty: "easy" },
  { id: "sta-2", topic: "Statistics", question: "Median of 3, 7, 1, 9, 5?", options: ["5", "3", "7", "9"], correct: 0, difficulty: "easy" },
  { id: "sta-3", topic: "Statistics", question: "P(A) = 0.3, P(B) = 0.4, independent. P(A∩B)?", options: ["0.12", "0.7", "0.1", "0.5"], correct: 0, difficulty: "medium" },
  { id: "sta-4", topic: "Statistics", question: "Standard deviation measures?", options: ["Data spread", "Data center", "Data max", "Data sum"], correct: 0, difficulty: "easy" },
  { id: "sta-5", topic: "Statistics", question: "In normal distribution, ~68% data is within?", options: ["1 std dev", "2 std dev", "3 std dev", "0.5 std dev"], correct: 0, difficulty: "medium" },
  { id: "sta-6", topic: "Statistics", question: "Mode of: 2, 3, 3, 4, 5, 3, 6?", options: ["3", "4", "2", "5"], correct: 0, difficulty: "easy" },
  { id: "sta-7", topic: "Statistics", question: "Probability of rolling a 6 on a fair die?", options: ["1/6", "1/3", "1/2", "1/4"], correct: 0, difficulty: "easy" },
  { id: "sta-8", topic: "Statistics", question: "A z-score of 0 means?", options: ["At the mean", "1 std above", "1 std below", "Outlier"], correct: 0, difficulty: "medium" },

  // Trigonometry
  { id: "tri-1", topic: "Trigonometry", question: "sin(30°) = ?", options: ["1/2", "√3/2", "1/√2", "√3"], correct: 0, difficulty: "easy" },
  { id: "tri-2", topic: "Trigonometry", question: "cos(60°) = ?", options: ["1/2", "√3/2", "0", "1"], correct: 0, difficulty: "easy" },
  { id: "tri-3", topic: "Trigonometry", question: "tan(45°) = ?", options: ["1", "0", "√3", "1/2"], correct: 0, difficulty: "easy" },
  { id: "tri-4", topic: "Trigonometry", question: "sin²(x) + cos²(x) = ?", options: ["1", "0", "2", "sin(2x)"], correct: 0, difficulty: "medium" },
  { id: "tri-5", topic: "Trigonometry", question: "Period of sin(x)?", options: ["2π", "π", "π/2", "4π"], correct: 0, difficulty: "medium" },
  { id: "tri-6", topic: "Trigonometry", question: "sin(90°) = ?", options: ["1", "0", "-1", "1/2"], correct: 0, difficulty: "easy" },
  { id: "tri-7", topic: "Trigonometry", question: "If sin(θ) = 3/5 (right triangle), cos(θ) = ?", options: ["4/5", "3/4", "5/3", "1/5"], correct: 0, difficulty: "medium" },
  { id: "tri-8", topic: "Trigonometry", question: "sec(x) = ?", options: ["1/cos(x)", "1/sin(x)", "cos(x)", "sin(x)"], correct: 0, difficulty: "medium" },

  // Linear Algebra
  { id: "lin-1", topic: "Linear Algebra", question: "Transpose of [[1,2],[3,4]]?", options: ["[[1,3],[2,4]]", "[[4,3],[2,1]]", "[[2,1],[4,3]]", "[[1,2],[3,4]]"], correct: 0, difficulty: "easy" },
  { id: "lin-2", topic: "Linear Algebra", question: "Determinant of [[2,1],[1,3]]?", options: ["5", "6", "7", "4"], correct: 0, difficulty: "medium" },
  { id: "lin-3", topic: "Linear Algebra", question: "Identity matrix property: AI = ?", options: ["A", "I", "0", "A²"], correct: 0, difficulty: "easy" },
  { id: "lin-4", topic: "Linear Algebra", question: "Dot product of [1,2,3] · [4,5,6]?", options: ["32", "28", "30", "36"], correct: 0, difficulty: "medium" },
  { id: "lin-5", topic: "Linear Algebra", question: "Rank of a 3×3 identity matrix?", options: ["3", "1", "0", "9"], correct: 0, difficulty: "medium" },
  { id: "lin-6", topic: "Linear Algebra", question: "A vector space must contain which element?", options: ["Zero vector", "Unit vector", "Basis vector", "Null vector"], correct: 0, difficulty: "hard" },
  { id: "lin-7", topic: "Linear Algebra", question: "Eigenvalue equation: Av = ?", options: ["λv", "v/λ", "A/v", "λA"], correct: 0, difficulty: "hard" },
  { id: "lin-8", topic: "Linear Algebra", question: "[[1,0],[0,-1]] applied to (2,3)?", options: ["(2,-3)", "(-2,3)", "(-2,-3)", "(2,3)"], correct: 0, difficulty: "medium" },

  // Probability
  { id: "pro-1", topic: "Probability", question: "Flipping 2 coins, P(both heads)?", options: ["1/4", "1/2", "3/4", "1/3"], correct: 0, difficulty: "easy" },
  { id: "pro-2", topic: "Probability", question: "Drawing a red card from a deck (52 cards)?", options: ["1/2", "1/4", "1/13", "1/3"], correct: 0, difficulty: "easy" },
  { id: "pro-3", topic: "Probability", question: "P(A∪B) if P(A)=0.5, P(B)=0.4, P(A∩B)=0.2?", options: ["0.7", "0.9", "0.5", "0.6"], correct: 0, difficulty: "medium" },
  { id: "pro-4", topic: "Probability", question: "P(A|B) means?", options: ["P(A) given B occurred", "P(A) × P(B)", "P(A) + P(B)", "P(A) - P(B)"], correct: 0, difficulty: "medium" },
  { id: "pro-5", topic: "Probability", question: "Expected value of a fair die?", options: ["3.5", "3", "4", "2.5"], correct: 0, difficulty: "medium" },
  { id: "pro-6", topic: "Probability", question: "Complement rule: P(A') = ?", options: ["1 - P(A)", "P(A) - 1", "1 + P(A)", "P(A)"], correct: 0, difficulty: "easy" },
  { id: "pro-7", topic: "Probability", question: "Binomial distribution needs n, p, and?", options: ["k (successes)", "mean", "variance", "mode"], correct: 0, difficulty: "hard" },
  { id: "pro-8", topic: "Probability", question: "Mutually exclusive events: P(A∩B) = ?", options: ["0", "1", "P(A)P(B)", "P(A)+P(B)"], correct: 0, difficulty: "medium" },

  // Number Theory
  { id: "num-1", topic: "Number Theory", question: "GCD of 12 and 18?", options: ["6", "3", "9", "12"], correct: 0, difficulty: "easy" },
  { id: "num-2", topic: "Number Theory", question: "Is 97 prime?", options: ["Yes", "No", "Neither", "Composite"], correct: 0, difficulty: "medium" },
  { id: "num-3", topic: "Number Theory", question: "LCM of 4 and 6?", options: ["12", "6", "24", "8"], correct: 0, difficulty: "easy" },
  { id: "num-4", topic: "Number Theory", question: "What is 5! (5 factorial)?", options: ["120", "60", "24", "720"], correct: 0, difficulty: "easy" },
  { id: "num-5", topic: "Number Theory", question: "Euler's theorem: aᵠ⁽ⁿ⁾ ≡ ? (mod n)", options: ["1", "0", "a", "n"], correct: 0, difficulty: "hard" },
  { id: "num-6", topic: "Number Theory", question: "Sum of first 10 natural numbers?", options: ["55", "50", "45", "60"], correct: 0, difficulty: "easy" },
  { id: "num-7", topic: "Number Theory", question: "Which is NOT a prime: 2, 3, 5, 9?", options: ["9", "2", "3", "5"], correct: 0, difficulty: "easy" },
  { id: "num-8", topic: "Number Theory", question: "Fermat's Little Theorem: aᵖ ≡ ? (mod p), p prime", options: ["a", "1", "0", "p"], correct: 0, difficulty: "hard" },
];

export const QUESTIONS_PER_QUIZ = 5;

export function getQuizForTopic(topic: string, usedIds: string[]): QuizQuestion[] {
  const pool = quizBank.filter(q => q.topic === topic && !usedIds.includes(q.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(QUESTIONS_PER_QUIZ, shuffled.length));
}
