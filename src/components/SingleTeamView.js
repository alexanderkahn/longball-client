import React from "react";
import PropTypes from 'prop-types';

function SingleTeamView(props) {
    return <div>{props.id}</div>
}

SingleTeamView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default SingleTeamView
