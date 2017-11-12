import {connect} from "react-redux";
import {resetCreditsClick} from "../../../actions/easteregg";
import DingerzCredits from "../presenters/DingerzCredits";

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetCounter: function() {
            dispatch(resetCreditsClick())
        }
    }
};

const DingerzCreditsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DingerzCredits);

export default DingerzCreditsContainer