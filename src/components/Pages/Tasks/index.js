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
import { notify } from "../../../redux/actions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import DragList from "./DragList";
import Modal from "antd/es/modal/Modal";
import AddModal from "./AddModal";

const Tasks = (props) => {
    const { t } = useTranslation();
    const [spin, setSpin] = useState(false);
    const [addModal , setVisibleAddModal] =  useState(false);
    const [editing , setEditing] = useState( undefined)

    useEffect(() => {
    }, [t]);

    const showModal = () => {
      setVisibleAddModal(true)
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
                            <Button onClick={showModal} type={'primary'}>
                                Add Task
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col lg={24} xs={24}>
                    <Card loading={spin}>
                        <DragList/>
                    </Card>
                </Col>
            </Row>
            <Modal
                title={editing ? 'Edit' : 'Add'}
                centered
                visible={addModal}
                className="padModal"
                onOk={() => setVisibleAddModal(false)}
                onCancel={() => {setVisibleAddModal(false) ; setEditing(undefined)}}
                footer={null}
            >
                <AddModal
                    editing={editing}
                    // getPostList={getPostList}
                    // setVisibleAddModal={setVisibleAddModal}
                    // editingData={postlist?.find(s => s.id === editing)}
                />
            </Modal>

        </div>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        user: user.data,
    };
};

export default connect(mapStateToProps, { notify })(Tasks);


