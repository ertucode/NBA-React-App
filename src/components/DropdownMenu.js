import React from "react";

export default function DropdownMenu({ options, handleOptionClick }) {
  return (
    <div className="dropdown">
      {options.map((option) => {
        return (
          <div
            key={option.id}
            className="dropdown__option"
            onClick={() => {
              handleOptionClick(option.id);
            }}
          >
            {option.fullName}
          </div>
        );
      })}
    </div>
  );
}
