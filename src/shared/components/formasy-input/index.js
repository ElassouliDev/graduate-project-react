// MyInput.js
import { withFormsy } from "formsy-react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
// https://github.com/formsy/formsy-react/blob/master/API.md
// https://material-ui.com/api/text-field/

const MyInput = ({ value, isValid, name, errorMessage, onChange, ...res }) => {
    // An error message is passed only if the component is invalid
    const error = _.isEmpty(value) ? false : !isValid;
    if (res.type === "file") {
        return (
            <div>
                <a href={value}>File</a>
                <TextField
                    error={error}
                    onChange={onChange}
                    helperText={error ? errorMessage : " "}
                    {...res}
                />
            </div>
        );
    }
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