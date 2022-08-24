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
    Popconfirm, InputNumber, Switch,
} from "antd";
import {
    UnorderedListOutlined,
    EditFilled,
    DeleteFilled,
} from "@ant-design/icons";
import { convertColumns } from "../../../utils/columnconverter";
import { notify } from "../../../redux/actions";
import { connect } from "react-redux";
import admin from "../../../const/api";
import { useTranslation } from "react-i18next";
import {noWhitespace, whiteSpace} from "../../../utils/rules";
import {routes} from "../../../services/api-routes";
import * as HttpService from "../../../services/http-service";
import * as types from "../../../redux/types";

const Users = (props) => {
    const mainUrl = routes.profile.users
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [spin, setSpin] = useState(false);
    const [editing, setEditing] = useState(null);
    const cols = [
        { key: "index", value: "#", con: true },
        { key: "username", value: 'User Name', con: true },
        { key: "email", value: 'Email', con: true },
        { key: "id", value: "", con: false },
    ];

    const keys = [
        "editTask",
        "addTask",
        "deleteTask",
        "changeStatus"
    ]

    // props
    const { notify } = props;

    const columns = [
        {
            title: "#",
            key: "1",
            dataIndex: "index",
            width: 80,
        },
        {
            title: 'Name',
            key: "2",
            dataIndex: "name",
        },
        {
            title: 'Surname',
            key: "2",
            dataIndex: "surname",
        },
        {
            title: 'User Name',
            key: "2",
            dataIndex: "username",
        },
        {
            title: "",
            key: "3",
            dataIndex: "id",
            width: 30,
            render: (i) => {
                return (
                    <div className="flex flex-end">
                        <Popconfirm
                            placement="right"
                            title={t("areYouSure")}
                            onConfirm={() => deletePosition(i)}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <Tooltip className="ml-5" title={t("delete")}>
                                <Button className="border-none" type="text" shape="circle">
                                    <DeleteFilled />
                                </Button>
                            </Tooltip>
                        </Popconfirm>
                        <Tooltip className="ml-5" title={t("edit")} placement="topRight">
                            <Button
                                className="border-none"
                                type="text"
                                shape="circle"
                                onClick={() => setEditingObject(i)}
                            >
                                <EditFilled />
                            </Button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];


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


    const setEditingObject = async (i) => {
        setEditing(i);
        form.setFieldsValue(data.find(s => s.id === i));
    };

    const cancelEditing = () => {
        setEditing(null);
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
            ...values,
            isCompany: false,
            companyId: props.user.companyId,
            companyName:props.user.companyName,
            role:{
                ...values.role,
                admin:false
            }
        };
        let newArr;
        if(editing){
            newArr = allUsers.filter((d)=>{
                return d.id !== editing
            })
        }


        if (!editing && !IsBad(allUsers , obj)) {
            let id = parseInt(Number(Math.random()*Date.now()))
            obj['id'] = id;
            await admin
                .post(mainUrl, obj)
                .then((res) => {
                    notify("", true);
                    getData();
                    cancelEditing();
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        }
        if (editing && !IsBad(newArr , obj)) {
            obj["id"] = editing;
            await admin
                .put(`/${mainUrl}/${editing}`, obj)
                .then((res) => {
                    notify("", true);
                    getData();
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
                isCompany:false,
            }
        }).then((res) => {
            setSpin(false);
            setData(
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


    const nameHandleChange = (e) => {
        if(!editing){
            let date = new Date
            form.setFieldsValue({
                password: e.target.value.split(" ").join("") + date.getFullYear(),
            })
        }
    }

    useEffect(() => {
        getData();
        getAllUsers()
    }, [t]);

    return (
        <Row gutter={[10, 10]}>
            <Col xs={24}>
                <div className="border animated fadeInDown p-2 mt-0 bg-white">
                    <UnorderedListOutlined className="f-20 mr5-15" />
                    <span className="f-20 bold">Users</span>
                </div>
            </Col>
            <Col lg={12} xs={24}>
                <Table
                    loading={spin}
                    size="small"
                    className="bg-white animated fadeInLeft"
                    columns={columns}
                    dataSource={convertColumns(data, cols)}
                    pagination={{
                        pageSize: 10,
                        current_page: 1,
                        total: data?.length,
                    }}
                />
            </Col>
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
                            <Form.Item
                                validateTrigger="onChange"
                                label="Name"
                                name="name"
                                rules={[whiteSpace('Please input your name!')]}
                            >
                                <Input onChange={
                                    (e)=>{
                                        nameHandleChange(e)
                                    }
                                } />
                            </Form.Item>

                            <Form.Item
                                validateTrigger="onChange"
                                label="Surname"
                                name="surname"
                                rules={[whiteSpace('Please input your surname!')]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                validateTrigger="onChange"
                                label="User Name"
                                name="username"
                                rules={[whiteSpace('Please input your username!')]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                validateTrigger="onChange"
                                name="phone"
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
                                <Input disabled={true}  readOnly={true}/>
                            </Form.Item>


                            <div className="border mb-20 p-2">
                                <Row gutter={[16, 16]}>
                                    {keys.map((s , i )=>(
                                        <Col key={i} sm={24} md={12}>
                                            <div className="flex flex-align-center ">
                                                <Form.Item
                                                    valuePropName="checked"
                                                    name={["role", s]}
                                                    className="mb-5"
                                                    validateTrigger="onChange"
                                                    labelCol={{
                                                        span: 3,
                                                    }}
                                                    wrapperCol={{
                                                        span: 2,
                                                    }}
                                                >
                                                    <Switch />
                                                </Form.Item>
                                                <div className={'ml-20'}>
                                                    {CamelCaseSplit(s)}
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>

                            <div className="flex flex-end">
                                <Form.Item>
                                    <Button  size={'large'} type="primary" className={'mr-10'}  htmlType="submit">
                                        Save
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={cancelEditing} size={'large'}   htmlType="submit">
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                </Card>
            </Col>
        </Row>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        user: user.data,
    };
};

export default connect(mapStateToProps, { notify })(Users);


