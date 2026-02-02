import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught Error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 text-center transition-colors duration-500">
            <div className="flex flex-col items-center max-w-md">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle size={32} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-4 italic">
                    Temporal Dissonance
                </h1>
                <p className="text-[var(--text-secondary)] font-medium mb-8">
                    Our chronometer encountered a critical disruption. The timeline has paused to prevent further data corruption.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={this.handleReload}
                    className="flex items-center gap-2 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform"
                  >
                    <RefreshCw size={14} /> Stabilize
                  </button>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    Return Home
                  </button>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
