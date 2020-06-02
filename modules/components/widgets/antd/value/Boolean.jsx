import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Switch } from 'antd';
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography';

export default class BooleanWidget extends PureComponent {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        value: PropTypes.bool,
        config: PropTypes.object.isRequired,
        field: PropTypes.string.isRequired,
        customProps: PropTypes.object,
        readonly: PropTypes.bool,
        // from fieldSettings:
        labelYes: PropTypes.string,
        labelNo: PropTypes.string,
    }

    handleChange = (val) => {
        this.props.setValue(val);
    }

    static defaultProps = {
        labelYes: null,
        labelNo: null,
    }

    render() {
        const { customProps, value, labelYes, labelNo, readonly } = this.props;

        return (
            <Typography component="div" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)' }}>
                {labelNo || 'No'}
                <span style={{ margin: '0px 5px' }}>
                    <Switch
                        ref="switch"
                        checked={value || null}
                        onChange={(e, val) => this.handleChange(val)}
                        value="checkedB"
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        size={'small'}
                        {...customProps}
                    />
                </span>
                {labelYes || 'Yes'}
            </Typography>
        );
    }
}
