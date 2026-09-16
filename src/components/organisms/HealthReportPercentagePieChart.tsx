import { Pie } from "@ant-design/charts";
import { Card } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import { toChartBreakdown } from "../../utils";

interface HealthReportPercentagePieChartProps {
	title: string;
	data: Record<string, number>;
	color?: string[];
}

export default function HealthReportPercentagePieChart({
	title,
	data,
	color,
}: HealthReportPercentagePieChartProps) {
	const isMobile = useIsMobile();

	return (
		<Card title={title} styles={{ body: { padding: isMobile ? 12 : 24 } }}>
			<Pie
				data={toChartBreakdown(data, "type")}
				angleField="value"
				colorField="type"
				height={280}
				color={color}
				tooltip={{
					items: [(datum) => ({ name: datum.type, value: datum.value })],
				}}
			/>
		</Card>
	);
}
