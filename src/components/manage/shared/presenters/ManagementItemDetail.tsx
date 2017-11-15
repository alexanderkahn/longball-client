import * as React from 'react';
import { Component } from 'react';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { CurrentView } from '../../../../models/models';

interface ManagementItemDetailProps {
    currentView: CurrentView;
    resetView: () => void;
    fetchItemDetail: () => void;
    children: React.ReactNode;
}

export default class ManagementItemDetail extends Component<ManagementItemDetailProps> {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        // TODO FIXME: this will always fetch the item, even if it's already cached.
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
