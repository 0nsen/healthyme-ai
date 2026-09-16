import { Radar } from "@ant-design/charts";
import { Card } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { HealthReport } from "../../models/health-report";
import { toChartBreakdown } from "../../utils";

interface HealthReportActivityChartProps {
	activityComposition: HealthReport["activityComposition"];
}

export default function HealthReportActivityChart({
	activityComposition,
}: HealthReportActivityChartProps) {
	const isMobile = useIsMobile();

	return (
		<Card title="Activity" styles={{ body: { padding: isMobile ? 12 : 24 } }}>
			<Radar
				data={toChartBreakdown(activityComposition, "item")}
				xField="item"
				yField="value"
				height={280}
			/>
		</Card>
	);
}
