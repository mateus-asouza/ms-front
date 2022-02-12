import React, { useState, useRef } from "react";
import {
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button

} from 'reactstrap';
import Menu from '../components/Menu';

function Cadastro() {

    //constante para receber os dados da consulta na api dos correios.
    const [dataCep, setDataCep] = useState({
        bairro: "",
        cep: "",
        complemento: "",
        ddd: "",
        gia: "",
        ibge: "",
        localidade: "",
        logradouro: "",
        siafi: "",
        uf: ""
    })


//constante que recebe dados do form e é enviada para api de cadastro.
    const [dataForm, setDataForm] = useState({
        name: "",
        cpf: "",
        birthDay: "",
        phones: [
            {
                phoneNumber: ""
            }
        ],
        addresses: [
            {

                cep: "",
                street: "",
                number: 0,
                district: "",
                city: "",
                state: ""
            }
        ]
    });


//constante para formatação de mensagens.
    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    })

    //seta valor de um input em uma propriedadeds da constante dataForm.
    const onChangeInput = e => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

    //seta valor de um input em uma propriedadeds da constante dataForm em uma propriedade do tipo array.
    const onChangePhones = e =>

        setDataForm({
            ...dataForm, phones: [{
                [e.target.name]: e.target.value
            }]
        })

//Consulta informações de endereço a partir do cep na api do correios utilizando o fetch.
    const setAddressByCep = e => {
        const cep = e.target.value;
        fetch(`http://localhost:3001/?cep=${cep}`)
            .then(response => response.json())
            .then((data) => {
                if (data.hasOwnProperty("erro")) {
                    alert('Cep não existente');
                } else {
                    setDataCep({
                        bairro: data.bairro,
                        cep: data.cep,
                        complemento: data.complemento,
                        ddd: data.ddd,
                        gia: data.gia,
                        ibge: data.ibge,
                        localidade: data.localidade,
                        logradouro: data.logradouro,
                        siafi: data.siafi,
                        uf: data.uf
                    })

                    setDataForm({
                        ...dataForm,
                        addresses: [
                            {
                                cep: data.cep,
                                street: data.logradouro,
                                district: data.bairro,
                                city: data.localidade,
                                state: data.uf
                            }
                        ]

                    })
                }
            })
            .catch(err => console.log(err));



    }

    //Envia formulário para api de cadastro utilizando fetch.

    const sendCadastro = async e => {
        e.preventDefault();
        console.log(dataCep);
        console.log(dataForm);

        try {
            const res = await fetch('http://localhost:8080/api/v1/people', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });

            const responseEnv = await res.json();

            if (responseEnv.error) {
                setResponse({
                    type: 'error',
                    mensagem: responseEnv.mensagem
                });
            } else {
                setResponse({
                    type: 'success',
                    mensagem: responseEnv.message
                });

                setDataForm({
                    name: "",
                    cpf: "",
                    birthDay: "",
                    phones: [
                        {
                            phoneNumber: ""
                        }
                    ],
                    addresses: [
                        {

                            cep: "",
                            street: "",
                            number: 0,
                            district: "",
                            city: "",
                            state: ""
                        }
                    ]
                });
            }
        } catch (err) {
            setResponse({
                type: 'error',
                mensagem: "Erro: Tente mais tarde!"
            });
        }
    }

    return (

        <div>

            <Menu>

            </Menu>
            <body class=" bg-light">

                <div class="bd-cheatsheet container-fluid bg-body col-md-6 offset-md-3 mx-auto" >
                    <div className="container py-3 mt-2"></div>
                    <div class=" text-dark rounded-3">
                        <h3>Dados pessoais</h3>
                        <div className="pl-5 container">
                            <p>Olá! Por favor, complete as informações para concluir seu cadastro.</p>
                        </div>
                    </div>
                    <div class="container py-4"></div>
                    <section id="content">

                        <Form onSubmit={sendCadastro}>
                            <Row form>
                                <Col md={10}>
                                    <FormGroup>
                                        <Label for="name" >
                                            Nome completo
                                        </Label>
                                        <Input
                                            onChange={onChangeInput}

                                            id="name"
                                            name="name"
                                            placeholder="Nome"

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="cpf">
                                            CPF
                                        </Label>
                                        <Input
                                            onChange={onChangeInput}

                                            id="cpf"
                                            name="cpf"
                                            placeholder="000.000.000-00"

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="exampleDate">
                                        Data de Nacimento
                                    </Label>
                                    <Input
                                        onChange={onChangeInput}

                                        id="birthDay"
                                        name="birthDay"
                                        placeholder="date placeholder"
                                        type="date"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="phoneNumber">
                                        Telefone
                                    </Label>
                                    <Input
                                        onChange={onChangePhones}

                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="(00)00000-0000"
                                    />
                                </FormGroup>
                            </Col>
                            <div class=" text-dark rounded-3 py-4">
                                <h4>Informações de Contato</h4>
                                <div className="pl-5 container">
                                    <p>Primeiro, digite seu cep.</p>
                                </div>

                            </div>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="cep">
                                            CEP
                                        </Label>
                                        <input
                                            onBlur={setAddressByCep}
                                            onChange={e => { dataForm.addresses[0].cep = e.target.value }}

                                            id="cep"
                                            name="cep"

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="street">
                                            Rua
                                        </Label>
                                        <Input
                                            defaultValue={dataCep.logradouro}
                                            onChange={e => { dataForm.addresses[0].street = e.target.value }}

                                            id="street"
                                            name="street"
                                            placeholder='Nome da Rua'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={1}>
                                    <FormGroup>
                                        <Label for="number">
                                            Numero
                                        </Label>
                                        <Input
                                            onChange={e => { dataForm.addresses[0].number = e.target.value }}
                                            id="number"
                                            name="number"
                                            placeholder='145'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="district">
                                        Bairro
                                    </Label>
                                    <Input
                                        defaultValue={dataCep.bairro}
                                        onCh={e => { dataForm.addresses[0].district = e.target.value }}

                                        id="district"
                                        name="district"
                                        placeholder='Nome do Bairro'
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>

                                    <Label for="city">
                                        Cidade
                                    </Label>
                                    <Input
                                        defaultValue={dataCep.localidade}
                                        onChange={e => { dataForm.addresses[0].city = e.target.value }}

                                        id="city"
                                        name="city"
                                        placeholder='Nome da Cidade'
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="state">
                                        UF
                                    </Label>
                                    <Input

                                        defaultValue={dataCep.uf}
                                        onChange={e => { dataForm.addresses[0].state = e.target.value }}

                                        id="state"
                                        name="state"
                                        placeholder='Nome do Estado'
                                    />
                                </FormGroup>
                            </Col>
                            <FormGroup check>
                                <Input
                                    id="exampleCheck"
                                    name="check"
                                    type="checkbox"
                                />
                                <Label
                                    check
                                    for="exampleCheck"
                                >
                                    Quero receber alertas, promoções e novidades por email.
                                </Label>
                            </FormGroup>
                            <div className="text-center">
                                <Button type="submit">Enviar</Button>
                            </div>

                        </Form>
                        {response.type === 'error' ? <p className="alert-danger">{response.mensagem}</p> : ""}
                        {response.type === 'success' ? <p className="alert-success">{response.mensagem}</p> : ""}
                        <article class="my-3" id="typography">
                            <div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">


                            </div>
                        </article>
                    </section>
                </div>
            </body>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        </div>


    )
}

export default Cadastro;