import React from 'react'


const SingleText_input = props => {
    return (
        <div>
            <form>
                <input type="text" name="text" value={formState.text} placeholder="text" onChange={e => handleChange(e)} />
                <br></br>
                <label> VAMOS !!!</label>
            </form>
        </div>
    )
}

export default SingleText_input
