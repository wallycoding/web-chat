import './index.css';

export const Loader = props => {
    return props.hasLoading ? (
        <div className="loader-page">
            <div></div>
        </div>
    ) : null;
}

export default Loader;