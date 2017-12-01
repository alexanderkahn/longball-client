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
    onClickAdd: () => void;
    onClickPrevious: (() => void) | null;
    onClickNext: (() => void) | null;
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
        const {title, currentView, children, onClickAdd, onClickPrevious, onClickNext} = this.props;

        return (
            <form>
                <DialogTitle style={styles.title}>{title}</DialogTitle>
                <span>
                    <PagingButton ariaLabel="previous" onClick={onClickPrevious}><ChevronLeftIcon/></PagingButton>
                    <PagingButton ariaLabel="next" onClick={onClickNext}><ChevronRightIcon/></PagingButton>
                </span>
                <List>
                    {children}
                </List>
                <LoadingProgressIndicator enabled={currentView.isFetching}/>
                <Button
                    fab={true}
                    color="accent"
                    aria-label="add"
                    style={styles.addButton}
                    onClick={onClickAdd}
                >
                    <AddIcon/>
                </Button>
            </form>
        );
    }
}

interface PagingButtonProps {
    ariaLabel: string;
    onClick: (() => void) | null;
    children: React.ReactNode;
}

class PagingButton extends Component<PagingButtonProps> {
    render() {
        const {ariaLabel, onClick, children} = this.props;
        if (isNullOrUndefined(onClick)) {
            return (
                <Button dense={true} aria-label={ariaLabel} disabled={true}>
                    {children}
                </Button>
            );
        } else {
            return (
                <Button dense={true} aria-label={ariaLabel} onClick={onClick}>
                    {children}
                </Button>
            );
        }
    }
}