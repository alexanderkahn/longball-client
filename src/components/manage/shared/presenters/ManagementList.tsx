import * as React from 'react';
import { Component, CSSProperties } from 'react';
import List from 'material-ui/List';
import { Button, DialogTitle } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { PageResult } from '../../../../reducers/resource/page';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource';

const styles: CSSProperties = {
    title: {
        display: 'inline-flex',
    },
    addButton: {
        margin: 10,
    },
};

interface ManagementListProps<T> {
    title: string;
    currentView: ResourceCache<PageResult<T>>;
    renderChild: (child: T) => JSX.Element;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    fetchListItems: () => void;
}

export default class ManagementList<T> extends Component<ManagementListProps<T>> {

    componentWillMount() {
        this.tryFetch();
    }

    componentDidUpdate() {
        this.tryFetch();
    }

    render() {
        const {title, currentView, onClickAdd, getPage, renderChild} = this.props;
        const page = isPresent(currentView) ? currentView.object : null;
        return (

            <form>
                <DialogTitle style={styles.title}>{title}</DialogTitle>
                <span>
                    <PagingButton
                        ariaLabel="previous"
                        enabled={page ? page.meta.hasPrevious : false}
                        onClick={getPage(page ? page.meta.number - 1 : 1)}
                    >
                        <ChevronLeftIcon/>
                    </PagingButton>
                    <PagingButton
                        ariaLabel="next"
                        enabled={page ? page.meta.hasNext : false}
                        onClick={getPage(page ? page.meta.number + 1 : 1)}
                    >
                        <ChevronRightIcon/>
                    </PagingButton>
                </span>
                <List>
                    {page ? page.contents.toArray().map(renderChild) : []}
                </List>
                <LoadingProgressIndicator enabled={currentView.fetchingState === FetchingState.FETCHING}/>
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
        const {currentView, fetchListItems} = this.props;
        if (currentView.fetchingState === FetchingState.NOT_FETCHED) {
            fetchListItems();
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