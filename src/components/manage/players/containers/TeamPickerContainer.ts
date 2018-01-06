import { RootState } from '../../../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TeamPicker, { TeamPickerActions, TeamPickerProps } from '../presenters/TeamPicker';
import { ResourceCache } from '../../../../reducers/resource';
import { ResourceObject } from '../../../../models/models';
import { Map } from 'immutable';

// FIXME: this belongs in a museum! (or a util file)
export function nonNull<T extends ResourceObject>(resources: Map<string, ResourceCache<T>>): Array<T> {
    return resources.valueSeq().toArray().map((it: ResourceCache<T>) => it.object).filter(notEmpty);
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
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