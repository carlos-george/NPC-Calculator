import React, { useEffect, useState } from 'react';
import Detractor from '../components/Detractor';
import Header from '../components/Header';
import NpsResult from '../components/NpsResult';
import Passives from '../components/Passives';
import Promoter from '../components/Promoter';
import '../styles/pages/calculator.css';


function Calculator() {

    const [promoterTotal, setPromoterTotal] = useState<number>(0);
    const [percPromoter, setPercPromoter] = useState<number>(0);
    const [passivesTotal, setPassivesTotal] = useState<number>(0);
    const [detractorsTotal, setDetractorsTotal] = useState<number>(0);
    const [percDetractor, setPercDetractor] = useState<number>(0);
    const [calculated, setCalculated] = useState<number>(0);

    useEffect(() => {

        const totalAnswers = promoterTotal + detractorsTotal + passivesTotal;
        // console.log(totalAnswers);
        // console.log('Promotors: ' + promoterTotal, 'Detractors: ' + detractorsTotal, 'Passives: ' + passivesTotal);
        if (totalAnswers > 0) {

            const percPromoterCalculed = ((promoterTotal / totalAnswers) * 100).toFixed();
            const percDetractorCalculed = ((detractorsTotal / totalAnswers) * 100).toFixed();

            const calculatedTotal = (((promoterTotal - detractorsTotal) / totalAnswers) * 100).toFixed(2);
            setCalculated(Number(calculatedTotal));
            setPercPromoter(Number(percPromoterCalculed));
            setPercDetractor(Number(percDetractorCalculed));
        }

    }, [promoterTotal, passivesTotal, detractorsTotal]);

    function onChangeTotalPromoter(totalPromoters: number) {

        setPromoterTotal(totalPromoters);
    }

    function onChangeTotalPassives(totalPassives: number) {

        setPassivesTotal(totalPassives);
    }

    function onChangeTotalDetractor(totalDetractor: number) {

        setDetractorsTotal(totalDetractor);
    }

    return (
        <div>
            <Header />
            <div id="home-container">
                <header>
                    <h2>
                        Calculate your NPS® (Net Promoter Score)
                </h2>
                    <p>
                        Calculating your NPS score is as simple as tallying up your responses and subtracting the percentage of detractors from the percentage of promoters. The score is a whole number that ranges from -100 to 100, and indicates customer happiness with your brand experience.
                </p>
                    <p>
                        Use the calculator below to calculate your NPS from your survey responses.
                </p>
                </header>
                <main>
                    <div className="line-divisor">
                        <div className="nps-calculator">
                            <strong>NPS CALCULATOR</strong>
                        </div>
                    </div>
                    <div className="first-row">
                        <div className="count-responses">
                            <p><strong>Count the responses</strong></p>
                            <p>Add up the number of responses provided for each score.</p>
                        </div>
                        <Promoter setTotal={onChangeTotalPromoter} />
                        <Passives setTotal={onChangeTotalPassives} />
                        <Detractor setTotal={onChangeTotalDetractor} />
                    </div>
                    <div className="line-divisor">

                    </div>
                    <div className="second-row">
                        <div className="count-responses">
                            <p><strong>Calculate your NPS</strong></p>
                            <p>Subtract the percentage of Detractors from the percentage of Promoters.</p>
                        </div>
                        <Promoter isTotalField={true} valueTotal={promoterTotal} />
                        <Passives isTotalField={true} valueTotal={passivesTotal} />
                        <Detractor isTotalField={true} valueTotal={detractorsTotal} />
                    </div>

                    <div className="line-divisor">

                    </div>
                    <div className="second-row">
                        <div className="count-responses">
                            <p><strong>Calculate your NPS</strong></p>
                            <p>Subtract the percentage of Detractors from the percentage of Promoters.</p>
                        </div>
                        <NpsResult isPromoter valuePerc={percPromoter} />
                        <h1><strong> - </strong></h1>
                        <NpsResult isDetractor valuePerc={percDetractor} />
                        <h1><strong> = </strong></h1>
                        <NpsResult isNpsResult valuePerc={calculated} />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Calculator;