import { useState } from "react";

const InputForm = ({
  leftIcon,
  placeholder,
  rightIcon,
  altIcon,
  name,
  onChange,
  onBlur,
  value,
}) => {
  const [focusColor, setFocusColor] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const focusClick = () => {
    setFocusColor(true);
  };

  const focusClickFalse = () => {
    setFocusColor(false);
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      {focusColor ? (
        <div
          onFocus={focusClick}
          onBlur={focusClickFalse}
          className={`container-input-form-true w-[327px] h-[48px] lg:w-[528px]`}
        >
          {focusColor ? (
            <div className="text-blackPrimary ml-4">{leftIcon}</div>
          ) : (
            <div className="text-gray-400 ml-4">{leftIcon}</div>
          )}
          <input
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="input-form"
            type={rightIcon ? (visibility ? "text" : "password") : "text"}
            placeholder={`${placeholder}`}
          />
          {rightIcon ? (
            <button
              type="button"
              onClick={toggleVisibility}
              className="right-icon-true"
            >
              {visibility ? rightIcon : altIcon}
            </button>
          ) : null}
        </div>
      ) : (
        <div
          onFocus={focusClick}
          onBlur={focusClickFalse}
          className={`container-input-form-false w-[327px] h-[48px] lg:w-[528px]`}
        >
          {focusColor ? (
            <div className="text-blackPrimary ml-4">{leftIcon}</div>
          ) : (
            <div className="text-gray-400 ml-4">{leftIcon}</div>
          )}
          <input
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="input-form"
            type={rightIcon ? (visibility ? "text" : "password") : "text"}
            placeholder={`${placeholder}`}
          />
          {rightIcon ? (
            <button
              type="button"
              onClick={toggleVisibility}
              className="right-icon-false"
            >
              {visibility ? rightIcon : altIcon}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default InputForm;
