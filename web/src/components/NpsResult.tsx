import React from 'react';
import { FiSmile, FiFrown } from 'react-icons/fi';
import './../styles/components/nps-result.css';

interface DadosTela {
    valuePerc?: number;
    isPromoter?: boolean;
    isDetractor?: boolean;
    isNpsResult?: boolean;
}

export default function NpsResult({ isPromoter, isDetractor, isNpsResult, valuePerc }: DadosTela) {

    return (
        <div className="nps-result-container">
            {isPromoter &&
                <div className="result-promoters">
                    <FiSmile size={60} color="#7cd633" />
                    <h2>
                        {valuePerc}%
                    </h2>
                    <strong>
                        of total responses
                    </strong>
                </div >
            }
            {isDetractor &&
                <div className="result-detractors">
                    <FiFrown size={60} color="#d83131" />
                    <h2>
                        {valuePerc}%
                </h2>
                    <strong>
                        of total responses
                </strong>
                </div >
            }
            {isNpsResult &&
                <div className="nps">
                    <div className="nps-icon">
                        <strong>NPS</strong>
                    </div>
                    <h2>
                        {valuePerc}
                    </h2>
                    <strong>
                        This is your NPS
                </strong>
                </div >
            }
        </div>

    );
}