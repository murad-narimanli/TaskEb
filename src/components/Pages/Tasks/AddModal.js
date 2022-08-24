import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import {noWhitespace, whiteSpace} from "../../../utils/rules";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {notify, setVisibleAddModal , getTasks , getUsers} from "../../../redux/actions";
import admin from "../../../const/api";
import moment from "moment";
import {routes} from "../../../services/api-routes";
const { Option } = Select;



const AddModal = (props) => {
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const company = routes.tasks;
    let mainUrl = routes.tasks
    let { notify, setVisibleAddModal , modalData , users , getUsers} = props;
    let {editing, editingData } = modalData

    useEffect(() => {
        getUsers({companyId:props.user.companyId});
        if (editing) {
            form.setFieldsValue(
                {
                    ...editingData,
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
                // setVisibleAddModal(false);
                form.resetFields();
                notify("", true);
                getTasks()
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
                // setVisibleAddModal(false);
                form.resetFields();
                notify("", true);
                getTasks()
            }).catch((err) => {
                notify(err.response, false);
            } )
        }
    }






    return (
        <div className='w-100'>
            <Form onFinish={submitForm} layout="vertical" form={form}>
                <div className="commontask">
                    <Row gutter={[16, 16]}>
                        <Col lg={24} md={24}>
                            <Form.Item
                                label={'Title'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`title`}
                                rules={[whiteSpace(t("inputError"))]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24}>
                            <Form.Item
                                label={'Description'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`description`}
                                rules={[whiteSpace(t("inputError"))]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>

                        <Col lg={24} md={24}>
                            <Form.Item
                                className="mb-5"
                                label={'Assigned users'}
                                validateTrigger="onChange"
                                name={`assignedTo`}
                                rules={[noWhitespace(t("inputError"))]}
                            >
                                <Select
                                    showSearch
                                    mode={'multiple'}
                                    maxTagCount={'responsive'}
                                    placeholder={'Select users'}
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
                                        users.data?.map(user => (
                                            <Option key={user.id} value={user.id}>
                                                {user.isCompany ? user.companyName + ' / ' +user.username : user.name + ' '+ user.surname}
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
                        {/*<Button className="ml-10" onClick={() =>{ props.setVisibleAddModal(false) ; form.resetFields()}}>*/}
                        {/*    {t("cancel")}*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </Form>
        </div>
    )
}



const mapStateToProps = ({ user , users , modalData }) => {
    return {
        user: user.data,
        modalData,
        users
    };
};


export default connect(mapStateToProps, { notify  , setVisibleAddModal , getUsers})(AddModal);


