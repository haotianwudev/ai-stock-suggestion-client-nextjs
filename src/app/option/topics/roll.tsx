'use client';

import { RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function RollContent() {
  const config = getTopicConfig('roll');
  
  if (!config) return null;

  // Define color scheme for rolling options (blue theme)
  const heroColorScheme = {
    border: "border-blue-200",
    background: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    descriptionColor: "text-blue-700",
    cardBg: "bg-white",
    cardBorder: "border border-blue-100",
    cardText: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    sectionTitle: "text-blue-900"
  };

  // Define custom content sections
  const contentSections = (
    <>
      {/* Rolling Types */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Types of Rolling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h4 className="font-semibold text-red-700">Defensive Rolling</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Managing challenged positions when price moves against you
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Roll down & out (puts) or up & out (calls)</div>
              <div>• Must collect net credit</div>
              <div>• Triggered by Delta: -0.35 to -0.50</div>
            </div>
          </div>
          
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-semibold text-green-700">Offensive Rolling</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Optimizing profitable positions for better capital efficiency
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Roll up & out (puts) or down & out (calls)</div>
              <div>• Capture 80-90% of max profit first</div>
              <div>• Redeploy capital at better strikes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Principles */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Universal Principles</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Thesis Check</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Only roll if your original thesis remains valid. If broken, close the trade.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">Net Credit Rule</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Defensive rolls MUST collect net credit to lower breakeven point.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Volatility Aware</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Roll when IV Rank &gt; 50. High volatility inflates premium collection.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">DTE Management</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Manage positions at &le; 21 DTE to avoid gamma risk near expiration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Decision Framework</h3>
        <div className="bg-white border border-blue-100 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-blue-900">Scenario</th>
                  <th className="px-3 py-2 text-left font-medium text-blue-900">Thesis</th>
                  <th className="px-3 py-2 text-left font-medium text-blue-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                <tr>
                  <td className="px-3 py-2 text-gray-700">Price moves against, strike breached</td>
                  <td className="px-3 py-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">Intact</Badge>
                  </td>
                  <td className="px-3 py-2 font-medium text-blue-600">Defensive Roll (Credit)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-gray-700">Price moves against, thesis broken</td>
                  <td className="px-3 py-2">
                    <Badge className="bg-red-100 text-red-800 text-xs">Broken</Badge>
                  </td>
                  <td className="px-3 py-2 font-medium text-red-600">Close Position</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-gray-700">Captured 80%+ profit</td>
                  <td className="px-3 py-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">Intact</Badge>
                  </td>
                  <td className="px-3 py-2 font-medium text-green-600">Offensive Roll</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-gray-700">Max loss reached (2-3x credit)</td>
                  <td className="px-3 py-2">
                    <Badge className="bg-gray-100 text-gray-800 text-xs">Any</Badge>
                  </td>
                  <td className="px-3 py-2 font-medium text-red-600">Close Position</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Greeks as Triggers */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Greeks as Decision Triggers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Delta Triggers</h4>
            <p className="text-sm text-gray-600 mb-2">
              Use delta as objective probability proxy for management decisions
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Short Put: Delta reaches -0.35 to -0.50</div>
              <div>• Short Call: Delta reaches +0.35 to +0.50</div>
              <div>• Avoid emotional price-based decisions</div>
            </div>
          </div>
          
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Vega Considerations</h4>
            <p className="text-sm text-gray-600 mb-2">
              Rolling is most favorable in high volatility environments
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Prefer IV Rank &gt; 50 for rolling</div>
              <div>• High IV inflates premium collection</div>
              <div>• Avoid rolling in low volatility</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Implementation</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Quantitative Triggers</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Risk Management</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Capital Efficiency</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Greeks Analysis</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Volatility Timing</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<RotateCcw className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Strategic Framework for Rolling Options - Comprehensive Visual Guide"
    />
  );
}