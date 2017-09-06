import {connect} from "react-redux";
import {resetCreditsClick} from "../../../actions/easteregg";
import DingerzCredits from "../presenters/DingerzCredits";

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
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