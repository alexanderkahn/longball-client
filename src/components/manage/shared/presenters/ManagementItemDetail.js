import React, {Component} from "react";
import PropTypes from 'prop-types';
import LoadingProgressIndicator from "../../../shared/presenters/LoadingProgressIndicator";
import {currentViewProp} from "../../../../models/models";

class ManagementItemDetail extends Component {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.currentView.isFetching && !props.currentView.lastUpdated) {
            props.fetchItemDetail();
        }
    }

    render() {
        const props = this.props;
        if (props.currentView.isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else {
            return (
                props.itemDetailForm
            );
        }
    }
}

ManagementItemDetail.propTypes = {
    itemDetailForm: PropTypes.node.isRequired,
    currentView: currentViewProp.isRequired,
    resetView: PropTypes.func.isRequired,
    fetchItemDetail: PropTypes.func.isRequired,
};

export default ManagementItemDetail;