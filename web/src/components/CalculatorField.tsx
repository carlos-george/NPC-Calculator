import React, { useEffect, useState } from 'react';

interface DadosTela {
    labelsInputs: Array<any>;
    setTotal?: Function;
    valueTotal?: number;
}

interface CalculatorField {
    fieldId: string;
    label: string;
    value: string;
}

export default function CalculatorField({ labelsInputs, setTotal, valueTotal }: DadosTela) {

    const [listInputs, setListInputs] = useState<CalculatorField[]>([]);

    useEffect(() => {

        const listFields = labelsInputs.map(value => {
            // const valueLabel = 10 - value;
            const field = {
                fieldId: `field${value}`,
                label: String(value),
                value: ''
            }
            return field;
        });
        setListInputs(listFields);
    }, []);

    function handleOnChange(event: any, fieldId: string) {

        const newListInputs = listInputs.map(item => {
            if (item.fieldId === fieldId) {
                item.value = event.target.value;
            }

            return item;
        });

        setListInputs(newListInputs);

        const valorTotal = listInputs.map(item => Number(item.value)).reduce((valorAtual, valor) => valorAtual + valor);

        if (setTotal) {

            setTotal(valorTotal);
        }
    }

    return (
        <div className="group-inputs">

            {listInputs.map((item, index) => (
                <div key={String(index)} className="input-block" >
                    <label htmlFor={item.fieldId}>{item.label}</label>
                    <input
                        type="number"
                        id={item.fieldId}
                        min={1}
                        value={valueTotal}
                        onChange={(event) => {
                            handleOnChange(event, item.fieldId)
                        }}
                    />
                </div>
            )
            )}
        </div>
    );
}
