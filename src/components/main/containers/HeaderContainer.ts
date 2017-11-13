import { connect } from 'react-redux';
import Header from '../presenters/Header';
import { incrementCreditsClick, resetCreditsClick } from '../../../actions/easteregg';

const mapStateToProps = (state: any) => {
    return {
        showCredits: state.easterEgg.creditsCount === 9
    };
};

const mapDispatchToProps = (dispatch: any) => {
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