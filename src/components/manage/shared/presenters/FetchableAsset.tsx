import * as React from 'react';
import { Component } from 'react';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';

interface FetchableAssetProps {
    isFetching: boolean;
    children: React.ReactNode;
}

export default class FetchableAsset extends Component<FetchableAssetProps> {

    render() {
        const {isFetching, children } = this.props;
        if (isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else {
            return (
                children
            );
        }
    }
}
