// @flow

import React, {Component} from "react";
import PropTypes from 'prop-types';
import LoadingProgressIndicator from "../../../shared/presenters/LoadingProgressIndicator";
import type {CurrentView} from "../../../../models/models";

interface ManagementItemDetailProps {
    currentView: CurrentView,
    resetView(): void,
    fetchItemDetail(): void,
    children: any //TODO: come back to this and figure out how it's supposed to look
};

export default class ManagementItemDetail extends Component<ManagementItemDetailProps> {

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
