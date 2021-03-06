import { connect, Dispatch } from 'react-redux';
import Header from '../presenters/Header';
import { incrementCreditsClick, resetCreditsClick } from '../../../actions/easteregg';
import { RootState } from '../../../reducers/rootReducer';

const mapStateToProps = (state: RootState) => {
    return {
        showCredits: state.easterEgg.creditsCount === 9
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
    return {
        incrementCounter: () => {
            dispatch(incrementCreditsClick());
        },
        resetCounter: () => {
            dispatch(resetCreditsClick());
        }
    };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;