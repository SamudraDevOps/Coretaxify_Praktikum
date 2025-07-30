import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";

function TabelNilaiMahasiswa({ onClose, sistemScores }) {
  const [activeTab, setActiveTab] = useState(0);
  const [collapsedSections, setCollapsedSections] = useState({});

  // Toggle collapse for specific sections
  const toggleCollapse = (sistemId, section) => {
    const key = `${sistemId}-${section}`;
    setCollapsedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate totals across all sistems
  const calculateGrandTotals = () => {
    let totalFaktur = 0;
    let totalBupot = 0;
    let totalSpt = 0;

    sistemScores.forEach(sistem => {
      totalFaktur += sistem.score_summary.total_faktur_scores || 0;
      totalBupot += sistem.score_summary.total_bupot_scores || 0;
      totalSpt += sistem.score_summary.total_spt_scores || 0;
    });

    return {
      totalFaktur,
      totalBupot,
      totalSpt,
      grandTotal: totalFaktur + totalBupot + totalSpt
    };
  };

  const grandTotals = calculateGrandTotals();

  // Render score table for each type
  const renderScoreTable = (scores, type, sistemId) => {
    const isCollapsed = collapsedSections[`${sistemId}-${type}`];
    
    return (
      <div className="mb-4">
        <div 
          className="flex items-center justify-between bg-gray-100 p-3 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => toggleCollapse(sistemId, type)}
        >
          <h4 className="font-semibold capitalize text-gray-700">
            {type.toUpperCase()} Scores ({scores.length} items)
          </h4>
          <span className="text-gray-500">
            {isCollapsed ? '▼' : '▲'}
          </span>
        </div>
        
        {!isCollapsed && (
          <div className="border border-gray-200">
            {scores.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">ID</th>
                    <th className="px-4 py-2 text-left border-b">Score</th>
                    <th className="px-4 py-2 text-left border-b">Created At</th>
                    <th className="px-4 py-2 text-left border-b">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr key={score.id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{score.id}</td>
                      <td className="px-4 py-2 border-b font-semibold text-blue-600">
                        {parseFloat(score.score).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-600">
                        {new Date(score.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-600">
                        {new Date(score.updated_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No {type} scores available
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!sistemScores || sistemScores.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Nilai Mahasiswa</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <RxCross1 size={20} />
            </button>
          </div>
          <p className="text-center text-gray-500">No score data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Nilai Mahasiswa</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Grand Totals Summary */}
        <div className="p-6 bg-gray-50 border-b">
          <h4 className="text-lg font-semibold mb-3">Summary Across All Systems</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Total Faktur</div>
              <div className="text-xl font-bold text-blue-600">{grandTotals.totalFaktur}</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Total Bupot</div>
              <div className="text-xl font-bold text-green-600">{grandTotals.totalBupot}</div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Total SPT</div>
              <div className="text-xl font-bold text-yellow-600">{grandTotals.totalSpt}</div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Grand Total</div>
              <div className="text-xl font-bold text-purple-600">{grandTotals.grandTotal}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {sistemScores.map((sistem, index) => (
            <button
              key={sistem.sistem_id}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === index
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(index)}
            >
              Sistem {sistem.sistem_id}
              <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-full">
                {sistem.score_summary.total_all_scores}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {sistemScores[activeTab] && (
            <div>
              {/* Sistem Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Sistem Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sistem ID:</span>
                    <span className="ml-2 font-medium">{sistemScores[activeTab].sistem_id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Scores:</span>
                    <span className="ml-2 font-medium">{sistemScores[activeTab].score_summary.total_all_scores}</span>
                  </div>
                </div>
              </div>

              {/* Score Summary for Current Sistem */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Score Summary</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Faktur Scores</div>
                    <div className="text-lg font-bold text-blue-600">
                      {sistemScores[activeTab].score_summary.total_faktur_scores || 0}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Bupot Scores</div>
                    <div className="text-lg font-bold text-green-600">
                      {sistemScores[activeTab].score_summary.total_bupot_scores || 0}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">SPT Scores</div>
                    <div className="text-lg font-bold text-yellow-600">
                      {sistemScores[activeTab].score_summary.total_spt_scores || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Tables */}
              <div className="space-y-4">
                {renderScoreTable(
                  sistemScores[activeTab].scores.faktur_scores || [], 
                  'faktur', 
                  sistemScores[activeTab].sistem_id
                )}
                {renderScoreTable(
                  sistemScores[activeTab].scores.bupot_scores || [], 
                  'bupot', 
                  sistemScores[activeTab].sistem_id
                )}
                {renderScoreTable(
                  sistemScores[activeTab].scores.spt_scores || [], 
                  'spt', 
                  sistemScores[activeTab].sistem_id
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelNilaiMahasiswa;
