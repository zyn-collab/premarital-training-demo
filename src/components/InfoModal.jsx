export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-emerald-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">📚 Demo Guide & Test Answers</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* How the Real App Works */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3">🤝 How the Real App Works</h3>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <ol className="space-y-2 text-gray-700">
                <li><strong>1.</strong> Both partners access the course independently (on their own devices/accounts)</li>
                <li><strong>2.</strong> Each partner submits their answers without seeing the other's responses</li>
                <li><strong>3.</strong> Answers are stored in a database</li>
                <li><strong>4.</strong> The system compares both answers when both have submitted</li>
                <li><strong>5.</strong> Partners can only proceed when answers match</li>
                <li><strong>6.</strong> Partners can go back and change answers until they reach agreement</li>
              </ol>
            </div>
          </section>

          {/* How This Demo Works */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 How This Demo Works</h3>
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
              <p className="text-gray-700 mb-2">Since this is a demo without a backend:</p>
              <ul className="space-y-1 ml-4 text-gray-700">
                <li>• The "demoCorrectAnswer" simulates what Partner A might have answered</li>
                <li>• When you submit, it checks if your answer matches this simulated partner answer</li>
                <li>• This demonstrates the validation logic that would run in the real system</li>
                <li>• Use the answers below to test the matching feature</li>
              </ul>
            </div>
          </section>

          {/* Demo Answers */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3">✅ Demo Answers to Use</h3>

            <div className="space-y-4">
              {/* Decision 1 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 1: Children</p>
                <p className="text-gray-700">Yes, we want children (number flexible)</p>
              </div>

              {/* Decision 2 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 2: When</p>
                <p className="text-gray-700">Wait 1 year to strengthen relationship</p>
              </div>

              {/* Decision 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 3: Money Management</p>
                <p className="text-gray-700 mb-2"><strong>Dropdown:</strong> Hybrid: Joint for household + separate personal</p>
                <p className="text-gray-700 mb-1"><strong>Copy-paste this text:</strong></p>
                <div className="bg-gray-50 p-2 rounded border border-gray-300">
                  <p className="text-sm font-mono">We will maintain a hybrid system with joint household account and separate personal accounts, with monthly budget reviews.</p>
                </div>
              </div>

              {/* Decision 4 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 4: Where to Live</p>
                <p className="text-gray-700">Independently (our own place)</p>
              </div>

              {/* Decision 5 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 5: Work & Career</p>
                <p className="text-gray-700">Both will work outside home</p>
              </div>

              {/* Decision 6 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 6: Family Relationships</p>
                <p className="text-gray-700 mb-2"><strong>Dropdown:</strong> Each handles their own family's issues</p>
                <p className="text-gray-700 mb-1"><strong>Copy-paste this text:</strong></p>
                <div className="bg-gray-50 p-2 rounded border border-gray-300">
                  <p className="text-sm font-mono">We agree that each partner will handle issues with their own family first, and only involve the spouse when necessary for support.</p>
                </div>
              </div>

              {/* Decision 7 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 7: Decision Making</p>
                <p className="text-gray-700">All major decisions made jointly (must both agree)</p>
              </div>

              {/* Decision 8 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-600 mb-2">Decision 8: Raising Children</p>
                <p className="text-gray-700">We'll follow Islamic guidance and decide together</p>
              </div>
            </div>
          </section>

          {/* Demo Tips */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Demo Tips</h3>
            <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Try wrong answers first</strong> - Show the validation error messages</li>
                <li>• <strong>Then use correct answers</strong> - Show the success flow</li>
                <li>• <strong>Content slides wait 4 seconds</strong> - Automatic progression</li>
                <li>• <strong>Video slides play 10 seconds</strong> - Simulated playback</li>
                <li>• <strong>Use "Reset Demo" button</strong> - Clear all progress and start over</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-lg border-t">
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Got it! Close
          </button>
        </div>
      </div>
    </div>
  );
}
