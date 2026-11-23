import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WISDOM_MAPS, WisdomMapNode } from '../data/libraryAndMaps';
import { PageUtilityBar } from '../components/PageUtilityBar';

export const WisdomMapsPage: React.FC = () => {
  const { routeParam, lang, navigate } = useApp();
  const [selectedMapId, setSelectedMapId] = useState(
    routeParam && WISDOM_MAPS.some((m) => m.id === routeParam) ? routeParam : WISDOM_MAPS[0].id
  );
  const [selectedNode, setSelectedNode] = useState<WisdomMapNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (routeParam && WISDOM_MAPS.some((m) => m.id === routeParam)) {
      setSelectedMapId(routeParam);
    }
  }, [routeParam]);

  const activeMap = WISDOM_MAPS.find((m) => m.id === selectedMapId) || WISDOM_MAPS[0];

  useEffect(() => {
    setSelectedNode(activeMap.nodes[0]);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [activeMap.id]);

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeMap.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Wisdom Maps" breadcrumbTa="ஞான வரைபடங்கள்" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              ஞான வரைபடங்கள் · INTERACTIVE CONCEPT DIAGRAMS
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'ஆன்மிக ஞான வரைபடங்கள்' : 'Interactive Wisdom Maps'}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {WISDOM_MAPS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMapId(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  m.id === activeMap.id
                    ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                    : 'border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-[#5C4F42] dark:text-[#CBBBA0]'
                }`}
              >
                {lang === 'ta' ? m.titleTa : m.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Stage + Explanation Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-wrap items-center justify-between gap-2 bg-[#F6ECD8]/50 dark:bg-[#15243A]">
              <p className="text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0]">
                {activeMap.subtitle}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
                  className="p-1.5 rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
                  className="p-1.5 rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPan((p) => ({ ...p, x: p.x - 30 }))}
                  className="px-2 py-1 text-xs rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={() => setPan((p) => ({ ...p, x: p.x + 30 }))}
                  className="px-2 py-1 text-xs rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                >
                  →
                </button>
                <button
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className="p-1.5 rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                  aria-label="Reset view"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadSvg}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#314B3B] text-[#FFF9ED] text-xs font-medium cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SVG</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#FFF9ED] dark:bg-[#0F1A2B] bg-kolam-lattice overflow-hidden">
              <svg
                ref={svgRef}
                viewBox="0 0 900 490"
                className="w-full h-[420px] select-none"
                role="img"
                aria-label={activeMap.title}
              >
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: '450px 245px' }}>
                  {activeMap.edges.map((edge, idx) => {
                    const fromNode = activeMap.nodes.find((n) => n.id === edge.from);
                    const toNode = activeMap.nodes.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    return (
                      <line
                        key={idx}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#C6A15B"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                    );
                  })}

                  {activeMap.nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const fillColor =
                      node.role === 'root' ? '#641E24' : node.role === 'branch' ? '#172B45' : '#314B3B';
                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer"
                      >
                        <rect
                          x={-118}
                          y={-34}
                          width={236}
                          height={68}
                          rx={12}
                          fill={fillColor}
                          stroke={isSelected ? '#D9822B' : '#C6A15B'}
                          strokeWidth={isSelected ? 3.5 : 1.5}
                        />
                        <text
                          textAnchor="middle"
                          y={-4}
                          fill="#FFF9ED"
                          fontSize="12.5"
                          fontWeight="700"
                        >
                          {node.label}
                        </text>
                        <text
                          textAnchor="middle"
                          y={16}
                          fill="#D8BD91"
                          fontSize="11.5"
                        >
                          {node.labelTa}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* Right Concept Detail Deck */}
          <aside className="lg:col-span-4 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4">
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B]">
              SELECTED CONCEPT NODE
            </p>
            {selectedNode ? (
              <>
                <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  {selectedNode.label}
                </h2>
                <p className="font-tamil text-base font-semibold text-[#641E24] dark:text-[#D4B16E]">
                  {selectedNode.labelTa}
                </p>
                <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {lang === 'ta' ? selectedNode.explanationTa : selectedNode.explanation}
                </p>
                {selectedNode.relatedLessonId && (
                  <button
                    onClick={() => navigate('vedanta', selectedNode.relatedLessonId)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                  >
                    <span>Open Linked Vedanta Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            ) : (
              <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                Click any node on the diagram to inspect its bilingual explanation.
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
