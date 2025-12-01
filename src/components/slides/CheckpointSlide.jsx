import { useState, useEffect } from 'react';
import { saveCheckpointAnswer, getCheckpointAnswer, getCheckpointTextAnswer } from '../../utils/localStorage';

export default function CheckpointSlide({ data, onNextEnabled }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Load saved answer if exists
    const saved = getCheckpointAnswer(data.checkpointNumber);
    const savedText = getCheckpointTextAnswer(data.checkpointNumber);
    if (saved) {
      setSelectedOption(saved);
      if (savedText) {
        setTextAnswer(savedText);
      }
      // If already passed, enable next button
      const passed = localStorage.getItem(`checkpoint_${data.checkpointNumber}_passed`);
      if (passed === 'true') {
        setMessage({
          type: 'success',
          text: "✓ Answers match! You're aligned on this decision."
        });
        onNextEnabled();
      }
    }
  }, [data.checkpointNumber, onNextEnabled]);

  const handleSubmit = () => {
    setMessage(null);

    // Check for "Need to discuss" option
    if (selectedOption === "Need to discuss with Ghaazee/counselor") {
      setMessage({
        type: 'warning',
        text: data.needDiscussMessage || "This topic will be discussed during your pre-marriage meeting with the Ghaazee/marriage officer."
      });
      saveCheckpointAnswer(data.checkpointNumber, selectedOption);
      onNextEnabled();
      return;
    }

    // Check dropdown match
    if (selectedOption !== data.demoCorrectAnswer) {
      setMessage({
        type: 'error',
        text: "Your answers don't match. Please discuss together and resubmit when you've reached agreement."
      });
      return;
    }

    // Dropdown matches - check text if needed
    if (data.requiresTextMatch) {
      const normalizedInput = textAnswer.trim();
      const normalizedCorrect = data.correctTextMatch.trim();

      if (normalizedInput !== normalizedCorrect) {
        setMessage({
          type: 'error',
          text: "Text doesn't match. Please copy the exact agreed statement."
        });
        return;
      }
    }

    // All validations passed
    setMessage({
      type: 'success',
      text: "✓ Answers match! You're aligned on this decision."
    });
    saveCheckpointAnswer(data.checkpointNumber, selectedOption, textAnswer || null);
    onNextEnabled();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-4 px-4 py-2 bg-emerald-100 rounded-lg inline-block">
        <p className="text-sm font-bold text-emerald-700">
          DECISION {data.checkpointNumber}
        </p>
      </div>

      {/* Workflow explanation - only show on first checkpoint */}
      {data.checkpointNumber === 1 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
          <p className="text-sm font-semibold text-purple-900 mb-2">
            🤝 How Decision Checkpoints Work:
          </p>
          <ul className="text-sm text-purple-800 space-y-1 ml-4">
            <li>• Each partner submits their answer independently</li>
            <li>• You can go back and change your answers anytime</li>
            <li>• You can only proceed when BOTH partners' answers match</li>
            <li>• This ensures you're truly aligned on important decisions</li>
          </ul>
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {data.title}
      </h2>

      {data.subtitle && (
        <p className="text-lg text-gray-600 mb-6">{data.subtitle}</p>
      )}

      {/* Discussion points */}
      {data.discussionPoints && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{data.discussionPoints.heading}</h3>
          <ul className="space-y-1 ml-4">
            {data.discussionPoints.items.map((item, i) => (
              <li key={i} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Intro */}
      {data.intro && (
        <div className="mb-6">
          {typeof data.intro === 'string' ? (
            <p className="text-gray-700">{data.intro}</p>
          ) : (
            <>
              <h3 className="font-semibold mb-2">{data.intro.heading}</h3>
              <ul className="space-y-1 ml-4">
                {data.intro.items.map((item, i) => (
                  <li key={i} className="text-gray-700">• {item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Reminder */}
      {data.reminder && (
        <div className="mb-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
          <h3 className="font-semibold mb-2">{data.reminder.heading}</h3>
          <ul className="space-y-1 ml-4">
            {data.reminder.items.map((item, i) => (
              <li key={i} className="text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Dropdown */}
      <div className="mb-6">
        <label className="block font-semibold mb-3 text-lg">{data.question}</label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
        >
          <option value="">-- Select an option --</option>
          {data.options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Text match if required */}
      {data.requiresTextMatch && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            {data.textMatchPrompt}
          </label>
          <div className="mb-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              📝 How this works:
            </p>
            <ol className="text-sm text-blue-800 space-y-1 ml-4">
              <li>1. Discuss this topic together and agree on a statement</li>
              <li>2. Text it to each other in a chat so you both have the same wording</li>
              <li>3. Both partners copy-paste the exact same agreed statement below</li>
              <li>4. Your answers must match word-for-word to proceed</li>
            </ol>
          </div>
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[100px]"
            placeholder="Paste your agreed statement here (must match your partner's exactly)..."
          />
          <p className="text-sm text-gray-500 mt-1 italic">
            💡 Tip: Discuss together, agree on the wording, share it via text/WhatsApp, then both paste it here.
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
      >
        Submit Answer
      </button>

      {/* Messages */}
      {message && (
        <div className={`mt-4 p-4 rounded-lg border-l-4 ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' :
          message.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
          'bg-amber-50 border-amber-500 text-amber-800'
        }`}>
          <p className="font-medium">{message.text}</p>
        </div>
      )}
    </div>
  );
}
