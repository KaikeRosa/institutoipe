const questions = require('../data/disc-questions.json');
const profileInsights = require('../data/profileInsights');

const TOTAL_QUESTIONS = questions.length;
const LETTERS = ['D', 'I', 'S', 'C'];

const sanitizeAnswers = (answers) => {
  const map = new Map();
  answers.forEach((answer) => {
    if (!LETTERS.includes(answer.value)) return;
    map.set(answer.questionId, answer.value);
  });

  return Array.from(map.entries()).map(([questionId, value]) => ({
    questionId,
    value,
  }));
};

const combineUnique = (arrays, limit) =>
  arrays
    .filter(Boolean)
    .flat()
    .filter(Boolean)
    .filter((item, index, self) => self.indexOf(item) === index)
    .slice(0, limit);

const buildInsights = (primary, secondary) => {
  const primaryData = profileInsights[primary];
  const secondaryData = secondary ? profileInsights[secondary] : null;

  const summaryParts = [primaryData.summary];
  if (secondaryData) {
    summaryParts.push(`Você também apresenta traços de ${secondaryData.label.toLowerCase()}.`);
  }

  return {
    profileLabel: secondaryData
      ? `${primaryData.label} + ${secondaryData.label}`
      : primaryData.label,
    summary: summaryParts.join(' '),
    strengths: combineUnique(
      [primaryData.strengths, secondaryData?.strengths],
      4,
    ),
    development: combineUnique(
      [primaryData.development, secondaryData?.development],
      4,
    ),
    careers: combineUnique([primaryData.careers, secondaryData?.careers], 6),
    recommendations: combineUnique(
      [primaryData.recommendations, secondaryData?.recommendations],
      3,
    ),
  };
};

const calculateScores = (rawAnswers) => {
  const answers = sanitizeAnswers(rawAnswers);

  const scores = { D: 0, I: 0, S: 0, C: 0 };
  answers.forEach((answer) => {
    if (scores[answer.value] !== undefined) {
      scores[answer.value] += 1;
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][1] > 0 ? sorted[1][0] : null;

  const percentages = LETTERS.reduce((acc, letter) => {
    acc[letter] = Math.round((scores[letter] / TOTAL_QUESTIONS) * 100);
    return acc;
  }, {});

  const confidence = Math.round((scores[primary] / TOTAL_QUESTIONS) * 100);

  return {
    scores,
    percentages,
    profileCode: secondary ? `${primary}${secondary}` : primary,
    primary,
    secondary,
    confidence,
    insights: buildInsights(primary, secondary),
    answers,
  };
};

const getRecommendations = (profileCode = 'D') => {
  const primaryLetter = profileCode.charAt(0);
  const secondaryLetter = profileCode.charAt(1);
  const insight = buildInsights(primaryLetter, secondaryLetter);

  return insight.recommendations.map((text, index) => ({
    id: `${profileCode}-${index}`,
    title: insight.profileLabel,
    description: text,
  }));
};

module.exports = {
  TOTAL_QUESTIONS,
  questions,
  calculateScores,
  getRecommendations,
};

