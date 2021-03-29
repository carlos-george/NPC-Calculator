import React from 'react';
import { FiFrown } from 'react-icons/fi';
import './../styles/components/detractors.css';
import CalculatorField from './CalculatorField';

interface DadosTela {
    isTotalField?: boolean;
    valueTotal?: number;
    setTotal?: Function;
}

export default function Detractor({ isTotalField = false, valueTotal = 0, setTotal }: DadosTela) {

    return (
        <div className="group-detractors" style={!isTotalField ? { width: '410px' } : { width: '150px' }}>
            <FiFrown size={60} color="#d83131" />

            {isTotalField
                ? <CalculatorField labelsInputs={['Total']} valueTotal={valueTotal} />
                : <CalculatorField labelsInputs={[6, 5, 4, 3, 2, 1]} setTotal={setTotal} />
            }

        </div >
    );
}