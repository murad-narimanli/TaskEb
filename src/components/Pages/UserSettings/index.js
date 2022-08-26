import React, { useEffect, useState, useRef } from "react";
import {
    Card,
    Table,
    Button,
    Spin,
    Form,
    Select,
    Row,
    Col,
    Tooltip,
    Input,
    Popconfirm, InputNumber, Switch, List,
} from "antd";
import {
    UnorderedListOutlined,
    EditFilled,
    DeleteFilled, EditOutlined,
} from "@ant-design/icons";
import { convertColumns } from "../../../utils/columnconverter";
import { notify } from "../../../redux/actions";
import { connect } from "react-redux";
import admin from "../../../const/api";
import { useTranslation } from "react-i18next";
import {noWhitespace, whiteSpace} from "../../../utils/rules";
import {routes} from "../../../services/api-routes";
import Permission from "../../Elements/Permission";
import history from "../../../const/history";

const UserSettings = (props) => {
    const mainUrl = routes.profile.users
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [data, setData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [spin, setSpin] = useState(false);



    // props
    const { notify } = props;



    const CamelCaseSplit = (inputString) => {
        const f = str => str.replace(/(?<=[a-z\d])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/g, ' ');
        return f(inputString).toUpperCase();
    }


    const IsBad = (array, data) => {
        return array.some((user) => {
            if (user.username.toLowerCase() === data.username.toLowerCase()) {
                console.log("Username is already registered")
                notify('Username is already registered!' , false)
                return true;
            }
            if (user.email.toLowerCase() === data.email.toLowerCase()) {
                console.log("Email is already registered")
                notify('Email is already registered' , false)
                return true;
            }
            if (String(user.phone).slice(-4) === String(data.phone).slice(-4)) {
                console.log("Phone is already registered")
                notify('Phone is already registered' , false)
                return true;
            }
            else{
                return false;
            }
        })
    }


    const setEditingObject = async () => {
        form.setFieldsValue(data);
    };

    const cancelEditing = () => {
        form.resetFields();
    };

    const deletePosition = async (i) => {
        await admin
            .delete(`${mainUrl}/${i}`)
            .then(() => {
                notify("Deleted", true);
                getData();
            })
            .catch((err) => {
                //error
                notify(err.response, false);
            });
    };

    const savePosition = async (values) => {
        let obj = {
            ...props.user,
            ...values,
        };

        let newArr = allUsers.filter((d)=>{
            return d.id !== props.user.id
        })

        if (!IsBad(newArr , obj)) {
            obj["id"] = props.user.id;
            await admin
                .put(`/${mainUrl}/${props.user.id}`, obj)
                .then((res) => {
                    notify("", true);
                    getData();
                    history.push('/')
                    window.location.reload();
                    cancelEditing();
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        }
    };

    const getData = async () => {
        setSpin(true);
        await admin.get(mainUrl , {
            params: {
                companyId:props.user.companyId,
                id:props.user.id
            }
        }).then((res) => {
            setSpin(false);
            setData(res?.data[0]);
        });
    };


    const getAllUsers = async () => {
        setSpin(true);
        await admin.get(mainUrl , {
        }).then((res) => {
            setSpin(false);
            setAllUsers(
                res?.data.map((p, index) => {
                    return {
                        key: index + 1,
                        ...p,
                        index: index + 1,
                    };
                })
            );
        });
    };


    useEffect(() => {
        getData();
        getAllUsers()
    }, [t]);

    return (
        <Row gutter={[10, 10]}>
            <Col xs={24}>
                <div className="border animated fadeInDown p-2 mt-0 bg-white">
                    <UnorderedListOutlined className="f-20 mr5-15" />
                    <span className="f-20 bold">User info</span>
                </div>
            </Col>
            <Col lg={props.user.role.changeSettings ? 12 : 24} xs={24}>
               <Card>
                   <div>
                       <List
                           header={false}
                           footer={false}
                           bordered
                           dataSource={Object.entries(data)}
                           renderItem={user => {
                                   if(user[0] !== 'id' && typeof user[1] !== 'boolean' && typeof user[1] !== 'object'){
                                    return (
                                        <List.Item>
                                            <div className="flex w-100 flex-between">
                                                <div>
                                                    {CamelCaseSplit(user[0])}
                                                </div>
                                                <div>
                                                    {user[1]}
                                                </div>
                                            </div>
                                        </List.Item>
                                    )
                                   }
                               }
                           }
                       />
                       <Permission type={'changeSettings'}>
                           <div>
                               <Button onClick={()=>{ setEditingObject()  }} type="primary"  size={'large'} className="mt-20 w-100">
                                    <EditOutlined className={'ml-10'}/>
                                    Edit
                               </Button>
                           </div>
                       </Permission>
                   </div>
               </Card>
            </Col>
            <Permission type={'changeSettings'}>
                <Col lg={12} xs={24}>
                    <Card title={false} className={"animated fadeInRight"}>
                        <Form
                            form={form}
                            name="basic"
                            layout="vertical"
                            labelCol={{
                                span: 16,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            onFinish={savePosition}
                        >
                            <Permission type={'admin'}>
                                <Form.Item
                                    label="Company Name"
                                    name="companyName"
                                    validateTrigger="onChange"
                                    rules={[
                                        whiteSpace('Please input your company name!')
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Company Address"
                                    name="address"
                                    validateTrigger="onChange"
                                    rules={[
                                        whiteSpace('Please input your company address!')
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Permission>

                            <Permission type={'admin'} isOk={false}>
                                <Form.Item
                                    label="Name"
                                    validateTrigger="onChange"
                                    name="name"
                                    rules={[whiteSpace('Please input your name!')]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="Surname"
                                    name="surname"
                                    validateTrigger="onChange"
                                    rules={[whiteSpace('Please input your surname!')]}
                                >
                                    <Input />
                                </Form.Item>
                            </Permission>

                            <Form.Item
                                label="User Name"
                                name="username"
                                validateTrigger="onChange"
                                rules={[whiteSpace('Please input your username!')]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                validateTrigger="onChange"
                                rules={[whiteSpace('Please input your phone number!')]}
                            >
                                <Input type={'number'} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                validateTrigger="onChange"
                                rules={[
                                    whiteSpace('Please input your email!'),
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                label="Password"
                                name="password"
                                validateTrigger="onChange"
                                rules={
                                    [
                                        whiteSpace('Please input your password!'),
                                        { min: 6, message: 'Password must be minimum 6 characters.' },
                                    ]
                                }
                            >
                                <Input.Password />
                            </Form.Item>




                            <div className="flex flex-end">
                                <Form.Item>
                                    <Button  size={'large'} type="primary" className={'mr-10'}  htmlType="submit">
                                        Save
                                    </Button>
                                </Form.Item>
                                <Button onClick={cancelEditing} size={'large'}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Permission>
        </Row>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        user: user.data,
    };
};

export default connect(mapStateToProps, { notify })(UserSettings);

