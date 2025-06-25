import React from 'react';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'csharp' }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm">
        <span className="font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 hover:text-white transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-gray-100 font-mono text-sm leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;