import { Component } from "react";

const KEY = "activity-logs";

// Task 3: class component with lifecycle methods
export default class ActivityLogger extends Component {
  state = { logs: [], toast: null };
  timer = null;

  componentDidMount() {
    // load saved logs from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      this.setState({ logs: saved });
    } catch {
      this.setState({ logs: [] });
    }
    window.addEventListener("storage", this.handleStorage);
  }

  componentDidUpdate(prevProps, prevState) {
    // new event from parent -> add to logs and show toast
    if (this.props.event && this.props.event !== prevProps.event) {
      const entry = { ...this.props.event, time: new Date().toLocaleTimeString() };
      this.setState((s) => ({ logs: [entry, ...s.logs].slice(0, 50), toast: entry.message }));
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.setState({ toast: null }), 2500);
    }
    // persist logs
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem(KEY, JSON.stringify(this.state.logs));
    }
  }

  componentWillUnmount() {
    // cleanup timer + listener
    clearTimeout(this.timer);
    window.removeEventListener("storage", this.handleStorage);
  }

  handleStorage = (e) => {
    if (e.key === KEY) this.setState({ logs: JSON.parse(e.newValue || "[]") });
  };

  clearLogs = () => this.setState({ logs: [] });

  render() {
    const { logs, toast } = this.state;
    return (
      <div>
        {toast && <div className="toast">{toast}</div>}
        <button onClick={this.clearLogs}>Clear log</button>
        <ul className="logs">
          {logs.length === 0 && <li>No activity yet</li>}
          {logs.map((l) => (
            <li key={l.id}>[{l.time}] {l.message}</li>
          ))}
        </ul>
      </div>
    );
  }
}
