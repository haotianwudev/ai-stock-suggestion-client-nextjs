import { StrategyDetailProps } from '../strategy-config';

export const DefaultStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="content-card p-4 md:p-6 mt-6 md:mt-8 animate-fade-in">
      <button 
        onClick={onBack} 
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
        aria-label="Back to all strategies"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to all strategies</span>
      </button>

      <h2 className="text-2xl md:text-3xl font-bold leading-tight">{strategy.name}</h2>
      <p className="mt-2 text-sm md:text-base text-gray-700 leading-relaxed">{strategy.description}</p>
      
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-center">
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-gray-500">Risk / Reward</p>
          <p className="text-sm md:text-lg font-semibold leading-tight">{strategy.profile}</p>
        </div>
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-gray-500">Volatility View</p>
          <p className="text-sm md:text-lg font-semibold leading-tight">{strategy.volatility}</p>
        </div>
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-gray-500">Time Decay View</p>
          <p className="text-sm md:text-lg font-semibold leading-tight">{strategy.time}</p>
        </div>
      </div>
    </div>
  );
};
