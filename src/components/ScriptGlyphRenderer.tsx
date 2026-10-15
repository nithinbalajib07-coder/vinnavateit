import React from 'react';
import { DomainId } from '../types/world';

interface ScriptGlyphRendererProps {
  text: string;
  domainId: DomainId;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showGlow?: boolean;
}

// Procedural SVG glyph generator based on character codes and domain writing tradition
export const ScriptGlyphRenderer: React.FC<ScriptGlyphRendererProps> = ({
  text,
  domainId,
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  // Normalize text to sequence of symbols
  const words = text.split(' ').filter(Boolean);

  const height = size === 'sm' ? 24 : size === 'md' ? 36 : 48;
  const widthPerChar = size === 'sm' ? 14 : size === 'md' ? 20 : 26;

  // Render glyph path based on character and domain aesthetic style
  const renderGlyph = (char: string, charIdx: number, globalCharIdx: number) => {
    const code = char.toLowerCase().charCodeAt(0) || 65;
    const seed = (code * 17 + globalCharIdx * 23) % 100;

    switch (domainId) {
      case 'tidereach': {
        // Thalassic Wave-Script: smooth undulating ribbons, loops, fluid river turns
        const cp1x = 4 + (seed % 6);
        const cp1y = 2 + (seed % 8);
        const cp2x = 14 - (seed % 5);
        const cp2y = 24 - (seed % 10);
        const endY = 18 + (seed % 8);
        const hasBubble = seed % 3 === 0;

        return (
          <g key={charIdx} transform={`translate(${charIdx * widthPerChar}, 0)`}>
            <path
              d={`M 3,${14 + (seed % 6)} C ${cp1x},${cp1y} ${cp2x},${cp2y} 16,${endY} S ${10 + (seed % 4)},${26} 4,${22}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={size === 'sm' ? 1.4 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {hasBubble && (
              <circle
                cx={10 + (seed % 4)}
                cy={6 + (seed % 6)}
                r={size === 'sm' ? 1.5 : 2}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
              />
            )}
          </g>
        );
      }

      case 'skydrift': {
        // Aero-Glyphs: ultra-thin vertical stalks, suspended aloft rings, airy tick-marks
        const stalkX = 10;
        const ringY = 6 + (seed % 10);
        const tickY = 16 + (seed % 8);
        const tickDir = seed % 2 === 0 ? 1 : -1;

        return (
          <g key={charIdx} transform={`translate(${charIdx * widthPerChar}, 0)`}>
            {/* Slender vertical updraft line */}
            <line
              x1={stalkX}
              y1={4}
              x2={stalkX}
              y2={26}
              stroke="currentColor"
              strokeWidth={size === 'sm' ? 1 : 1.5}
              strokeLinecap="round"
            />
            {/* Floating hollow ring */}
            <circle
              cx={stalkX + (seed % 3 === 0 ? 0 : tickDir * 3)}
              cy={ringY}
              r={size === 'sm' ? 2.5 : 3.5}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            />
            {/* Feather drift whisps */}
            <line
              x1={stalkX}
              y1={tickY}
              x2={stalkX + tickDir * 6}
              y2={tickY - 4}
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
            />
          </g>
        );
      }

      case 'stonemarch': {
        // Bedrock Cuneiform: heavy rectangular notches, stepped stone blocks, horizontal baselines
        const barY = 18;
        const notchType = seed % 4;

        return (
          <g key={charIdx} transform={`translate(${charIdx * widthPerChar}, 0)`}>
            {/* Grounding horizontal bar */}
            <line
              x1={3}
              y1={barY}
              x2={17}
              y2={barY}
              stroke="currentColor"
              strokeWidth={size === 'sm' ? 2.5 : 3.5}
              strokeLinecap="square"
            />
            {/* Chiseled vertical keystones */}
            {notchType === 0 && (
              <rect x={4} y={6} width={4} height={12} fill="currentColor" />
            )}
            {notchType === 1 && (
              <path d="M 6,6 L 14,6 L 10,14 Z" fill="currentColor" />
            )}
            {notchType === 2 && (
              <>
                <rect x={5} y={8} width={3} height={10} fill="currentColor" />
                <rect x={12} y={5} width={3} height={13} fill="currentColor" />
              </>
            )}
            {notchType === 3 && (
              <rect x={7} y={7} width={6} height={11} fill="none" stroke="currentColor" strokeWidth={2} />
            )}
          </g>
        );
      }

      case 'emberhold': {
        // Pyre-Forged Runes: sharp 45-degree diamond cuts, arrowhead chevrons, spark flares
        const flareType = seed % 3;

        return (
          <g key={charIdx} transform={`translate(${charIdx * widthPerChar}, 0)`}>
            {/* Dynamic diagonal strike */}
            <path
              d={
                flareType === 0
                  ? 'M 4,24 L 10,6 L 16,14 L 12,24'
                  : flareType === 1
                  ? 'M 5,8 L 15,8 L 8,18 L 15,24'
                  : 'M 10,4 L 16,16 L 4,16 Z'
              }
              fill="none"
              stroke="currentColor"
              strokeWidth={size === 'sm' ? 1.6 : 2.2}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            {/* Spark accent */}
            {seed % 2 === 0 && (
              <line
                x1={14}
                y1={6}
                x2={17}
                y2={3}
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            )}
          </g>
        );
      }
    }
  };

  let globalCharCounter = 0;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 w-full text-center ${className}`}>
      {words.map((word, wordIdx) => {
        const wordWidth = word.length * widthPerChar;
        return (
          <svg
            key={wordIdx}
            width={wordWidth}
            height={height}
            viewBox={`0 0 ${wordWidth} ${height}`}
            className={`overflow-visible transition-colors duration-300 flex-shrink-0 ${
              showGlow ? 'filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]' : ''
            }`}
            aria-label={`${word} in native script`}
          >
            {word.split('').map((char, charIdx) => {
              globalCharCounter++;
              return renderGlyph(char, charIdx, globalCharCounter);
            })}
          </svg>
        );
      })}
    </div>
  );
};
