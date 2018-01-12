import * as React from 'react';
import { Component, CSSProperties } from 'react';
import List from 'material-ui/List';
import { Button, DialogTitle } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { FetchingState, PagedView } from '../../../../models/models';

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
    currentView: PagedView;
    children: Array<JSX.Element>;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    fetchListItems: () => void;
}

export default class ManagementList extends Component<ManagementListProps> {

    componentWillMount() {
        this.tryFetch();
    }

    componentDidUpdate() {
        this.tryFetch();
    }

    render() {
        const {title, currentView, onClickAdd, getPage, children} = this.props;

        return (
            <form>
                <DialogTitle style={styles.title}>{title}</DialogTitle>
                <span>
                    <PagingButton
                        ariaLabel="previous"
                        enabled={currentView.hasPrevious}
                        onClick={getPage(currentView.page - 1)}
                    >
                        <ChevronLeftIcon/>
                    </PagingButton>
                    <PagingButton
                        ariaLabel="next"
                        enabled={currentView.hasNext}
                        onClick={getPage(currentView.page + 1)}
                    >
                        <ChevronRightIcon/>
                    </PagingButton>
                </span>
                <List>
                    {children}
                </List>
                <LoadingProgressIndicator enabled={currentView.fetchedState === FetchingState.FETCHING}/>
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

    private tryFetch() {
        const props = this.props;
        if (props.currentView.fetchedState === FetchingState.NOT_FETCHED) {
            this.props.fetchListItems();
        }
    }
}

interface PagingButtonProps {
    ariaLabel: string;
    enabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

class PagingButton extends Component<PagingButtonProps> {
    render() {
        const {ariaLabel, enabled, onClick, children} = this.props;
        return (
            <Button dense={true} disabled={!enabled} aria-label={ariaLabel} onClick={onClick}>
                {children}
            </Button>
        );
    }
}