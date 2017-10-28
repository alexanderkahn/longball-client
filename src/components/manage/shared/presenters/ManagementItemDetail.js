import React, {Component} from "react";
import PropTypes from 'prop-types';
import LoadingProgressIndicator from "../../../shared/presenters/LoadingProgressIndicator";
import {currentViewProp} from "../../../../models/models";

class ManagementItemDetail extends Component {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        //TODO FIXME: this will always fetch the item, even if it's already cached.
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
                props.children
            );
        }
    }
}

ManagementItemDetail.propTypes = {
    currentView: currentViewProp.isRequired,
    resetView: PropTypes.func.isRequired,
    fetchItemDetail: PropTypes.func.isRequired,
};

export default ManagementItemDetail;