import { useState } from 'react';

// ---- Commitment type (requiredText) ----
function CommitmentCheckpoint({ content, onNextEnabled }) {
  const [inputText, setInputText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = () => {
    if (inputText.trim() === content.requiredText.trim()) {
      setConfirmed(true);
      setError(null);
      onNextEnabled();
    } else {
      setError(
        content.validation?.errorMessage ||
          'Text must match exactly. Please copy and paste the complete statement.'
      );
    }
  };

  return (
    <div>
      {content.introduction && (
        <p className="text-gray-600 mb-4 italic">{content.introduction}</p>
      )}

      {content.quranVerse && (
        <div className="mb-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-600">
          <p className="text-lg italic text-emerald-800">"{content.quranVerse.text}"</p>
          <p className="text-sm text-emerald-600 mt-1">— {content.quranVerse.reference}</p>
        </div>
      )}

      {content.keyPrinciple && (
        <div className="mb-3 p-3 bg-amber-50 rounded border-l-4 border-amber-500">
          <p className="font-bold text-amber-900">{content.keyPrinciple}</p>
        </div>
      )}

      {content.explanation && (
        <div className="mb-4">
          <ul className="space-y-1 ml-4">
            {content.explanation.map((item, i) => (
              <li key={i} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      )}

      {content.rights && (
        <div className="mb-4">
          <ul className="space-y-1 ml-4">
            {content.rights.map((r, i) => (
              <li key={i} className="text-gray-700">✓ {r}</li>
            ))}
          </ul>
        </div>
      )}

      {content.additionalRights && (
        <div className="mb-4">
          <ul className="space-y-1 ml-4">
            {content.additionalRights.map((r, i) => (
              <li key={i} className="text-gray-700">✓ {r}</li>
            ))}
          </ul>
        </div>
      )}

      {content.criticalUnderstanding && (
        <div className="mb-3 p-3 bg-red-50 rounded border-l-4 border-red-500">
          <p className="font-semibold text-red-800">{content.criticalUnderstanding}</p>
        </div>
      )}

      {content.husbandCannot && (
        <div className="mb-4">
          <p className="font-semibold text-red-700 mb-2">A husband CANNOT:</p>
          <ul className="space-y-1 ml-4">
            {content.husbandCannot.map((r, i) => (
              <li key={i} className="text-red-700">✗ {r}</li>
            ))}
          </ul>
        </div>
      )}

      {content.consequences && (
        <div className="mb-4 p-3 bg-red-50 rounded">
          <p className="text-red-800">{content.consequences}</p>
        </div>
      )}

      {content.islamicGuidance && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Islamic guidance:</p>
          <ul className="space-y-1 ml-4">
            {content.islamicGuidance.map((g, i) => (
              <li key={i} className="text-gray-700">• {g}</li>
            ))}
          </ul>
        </div>
      )}

      {content.context && (
        <div className="mb-4 p-3 bg-navy-light rounded">
          <p className="text-navy">{content.context}</p>
        </div>
      )}

      {content.emphasis && (
        <div className="mb-4 p-4 bg-navy rounded-lg text-center">
          <p className="text-white font-bold text-lg">{content.emphasis}</p>
        </div>
      )}

      {content.instruction && (
        <div className="mb-4 p-4 bg-navy-light rounded-lg border-l-4 border-navy">
          <p className="font-semibold text-navy">{content.instruction}</p>
        </div>
      )}

      {/* Required text to copy */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Text to copy &amp; paste below:
        </p>
        <p className="text-gray-800 text-sm leading-relaxed select-all">
          {content.requiredText}
        </p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Both partners paste the statement here to confirm:
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={confirmed}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[100px]"
          placeholder="Paste the exact statement here..."
        />
        <p className="text-sm text-gray-500 mt-1 italic">
          💡 Copy the text above and paste it here to confirm you've read and understood it.
        </p>
      </div>

      <button
        onClick={handleConfirm}
        disabled={confirmed || !inputText.trim()}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {confirmed ? '✓ Confirmed' : 'Confirm & Proceed'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500 text-red-800">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {confirmed && (
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <p className="text-emerald-800 font-medium">✓ Confirmed! You may proceed.</p>
        </div>
      )}
    </div>
  );
}

// ---- True/False Quiz ----
function TrueFalseQuiz({ content, onNextEnabled }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleAnswer = (id, value) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    content.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    if (correct >= content.passingScore) {
      setPassed(true);
      onNextEnabled();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPassed(false);
  };

  const allAnswered = content.questions.every((q) => answers[q.id] !== undefined);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Answer {content.totalQuestions} true/false questions. You need {content.passingScore}/
        {content.totalQuestions} to pass.
      </p>

      <div className="space-y-4 mb-6">
        {content.questions.map((q) => {
          const isCorrect = submitted && answers[q.id] === q.correctAnswer;
          const isWrong = submitted && answers[q.id] !== q.correctAnswer && answers[q.id] !== undefined;
          return (
            <div
              key={q.id}
              className={`border rounded-lg p-4 ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50'
                    : isWrong
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200'
                  : 'border-gray-200'
              }`}
            >
              <p className="font-medium text-gray-800 mb-3">
                {q.id}. {q.statement}
              </p>
              <div className="flex items-center gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => handleAnswer(q.id, val)}
                    disabled={submitted}
                    className={`px-5 py-2 rounded-lg font-semibold border-2 transition-colors ${
                      answers[q.id] === val
                        ? submitted
                          ? val === q.correctAnswer
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-red-500 text-white border-red-500'
                          : 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                    } disabled:cursor-not-allowed`}
                  >
                    {val ? 'True' : 'False'}
                  </button>
                ))}
                {submitted && (
                  <span
                    className={`ml-auto text-sm font-medium ${
                      isCorrect ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {isCorrect
                      ? '✓ Correct'
                      : `✗ Answer: ${q.correctAnswer ? 'True' : 'False'}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answers
        </button>
      ) : (
        <div>
          <div
            className={`p-4 rounded-lg border-l-4 mb-4 ${
              passed
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-red-50 border-red-500 text-red-800'
            }`}
          >
            <p className="font-bold text-lg">
              Score: {score}/{content.totalQuestions}
            </p>
            <p className="mt-1">
              {passed ? content.feedback?.passing : content.feedback?.failing}
            </p>
          </div>
          {!passed && (
            <button
              onClick={handleRetry}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---- Multiple Choice / Case Study Quiz ----
function MCQQuiz({ content, onNextEnabled }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Flatten all questions (from content.questions or content.cases)
  const allQuestions = content.questions
    ? content.questions
    : content.cases
    ? content.cases.flatMap((c) => c.questions)
    : [];

  const isCase = !!(content.cases || content.scenario);

  const handleAnswer = (id, value) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // For case studies, always pass after reviewing answers
    // For direct MCQ (e.g. course 1 slide 17), check score
    if (!isCase && content.passingScore) {
      let correct = 0;
      allQuestions.forEach((q) => {
        if (q.correctAnswer !== undefined && answers[q.id] === q.correctAnswer) correct++;
      });
      if (correct >= content.passingScore) {
        onNextEnabled();
      }
      // If failed, don't enable next - let them retry (handled by retry button)
    } else {
      onNextEnabled();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Check pass status for non-case MCQ
  let currentScore = 0;
  let passedCheck = true;
  if (submitted && !isCase && content.passingScore) {
    allQuestions.forEach((q) => {
      if (q.correctAnswer !== undefined && answers[q.id] === q.correctAnswer) currentScore++;
    });
    passedCheck = currentScore >= content.passingScore;
  }

  const requiredQuestions = allQuestions.filter(
    (q) => q.type !== 'textInput' && q.type !== 'checkboxes' && q.type !== 'checkbox'
  );
  const allAnswered = requiredQuestions.every((q) => answers[q.id] !== undefined);

  const renderQuestion = (q) => {
    if (q.type === 'textInput') {
      return (
        <div key={q.id} className="mb-4">
          <p className="font-medium text-gray-800 mb-2">{q.question}</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg min-h-[80px] focus:ring-2 focus:ring-emerald-500"
            placeholder="Your answer..."
            onChange={(e) => handleAnswer(q.id, e.target.value)}
            disabled={submitted}
          />
          {submitted && q.sampleAnswer && (
            <div className="mt-2 p-3 bg-navy-light rounded border-l-4 border-navy">
              <p className="text-sm text-navy">
                <span className="font-semibold">Sample answer:</span> {q.sampleAnswer}
              </p>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'checkboxes' || q.type === 'checkbox') {
      return (
        <div key={q.id} className="mb-4">
          <p className="font-medium text-gray-800 mb-2">{q.question}</p>
          <div className="space-y-2">
            {q.options &&
              q.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-emerald-600"
                    disabled={submitted}
                  />
                  <span className="text-gray-700">{opt}</span>
                  {submitted && q.correctAnswers && q.correctAnswers.includes(i) && (
                    <span className="text-emerald-600 text-sm ml-1">✓</span>
                  )}
                </label>
              ))}
          </div>
        </div>
      );
    }

    // Default: radio (multiple choice)
    return (
      <div key={q.id} className="mb-4">
        <p className="font-medium text-gray-800 mb-2">{q.question}</p>
        <div className="space-y-2">
          {q.options &&
            q.options.map((opt, i) => {
              const isSelected = answers[q.id] === i;
              const isCorrectAnswer = submitted && i === q.correctAnswer;
              const isWrongSelected = submitted && isSelected && i !== q.correctAnswer;
              return (
                <label
                  key={i}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                    isCorrectAnswer
                      ? 'bg-emerald-50 border border-emerald-300'
                      : isWrongSelected
                      ? 'bg-red-50 border border-red-300'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    checked={isSelected}
                    onChange={() => handleAnswer(q.id, i)}
                    disabled={submitted}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                  {isCorrectAnswer && (
                    <span className="text-emerald-600 text-sm ml-auto">✓</span>
                  )}
                  {isWrongSelected && (
                    <span className="text-red-600 text-sm ml-auto">✗</span>
                  )}
                </label>
              );
            })}
        </div>
        {submitted && q.explanation && (
          <div className="mt-2 p-3 bg-navy-light rounded border-l-4 border-navy">
            <p className="text-sm text-navy">{q.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Top-level scenario (course 4 case study) */}
      {content.scenario && (
        <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="font-semibold text-amber-900 mb-2">
            {content.scenario.character} — {content.scenario.occupation} (
            {content.scenario.income}/month)
          </p>
          <ul className="space-y-1 ml-4">
            {content.scenario.situation.map((s, i) => (
              <li key={i} className="text-gray-700 text-sm">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Direct questions */}
      {content.questions && !content.cases && (
        <div className="space-y-2 mb-6">{content.questions.map((q) => renderQuestion(q))}</div>
      )}

      {/* Case scenarios */}
      {content.cases && (
        <div className="space-y-6 mb-6">
          {content.cases.map((c, ci) => (
            <div key={ci} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Case {c.caseNumber}:</h4>
              <p className="text-gray-700 mb-4 italic bg-gray-50 p-3 rounded">{c.scenario}</p>
              {c.questions.map((q) => renderQuestion(q))}
            </div>
          ))}
        </div>
      )}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answers
        </button>
      ) : (
        <div>
          {!isCase && content.passingScore ? (
            <div
              className={`p-4 rounded-lg border-l-4 mb-4 ${
                passedCheck
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-red-50 border-red-500 text-red-800'
              }`}
            >
              <p className="font-bold text-lg">
                Score: {currentScore}/{allQuestions.filter((q) => q.correctAnswer !== undefined).length}
              </p>
              <p className="mt-1">
                {passedCheck
                  ? content.feedback?.passing || content.feedback?.allCorrect
                  : content.feedback?.failing || content.feedback?.needsReview}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500 mb-4">
              <p className="text-emerald-800 font-medium">
                ✓ {content.feedback?.allCorrect || 'Review complete! You may proceed.'}
              </p>
            </div>
          )}

          {!isCase && content.passingScore && !passedCheck && (
            <button
              onClick={handleRetry}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---- Checklist type (simple checkboxes or categorized) ----
function ChecklistCheckpoint({ content, onNextEnabled }) {
  const [checked, setChecked] = useState({});
  const [completed, setCompleted] = useState(false);

  const toggle = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleComplete = () => {
    setCompleted(true);
    onNextEnabled();
  };

  const totalChecked = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      {content.subtitle && <p className="text-gray-600 mb-4">{content.subtitle}</p>}

      {content.instruction && (
        <div className="mb-4 p-3 bg-navy-light rounded-lg border-l-4 border-navy">
          <p className="text-navy">{content.instruction}</p>
        </div>
      )}

      {/* Simple checkboxes */}
      {content.checkboxes && (
        <div className="mb-6 space-y-2">
          {content.checkboxes.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => toggle(i)}
                className="w-5 h-5 accent-emerald-600"
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )}

      {/* Categorized checkboxes */}
      {content.categories && (
        <div className="mb-6 space-y-4">
          {content.categories.map((cat, ci) => (
            <div key={ci} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">{cat.category}</h4>
              <div className="space-y-2">
                {cat.checkboxes.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  return (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => toggle(key)}
                        className="w-5 h-5 accent-emerald-600"
                      />
                      <span className="text-gray-700">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {content.itsOkayTo && (
        <div className="mb-4 p-4 bg-navy-light rounded-lg">
          <p className="font-semibold text-navy mb-2">{content.itsOkayTo.heading}</p>
          <ul className="space-y-1 ml-4">
            {content.itsOkayTo.items.map((item, i) => (
              <li key={i} className="text-navy/80">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.closing && (
        <p className="text-center font-semibold text-gray-700 mb-4">{content.closing}</p>
      )}

      {/* Dynamic feedback based on check count */}
      {content.feedback && totalChecked > 0 && (
        <div
          className={`mb-4 p-3 rounded-lg border-l-4 ${
            totalChecked >= (content.feedback.manyChecked?.threshold || 999)
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
              : 'bg-amber-50 border-amber-500 text-amber-800'
          }`}
        >
          <p className="text-sm">
            You've checked {totalChecked} item{totalChecked !== 1 ? 's' : ''}.{' '}
            {totalChecked >= (content.feedback.manyChecked?.threshold || 999)
              ? content.feedback.manyChecked?.message
              : content.feedback.fewChecked?.message}
          </p>
        </div>
      )}

      <button
        onClick={handleComplete}
        disabled={completed}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {completed ? '✓ Completed' : 'Continue'}
      </button>
    </div>
  );
}

// ---- Main ContentCheckpointSlide ----
export default function ContentCheckpointSlide({ data, onNextEnabled }) {
  const content = data.content;

  let subType, badgeText;

  if (content.requiredText) {
    subType = 'commitment';
    badgeText = 'COMMITMENT CONFIRMATION';
  } else if (content.cases) {
    subType = 'mcq';
    badgeText = 'CASE STUDY';
  } else if (content.questions) {
    const firstQ = content.questions[0];
    if (typeof firstQ?.correctAnswer === 'boolean' && firstQ?.statement) {
      subType = 'truefalse';
    } else {
      subType = 'mcq';
    }
    badgeText = 'KNOWLEDGE CHECK';
  } else if (content.checkboxes || content.categories) {
    subType = 'checklist';
    badgeText = 'SELF-ASSESSMENT';
  } else {
    subType = 'checklist';
    badgeText = 'CHECKPOINT';
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
      <div className="mb-4 px-4 py-2 bg-emerald-100 rounded-lg inline-block">
        <p className="text-sm font-bold text-emerald-700">{badgeText}</p>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{content.title}</h2>

      {subType === 'commitment' && (
        <CommitmentCheckpoint content={content} onNextEnabled={onNextEnabled} />
      )}
      {subType === 'truefalse' && (
        <TrueFalseQuiz content={content} onNextEnabled={onNextEnabled} />
      )}
      {subType === 'mcq' && <MCQQuiz content={content} onNextEnabled={onNextEnabled} />}
      {subType === 'checklist' && (
        <ChecklistCheckpoint content={content} onNextEnabled={onNextEnabled} />
      )}
    </div>
  );
}
