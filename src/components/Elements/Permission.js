import { connect } from "react-redux";
import React from 'react';

const Permission = ({ perms, type   , isOk= true , children }) => {
    // "admin": ,"editTask": , "addTask": ,"deleteTask": ,"changeStatus":  "changeSettings":
    let showed = perms[type]
    if (isOk){
        return showed ? <>{children}</> : null;
    }
    else{
        return !showed ? <>{children}</> : null;
    }

};
const mapStateToProps = ({ user }) => {
    return { perms: user.data.role };
};

export default connect(mapStateToProps)(Permission);
