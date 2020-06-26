// MyInput.js
import { withFormsy } from "formsy-react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
// https://github.com/formsy/formsy-react/blob/master/API.md
// https://material-ui.com/api/text-field/

const MyInput = ({ value, isValid, name, errorMessage, onChange, ...res }) => {
    // An error message is passed only if the component is invalid
    const error = _.isEmpty(value) ? false : !isValid;
    return (
        <div>
            <TextField
                error={error}
                onChange={onChange}
                defaultValue={value}
                helperText={error ? errorMessage : " "}
                {...res}
            />
        </div>
    );
};

export default withFormsy(MyInput);