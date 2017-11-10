// @flow

import * as React from 'react';
import {Component} from 'react';
import List, {ListSubheader} from 'material-ui/List';
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator'
import LeagueListItem from "../../leagues/presenters/LeagueListItem";
import TeamListItem from "../../teams/presenters/TeamListItem";
import PlayerListItem from "../../players/presenters/PlayerListItem";


const styles = {
    button: {
        margin: 10,
        alignSelf: 'right',
    },
};

type ManagementListProps = {
    title:string,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems(): void,
    children: Array<LeagueListItem|TeamListItem|PlayerListItem>,
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
                <Button fab color="accent" aria-label="add" style={styles.button} disabled>
                    <AddIcon/>
                </Button>
            </div>
        )
    }
}