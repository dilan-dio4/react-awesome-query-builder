import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

try { dayjs.utc().isUTC(); } catch (e) { dayjs.extend(utc); }

export default class TimeWidget extends PureComponent {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        value: PropTypes.number,
        config: PropTypes.object.isRequired,
        field: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        customProps: PropTypes.object,
        readonly: PropTypes.bool,
        // from fieldSettings:
        timeFormat: PropTypes.string,
        valueFormat: PropTypes.string,
        use12Hours: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        const { valueFormat, value, setValue } = props;
        let mValue = value ? dayjs.utc(value, valueFormat) : null;
        if (mValue && !mValue.isValid()) {
            setValue(null);
        }
    }

    static defaultProps = {
        timeFormat: 'HH:mm',
        valueFormat: 'HH:mm:ss',
        use12Hours: false,
    };


    handleChange = (_value) => {
        const { setValue, valueFormat, timeFormat } = this.props;
        if (_value && _value.isValid() && timeFormat === 'HH:mm') {
            _value.set({ second: 0, millisecond: 0 });
        }
        if (_value === null) setValue(null);
        else setValue(_value.hour() * 60 + _value.minute());
    }

    render() {
        const { placeholder, customProps, value, valueFormat, timeFormat, use12Hours, config, readonly } = this.props;
        const { renderSize } = config.settings;

        return (
            <TimePicker
                disabled={readonly}
                use12Hours
                key="widget-time"
                size={renderSize}
                placeholder={placeholder}
                format={"h:mm a"}
                value={value ? dayjs.utc().startOf('day').minute(value) : null}
                onChange={this.handleChange}
                {...customProps}
            />
        );
    }
}
