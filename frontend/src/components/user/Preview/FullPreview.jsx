import React, { useState } from "react";
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react";
import LivePreview from "./LivePreview";

const FullPreview = ({ formData, setActiveTab, currentTemplate }) => {
    const [zoom, setZoom] = useState(1);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Toolbar */}
            <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setActiveTab("builder")}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                    >
                        <ArrowLeft size={20} />
                        Back to Editor
                    </button>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <h1 className="text-lg font-semibold text-slate-800">
                        {formData.fullName || "Untitled Resume"}
                        {currentTemplate?.name && (
                            <span className="text-slate-500 font-normal ml-2 text-sm hidden sm:inline">
                                - {currentTemplate.name} Template
                            </span>
                        )}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                        onClick={() => window.print()}
                    >
                        <Printer size={18} />
                        <span className="hidden sm:inline">Print</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                        <Download size={18} />
                        <span className="hidden sm:inline">Download PDF</span>
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto bg-slate-100/50 p-8 flex justify-center">
                <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm overflow-hidden">
                    {/* We create a wrapper that mocks the behavior expected by LivePreview or we instantiate the component directly if we can access it.
                 However, LivePreview already renders a 'card' style container in normal mode.
                 Ideally, we'd refactor LivePreview to separate the content from the container. 
                 For now, we will use LivePreview and hide its header/borders via CSS or just accept the card look inside this full page view.
             */}
                    <div className="pointer-events-none scale-[0.85] origin-top md:scale-100">
                        <LivePreview
                            formData={formData}
                            currentTemplate={currentTemplate}
                            isExpanded={false}
                            // Pass dummy handlers as we don't need expand/collapse here
                            onExpand={() => { }}
                            onCollapse={() => { }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullPreview;
