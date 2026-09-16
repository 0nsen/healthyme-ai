import { Card, Progress } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { HealthReport } from "../../models/health-report";

interface HealthReportTimelineCardProps {
	timeline: HealthReport["timeline"];
}

export default function HealthReportTimelineCard({
	timeline,
}: HealthReportTimelineCardProps) {
	const isMobile = useIsMobile();

	return (
		<Card
			title={`Estimated ${timeline.estimatedWeeks} weeks to goal`}
			styles={{ body: { padding: isMobile ? 12 : 24 } }}
		>
			<Progress percent={timeline.progressPercent} />
		</Card>
	);
}
