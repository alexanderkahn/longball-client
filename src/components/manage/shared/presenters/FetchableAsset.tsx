import * as React from 'react';
import { Component } from 'react';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { FetchingState } from '../../../../reducers/resource';

interface FetchableAssetProps {
    fetchingState: FetchingState;
    children: React.ReactNode;
}

export default class FetchableAsset extends Component<FetchableAssetProps> {

    render() {
        const {fetchingState, children } = this.props;
        if (fetchingState !== FetchingState.FETCHED) {
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
