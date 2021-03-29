import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiMinus, FiPlus, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

import backIcon from '../assets/images/icons/back.svg';
import FormField from '../components/FormField';
import Header from '../components/Header';
import Modal from '../components/Modal';
import useForm from '../hooks/useForm';
import api from '../services/api';
import '../styles/pages/survey-register.css';

interface Survey {
    surveyCompany_id: string;
    isActive: boolean;
    survey_id: string;
    title: string;
    description: string;
}

interface Company {
    id: string,
    name: string;
    cnpj: string;
}

export default function CompanyRegister() {

    const valoresIniciais = {
        title: '',
        description: '',
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

            if (values.title.trim() === '') {
                errors.title = 'Title is a required field';
            }
            if (values.description.trim() === '') {
                errors.description = 'Description is a required field';
            }

            return errors;
        },
    });
    const { state } = useLocation();
    const {
        id
    } = state as Company;
    const history = useHistory();
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [company, setCompany] = useState<Company>({
        id: '',
        name: '',
        cnpj: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState("");
    const [height, setHeight] = useState("0px");
    const [message, setMessage] = useState<string[]>([]);
    const [isActiveFilter, setIsActive] = useState(true);

    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {

        api.get(`/survey-companys/${id}?isActive=${isActiveFilter}`).then(response => {
            const { company, listSurveys } = response.data;
            setSurveys(listSurveys);
            setCompany(company);
        });

    }, [isActiveFilter]);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    const closeModal = (event: any) => {
        if (event.target.id === 'modal') {
            toggleModal();
        }
    };

    function handleAddSurveyCompany(event: FormEvent) {
        event.preventDefault();

        const formData = {
            title: values.title,
            description: values.description
        };

        api.post(`/survey-companys/${id}`, formData).then(response => {
            if (response.status === 201) {
                const { message, surveyCreated } = response.data
                setMessage([message]);
                setSurveys([...surveys, surveyCreated]);
                toggleAddSurvey();
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

    function toggleAddSurvey() {
        setActive(active === "" ? "active" : "");
        if (content.current) {
            setHeight(active === "active" ? "0px" : `${content.current.scrollHeight}px`);
        }
    }

    function handleActiveSurvey(surveyCompany_id: string, isActive: boolean) {

        api.put(`/survey-companys/${surveyCompany_id}/activate?isActive=${isActive}`).then(response => {
            if (response.status === 200) {
                const { message } = response.data;
                const surveysActivate = surveys.filter(item => {
                    if (item.surveyCompany_id === surveyCompany_id) {
                        item.isActive = isActive;
                    }

                    if (item.isActive === isActiveFilter) return item;
                });
                setSurveys(surveysActivate);
                setMessage([message]);
                setShowModal(prevState => !prevState);
            }
        }, err => {
            const { error } = err.response.data;

            setMessage(error.errors);
            setShowModal(prevState => !prevState);
        });

    }

    return (
        <>
            <div id="survey-wrapper">
                <Header />
                <div className="survey-container">
                    <img src={backIcon} alt="Voltar" style={{ cursor: 'pointer' }} onClick={() => history.goBack()} />
                    <div className="title">
                        <h2>{company.name}</h2>
                        <div className="title-buttons">
                            <button className={`title-button ${active}`} onClick={(toggleAddSurvey)}>
                                {active === "active"
                                    ? <FiMinus size={20} />
                                    : <FiPlus size={20} />
                                }
                                <strong>Add</strong>
                            </button>
                            <button className={`title-button ${!isActiveFilter && 'filter-active'}`} onClick={() => setIsActive(prevState => !prevState)}>
                                {isActiveFilter
                                    ? <FiToggleRight size={20} />
                                    : <FiToggleLeft size={20} />

                                }
                                {isActiveFilter
                                    ? <strong>Active</strong>
                                    : <strong>Desactive</strong>

                                }
                            </button>
                        </div>
                    </div>
                    <div ref={content}
                        style={{ maxHeight: `${height}` }}
                        className="add-company-block">
                        <form onSubmit={handleAddSurveyCompany}>
                            <FormField
                                label="Title"
                                name="title"
                                type="text"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                hasError={touched.title && errors.title}
                            />
                            <FormField
                                label="Description"
                                name="description"
                                type="text"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                hasError={touched.description && errors.description}
                            />
                            <button type="submit" disabled={errors.title || errors.description}>
                                Confirm
                            </button>
                        </form>
                    </div>
                    <table className="table">
                        <thead className="thead-primary">
                            <tr>
                                <th className="thead-th-first">TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>
                                    {isActiveFilter
                                        ? 'ACTIVE'
                                        : 'DESACTIVE'

                                    }
                                </th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map(item => {
                                return (
                                    <tr key={item.surveyCompany_id} className="alert">
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>{item.description}</td>
                                        <td className="img">
                                            {item.isActive
                                                ? <FiToggleRight size={20} onClick={() => { handleActiveSurvey(item.surveyCompany_id, !item.isActive) }} />
                                                : <FiToggleLeft size={20} color="#d93025" onClick={() => { handleActiveSurvey(item.surveyCompany_id, !item.isActive) }} />
                                            }
                                        </td>
                                        <td className="img">
                                            <FiArrowRight size={20} onClick={() => {
                                                history.push({
                                                    pathname: '/survey-details',
                                                    state: {
                                                        surveyCompany_id: item.surveyCompany_id
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
            {showModal &&
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