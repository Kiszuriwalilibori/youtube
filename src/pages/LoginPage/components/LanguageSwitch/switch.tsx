import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  onChangeHandler?: () => void;
  labelLeft?: string | null;
  labelRight?: string | null;
  labelText?: string;
  isChecked?: boolean;
  optionClassName?: string;
};

/**
 *
 * @param func function which will be triggered when switch changes
 * @param labelText text which will be displayed as title
 * @param isChecked boolean indicating whether switch is checked or not
 * @returns basic switch component
 */
const SwitchComponent = (props: Props): JSX.Element => {
  const { onChangeHandler, labelLeft, labelRight, labelText, isChecked, optionClassName = "option" } = props;

  return (
    <FormControlLabel
      control={
        <div className="switch">
          <span className={optionClassName}>{labelLeft}</span>
          <Switch checked={isChecked} onChange={onChangeHandler} name="checked" color="warning" />
          <span className={optionClassName}>{labelRight}</span>
        </div>
      }
      label={labelText}
      labelPlacement="top"
    />
  );
};
export default SwitchComponent;
