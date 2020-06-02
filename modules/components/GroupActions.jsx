import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors';
import { DeleteOutlined } from '@ant-design/icons'
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const groupActionsPositionList = {
  topLeft: 'group--actions--tl',
  topCenter: 'group--actions--tc',
  topRight: 'group--actions--tr',
  bottomLeft: 'group--actions--bl',
  bottomCenter: 'group--actions--bc',
  bottomRight: 'group--actions--br'
}
const defaultPosition = 'topRight';

const trashButtonStyle = {
  backgroundColor: red.A400,
  color: 'white',
  paddingRight: '2px'
};

export class GroupActions extends PureComponent {
  render() {
    const { config, addRule, addGroup, canAddGroup, canAddRule, canDeleteGroup, removeSelf } = this.props;
    const {
      immutableGroupsMode, addRuleLabel, addGroupLabel, delGroupLabel, groupActionsPosition,
      renderButton: Btn, renderButtonGroup: BtnGrp
    } = config.settings;
    const position = groupActionsPositionList[groupActionsPosition || defaultPosition];

    const addRuleBtn = !immutableGroupsMode && canAddRule &&
      <Button
        key="group-add-rule"
        startIcon={<AddIcon />}
        className="action action--ADD-RULE"
        onClick={addRule}
        size="small"
        variant="outlined"
        color="primary"
      >{addRuleLabel}</Button>;

    const addGroupBtn = !immutableGroupsMode && canAddGroup &&
      <Button
        key="group-add-group"
        className="action action--ADD-GROUP"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addGroup}
        size="small"
        variant="outlined"
        color="primary"
      >{addGroupLabel}</Button>;

    const delGroupBtn = !immutableGroupsMode && canDeleteGroup &&
      <Button
        key="group-del"
        type="danger"
        startIcon={<DeleteOutlined />}
        className="action action--DELETE"
        onClick={removeSelf}
        size="small"
        variant="contained"
        style={trashButtonStyle}
        disableElevation
      >{delGroupLabel}</Button>;

    return (
      <div className={`group--actions ${position}`}>
        <BtnGrp config={config}>
          {addRuleBtn}
          {addGroupBtn}
          {delGroupBtn}
        </BtnGrp>
      </div>
    )
  }
}
