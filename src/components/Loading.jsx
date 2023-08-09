import React from 'react';
import '../assets/styles/components/Loading.scss';

const Loading = () => {

    return (
        <div className="dimScreen">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="loading">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading;