import { connect, Dispatch } from 'react-redux';
import { resetCreditsClick } from '../../../actions/easteregg';
import DingerzCredits from '../presenters/DingerzCredits';
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

const DingerzCreditsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DingerzCredits);

export default DingerzCreditsContainer;