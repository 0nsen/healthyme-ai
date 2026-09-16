import { Card, Space, Tag, Typography } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import type {
	HealthReport,
	HealthReportHeaderInfo,
} from "../../models/health-report";

const { Text, Paragraph } = Typography;

const getBmiTagColor = (bmiCategory: string) => {
	const category = bmiCategory.toLowerCase();
	if (category.includes("normal") || category.includes("healthy"))
		return "green";
	if (category.includes("obese") || category.includes("severe")) return "red";
	if (category.includes("under") || category.includes("over")) return "orange";
	return "blue";
};

interface HealthReportSummaryCardProps {
	headerInfo: HealthReportHeaderInfo;
	summary: HealthReport["summary"];
}

export default function HealthReportSummaryCard({
	headerInfo,
	summary,
}: HealthReportSummaryCardProps) {
	const isMobile = useIsMobile();

	return (
		<Card title="Summary" styles={{ body: { padding: isMobile ? 12 : 24 } }}>
			<Space size="large" style={{ marginBottom: 12 }}>
				<Text strong>{headerInfo.name}</Text>
				<Text>Age {headerInfo.age}</Text>
				<Text>
					{headerInfo.currentWeight}kg → {headerInfo.weightGoal}kg
				</Text>
			</Space>
			<Space align="start">
				<Tag color={getBmiTagColor(summary.bmiCategory)}>
					BMI {summary.bmi} · {summary.bmiCategory}
				</Tag>
			</Space>
			<Paragraph style={{ marginTop: 12 }}>{summary.text}</Paragraph>
		</Card>
	);
}
