import { BypassResult } from '../types';

/**
 * Escapes a string value for standard CSV formatting (RFC 4180)
 */
function escapeCsv(value: any): string {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Triggers a browser download of a generated file blob
 */
export function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports single or multiple bypass results to JSON
 */
export function exportResultsToJson(results: BypassResult | BypassResult[], customName?: string) {
  const isArray = Array.isArray(results);
  const data = {
    exportedAt: new Date().toISOString(),
    engine: "Universal Autonomous Shortlink Auto-Bypass Engine",
    totalItems: isArray ? results.length : 1,
    successfulItems: isArray 
      ? results.filter(r => r.success).length 
      : (results.success ? 1 : 0),
    data: results
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const filename = customName || `bypass_report_${isArray ? 'batch' : 'single'}_${timestamp}.json`;
  
  triggerDownload(jsonStr, filename, 'application/json;charset=utf-8;');
}

/**
 * Exports single or multiple bypass results to CSV
 */
export function exportResultsToCsv(results: BypassResult | BypassResult[], customName?: string) {
  const list: BypassResult[] = Array.isArray(results) ? results : [results];
  
  const headers = [
    'Timestamp',
    'Status',
    'Original URL',
    'Destination URL',
    'Bypass Method',
    'Category',
    'Zero-Day Autonomous',
    'Execution Time (ms)',
    'Hops Count',
    'Hops Trace',
    'Error Details'
  ];

  const rows = list.map(item => {
    const hopsTrace = item.hops && item.hops.length > 0 
      ? item.hops.map((h, i) => `#${i + 1}: ${h.url} [${h.type || 'hop'}]`).join(' -> ')
      : '';

    return [
      escapeCsv(new Date().toISOString()),
      escapeCsv(item.success ? 'SUCCESS' : 'FAILED'),
      escapeCsv(item.originalUrl || ''),
      escapeCsv(item.destinationUrl || ''),
      escapeCsv(item.method || 'Unknown'),
      escapeCsv(item.category || 'N/A'),
      escapeCsv(item.isAutonomous ? 'TRUE' : 'FALSE'),
      escapeCsv(item.timeMs !== undefined ? item.timeMs : ''),
      escapeCsv(item.hops ? item.hops.length : 0),
      escapeCsv(hopsTrace),
      escapeCsv(item.error || '')
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const filename = customName || `bypass_report_${Array.isArray(results) ? 'batch' : 'single'}_${timestamp}.csv`;

  triggerDownload(csvContent, filename, 'text/csv;charset=utf-8;');
}
