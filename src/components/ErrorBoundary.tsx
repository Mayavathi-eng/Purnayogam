import React from 'react';

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'An unexpected error occurred.' };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Sanctuary ErrorBoundary caught:', error, info);
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF9ED] dark:bg-[#0F1A2B] px-6 py-12">
          <div className="max-w-lg w-full border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] rounded-xl p-8 text-center">
            <h1 className="font-display text-2xl font-semibold text-[#641E24] dark:text-[#D4B16E] mb-3">
              PURNA YOGAM — Recovery Notice
            </h1>
            <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] mb-6 leading-relaxed">
              We encountered an unexpected interruption while rendering this section. Your public learning modules remain safe.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, message: '' });
                window.location.hash = '#/home';
              }}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-[#641E24] text-[#FFF9ED] hover:bg-[#4e161b] transition-colors"
            >
              Return to Sanctuary Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
