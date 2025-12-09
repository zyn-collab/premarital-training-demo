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
            <h3 className="text-xl font-bold text-gray-800 mb-3">✅ All 22 Demo Answers to Use</h3>
            <p className="text-sm text-gray-600 mb-4">Use these answers to successfully complete all checkpoints</p>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {/* TOPIC 1: CHILDREN */}
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-2">TOPIC 1: CHILDREN (4 decisions)</p>
                <div className="space-y-2 ml-2">
                  <p className="text-sm"><strong>1. Do we want children?</strong><br/>Yes, but flexible about it</p>
                  <p className="text-sm"><strong>2. How many?</strong><br/>Flexible, we'll see</p>
                  <p className="text-sm"><strong>3. When to start?</strong><br/>Wait 1 year</p>
                  <p className="text-sm"><strong>4. If infertility:</strong><br/>Seek medical fertility treatment</p>
                </div>
              </div>

              {/* TOPIC 2: FINANCES */}
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-2">TOPIC 2: FINANCES (4 decisions)</p>
                <div className="space-y-2 ml-2">
                  <p className="text-sm"><strong>5. Financial system:</strong></p>
                  <p className="text-xs bg-white p-2 rounded border mt-1">
                    ⚠️ <strong>TEXT MATCH REQUIRED:</strong> Copy this exactly:<br/>
                    <span className="font-mono text-xs">We will maintain a hybrid system with joint household account and separate personal accounts, with monthly budget reviews.</span>
                  </p>
                  <p className="text-sm"><strong>6. Housing payment:</strong><br/>Husband's responsibility</p>
                  <p className="text-sm"><strong>7. Loans & debt:</strong><br/>No, all loans discussed together</p>
                  <p className="text-sm"><strong>8. Financial goals:</strong></p>
                  <p className="text-xs bg-white p-2 rounded border mt-1">
                    ⚠️ <strong>TEXT MATCH REQUIRED:</strong> Copy this exactly:<br/>
                    <span className="font-mono text-xs">In the next 5 years, we will save 20,000 MVR for emergencies, pay off any debts as priority, and save monthly for our future needs.</span>
                  </p>
                </div>
              </div>

              {/* TOPIC 3: LIVING */}
              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                <p className="font-bold text-purple-900 mb-2">TOPIC 3: LIVING (2 decisions)</p>
                <div className="space-y-2 ml-2">
                  <p className="text-sm"><strong>9. Where live:</strong><br/>Independently (our own place)</p>
                  <p className="text-sm"><strong>10. Housing type:</strong><br/>Rental apartment</p>
                </div>
              </div>

              {/* TOPIC 4: WORK */}
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                <p className="font-bold text-yellow-900 mb-2">TOPIC 4: WORK (2 decisions)</p>
                <div className="space-y-2 ml-2">
                  <p className="text-sm"><strong>11. Both work?</strong><br/>Both work outside home</p>
                  <p className="text-sm"><strong>12. Work-life balance:</strong><br/>Share household tasks equally</p>
                </div>
              </div>

              {/* TOPIC 5: FAMILY */}
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                <p className="font-bold text-red-900 mb-2">TOPIC 5: FAMILY (2 decisions)</p>
                <div className="space-y-2 ml-2">
                  <p className="text-sm"><strong>13. Family involvement:</strong><br/>Each handles their own family's issues</p>
                  <p className="text-xs bg-white p-2 rounded border mt-1">
                    ⚠️ <strong>TEXT MATCH REQUIRED:</strong> Copy this exactly:<br/>
                    <span className="font-mono text-xs">We agree that each partner will handle issues with their own family first, and only involve the spouse when necessary for support.</span>
                  </p>
                  <p className="text-sm"><strong>14. Elderly parents:</strong><br/>Each looks after own parents</p>
                </div>
              </div>

              {/* TOPICS 6-15: REMAINING */}
              <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                <p className="font-bold text-indigo-900 mb-2">REMAINING TOPICS (8 decisions)</p>
                <div className="space-y-2 ml-2">
                  <p className="text-sm"><strong>15. Decision-making:</strong><br/>All decided jointly (both must agree)</p>
                  <p className="text-sm"><strong>16. Housework:</strong><br/>Split everything equally</p>
                  <p className="text-sm"><strong>17. Religious practice:</strong></p>
                  <p className="text-xs bg-white p-2 rounded border mt-1">
                    ⚠️ <strong>TEXT MATCH REQUIRED:</strong> Copy this exactly:<br/>
                    <span className="font-mono text-xs">We will support each other in fulfilling our five daily prayers, observe fasting during Ramadan, and raise our children with Islamic values. We will learn and grow together in our faith, while respecting each other's individual spiritual journey.</span>
                  </p>
                  <p className="text-sm"><strong>18. Health screening:</strong><br/>Yes, including STI and thalassemia testing</p>
                  <p className="text-sm"><strong>19. Conflict resolution:</strong><br/>All of the above</p>
                  <p className="text-sm"><strong>20. Life changes:</strong><br/>All of the above</p>
                  <p className="text-sm"><strong>21. Daily life:</strong><br/>All of the above</p>
                  <p className="text-sm"><strong>22. Communication:</strong><br/>All of the above</p>
                </div>
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
