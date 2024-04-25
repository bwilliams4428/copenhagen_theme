import {
  Field as GardenField,
  Hint,
  Textarea,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../../data-types";
import { useWysiwyg } from "./useWysiwyg";

interface TextAreaProps {
  field: Field;
  hasWysiwyg: boolean;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  brandId: number;
  onChange: (value: string) => void;
}

export function TextArea({
  field,
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
  onChange,
}: TextAreaProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const ref = useWysiwyg({
    hasWysiwyg,
    baseLocale,
    hasAtMentions,
    userRole,
    brandId,
  });

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Textarea
        ref={ref}
        name={name}
        defaultValue={value as string}
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        isResizable
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
