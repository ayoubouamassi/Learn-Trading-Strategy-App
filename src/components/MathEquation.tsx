/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface MathEquationProps {
  equation: string;
  block?: boolean;
}

/**
 * A beautiful, custom lightweight LaTeX-style math renderer.
 * Handles \frac{num}{den}, \text{text}, \times, \cdot, subscripts (e.g. P_win), superscripts (e.g. x^N), and variables.
 */
export default function MathEquation({ equation, block = false }: MathEquationProps) {
  // Clean up flanking $$ or $
  let raw = equation.trim();
  if (raw.startsWith("$$") && raw.endsWith("$$")) {
    raw = raw.slice(2, -2).trim();
    block = true;
  } else if (raw.startsWith("$") && raw.endsWith("$")) {
    raw = raw.slice(1, -1).trim();
  }

  // Parse a string containing mixed math elements and return React nodes
  const parseMathTokens = (text: string): React.ReactNode[] => {
    let current = text;
    const elements: React.ReactNode[] = [];
    let keyIdx = 0;

    while (current.length > 0) {
      // 1. Parse \text{...}
      if (current.startsWith("\\text{")) {
        const endIdx = findMatchingBrace(current, 5);
        if (endIdx !== -1) {
          const content = current.slice(6, endIdx);
          elements.push(
            <span key={`text-${keyIdx++}`} className="font-sans text-gray-300 font-medium whitespace-nowrap px-0.5">
              {content.replace("\\%", "%")}
            </span>
          );
          current = current.slice(endIdx + 1);
          continue;
        }
      }

      // 2. Parse \frac{num}{den}
      if (current.startsWith("\\frac{")) {
        const numEndIdx = findMatchingBrace(current, 5);
        if (numEndIdx !== -1) {
          const numContent = current.slice(6, numEndIdx);
          const nextPart = current.slice(numEndIdx + 1);
          if (nextPart.startsWith("{")) {
            const denEndIdx = findMatchingBrace(nextPart, 0);
            if (denEndIdx !== -1) {
              const denContent = nextPart.slice(1, denEndIdx);
              elements.push(
                <div
                  key={`frac-${keyIdx++}`}
                  className="inline-flex flex-col items-center justify-center align-middle mx-1.5 border-l-0 border-r-0"
                  style={{ minWidth: "50px" }}
                >
                  <div className="w-full text-center text-xs text-blue-100 font-semibold border-b border-gray-600 pb-0.5 px-2">
                    {parseMathTokens(numContent)}
                  </div>
                  <div className="w-full text-center text-xs text-blue-100 font-semibold pt-0.5 px-2">
                    {parseMathTokens(denContent)}
                  </div>
                </div>
              );
              current = current.slice(5 + numContent.length + 2 + denContent.length + 1);
              continue;
            }
          }
        }
      }

      // 3. Handle \left( and \right)
      if (current.startsWith("\\left(")) {
        elements.push(
          <span key={`lbracket-${keyIdx++}`} className="text-xl md:text-2xl text-blue-400 font-light align-middle select-none">
            (
          </span>
        );
        current = current.slice(6);
        continue;
      }
      if (current.startsWith("\\right)")) {
        elements.push(
          <span key={`rbracket-${keyIdx++}`} className="text-xl md:text-2xl text-blue-400 font-light align-middle select-none">
            )
          </span>
        );
        current = current.slice(7);
        continue;
      }

      // 4. Handle \times and \cdot
      if (current.startsWith("\\times")) {
        elements.push(
          <span key={`times-${keyIdx++}`} className="text-amber-500 font-bold mx-1.5 align-middle">
            ×
          </span>
        );
        current = current.slice(6);
        continue;
      }
      if (current.startsWith("\\cdot")) {
        elements.push(
          <span key={`cdot-${keyIdx++}`} className="text-blue-400 font-bold mx-1 align-middle">
            ·
          </span>
        );
        current = current.slice(5);
        continue;
      }

      // 5. Handle standard operations: +, -, =, /, *, %
      const firstChar = current[0];
      if (["+", "-", "=", "/", "*", "%", "(", ")"].includes(firstChar)) {
        let displayChar = firstChar;
        let styleClass = "text-gray-400 font-mono mx-1 align-middle";
        if (firstChar === "=") {
          styleClass = "text-blue-400 font-bold mx-2 align-middle";
        } else if (["+", "-"].includes(firstChar)) {
          styleClass = "text-amber-400 font-bold mx-1.5 align-middle";
        } else if (["(", ")"].includes(firstChar)) {
          styleClass = "text-blue-300 font-light mx-0.5 text-base align-middle";
        }
        elements.push(
          <span key={`op-${keyIdx++}`} className={styleClass}>
            {displayChar}
          </span>
        );
        current = current.slice(1);
        continue;
      }

      // 6. Handle subscripts (like P_{win} or P_win or P_w)
      // Check if we are at a letter and there is a subscript following
      const subscriptMatch = current.match(/^([a-zA-Z]+|\d+)_(\{([^{}]+)\}|[a-zA-Z\d])/);
      if (subscriptMatch) {
        const base = subscriptMatch[1];
        const sub = subscriptMatch[3] || subscriptMatch[2];
        elements.push(
          <span key={`sub-${keyIdx++}`} className="inline-flex items-baseline align-middle">
            <span className="font-serif italic text-blue-300 font-bold text-sm">{base}</span>
            <sub className="text-[9px] text-gray-400 font-mono align-bottom ml-0.5 select-none">{sub}</sub>
          </span>
        );
        current = current.slice(subscriptMatch[0].length);
        continue;
      }

      // 7. Handle superscripts (like x^N or x^{N} or f^*)
      const superscriptMatch = current.match(/^([a-zA-Z\*]+|\d+)\^(\{([^{}]+)\}|[a-zA-Z\d\*])/);
      if (superscriptMatch) {
        const base = superscriptMatch[1];
        const sup = superscriptMatch[3] || superscriptMatch[2];
        elements.push(
          <span key={`sup-${keyIdx++}`} className="inline-flex items-baseline align-middle">
            <span className="font-serif italic text-blue-300 font-bold text-sm">{base}</span>
            <sup className="text-[9px] text-amber-400 font-semibold align-top ml-0.5 select-none">{sup}</sup>
          </span>
        );
        current = current.slice(superscriptMatch[0].length);
        continue;
      }

      // 8. Parse standard words / numbers / variables
      const wordMatch = current.match(/^([a-zA-Z]+|\d+\.\d+|\d+|[f\*]+)/);
      if (wordMatch) {
        const token = wordMatch[1];
        // If it's a pure number
        if (/^\d+(\.\d+)?$/.test(token)) {
          elements.push(
            <span key={`num-${keyIdx++}`} className="font-mono text-emerald-400 font-semibold text-xs align-middle">
              {token}
            </span>
          );
        } else {
          // It's a variable
          elements.push(
            <span key={`var-${keyIdx++}`} className="font-serif italic text-blue-300 font-bold text-sm mx-0.5 align-middle">
              {token}
            </span>
          );
        }
        current = current.slice(token.length);
        continue;
      }

      // Fallback for spaces or unrecognized characters
      const char = current[0];
      if (char === " " || char === "\t") {
        elements.push(<span key={`space-${keyIdx++}`} className="w-1 inline-block" />);
      } else {
        elements.push(<span key={`raw-${keyIdx++}`} className="text-gray-400 text-xs align-middle">{char}</span>);
      }
      current = current.slice(1);
    }

    return elements;
  };

  // Find closing brace matching the opening brace at startIdx
  const findMatchingBrace = (str: string, startIdx: number): number => {
    let count = 0;
    for (let i = startIdx; i < str.length; i++) {
      if (str[i] === "{") count++;
      else if (str[i] === "}") {
        count--;
        if (count === 0) return i;
      }
    }
    return -1;
  };

  const parsedContent = parseMathTokens(raw);

  if (block) {
    return (
      <div
        className="w-full flex justify-center items-center overflow-x-auto bg-slate-950/60 border border-blue-500/20 rounded-xl p-5 my-4 shadow-[0_0_15px_rgba(59,130,246,0.06)] animate-in fade-in zoom-in-95 duration-200"
        id="math-block-container"
      >
        <div className="flex items-center flex-wrap justify-center gap-1 font-serif text-sm">
          {parsedContent}
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center justify-center gap-0.5 px-1 py-0.5 rounded bg-gray-950/40 border border-gray-800 font-serif text-xs align-middle">
      {parsedContent}
    </span>
  );
}
