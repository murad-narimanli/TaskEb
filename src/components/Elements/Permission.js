import { connect } from "react-redux";
import React from 'react';

const Permission = ({ perms, type  , children }) => {
    // "admin": ,"editTask": , "addTask": ,"deleteTask": ,"changeStatus":
    let showed = perms[type]
    return showed ? <>{children}</> : null;
};
const mapStateToProps = ({ user }) => {
    return { perms: user.data.role };
};

export default connect(mapStateToProps)(Permission);
