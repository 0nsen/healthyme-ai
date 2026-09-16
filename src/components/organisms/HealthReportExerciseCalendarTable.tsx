import { Card, Space, Table } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { HealthReport } from "../../models/health-report";

const ACTIVITY_DOT_COLORS: Record<string, string> = {
	cardio: "#1677ff",
	strength: "#fa8c16",
	yoga: "#52c41a",
	rest: "#8c8c8c",
};

const getActivityDotColor = (activity: string) => {
	const key = Object.keys(ACTIVITY_DOT_COLORS).find((candidate) =>
		activity.toLowerCase().includes(candidate),
	);
	return key ? ACTIVITY_DOT_COLORS[key] : "#bfbfbf";
};

interface HealthReportExerciseCalendarTableProps {
	exerciseCalendar: HealthReport["exerciseCalendar"];
}

export default function HealthReportExerciseCalendarTable({
	exerciseCalendar,
}: HealthReportExerciseCalendarTableProps) {
	const isMobile = useIsMobile();

	return (
		<Card
			title="Exercise Calendar"
			styles={{ body: { padding: isMobile ? 12 : 24 } }}
		>
			<Table
				rowKey="day"
				pagination={false}
				scroll={{ x: "max-content" }}
				dataSource={exerciseCalendar}
				columns={[
					{ title: "Day", dataIndex: "day", key: "day" },
					{
						title: "Activity",
						dataIndex: "activity",
						key: "activity",
						render: (activity: string) => (
							<Space>
								<span
									style={{
										display: "inline-block",
										width: 8,
										height: 8,
										borderRadius: "50%",
										backgroundColor: getActivityDotColor(activity),
									}}
								/>
								{activity}
							</Space>
						),
					},
					{ title: "Duration", dataIndex: "duration", key: "duration" },
					{
						title: "Calories Burned",
						dataIndex: "caloriesBurned",
						key: "caloriesBurned",
					},
				]}
			/>
		</Card>
	);
}
