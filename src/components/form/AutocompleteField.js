import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutocompleteField = (props) => {
    const {
        className,
        options,
        getOptionLabel,
        renderInput,
        name,
        multiple
    } = props;

    return (
        <Field
            name={ name }
            component={ (rfProps) => (
                <Autocomplete
                    multiple={ multiple }
                    filterSelectedOptions={ multiple }
                    className={ className }
                    options={ options }
                    getOptionLabel={ getOptionLabel }
                    renderInput={ renderInput }
                    onChange={ (event, newValue) => rfProps.input.onChange(newValue) }
                    value={ rfProps.input.value }
                    getOptionSelected={ (option, value) => {
                        return option.value === value.value;
                    } }
                />
            ) }
        />
    );
};
AutocompleteField.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    getOptionLabel: PropTypes.func.isRequired,
    renderInput: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    multiple: PropTypes.bool
};
AutocompleteField.defaultProps = {
    multiple: false
};

export default AutocompleteField;