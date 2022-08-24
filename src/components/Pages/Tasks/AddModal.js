import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import {noWhitespace, whiteSpace} from "../../../utils/rules";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {notify, setVisibleAddModal , getTasks} from "../../../redux/actions";
import admin from "../../../const/api";
import {routes} from "../../../services/api-routes";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;



const AddModal = (props) => {
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    let mainUrl = routes.profile.users;
    let { notify, setVisibleAddModal , modalData , getTasks} = props;
    let {editing, editingData } = modalData

    useEffect(() => {
        getUsers()

        if (editing) {
            form.setFieldsValue(
                {
                    ...editingData,
                    expireDate:moment(editingData.expireDate)
                }
            );
        }
        else{
            form.resetFields();
        }
    },[t , editing])


    const getUsers = async () => {
        await admin.get(mainUrl , {params: {companyId:props.user.companyId}}).then((res)=>{
            setUsers(res.data);
        }).catch((err) =>{
            notify(err.response, false);
        })
    }



    const submitForm = (values) =>{
        if(!editing){
            let id = parseInt(Number(Math.random()*Date.now()))
            let objPost = {
                id,
                ...values,
                status:'todo',
                companyId:props.user.companyId,
                createdBy:props.user.id,
            }
            admin.post('tasks', objPost).then(()=>{
                setVisibleAddModal(false);
                form.resetFields();
                notify("", true);
                getTasks()
            }).catch((err) => {
                notify(err.response, false);
            } )
        }
        else{
            let objPut = {
                ...editingData,
                ...values,
            }
            admin.put(
                'tasks'+`/` + editing, {
                    ...objPut
                }
            ).then(()=>{
                setVisibleAddModal(false);
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
                                <TextArea rows={'6'} size="large" />
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
                                        users?.map(user => (
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
                                label={'DeadLine'}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`expireDate`}
                                rules={[noWhitespace(t("inputError"))]}
                            >
                                <DatePicker
                                    disabledDate={(current) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                    }}
                                    className="w-100" size="large" />
                            </Form.Item>
                        </Col>



                    </Row>

                    <div
                        className="modalButtons mt-20"
                    >
                        <Button type="primary"  htmlType="submit">
                            {t("save")}
                        </Button>
                        <Button className="ml-10" onClick={() =>{ setVisibleAddModal(false) ; form.resetFields()}}>
                            {t("cancel")}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}



const mapStateToProps = ({ user , modalData , tasks }) => {
    return {
        user: user.data,
        modalData,
    };
};


export default connect(mapStateToProps, { notify  , setVisibleAddModal , getTasks })(AddModal);


