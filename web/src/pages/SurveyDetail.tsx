import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';

import '../styles/pages/survey-detail.css';
import backIcon from '../assets/images/icons/back.svg';
import api from '../services/api';
import Promoter from '../components/Promoter';
import Passives from '../components/Passives';
import Detractor from '../components/Detractor';
import NpsResult from '../components/NpsResult';

interface SurveyProps {
    surveyCompany_id: string;
}

interface Survey {
    title: string;
    description: string;
    totalDetractors: number,
    totalPromotors: number,
    totalPassives: number,
    totalAnswers: number,
    nps: number
}

function SurveyDetail() {
    const history = useHistory();
    const { state, } = useLocation();
    const {
        surveyCompany_id
    } = state as SurveyProps;

    const [survey, setSurvey] = useState<Survey>({
        title: '',
        description: '',
        totalDetractors: 0,
        totalPromotors: 0,
        totalPassives: 0,
        totalAnswers: 0,
        nps: 0,
    });
    const [percPromoter, setPercPromoter] = useState<number>(0);
    const [percDetractor, setPercDetractor] = useState<number>(0);

    useEffect(() => {
        api.get(`/survey-company/${surveyCompany_id}/answers`).then(response => {
            const {
                survey,
                totalDetractors,
                totalPromotors,
                totalPassives,
                totalAnswers,
                nps } = response.data;

            const result = {
                title: survey.title,
                description: survey.description,
                totalDetractors,
                totalPromotors,
                totalPassives,
                totalAnswers,
                nps
            };

            const isTotalAnswersThenZero = totalAnswers > 0;

            const percPromoterCalculed = isTotalAnswersThenZero ? ((totalPromotors / totalAnswers) * 100).toFixed() : '0';
            const percDetractorCalculed = isTotalAnswersThenZero ? ((totalDetractors / totalAnswers) * 100).toFixed() : '0';

            setPercPromoter(Number(percPromoterCalculed));
            setPercDetractor(Number(percDetractorCalculed));
            setSurvey(result);
        });
    }, []);

    return (
        <div id="survey-detail-wrapper">
            <Header />
            <div className="survey-container">
                <img src={backIcon} alt="Voltar" onClick={() => history.goBack()} />
                <div className="survey-head">
                    <div className="survey-head-details">
                        <h1>{survey.title}</h1>
                        <h3>{survey.description}</h3>
                    </div>
                    <div className="line-divisor">
                        <div className="nps-calculator">
                            <strong>NPS CALCULATOR</strong>
                        </div>
                    </div>
                    <div className="answers-wrapper">
                        <div className="row">
                            <div className="count-responses">
                                <p><strong>Calculate your NPS</strong></p>
                                <p>Subtract the percentage of Detractors from the percentage of Promoters.</p>
                            </div>
                            <Promoter isTotalField={true} valueTotal={survey.totalPromotors} />
                            <Passives isTotalField={true} valueTotal={survey.totalPassives} />
                            <Detractor isTotalField={true} valueTotal={survey.totalDetractors} />
                        </div>

                        <div className="line-divisor">

                        </div>
                        <div className="row">
                            <div className="count-responses">
                                <p><strong>Calculate your NPS</strong></p>
                                <p>Subtract the percentage of Detractors from the percentage of Promoters.</p>
                            </div>
                            <NpsResult isPromoter valuePerc={percPromoter} />
                            <h1><strong> - </strong></h1>
                            <NpsResult isDetractor valuePerc={percDetractor} />
                            <h1><strong> = </strong></h1>
                            <NpsResult isNpsResult valuePerc={survey.nps} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SurveyDetail;