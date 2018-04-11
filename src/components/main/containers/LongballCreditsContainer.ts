import { connect, Dispatch } from 'react-redux';
import { resetCreditsClick } from '../../../actions/easteregg';
import LongballCredits from '../presenters/LongballCredits';
import { RootState } from '../../../reducers/rootReducer';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
    return {
        resetCounter: function() {
            dispatch(resetCreditsClick());
        }
    };
};

const LongballCreditsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LongballCredits);

export default LongballCreditsContainer;