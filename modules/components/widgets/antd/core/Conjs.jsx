import React, { PureComponent } from 'react';
import map from 'lodash/map';
import { Button } from 'antd';
const ButtonGroup = Button.Group;

const unselectedButtonStyle =
{
  backgroundColor: 'transparent',
  color: '#556cd6',
  border: '1px #556cd6',
  fontSize: '0.875rem',
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  fontWeight: 500,
  letterSpacing: '0.02857em',
  textTransform: 'uppercase'
}

const selectedButtonStyle =
{
  backgroundColor: '#556cd6',
  color: 'white',
  fontSize: '0.875rem',
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  fontWeight: 500,
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
  borderRadius: '4px',
  padding: '6px 10px',
  lineHeight: 0
}


const disabledButtonStyle =
{
  backgroundColor: 'transparent',
  color: 'grey',
  fontSize: '0.875rem',
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  fontWeight: 500,
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
  border: 'none',
}

class ConjsButton extends PureComponent {
  onClick = (_e) => {
    const { setConjunction, item } = this.props;
    const conj = item.key;
    setConjunction(conj);
  }

  render() {
    const { disabled, item } = this.props;
    return (
      <Button
        disabled={disabled}
        type={item.checked ? "primary" : null}
        onClick={this.onClick}
        style={disabled ? disabledButtonStyle : item.checked ? selectedButtonStyle : unselectedButtonStyle}

      >{item.label}</Button>
    );
  }
}


export default class ConjsButtons extends PureComponent {
  setNot = (e) => {
    const { setNot, not } = this.props;
    if (setNot)
      setNot(!not);
  }

  render() {
    const { readonly, disabled, not, conjunctionOptions, config, setConjunction } = this.props;
    return (
      <ButtonGroup
        key="group-conjs-buttons"
        size={config.settings.renderSize}
        disabled={disabled || readonly}
      >
        {config.settings.showNot && (readonly ? not : true) &&
          <Button
            key={"group-not"}
            onClick={this.setNot}
            type={not ? "primary" : null}
            disabled={readonly}
          >{config.settings.notLabel}</Button>
        }
        {map(conjunctionOptions, (item, _index) => readonly && !item.checked ? null : (
          <ConjsButton
            key={item.id}
            item={item}
            disabled={disabled || readonly}
            setConjunction={setConjunction}
          />
        ))}
      </ButtonGroup>
    );
  }
}

// obsolete
// class ConjsRadios extends PureComponent {
//   setConjunction = (e) => {
//     const {setConjunction} = this.props;
//     const conj = e.target.value;
//     setConjunction(conj);
//   }

//   render() {
//     const {readonly, disabled, selectedConjunction, conjunctionOptions, config} = this.props;
//     return (
//       <RadioGroup
//         key="group-conjs-radios"
//         disabled={disabled}
//         value={selectedConjunction}
//         size={config.settings.renderSize}
//         onChange={this.setConjunction}
//       >
//         {map(conjunctionOptions, (item, _index) => readonly && !item.checked ? null : (
//           <RadioButton
//             key={item.id}
//             value={item.key}
//             //checked={item.checked}
//           >{item.label}</RadioButton>
//         ))}
//       </RadioGroup>
//     );
//   }
// }
