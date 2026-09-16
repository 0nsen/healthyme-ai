import { Button, Col, Form, Input, Row, type FormProps } from "antd";
import { HealthFormSchema, type HealthFormData } from "../../models/form-data";
import { useAppDispatch } from "../../store/hooks";
import { generateHealthReport } from "../../store/health-report-slice";
import NumberField from "../molecules/NumberField";

const zodValidator =
	(key: keyof typeof HealthFormSchema.shape) =>
	(_: unknown, value: unknown) => {
		const result = HealthFormSchema.shape[key].safeParse(value);
		return result.success
			? Promise.resolve()
			: Promise.reject(new Error(result.error.issues[0].message));
	};

export default function HealthForm() {
	const dispatch = useAppDispatch();

	const onFinish: FormProps<HealthFormData>["onFinish"] = (values) => {
		dispatch(generateHealthReport(values));
	};

	return (
		<Form layout="vertical" onFinish={onFinish}>
			<Row gutter={16}>
				<Col span={18}>
					<Form.Item
						name="name"
						label="Name"
						rules={[{ validator: zodValidator("name") }]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={6}>
					<NumberField
						name="age"
						label="Age"
						rules={[{ validator: zodValidator("age") }]}
					/>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<NumberField
						name="height"
						label="Height (cm)"
						rules={[{ validator: zodValidator("height") }]}
					/>
				</Col>
				<Col span={12}>
					<NumberField
						name="weight"
						label="Weight (kg)"
						rules={[{ validator: zodValidator("weight") }]}
					/>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={10}>
					<NumberField
						name="weightGoal"
						label="Weight Goal (kg)"
						rules={[{ validator: zodValidator("weightGoal") }]}
					/>
				</Col>
				<Col span={14}>
					<NumberField
						name="dailyExerciseDuration"
						label="Exercise Duration (min/day)"
						rules={[{ validator: zodValidator("dailyExerciseDuration") }]}
					/>
				</Col>
			</Row>

			<Form.Item style={{ marginBottom: 0 }}>
				<Button type="primary" htmlType="submit" block>
					Generate Health Plan
				</Button>
			</Form.Item>
		</Form>
	);
}
