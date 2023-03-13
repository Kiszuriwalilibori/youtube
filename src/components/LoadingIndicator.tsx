import ReactDOM from "react-dom";

const LoadingIndicator = () => {
    return ReactDOM.createPortal(<article className="loading">Loading&#8230;</article>, document.body);
};

export default LoadingIndicator;
