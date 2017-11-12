import * as React from 'react';
import {Component} from 'react';
import List, {ListSubheader} from 'material-ui/List';
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator'


// const styles = {
//     button: {
//         margin: 10,
//         alignSelf: 'right',
//     },
// };

interface ManagementListProps {
    title:string,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems: Function,
    children: Array<JSX.Element>,
}

export default class ManagementList extends Component<ManagementListProps> {

    componentDidMount() {
        if (!this.props.lastFetched && !this.props.isFetching) {
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
                <LoadingProgressIndicator enabled={props.isFetching}/>
                {/*<Button fab color="accent" aria-label="add" style={styles.button} disabled>*/}
                <Button fab disabled>
                    <AddIcon/>
                </Button>
            </div>
        )
    }
}