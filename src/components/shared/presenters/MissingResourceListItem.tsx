import * as React from 'react';
import { ListItem, ListItemIcon, Icon, ListItemText } from 'material-ui';

export class MissingResourceListItem extends React.Component {
    render() {
        return (
            <ListItem button={false}>
                <ListItemIcon><Icon>!</Icon></ListItemIcon>
                <ListItemText primary="Missing item!"/>
            </ListItem>
        );
    }

}