import React from 'react';
import { FiSmile } from 'react-icons/fi';
import './../styles/components/promoter.css';
import CalculatorField from './CalculatorField';

interface DadosTela {
    isTotalField?: boolean;
    valueTotal?: number;
    setTotal?: Function;
}

function Promoter({ isTotalField = false, valueTotal = 0, setTotal }: DadosTela) {

    return (
        <div className="group-promoters">
            <FiSmile size={60} color="#7cd633" />
            {isTotalField
                ? <CalculatorField labelsInputs={['Total']} valueTotal={valueTotal} />
                : <CalculatorField labelsInputs={[10, 9]} setTotal={setTotal} />
            }
        </div >
    );
}

export default Promoter