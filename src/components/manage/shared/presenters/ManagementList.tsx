import * as React from 'react';
import { Component, CSSProperties } from 'react';
import List, { ListSubheader } from 'material-ui/List';
import { Button } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { CurrentView } from '../../../../models/models';
import { isNullOrUndefined } from 'util';

const styles: CSSProperties = {
    button: {
        margin: 10,
    },
};

interface ManagementListProps {
    title: string;
    currentView: CurrentView;
    children: Array<JSX.Element>;
    onClickAdd?: () => void;
    resetView: () => void;
    fetchListItems: () => void;
}

export default class ManagementList extends Component<ManagementListProps> {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.currentView.isFetching && !props.currentView.lastUpdated && props.children.length === 0) {
            this.props.fetchListItems();
        }
    }

    render() {
        const {title, currentView, children, onClickAdd} = this.props;

        return (
            <div>
                <List subheader={<ListSubheader disableSticky={true}>{title}</ListSubheader>}>
                    {children}
                </List>
                <LoadingProgressIndicator enabled={currentView.isFetching}/>
                {!isNullOrUndefined(onClickAdd) &&
                <Button
                    fab={true}
                    color="accent"
                    aria-label="add"
                    style={styles.button}
                    onClick={onClickAdd}
                >
                    <AddIcon/>
                </Button>
                }
            </div>
        );
    }
}