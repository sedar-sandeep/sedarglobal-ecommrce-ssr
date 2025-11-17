import { useRouter } from 'next/router';
import React from 'react';
import { connect } from "react-redux";

const ElevenLabsChat = (props) => {
    const router = useRouter();
    let customClass = router.asPath.indexOf('/customize') >= 0 ? "ElevenLabsChat text-end left" : "ElevenLabsChat text-end"

    return (
        <div className={`${customClass} bg-green rounded-circle`}>
           <elevenlabs-convai agent-id="agent_8601k1jz05prf959v2sfmk90nry1"></elevenlabs-convai>
        </div>
    )
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ElevenLabsChat);
