import { useEffect } from 'react';

// Helper function to render any data structure
function renderContent(data, key = '', level = 0) {
  if (!data) return null;

  // Handle arrays
  if (Array.isArray(data)) {
    return (
      <ul className="space-y-2 ml-6">
        {data.map((item, i) => (
          <li key={i} className="text-base md:text-lg text-gray-700">
            • {typeof item === 'string' ? item : renderContent(item, `${key}-${i}`, level + 1)}
          </li>
        ))}
      </ul>
    );
  }

  // Handle objects with specific known structures
  if (typeof data === 'object') {
    // Check for heading + items structure
    if (data.heading && data.items) {
      return (
        <div className="mb-4" key={key}>
          <h4 className="font-semibold text-lg mb-2">{data.heading}</h4>
          <ul className="space-y-1 ml-6">
            {data.items.map((item, i) => (
              <li key={i} className="text-base text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Check for title + items structure
    if (data.title && data.items) {
      return (
        <div className="mb-4" key={key}>
          <h4 className="font-semibold text-lg mb-2">{data.title}</h4>
          <ul className="space-y-1 ml-6">
            {data.items.map((item, i) => (
              <li key={i} className="text-base text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Render object properties
    return (
      <div className="ml-4" key={key}>
        {Object.entries(data).map(([k, v]) => {
          if (k === 'heading' || k === 'title') return null; // Skip, already rendered
          return (
            <div key={k} className="mb-2">
              {renderContent(v, k, level + 1)}
            </div>
          );
        })}
      </div>
    );
  }

  // Handle primitives
  return <span className="text-base text-gray-700">{String(data)}</span>;
}

export default function ContentSlide({ data, onNextEnabled }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNextEnabled();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onNextEnabled]);

  // Define fields that should not be auto-rendered
  const skipFields = ['id', 'type', 'title', 'subtitle', 'tagline', 'source'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {data.title}
      </h2>

      {data.subtitle && (
        <p className="text-lg text-gray-600 mb-4">{data.subtitle}</p>
      )}

      {data.source && (
        <p className="text-sm italic text-gray-500 mb-4">{data.source}</p>
      )}

      {/* Render body if present */}
      {data.body && (
        <p className="text-base md:text-lg text-gray-700 mb-6">{data.body}</p>
      )}

      {/* Standard sections structure */}
      {data.sections && data.sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            {section.symbol && <span className="text-2xl">{section.symbol}</span>}
            {section.heading}
          </h3>
          {section.items ? (
            <ul className="space-y-2 ml-8">
              {section.items.map((item, i) => (
                <li key={i} className="text-base md:text-lg text-gray-700">
                  {section.symbol ? section.symbol : '•'} {item}
                </li>
              ))}
            </ul>
          ) : section.content ? (
            <p className="text-base md:text-lg text-gray-700 ml-4">{section.content}</p>
          ) : section.quote ? (
            <p className="text-base md:text-lg text-gray-700 italic ml-4 border-l-4 border-emerald-500 pl-4">
              "{section.quote}"
            </p>
          ) : null}
        </div>
      ))}

      {/* Standard steps structure */}
      {data.steps && data.steps.map((step, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {step.number || step.stepNumber}. {step.title || step.stepTitle}
          </h3>
          {step.description && (
            <p className="text-gray-600 mb-2">{step.description}</p>
          )}
          {step.items && (
            <ul className="space-y-1 ml-6">
              {step.items.map((item, i) => (
                <li key={i} className="text-base text-gray-700">• {item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Auto-render any other custom fields */}
      {Object.entries(data).map(([key, value]) => {
        // Skip already rendered fields
        if (skipFields.includes(key) || key === 'sections' || key === 'steps' ||
            key === 'body' || key === 'closing' || key === 'footer' || key === 'formula') {
          return null;
        }

        // Render custom structures
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Check if it's a titled section
          if (value.heading || value.title) {
            return (
              <div key={key} className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  {value.heading || value.title}
                </h3>
                {value.items && (
                  <ul className="space-y-2 ml-8">
                    {value.items.map((item, i) => (
                      <li key={i} className="text-base md:text-lg text-gray-700">• {item}</li>
                    ))}
                  </ul>
                )}
                {value.content && <p className="text-gray-700 ml-4">{value.content}</p>}
                {value.text && <p className="text-gray-700 ml-4">{value.text}</p>}
                {/* Render nested objects */}
                {Object.entries(value).map(([subKey, subValue]) => {
                  if (['heading', 'title', 'items', 'content', 'text'].includes(subKey)) return null;
                  if (typeof subValue === 'object' && subValue.items) {
                    return (
                      <div key={subKey} className="ml-6 mt-3">
                        <h4 className="font-semibold text-base mb-2">{subValue.title || subValue.heading}</h4>
                        <ul className="space-y-1 ml-4">
                          {subValue.items.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (Array.isArray(subValue)) {
                    return (
                      <ul key={subKey} className="space-y-1 ml-6 mt-2">
                        {subValue.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (typeof subValue === 'string') {
                    return <p key={subKey} className="text-gray-600 ml-4 mt-2 text-sm italic">{subValue}</p>;
                  }
                  return null;
                })}
              </div>
            );
          }
        }

        // Handle simple arrays
        if (Array.isArray(value) && typeof value[0] === 'string') {
          return (
            <div key={key} className="mb-4">
              <ul className="space-y-1 ml-6">
                {value.map((item, i) => (
                  <li key={i} className="text-base text-gray-700">• {item}</li>
                ))}
              </ul>
            </div>
          );
        }

        // Handle simple strings
        if (typeof value === 'string') {
          return (
            <p key={key} className="text-base text-gray-700 mb-4">{value}</p>
          );
        }

        return null;
      })}

      {/* Closing message */}
      {data.closing && (
        <p className="mt-6 text-center text-lg font-semibold text-emerald-600">
          {data.closing}
        </p>
      )}

      {/* Footer */}
      {data.footer && (
        <p className="mt-6 text-center text-lg font-semibold text-emerald-600">
          {data.footer}
        </p>
      )}

      {/* Formula */}
      {data.formula && (
        <p className="mt-6 p-4 bg-emerald-50 rounded border-l-4 border-emerald-500 italic text-base">
          {data.formula}
        </p>
      )}
    </div>
  );
}
