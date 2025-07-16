import React from "react";

const LoadingData = () => {
    return (
        <div className="loadingContainer">
            <div className="spinner"></div>
            <p>Loading, please wait...</p>
        </div>
    );
};

export default React.memo(LoadingData);