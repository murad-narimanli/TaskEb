import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import {noWhitespace, whiteSpace} from "../../../utils/rules";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import { notify} from "../../../redux/actions";
import admin from "../../../const/api";
import moment from "moment";
import {routes} from "../../../services/api-routes";
const { Option } = Select;



const AddModal = (props) => {
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState([]);
    const company = routes.tasks;
    let mainUrl = routes.tasks
    let { notify, editing, getPostList, setVisibleAddModal, editingData }= props;

    useEffect(() => {
        getCompanies()
        if (editing) {
            form.setFieldsValue(
                {
                    ...editingData,
                    password: null
                }
            );
        }
        else{
            form.resetFields();
        }
    },[t , editing])



    const submitForm = (values) =>{
        if(!editing){
            admin.post(mainUrl, values).then(()=>{
                setVisibleAddModal(false);
                form.resetFields();
                notify("", true);
                getPostList()
            }).catch((err) => {
                notify(err.response, false);
            } )
        }
        else{
            admin.put(
                mainUrl+`/` + editing, {
                    ...values,
                    id:editing
                }
            ).then(()=>{
                setVisibleAddModal(false);
                form.resetFields();
                notify("", true);
                getPostList()
            }).catch((err) => {
                notify(err.response, false);
            } )
        }
    }


    const getCompanies = async () => {
        await admin.get(company).then((res) => {
            setCompanies(
                res.data.map((p, index) => {
                    return {
                        key: index + 1,
                        ...p,
                        index: index + 1,
                    };
                })
            );
        });
    };



    return (
        <div className='w-100'>
            <Form onFinish={submitForm} layout="vertical" form={form}>
                <div className="commontask">
                    <Row gutter={[16, 16]}>
                        <Col lg={24} md={24}>
                            <Form.Item
                                label={'Name'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`name`}
                                rules={[whiteSpace(t("inputError"))]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24}>
                            <Form.Item
                                label={'Surname'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`surname`}
                                rules={[whiteSpace(t("inputError"))]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24}>
                            <Form.Item
                                label={'Email'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`email`}
                                rules={[whiteSpace(t("inputError")) ,
                                    {
                                        required: true,
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>

                        <Col lg={24} md={24}>
                            <Form.Item
                                className="mb-5"
                                label={'Company'}
                                validateTrigger="onChange"
                                name={`companyId`}
                                rules={[noWhitespace(t("inputError"))]}
                            >
                                <Select
                                    showSearch
                                    placeholder={'Company'}
                                    className={'w-100'}
                                    notFoundContent={null}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {
                                        companies.map(company => (
                                            <Option key={company.id} value={company.id}>
                                                {company.name}
                                            </Option>
                                        ))
                                    }

                                </Select>
                            </Form.Item>
                        </Col>

                        <Col lg={24} md={24}>
                            <Form.Item
                                label={'Password'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`password`}
                                rules={[whiteSpace(t("inputError"))]}
                            >
                                <Input type={'password'} size="large" />
                            </Form.Item>
                        </Col>



                    </Row>

                    <div
                        className="modalButtons mt-20"
                    >
                        <Button type="primary"  htmlType="submit">
                            {t("save")}
                        </Button>
                        <Button className="ml-10" onClick={() =>{props.setVisibleAddModal(false) ; form.resetFields()}}>
                            {t("cancel")}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}



const mapStateToProps = ({  }) => {
    return {};
};

export default connect(mapStateToProps, { notify })(AddModal);


