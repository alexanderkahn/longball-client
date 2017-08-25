import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import {addNumber} from "../../actions";
import NumberListItem from "../NumberListItem";

//TODO: no presentation components in state containers?
const getChildListItems = (numbers) => {
    return numbers.map(num => <NumberListItem number={num}/>);
};

const mapStateToProps = state => {
    return {
        children: getChildListItems(state.numbers)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClickAdd: newNumber => {
            dispatch(addNumber(newNumber))
        }
    }
};

const NumbersManagementList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementList);

export default NumbersManagementList