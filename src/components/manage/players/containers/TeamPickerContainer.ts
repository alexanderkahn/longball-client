import { RootState } from '../../../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TeamPicker, { TeamPickerActions, TeamPickerProps } from '../presenters/TeamPicker';
import { ResourceObjectCache } from '../../../../reducers/resource';
import { ResourceObject } from '../../../../models/models';
import { List, Map } from 'immutable';

function nonNull<T extends ResourceObject>(resources: Map<string, ResourceObjectCache<T>>): List<T> {
    const list: List<T> = List();
    for (const resource of List(resources.values()).toArray()) {
        const object = resource.object;
        if (object !== null) {
            list.push(object);
        }
    }
    return list;
}

function mapStateToProps(state: RootState): TeamPickerProps {
    return {
        teams: nonNull(state.resource.teams.data),
    };
}

function  mapDispatchToProps(dispatch: Dispatch<RootState>): TeamPickerActions {
    return {

    };
}
const TeamPickerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamPicker);

export default TeamPickerContainer;