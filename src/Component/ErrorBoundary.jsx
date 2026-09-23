import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="error">Something went wrong.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
