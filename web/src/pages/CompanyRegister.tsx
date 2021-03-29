import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiFilter, FiMinus, FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import FormField from '../components/FormField';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import useForm from '../hooks/useForm';
import api from '../services/api';
import '../styles/pages/survey-register.css';
import { mask, unMask } from '../utils/FormatterUtils';

interface Company {
    id: string;
    cnpj: string;
    name: string;
}

export default function CompanyRegister() {

    const valoresIniciais = {
        cnpj: '',
        name: '',
    };

    const {
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        clearForm
    } = useForm({
        valoresIniciais,
        validate: (values: any) => {
            const errors: any = {};

            if (values.name.trim() === '') {
                errors.name = 'Name is a required field';
            }
            if (values.cnpj.trim() === '') {
                errors.cnpj = 'CNPJ is a required field';
            }

            return errors;
        },
    });
    const history = useHistory();
    const [companys, setCompanys] = useState<Company[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState("");
    const [height, setHeight] = useState("0px");
    const [message, setMessage] = useState<string[]>([]);
    const [cnpjFilter, setCnpjFilter] = useState('');

    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {

        api.get(`/companys?cnpj=${unMask(cnpjFilter)}`).then(response => {
            const list = response.data;

            setCompanys(list);
        });

    }, [cnpjFilter]);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    const closeModal = (event: any) => {
        if (event.target.id === 'modal') {
            toggleModal();
        }
    };

    function handleAddCompany(event: FormEvent) {
        event.preventDefault();

        const formData = {
            name: values.name,
            cnpj: values.cnpj
        };

        api.post('/companys', formData).then(response => {
            if (response.status === 201) {
                const { message, company } = response.data
                setMessage(message);
                setCompanys([...companys, company]);
                toggleModal();
                clearForm();
            }
        }, err => {
            // console.log('Erro: ', err.response.data.error);
            const { error } = err.response.data

            setMessage(error.errors);
            setShowModal(prevState => !prevState);
        });

    }

    function toggleAddCompany() {
        setActive(active === "" ? "active" : "");
        if (content.current) {
            setHeight(active === "active" ? "0px" : `${content.current.scrollHeight}px`);
        }
    }

    return (
        <>
            <div id="survey-wrapper">
                <Header />
                <div className="survey-container">
                    <div className="title">
                        <h2>Companys</h2>
                        <div className="title-buttons">
                            <button className={`title-button ${active}`} onClick={(toggleAddCompany)}>
                                {active === "active"
                                    ? <FiMinus size={20} />
                                    : <FiPlus size={20} />
                                }
                                <strong>Add</strong>
                            </button>
                            <Dropdown
                                title={
                                    <>
                                        <FiFilter size={20} />
                                        <strong>Filter</strong>
                                    </>
                                }
                                item={
                                    <FormField
                                        label="CNPJ"
                                        name="cnpj"
                                        type="text"
                                        value={cnpjFilter}
                                        onChange={(event: any) => setCnpjFilter(event.target.value)}
                                        maxLength={18}
                                        patterns={['99.999.999/9999-99']}
                                    />
                                }
                            />
                        </div>
                    </div>
                    <div ref={content}
                        style={{ maxHeight: `${height}` }}
                        className="add-company-block">
                        <form onSubmit={handleAddCompany}>
                            <FormField
                                label="CNPJ"
                                name="cnpj"
                                type="text"
                                value={values.cnpj}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                hasError={touched.cnpj && errors.cnpj}
                                maxLength={18}
                                patterns={['99.999.999/9999-99']}
                            />
                            <FormField
                                label="Name"
                                name="name"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                hasError={touched.name && errors.name}
                            />
                            < button type="submit" disabled={errors.name || errors.cnpj}>
                                Confirm
                            </button>
                        </form>
                    </div>
                    <table className="table">
                        <thead className="thead-primary">
                            <tr>
                                <th className="thead-th-first">CNPJ</th>
                                <th>NAME</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companys.map(company => {
                                return (
                                    <tr key={company.id} className="alert">
                                        <td>
                                            {mask(company.cnpj, '99.999.999/9999-99')}
                                        </td>
                                        <td>{company.name}</td>
                                        <td className="img">
                                            <FiArrowRight size={20} onClick={() => {
                                                history.push({
                                                    pathname: '/survey-register',
                                                    state: {
                                                        id: company.id
                                                    }
                                                })
                                            }} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                showModal &&
                <Modal title="Add Company"
                    toogleModal={toggleModal}
                    closeModal={closeModal}
                    onClickOk={() => { setShowModal((prevState) => !prevState) }}
                >
                    {message.map((msg, index) => {
                        return (
                            <h2 key={`${msg.length}_${index}`}>{`- ${msg}`}</h2>
                        );
                    })}
                </Modal>
            }
        </>
    );
}