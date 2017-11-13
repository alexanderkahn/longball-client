import * as React from 'react';
import { Component } from 'react';
import List, { ListSubheader } from 'material-ui/List';
import { Button } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator';
import { CurrentView } from '../../../../models/models';

// const styles = {
//     button: {
//         margin: 10,
//         alignSelf: 'right',
//     },
// };

interface ManagementListProps {
    title: string;
    currentView: CurrentView;
    children: Array<JSX.Element>;
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
        const props = this.props;

        return (
            <div>
                <List subheader={<ListSubheader>{props.title}</ListSubheader>}>
                    {props.children}
                </List>
                <LoadingProgressIndicator enabled={props.currentView.isFetching}/>
                {/*<Button fab color="accent" aria-label="add" style={styles.button} disabled>*/}
                <Button fab={true} disabled={true}>
                    <AddIcon/>
                </Button>
            </div>
        );
    }
}