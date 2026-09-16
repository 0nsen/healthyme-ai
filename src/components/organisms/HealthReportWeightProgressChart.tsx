import { Line } from "@ant-design/charts";
import { Card } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { HealthReport } from "../../models/health-report";

interface HealthReportWeightProgressChartProps {
	weightProgress: HealthReport["weightProgress"];
	goalWeight: number;
}

export default function HealthReportWeightProgressChart({
	weightProgress,
	goalWeight,
}: HealthReportWeightProgressChartProps) {
	const isMobile = useIsMobile();

	return (
		<Card
			title="Weight Progress"
			styles={{ body: { padding: isMobile ? 12 : 24 } }}
		>
			<Line
				data={weightProgress}
				xField="week"
				yField="projectedWeight"
				point={{ shape: "circle" }}
				annotations={[
					{
						type: "lineY",
						data: [goalWeight],
						style: { stroke: "#52c41a", lineDash: [4, 4] },
					},
				]}
				height={280}
			/>
		</Card>
	);
}
