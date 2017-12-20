import { RootState } from '../../../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TeamPicker, { TeamPickerActions, TeamPickerProps } from '../presenters/TeamPicker';
import { ResourceObjectCache } from '../../../../reducers/resource';
import { ResourceObject } from '../../../../models/models';
import { List, Map } from 'immutable';

function nonNull<T extends ResourceObject>(resources: Map<string, ResourceObjectCache<T>>): List<T> {
    return List(List(resources.entries()).filter(notEmpty));
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
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