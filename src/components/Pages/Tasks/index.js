import React, { useEffect, useState, useRef } from "react";
import {
    Card,
    Button,
    Spin,
    Row,
    Col,
} from "antd";
import {
    UnorderedListOutlined,
} from "@ant-design/icons";
import { notify, setVisibleAddModal} from "../../../redux/actions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import DragList from "./DragList";
import Modal from "antd/es/modal/Modal";
import AddModal from "./AddModal";
import Permission from "../../Elements/Permission";

const Tasks = (props) => {
    const { t } = useTranslation();
    const { setVisibleAddModal } = props

    const showModal = () => {
      setVisibleAddModal(true , null, {})
    }


    return(
        <div>
            <Row gutter={[10, 10]}>
                <Col xs={24}>
                    <div className="border flex flex-between animated fadeInDown p-2 mt-0 bg-white">
                        <div>
                            <UnorderedListOutlined className="f-20 mr5-15" />
                            <span className="f-20 bold">Tasks</span>
                        </div>
                        <div>
                            <Permission type={'addTask'}>
                                <Button onClick={showModal} type={'primary'}>
                                    Add Task
                                </Button>
                            </Permission>
                        </div>
                    </div>
                </Col>
                <Col lg={24} xs={24}>
                    <Card className={'animated fadeIn'}>
                        <DragList  />
                    </Card>
                </Col>
            </Row>

            <Modal
                title={props.modalData.editing ? 'Edit' : 'Add' + ' ' + 'task'}
                centered
                visible={props.modalData.modalOpen}
                className="padModal"
                onOk={() => setVisibleAddModal(false)}
                onCancel={() => {setVisibleAddModal(false)}}
                footer={null}
            >
                <AddModal/>
            </Modal>

        </div>
    );
};

const mapStateToProps = ({ user, modalData }) => {
    return {
        user: user.data,
        modalData
    };
};

export default connect(mapStateToProps, { notify , setVisibleAddModal })(Tasks);


