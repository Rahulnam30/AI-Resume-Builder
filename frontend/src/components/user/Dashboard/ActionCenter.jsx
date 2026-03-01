import { HiOutlineLightningBolt, HiOutlineRefresh, HiOutlineCheckCircle } from 'react-icons/hi';
import { FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const ActionCenter = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-full w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <div className="bg-orange-50 text-orange-500 p-1.5 rounded-lg">
                        <HiOutlineLightningBolt className="text-xl" />
                    </div>
                    Growth Actions
                </h3>
                <button className="text-blue-600 text-sm font-bold hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                    Scan Now <FiTrendingUp />
                </button>
            </div>

            <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                {/* Warning Item */}
                <div className="group flex items-start gap-3 p-4 rounded-xl border-l-4 border-l-orange-500 border-t border-r border-b border-slate-100 bg-orange-50/30 hover:shadow-md hover:bg-orange-50/60 transition-all cursor-pointer">
                    <FiAlertCircle className="text-orange-500 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-slate-700 font-semibold leading-relaxed mb-2 group-hover:text-slate-900 transition-colors">
                            Add more quantifiable metrics to your 'Experience' section.
                        </p>
                        <button className="text-blue-600 font-bold text-xs flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            Address Fix <FaArrowRight className="text-[10px]" />
                        </button>
                    </div>
                </div>

                {/* Info Item */}
                <div className="group flex items-start gap-3 p-4 rounded-xl border-l-4 border-l-blue-500 border-t border-r border-b border-slate-100 bg-blue-50/30 hover:shadow-md hover:bg-blue-50/60 transition-all cursor-pointer">
                    <HiOutlineRefresh className="text-blue-500 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-slate-700 font-semibold leading-relaxed mb-2 group-hover:text-slate-900 transition-colors">
                            Your summary is a bit too long. Try condensing it to 3-4 lines.
                        </p>
                        <button className="text-blue-600 font-bold text-xs flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            Address Fix <FaArrowRight className="text-[10px]" />
                        </button>
                    </div>
                </div>

                {/* Success Item */}
                <div className="group flex items-start gap-3 p-4 rounded-xl border-l-4 border-l-emerald-500 border-t border-r border-b border-slate-100 bg-emerald-50/30 hover:shadow-sm">
                    <HiOutlineCheckCircle className="text-emerald-500 text-xl flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-slate-700 font-semibold">
                            Great structure! Section headings are perfectly formatted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionCenter;
