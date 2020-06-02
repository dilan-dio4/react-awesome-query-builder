import * as Widgets from '../components/widgets';
import React from "react";
const {
  FieldSelect,
  Conjs,
  Button,
  ButtonGroup,
  Provider,
  ValueSources,
  confirm,
} = Widgets;

export const settings = {
  formatField: (field, parts, label2, fieldDefinition, config, isForDisplay) => {
    if (isForDisplay)
      return label2;
    else
      return field;
  },

  renderField: (props) => <FieldSelect {...props} />,
  renderOperator: (props) => <FieldSelect {...props} />,
  renderFunc: (props) => <FieldSelect {...props} />,
  renderConjs: (props) => <Conjs {...props} />,
  renderButton: (props) => <Button {...props} />,
  renderButtonGroup: (props) => <ButtonGroup {...props} />,
  renderProvider: (props) => <Provider {...props} />,
  renderValueSources: (props) => <ValueSources {...props} />,
  renderConfirm: confirm,

  valueSourcesInfo: {
    value: {},
  },
  fieldSeparator: '.',
  fieldSeparatorDisplay: '.',
  renderSize: "small",
  maxLabelsLength: 100,
  hideConjForOne: true,
  canReorder: true,
  canRegroup: true,
  showNot: false,
  groupActionsPosition: 'topRight', // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
  setOpOnChangeField: ['keep', 'default'], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'

  // localization
  locale: {
    short: 'en',
    full: 'en-US',
  },
  valueLabel: "Value",
  valuePlaceholder: "Value",
  fieldLabel: "Field",
  operatorLabel: "Operator",
  funcLabel: "Function",
  fieldPlaceholder: "Select field",
  funcPlaceholder: "Select function",
  operatorPlaceholder: "Select operator",
  deleteLabel: null,
  addGroupLabel: "Add group",
  addRuleLabel: "Add rule",
  delGroupLabel: "",
  notLabel: "Not",
  valueSourcesPopupTitle: "Select value source",
  removeRuleConfirmOptions: null,
  removeGroupConfirmOptions: null,
};
