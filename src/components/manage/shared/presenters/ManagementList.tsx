import * as React from 'react';
import { Component, CSSProperties } from 'react';
import List from 'material-ui/List';
import { Button, DialogTitle } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { CurrentView } from '../../../../models/models';
import { isNullOrUndefined } from 'util';

const styles: CSSProperties = {
    title: {
        display: 'inline-flex',
    },
    addButton: {
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
            <form>
                <DialogTitle style={styles.title}>{title}</DialogTitle>
                <span>
                    <Button dense={true} aria-label="previous"><ChevronLeftIcon /></Button>
                    <Button dense={true} aria-label="next"><ChevronRightIcon /></Button>
                </span>
                <List>
                    {children}
                </List>
                <LoadingProgressIndicator enabled={currentView.isFetching}/>
                {!isNullOrUndefined(onClickAdd) &&
                <Button
                    fab={true}
                    color="accent"
                    aria-label="add"
                    style={styles.addButton}
                    onClick={onClickAdd}
                >
                    <AddIcon/>
                </Button>
                }
            </form>
        );
    }
}