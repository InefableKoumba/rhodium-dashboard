"use client";
import { Input } from "@/components/ui/input";
import { on } from "events";
import { Check, Pencil, X } from "lucide-react";
import React, { useRef } from "react";

export default function UserInfoFormInput({
  defaultValue,
  label,
  type,
}: Readonly<{
  defaultValue: string | number | Date;
  label: string;
  type: "text" | "email" | "date";
}>) {
  const [value, setValue] = React.useState(defaultValue);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onEditButtonClick = () => {
    if (isEditing) {
      setIsEditing(false);
      inputRef.current?.blur();
    } else {
      setIsEditing(true);
      inputRef.current?.focus();
    }
  };
  const onCloseButtonClick = () => {
    if (isEditing) {
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-sm">Nom</span>
      <div className="flex items-center gap-2">
        <InputRenderer
          isEditing={isEditing}
          setValue={setValue}
          type={type}
          value={value}
        />
        <button
          onClick={onEditButtonClick}
          className="border-2 shadow-sm rounded-lg p-2"
        >
          {isEditing ? <Check /> : <Pencil size={20} color="#666" />}
        </button>
        {isEditing && (
          <button
            onClick={onCloseButtonClick}
            className="border-2 shadow-sm rounded-lg p-2"
          >
            <X />
          </button>
        )}
      </div>
    </div>
  );
}

function InputRenderer({
  value,
  setValue,
  isEditing,
  type,
}: Readonly<{
  isEditing: boolean;
  value: string | number | Date;
  setValue: (value: string | number | Date) => void;
  type: "text" | "email" | "date";
}>) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (type === "text") {
    return (
      <Input
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        disabled={!isEditing}
        type="text"
        value={value.toString()}
        className="border-2 bg-gray-50"
      />
    );
  }
  if (type === "email") {
    return (
      <Input
        ref={inputRef}
        disabled={!isEditing}
        type="email"
        value={value.toString()}
        className="border"
      />
    );
  }
}
