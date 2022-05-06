import { Fragment, FunctionComponent } from 'react';

import { ClassData, ClassesProps } from '../../types';

const Classes: FunctionComponent<ClassesProps> = (props) => {
    return (
        <Fragment>
            <div className="boxes">
                {Object.entries(props.data).map(([key, item]) => (
                    <Class {...item} key={key} />
                ))}
            </div>
            <button className="logout" onClick={props.handleLogout}>
                Logout
            </button>
        </Fragment>
    );
}

const Class: FunctionComponent<ClassData> = (props) => {
    return (
        <div className="box">
            <h5 className="box__title">Name</h5>
            <span className="box__value">{props.Name}</span>
            <h5 className="box__title">Students</h5>
            <span className="box__value">{props.Students.join(', ')}</span>
        </div>
    );
}

export default Classes;