import { Form, InputNumber, type FormRule } from "antd";
import type { HealthFormData } from "../../models/form-data";

interface NumberFieldProps {
	name: keyof HealthFormData;
	label: string;
	rules: FormRule[];
}

export default function NumberField({ name, label, rules }: NumberFieldProps) {
	return (
		<Form.Item name={name} label={label} rules={rules}>
			<InputNumber style={{ width: "100%" }} />
		</Form.Item>
	);
}
