import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in RND Nutrition app:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xl">
              RND
            </div>
            <h2 className="text-xl font-bold text-white">Something went wrong</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We encountered an issue loading the store. Click the button below to reload the page or reset local storage.
            </p>
            {this.state.error && (
              <pre className="text-[11px] text-left p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-rose-300 overflow-x-auto max-h-32 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Reload Store
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-xs transition-colors cursor-pointer"
              >
                Reset Saved Cart & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
