import { useState, useEffect } from 'react';

interface DataProps {
    valoresIniciais: any;
    validate: Function;
}

function useForm({
    valoresIniciais,
    validate,
}: DataProps) {
    const [values, setValues] = useState(valoresIniciais);
    const [errors, setErrors] = useState<any>({});
    const [touched, setTouched] = useState<any>({});

    function validateValues(newValues: any) {
        setErrors(validate(newValues));
    }

    useEffect(() => {
        validateValues(values);
    }, [values]);

    function setValue(chave: string, valor: string) {
        // chave: nome, descricao, bla, bli
        setValues({
            ...values,
            [chave]: valor, // nome: 'valor'
        });
    }
    //function handleChange(infosDoEvento: ChangeEvent<HTMLInputElement>) {
    function handleChange(infosDoEvento: any) {
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value,
        );
    }

    function handleBlur(event: any) {
        const field = event.target.getAttribute('name');

        setTouched({
            ...touched,
            [field]: true,
        });
    }

    function clearForm() {
        setValues(valoresIniciais);
        setErrors({});
        setTouched({});
    }

    return {
        values,
        handleChange,
        clearForm,
        errors,
        touched,
        handleBlur
    };
}

export default useForm;
