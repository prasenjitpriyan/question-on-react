'use state';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const ContentBlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="mb-4 last:mb-0 leading-relaxed">{block.value}</p>;
    case 'heading':
      return (
        <h4 className="text-lg font-semibold text-cyan-400 mt-5 mb-2">
          {block.value}
        </h4>
      );
    case 'code': {
      const [copied, setCopied] = useState(false);
      const language = block.language || 'javascript';

      const handleCopy = () => {
        navigator.clipboard.writeText(block.value || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div className="relative group my-4 rounded-md overflow-hidden bg-[#282a36]">
          <div className="flex justify-between items-center px-4 py-1.5 bg-gray-700/80 text-xs text-gray-300">
            <span>{language}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              aria-label="Copy code">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          {/* Syntax Highlighter */}
          <SyntaxHighlighter
            language={language}
            style={dracula} // Apply theme
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              backgroundColor: '#282a36',
            }}
            wrapLines={true}
            showLineNumbers={false}
            codeTagProps={{ style: { fontFamily: 'inherit' } }}>
            {String(block.value || '').trim()}
          </SyntaxHighlighter>
        </div>
      );
    }
    case 'list':
      return (
        <ul className="list-disc list-outside pl-6 my-3 space-y-1.5">
          {(block.items || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    // Add 'example' if needed
    default:
      return null;
  }
};
