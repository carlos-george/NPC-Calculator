import React from 'react';
import { FiMeh } from 'react-icons/fi';
import './../styles/components/passives.css';
import CalculatorField from './CalculatorField';

interface DadosTela {
    isTotalField?: boolean;
    valueTotal?: number;
    setTotal?: Function;
}

export default function Passives({ isTotalField = false, valueTotal = 0, setTotal }: DadosTela) {


    return (
        <div className="group-passives">
            <FiMeh size={60} color="#5a5a5a" />

            {isTotalField
                ? <CalculatorField labelsInputs={['Total']} valueTotal={valueTotal} />
                : <CalculatorField labelsInputs={[8, 7]} setTotal={setTotal} />
            }
        </div >
    );
}