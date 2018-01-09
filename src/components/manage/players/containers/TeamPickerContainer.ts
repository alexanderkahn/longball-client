import { RootState } from '../../../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TeamPicker, { TeamPickerActions, TeamPickerProps } from '../presenters/TeamPicker';

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

function mapStateToProps(state: RootState): TeamPickerProps {
    return {
        teams: state.resource.teams.data.toArray(),
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